import React from 'react';
import {Avatar, Typography} from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
  .mine {
    display: flex;
    justify-content: flex-end
  }
`;


const Message = ({text,displayName,photoUrl,creatAt,classes}) => {
    return (
        <WrapperStyled>
            <div className={classes}>
                <div>
                    <div>
                        <Avatar size='small' src={photoUrl}></Avatar>
                        <Typography.Text className='author'>{displayName}</Typography.Text>
                        <Typography.Text className='date'>{creatAt}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className='content'>{text}</Typography.Text>
                    </div>
                </div>
            </div>
        </WrapperStyled>
    );
};

export default Message;