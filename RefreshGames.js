import React, {Component} from 'react';
import {Icon} from 'react-native-elements'
import {AsyncStorage, View} from 'react-native';

export default class RefreshGames extends Component {
    static navigationOptions = {
        drawerLabel: 'Refresh Games',
        drawerIcon: () => (
            <Icon name='refresh' type="font-awesome"/> ),
    };

    componentWillMount() {
            AsyncStorage.removeItem('oldState')
            this.props.navigation.navigate("WinningNumbers")
        }

    render() {
        return(
            <View>
            </View>
        )
    }
}