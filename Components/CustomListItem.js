import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({id,data,navigation}) => {
    function goToChatScreen(){
         navigation.navigate('Chats',{id,data});
    }
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={goToChatScreen}>
                <ListItem  key={id} bottomDivider>
                    <Avatar rounded source=
                    {{uri:"https://image.shutterstock.com/image-vector/cartoon-boy-giving-you-thumbs-260nw-143614309.jpg"}} />
                    <ListItem.Content>
                    <ListItem.Title style={{fontWeight:"600"}}>{data.chatName}</ListItem.Title>
                    <ListItem.Subtitle>Gaire Abinash</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
        </TouchableOpacity>
        
    )
}

export default CustomListItem
