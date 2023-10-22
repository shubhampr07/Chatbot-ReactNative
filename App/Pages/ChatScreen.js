import { View, Text } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat';
import ChatFaceData from '../Services/ChatFaceData';
import GlobalApi from '../Services/GlobalApi';


export default function ChatScreen() {


    const param = useRoute().params;

    const [messages, setMessages] = useState([]);
    const [selectedChatFace, setSelectedChatFace] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedChatFace(param.selectedFace)
        setMessages([
        {
            _id: 1,
            text: 'Hello, I am '+param.selectedFace?.name+'.',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'MyGPT',
            avatar: param.selectedFace?.image,
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
        )
        setLoading(true)
        if(messages[0].text){
            getBardResp(messages[0].text)
        }
    }, [])

    const getBardResp = (msg) => {
        GlobalApi.getBardApi(msg).then(resp=>{
            if(resp.data.resp[1].content){
                const  chatApiResp={
                    _id: Math.random()* (9999999 - 1),
                    text: resp.data.resp[1].content,
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'MyGPT',
                    avatar: param.selectedFace?.image,
                    }
                }

                setMessages(previousMessages => GiftedChat.append(previousMessages, chatApiResp))
                setLoading(false);
            }
            else{
                setLoading(false);
                const  chatApiResp={
                    _id: Math.random()* (9999999 - 1),
                    text: "Sorry, I can not help with it",
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'MyGPT',
                    avatar: param.selectedFace?.image,
                    }
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatApiResp))
            }
        })
    }

  return (
    <View style={{flex:1, backgroundColor:'#fff'}} >
      <GiftedChat
      messages={messages}
      isTyping={loading}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  )
}