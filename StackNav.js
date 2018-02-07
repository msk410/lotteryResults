import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
import { Icon } from 'react-native-elements'
import MyLocation from "./MyLocation"

const stackNav = StackNavigator({
    Main: {
        screen: MyLocation,
        navigationOptions:({navigation}) => ({
            title: "Main",
            headerLeft:(
                <Icon
                          name='pencil'
                          type = "material-community"/>),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
})
