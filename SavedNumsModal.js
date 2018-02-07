import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar, AsyncStorage, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import React, {Component} from 'react';

  render() {
      return (
<Modal
                                 animationType="fade"
                                 transparent={true}
                                 visible={this.state.modalVisible}
                                 onRequestClose={() => {alert("Modal has been closed.")}}
                                 >
                                <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#00000080'
                                                }}>
                                 <View style={{ backgroundColor: '#fff', padding: 20,
                                                   width: 300,
                                                   height: 300}}>
                                   <Text>Hello World!</Text>

                                   <TouchableHighlight onPress={() => {this.setState({modalVisible:false})
                                   }}>
                                     <Text>Hide Modal</Text>
                                   </TouchableHighlight>

                                 </View>
                                </View>
                               </Modal>
                               )}