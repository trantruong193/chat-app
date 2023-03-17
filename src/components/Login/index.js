import React from 'react';
import {Button, Col, Row} from "antd";
import Title from "antd/lib/typography/Title";

import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../../firebase/config'
import {addDocument, generateKeywords} from "../../firebase/service";

const Login = () => {

    const googleProvider = new GoogleAuthProvider()


    async function handleLoginGG(){
        const {_tokenResponse,user} = await signInWithPopup(auth,googleProvider)

        if (_tokenResponse?.isNewUser){
            const data = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId,
                keywords: generateKeywords(user.displayName.toLowerCase())
            }
            await addDocument('users',data)
        }
    }

    return (
        <div>
            <Row justify="center" style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3} >Fun chat</Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleLoginGG}>Login with Google</Button>
                    <Button style={{width: '100%'}} >Login with Facebook</Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;