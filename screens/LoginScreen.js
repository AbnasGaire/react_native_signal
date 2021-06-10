import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { View, Text ,StyleSheet} from 'react-native'
import {Image,Input,Button} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import {auth} from "../firebase";
const LoginScreen = ({navigation}) => {
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            if(authUser){
               navigation.replace("Home")
            }
        })
        return unsubscribe;
    },[])

    function loginUser(){
        auth.signInWithEmailAndPassword(email, password)
        .then(user=>{
            navigation.replace('Home',{userData:user.user})
        })
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
           <Image source={{
               uri:"https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg"
           }}
           style={{height:150,width:150}}
           containerStyle={styles.images}
           />
           <View style={styles.inputs}>
           <Input placeholder="Email" value={email} onChangeText={(text)=>setemail(text)}/>
           <Input placeholder="Password" value={password} onChangeText={(text)=>setpassword(text)} secureTextEntry/>
           </View>
           
           <Button containerStyle={styles.buttons} title="Login" onPress={loginUser}/>
           <Button containerStyle={styles.buttons} title="Register" type="outline" onPress={()=>navigation.navigate("Register")}/>
           <View style={{height:150}} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',

    },
    inputs:{
        width:300,
        marginTop:10,

    },
    images:{
        marginTop:50
    },
    buttons:{
        width:200,
        marginTop:5
    }
  });