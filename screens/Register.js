import { registerRootComponent } from 'expo';
import React ,{useLayoutEffect,useState} from 'react'
import { View ,StyleSheet} from 'react-native'
import {Text,Input,Button} from "react-native-elements";
import {auth,db} from "../firebase";

const Register = ({navigation}) => {
   const [email,setEmail]=useState('');
   const [name,setName]=useState('');
   const [password,setPassword]=useState('');
   const [image,setImage]=useState('');

   useLayoutEffect(()=>{
       navigation.setOptions({
           headerBackTitle:false
       })
   },[navigation]);

   function registerUser(){
     auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName:name,
                    photoURL:image || "https://www.clipartkey.com/mpngs/m/29-297748_round-profile-image-placeholder.png"
                }).catch(err=> alert(err.message));
            })
   }
    return (
        <View style={styles.container}>
            <Text h3>Register Here</Text>
            <View style={styles.inputs}>
                <Input placeholder="Full Name" type="text" value={name} onChangeText={(text)=>setName(text)} />
                <Input placeholder="Email"  type="email" value={email} onChangeText={(text)=>setEmail(text)} />
                <Input placeholder="Password" type="password" value={password} secureTextEntry onChangeText={(text)=>setPassword(text)}  />
                <Input placeholder="Image"  type="text"  image={image} onChangeText={(text)=>setImage(text)} />
            </View>
        

            <Button containerStyle={styles.button} title="Register" type="outline" onPress={()=>registerUser()}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:50,
   
    },
    inputs:{
        width:300,
        marginTop:10,

    },
    button:{
        width:300,
        marginTop:10,
    }
  });
export default Register
