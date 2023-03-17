import React, {useContext} from 'react';
import {Form, Input, Modal} from "antd";
import {AppContext} from "../../../context/AppProvider";
import {AuthContext} from "../../../context/AuthProvider";
import {addDocument} from "../../../firebase/service";

const AddRoom = () => {

    // Get data from context
    const {isAddRoom,setIsAddRoom} = useContext(AppContext)
    const {user: {uid}} = useContext(AuthContext)

    const [form] = Form.useForm()

    async function handleOk(){
        // Add data to firebase
        await addDocument('rooms',{...form.getFieldsValue(),members: [uid]})
        // Reset form
        form.resetFields()
        // Close modal
        setIsAddRoom(false)
    }
    function handleCancel(){
        form.resetFields()
        setIsAddRoom(false)
    }

    return (
        <div>
            <Modal
                title='Add room'
                open={isAddRoom}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Room name' name='name'>
                        <Input placeholder='Enter your room name' />
                    </Form.Item>
                    <Form.Item label='Room description' name='description'>
                        <Input.TextArea placeholder='Enter your room name' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddRoom;