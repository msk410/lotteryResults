import React, {Component} from 'react';
import {AsyncStorage, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements'
import Header from "./Header"


export default class SelectedGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myLocation: '',
            gamesList: [],
        };
    }

    static navigationOptions = {
        drawerLabel: 'Selected Games',
        drawerIcon: () => (
            <Icon
                name='bookmark-check'
                type="material-community"/>
        ),
    };

    componentWillMount() {
        this.getSelectedGames().then((data) => {
            if (data !== null) {
                this.setState({
                    gamesList: data
                })
            }
        }).catch((err) => console.log(err))


    }


    async getSelectedGames() {
        try {
            const value = await AsyncStorage.getItem('selectedGames');
            if (value !== null) {
                // We have data!!
                return JSON.parse(value)
            }
        } catch (error) {
            // Error retrieving data
            console.log("error")
            return "";
        }
    }

    unsaveGame(gameName) {
        let newGameList = [...this.state.gamesList]
        newGameList.map((elem, index) => {
            if (Object.keys(elem)[0] === gameName) {
                elem[gameName] = !elem[gameName]
            }
        })
        this.setState({
            gamesList: newGameList
        })
        AsyncStorage.setItem('selectedGames', JSON.stringify(newGameList))
    }

    render() {
        let selectedGameData = [];
        this.state.gamesList.map((elem, index) => {
            let tempSelectedGameData = {};

        })
        return (

            <View style={{flex: 1, backgroundColor: "#f9f9f9"}}>
                <StatusBar hidden={true}/>
                <Header openDrawer={() => this.props.navigation.navigate('DrawerOpen')} title={"Selected Games"}/>
                <FlatList
                    data={this.state.gamesList.map((elem, index) => {
                        let tempGame = {};
                        tempGame.key = index;
                        tempGame.name = Object.keys(elem);
                        tempGame.isSelected = elem[Object.keys(elem)];
                        return tempGame;
                    })}
                    renderItem={({item}) => <TouchableOpacity style={{
                        backgroundColor: "#ffffff",
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        borderBottomColor: '#bbb',
                        borderBottomWidth: StyleSheet.hairlineWidth
                    }} onPress={() => this.unsaveGame(item.name[0])}>
                        <Text style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 10,
                            fontSize: 30,
                            marginTop: 5,
                        }}>{item.name}
                        </Text>
                        {item.isSelected &&
                        <Icon name='check' type="material-community" color="#428bca"/>}
                    </TouchableOpacity>}
                />
            </View>
        );
    }
}