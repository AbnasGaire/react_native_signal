import React,{useLayoutEffect,useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native';
import { View, Text,TouchableOpacity } from 'react-native';
import {Button} from "react-native-elements";
import {auth, db} from "../firebase";
import CustomListItem from "../Components/CustomListItem";
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons";
import { ScrollView } from 'react-native';

// import {ToachableOpacity} from "react-native-gesture-handler";

const Home = ({navigation}) => {
    const [chats, setchats] = useState([]);
    useEffect(() => {
       const unsubscribe= db.collection('chats').onSnapshot(snapshot=>(
        setchats(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        })))
       ))

       return unsubscribe;
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:"white"},
            headerTitleStyle:{color:"black"},
            headerTintStyle:"black",
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={logoutUser}>
                    <Avatar rounded 
                    source={{uri: auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                   
                </View>
            ),
    
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    width:80,
                    marginRight:20,
                    justifyContent:"space-between"
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                    <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
    
        })
    }, [navigation])

    function logoutUser(){
        auth.signOut()
        .then(()=>navigation.replace("Login"))
        .catch(error=>alert(error.message))
    }
    return (
        <SafeAreaView style={{height:"100%"}}>
            <ScrollView>
            {chats.map(chat=>(
                     <CustomListItem key={chat.id} id={chat.id} data={chat.data} navigation={navigation}/>
            ))}
            </ScrollView>
          
        
        </SafeAreaView>
    )
}

export default Home
