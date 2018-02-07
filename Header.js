import React, { Component } from 'react';
import { TouchableHighlight, View, StatusBar, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Header extends Component {
 static navigationOptions = {
      drawerLabel: 'My Location',
      drawerIcon: () => (
        <Icon
            name='map-marker'
            type = "material-community"/>
         ),
   };
  render() {
    return (
        <View  style = {{height: 50, backgroundColor: "#428bca", flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row',}}>
            <StatusBar hidden = {true}/>
            <Icon onPress = {this.props.openDrawer} name='menu' type = "material-community" size = {35} style = {{paddingRight: 20, paddingLeft : 10, paddingTop: 5}} color = "white"/>
            <Text style = {{color: "white", fontSize: 25, textAlign: 'center', paddingTop: 5 }}>{!!this.props.state  ? this.props.title + " " + this.props.state : this.props.title}</Text>
        </View>
    )
}
}