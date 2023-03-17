import React, {useContext} from 'react';
import {Button, Collapse, Typography} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import styled from "styled-components";
import {PlusSquareOutlined} from "@ant-design/icons";
import {AppContext} from "../../context/AppProvider";

const PanelStyled = styled(CollapsePanel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`

const RoomList = () => {

    const {rooms,setIsAddRoom,setSelectedRoomId} = useContext(AppContext)

    function handleOpenModel(){
        setIsAddRoom(true)
    }

    return (
        <Collapse defaultActiveKey={'1'} ghost>
            <PanelStyled key='1' header='Room list'>
                {rooms.map(room => (
                    <LinkStyled
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                    >
                        {room.name}
                    </LinkStyled>
                ))}
                <Button type='text' icon={<PlusSquareOutlined/>} className='add-room' onClick={handleOpenModel}>Add new room</Button>
            </PanelStyled>
        </Collapse>
    );
};

export default RoomList;