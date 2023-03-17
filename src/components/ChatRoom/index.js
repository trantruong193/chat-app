import React from 'react';
import {Col, Row} from "antd";
import Sidebar from "./Sidebar";
import ChatSpace from "./ChatSpace";

const ChatRoom = () => {
    return (
        <Row>
            <Col span={6}>
                <Sidebar/>
            </Col>
            <Col span={18}>
                <ChatSpace/>
            </Col>
        </Row>
    );
};

export default ChatRoom;