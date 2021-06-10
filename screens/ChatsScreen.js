import React ,{useEffect,useState,useLayoutEffect}from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {FontAwesome,Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { TextInput,Keyboard } from 'react-native';
import { Platform } from 'react-native';
import { auth, db } from '../firebase';
import firebase from "firebase";
import "firebase/firestore";

const ChatsScreen = ({navigation,route}) => {
    const {id,data}=route.params;
    const [message, setmessage] = useState('');
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
       navigation.setOptions({
           title:"Let's Chat",
           headerBackTitleVisile:false,
           headerTitleAlign:"left",
           headerLeft:()=>(
               <View style={{marginLeft:20}}>
                   <Avatar rounded source=
                    {{uri: auth?.currentUser?.photoURL}} />
                    
               </View>
           ),

           headerRight:()=>(
               <View style={{flexDirection:"row", width:80,justifyContent:"space-between" ,marginRight:10,alignItems:"center"}}>
                   <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                    <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
               </View>
           )

       })
    }, [navigation])
    
    useEffect(() => {
       const unsubscribe=db.collection('chats')
       .doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
           setMessages(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
           })))
       ))
       return unsubscribe;
    }, [route])

    function sendMessage(){
        Keyboard.dismiss();
        db.collection("chats").doc(id).collection("messages").add({
            message:message,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            displayName:auth?.currentUser?.displayName,
            email:auth?.currentUser?.email,
            photoURL:auth?.currentUser?.photoURL
        });
        setmessage('');
    }
    
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="light"/>
                    <KeyboardAvoidingView 
                    behavior={Platform.OS==="ios"?"padding":"height"}
                    style={styles.container}
                    keyboardVerticalOffset={90}>
                    <>
                        <ScrollView >
                            {messages.map(message=>(
                                message.data.email===auth.currentUser.email?
                                (<View key={message.id} style={styles.receiver}>
                                    <Avatar 
                                    rounded
                                    position="absolute"
                                    left={-5}
                                    bottom={-15}
                                    source={{uri:message.data.photoURL}} />
                                    <Text>{message.data.message}</Text>
                                
                                </View>)
                                :
                                (<View key={message.id} style={styles.sender}>
                                    <Avatar rounded size={30} 
                                    position="absolute"
                                    right={-5}
                                    bottom={-20}
                                    source={{uri:message.data.photoURL}}/>
                                    <Text>{message.data.message}</Text>
                        
                                </View>)
                            ))}
                        </ScrollView>
                        
                        <View style={styles.footer}>
                            <TextInput placeholder="Enter message" 
                            value={message} 
                            onChangeText={(text)=>setmessage(text)} style={styles.textinput}/>
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send"  color="blue" size={30} />
                            </TouchableOpacity>
                           
                        </View>
                    </>
                 </KeyboardAvoidingView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container:{
     flex:1
    },
    footer: {
       flexDirection:"row",
       alignItems:"center",
       width:"100%",
       padding:10,
       alignSelf:"flex-end",
       justifyContent:"flex-end",
    },
    textinput:{
        bottom:0,
        height:40,
        flex:1,
        backgroundColor:"#ECECEC",
        padding:10,
        borderRadius:20,
    },
    receiver:{
        padding:15,
        backgroundColor:"#add8e6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    }
  });
export default ChatsScreen
