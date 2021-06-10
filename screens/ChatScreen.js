
import React ,{useLayoutEffect,useState} from 'react'
import { View, Text } from 'react-native';
import {Input,Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {db,auth} from "../firebase";

const ChatScreen = ({navigation}) => {
    const [chatname, setchatname] = useState('');
    useLayoutEffect(() => {
       navigation.setOptions({
           title:"Add New Chat",
           headerBackTitle:"Chats",
           headerTitleStyle:{color:"black"}, 
           
       })
    }, [navigation]);

   const createNewChat = async ()=>{
         await db.collection("chats").add({
             chatName:chatname,
             }).then(()=>{
                 navigation.goBack();
             })
    }
    return (
        <View style={{marginTop:30}}>
            <Input placeholder="Enter Chat Name" 
            onChangeText={(text)=>setchatname(text)}
            value={chatname}
            onSubmitEditing={createNewChat}
            leftIcon={
                       <Icon name="wechat" type="antdesign" size={20} color="black" />
                   }
            />

            <Button 
            containerStyle={{width:300,marginLeft:50}}
            type="outline" 
            title="Add new Chat"
            onPress={createNewChat}/>
        </View>
    )
}

export default ChatScreen
