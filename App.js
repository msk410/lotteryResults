import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Button as Button1} from 'react-native-elements';
import MyLocation from "./MyLocation"
import StackNav from "./StackNav"
import Header from "./Header"
import WinningNumbers from "./WinningNumbers"
import MyNumbers from "./MyNumbers"
import PastNumbers from "./PastNumbers"
import SelectedGames from "./SelectedGames"
import RefreshGames from "./RefreshGames"


 const MyApp = DrawerNavigator({
  WinningNumbers: {
    screen :WinningNumbers,
    },
  MyLocation: {
    screen: MyLocation,
  },
  MyNumbers: {
    screen: MyNumbers,
  },
  PastNumbers: {
    screen: PastNumbers,
  },
  SelectedGames: {
    screen: SelectedGames,
  },
  RefreshGames: {
    screen: RefreshGames,
  },
});

export default class App extends Component {

  render() {
   {AsyncStorage.removeItem('oldState')}
   {AsyncStorage.removeItem('gameInfo')}
    return <MyApp  />;
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
