import React, { Component } from 'react';
import { View, StatusBar, Text, StyleSheet, AsyncStorage } from 'react-native';

export default class Header extends Component {
constructor(props) {
        super(props);
          this.state = {
            testNums: [],
          };
  }

  render() {
        return (
            <View  style = {{alignItems: 'center', justifyContent:'center', borderWidth: 0.5,  borderColor: '#000000' }}>
                <Text style = {styles.myText}>{this.props.test} </Text>


            </View>
        )
    }
}

const styles = StyleSheet.create({
  myText: {
    fontSize: 18,
  },
  circle: {
       fontSize: 25,
       textAlign: 'center',
       textAlignVertical: 'center',
       height: 45,
       width: 45,
       borderRadius: 30 ,
       backgroundColor: 'white',
       paddingLeft: 5,
       borderWidth: 0.5,
       borderColor: '#000000',
     },
       bonusCircle: {
            fontSize: 25,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 45,
            width: 45,
            borderRadius: 30 ,
            backgroundColor: 'red',
          },
          extraStuff: {
                      fontSize: 25
                    }
});