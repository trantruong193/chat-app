import React, {createContext, useContext, useMemo, useState} from 'react';
import {AuthContext} from "./AuthProvider";
import {useFireStore} from "../hooks/useFireStore";

export const AppContext = createContext()

const AppProvider = ({children}) => {

    const [isAddRoom,setIsAddRoom] = useState(false)
    const [inviteMember,setInviteMember] = useState(false)
    const [selectedRoomId,setSelectedRoomId] = useState('')

    const {user: {uid}} = useContext(AuthContext)


    // problem when log out user == null => error notice condition in useFireStore
    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    },[uid])

    const rooms = useFireStore('rooms',roomCondition)

    const selectedRoom = rooms?.find(room => room.id === selectedRoomId)


    const memberCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom?.members
        }
    },[selectedRoom?.members])

    const members = useFireStore('users',memberCondition)


    return (
        <AppContext.Provider
            value={{
                rooms,isAddRoom,setIsAddRoom,setSelectedRoomId,selectedRoomId,selectedRoom,members,inviteMember,setInviteMember
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;