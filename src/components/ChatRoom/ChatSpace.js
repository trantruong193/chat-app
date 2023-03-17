import React, {useContext, useMemo, useState} from 'react';

import styled from "styled-components";
import {Alert, Avatar, Button, Form, Input, Tooltip} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import Message from "./Message";
import {AppContext} from "../../context/AppProvider";
import {AuthContext} from "../../context/AuthProvider";
import {addDocument} from "../../firebase/service";
import {useForm} from "antd/es/form/Form";
import {useFireStore} from "../../hooks/useFireStore";
import {formatRelative} from "date-fns";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatSpace = () => {
    const {user: {uid,displayName,photoURL}} = useContext(AuthContext)
    const {selectedRoom,members,setInviteMember,} = useContext(AppContext);

    const [disable,setDisable] = useState(true)
    const [message,setMessage] = useState('')

    const [form] = useForm()

    async function handleSubmit(){
        if (message === ''){
            return
        }
        form.resetFields(['message'])
        await addDocument('messages',{
            content: message,
            uid,
            displayName,
            photoURL,
            roomId: selectedRoom.id
        })
        setMessage('')
        setDisable(true)

    }
    function handleInputChange(e){
        setMessage(e.target.value)
        setDisable(false)
    }

    const messageCondition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom?.id
        }
    },[selectedRoom?.id])

    const messages = useFireStore('messages',messageCondition)

    function formatDate(seconds){
        let result = ''
        if (seconds){
            result = formatRelative(new Date(seconds*1000),new Date())
            result = result.charAt(0).toUpperCase() + result.slice(1)
        }
        return result
    }

    return (
        <WrapperStyled>
            {selectedRoom ?
                (
                <>
                    <HeaderStyled>
                        <div className='header__info'>
                            {selectedRoom && <p className='header__title'>{selectedRoom.name}</p>}
                            {selectedRoom && <span className='header__description'>{selectedRoom.description}</span>}
                        </div>
                        {selectedRoom &&
                            <ButtonGroupStyled>
                                <Button type='text' icon={<UserAddOutlined/>} onClick={()=>setInviteMember(true)}>Add</Button>
                                <Avatar.Group maxCount={2} size='small'>
                                    {members && members.map(member => (
                                        <Tooltip title={member.displayName} key={member.id}>
                                            <Avatar src={member.photoURL}>
                                                {member.photoURL ? '' : member.displayName[0].toUpperCase} key={member.id}
                                            </Avatar>
                                        </Tooltip>
                                    ))}
                                </Avatar.Group>
                            </ButtonGroupStyled>
                        }
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled>
                            {messages && messages.map(message => (
                                <Message key={message.id} classes={message.uid === uid ? 'mine': ''} displayName={message.displayName} photoUrl={message.photoURL} text={message.content} creatAt={formatDate(message.createAt?.seconds)} />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name='message'>
                                <Input
                                    bordered={false}
                                    autoComplete='off'
                                    placeholder='Enter your message'
                                    onChange={handleInputChange}
                                    onPressEnter={handleSubmit}
                                >
                                </Input>
                            </Form.Item>
                            <Button type='primary' disabled={disable} onClick={handleSubmit}>Send</Button>
                        </FormStyled>
                    </ContentStyled>
                </>
                )
                : <Alert message='Let choose room' type='info' showIcon style={{margin: 5}} closable/>}
        </WrapperStyled>
    );
};

export default ChatSpace;