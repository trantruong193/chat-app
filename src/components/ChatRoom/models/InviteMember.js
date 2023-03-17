import React, {useContext, useMemo, useState} from 'react';
import {Avatar, Form, Modal, Select, Spin} from "antd";
import {AppContext} from "../../../context/AppProvider";
import {debounce} from "lodash";
import {db} from "../../../firebase/config";
import {collection, getDocs, query, where,getDoc,doc,updateDoc} from "firebase/firestore";


function DebounceSelect({fetchOptions,delayMs=300,...props}){

    const [fetching,setFetching] = useState(false)
    const [options,setOptions] = useState([])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)

            fetchOptions(value,props.currentMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions,delayMs)
    },[delayMs,fetchOptions])

    return <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size='small'/> : null}
        {...props}
    >
        {options && options.map((opt) => (
            <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                <Avatar size='small' src={opt.photoURL}>
                    {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                </Avatar>
                {` ${opt.label}`}
            </Select.Option>
        ))}
    </Select>

}

async function fetchUserList(search,currentMembers) {

    const q = query(collection(db,'users'),where('keywords', 'array-contains', search.toLowerCase()))

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
        return {
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        }
    }).filter(opt => !currentMembers.includes(opt.value))

    return data
}

const InviteMember = () => {

    // Get data from context
    const {inviteMember,setInviteMember,selectedRoomId,selectedRoom} = useContext(AppContext)

    const [form] = Form.useForm()
    const [value, setValue] = useState([]);

    async function handleOk(){
        form.resetFields()

        const roomRef = doc(db,'rooms',selectedRoomId)

        await updateDoc(roomRef,{
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })

        setInviteMember(false)
    }
    function handleCancel(){

        form.resetFields()
        setInviteMember(false)
    }

    return (
        <div>
            <Modal
                title='Add Member'
                open={inviteMember}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        label='Members name'
                        value={value}
                        fetchOptions={fetchUserList}
                        placeholder='Enter member name'
                        onChange={newValue => setValue(newValue)}
                        style={{width: '100%'}}
                        currentMembers={selectedRoom?.members}
                    >
                    </DebounceSelect>
                </Form>
            </Modal>
        </div>
    );
};

export default InviteMember;