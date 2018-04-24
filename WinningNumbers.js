import React, {Component} from 'react';
import {AsyncStorage, Button, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Results from "./Results"
import Testing from "./Testing"
import Header from "./Header"
import {Icon} from 'react-native-elements'
import LottoData from "./LottoData"


export default class WinningNumbers extends Component {
    static navigationOptions = {
        drawerLabel: 'Winning Numbers',
        drawerIcon: () => (
            <Icon name='dollar' type="font-awesome"/> ),
    };

    constructor(props) {
        super(props);
        this.state = {
            testData: [],
            modalVisible: false,
            modalMessage: [],
            loc: ''
        };
    }

    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('@MyLocation:key');
            let selectedGames = await AsyncStorage.getItem('selectedGames');
            selectedGames = await JSON.parse(selectedGames);
            let gameInfo = await AsyncStorage.getItem('gameInfo');
            let oldState = await  AsyncStorage.getItem('oldState');
            if(value == null || typeof value == 'undefined') {
                this.props.navigation.navigate("MyLocation")
            }
            if (value !== null && value != oldState) {
                // We have data!!
                let lottoData = new LottoData();
                let url = "http://lottoserver-env.us-east-2.elasticbeanstalk.com"
                let gameInfo = [];
                this.setState({
                loc: "(" + value + ")"
                })
                gameInfo = await lottoData.getAllData(url, value.toLowerCase())

               for(let i = 0; i < selectedGames.length; i++) {
                    let select = Object.keys(selectedGames[i])[0];
                    for(let j = 0; j < gameInfo.length; j++) {
                        if(gameInfo[j][0].name.toLowerCase() === select.toLowerCase()) {
                            gameInfo[j][0].showGame = selectedGames[i][select];
                        }
                }
               }

                this.setState({
                    testData: gameInfo
                })

                AsyncStorage.setItem('oldState', value)
                AsyncStorage.setItem('gameInfo', JSON.stringify(gameInfo))

            } else if(value == oldState) {
                let oldGameInfo = await AsyncStorage.getItem('gameInfo')
                this.setState({
                    testData: JSON.parse(oldGameInfo)
                })
            }else {
                this.props.navigation.navigate("MyLocation")
            }
        } catch (error) {
            // Error retrieving data
            console.log("error 1")
        }


        const rawSavedNums = await AsyncStorage.getItem('MyGame');
        savedNums = JSON.parse(rawSavedNums);
        if (savedNums !== null) {

            if (savedNums.length > 0) {
                let messageList = [];
                let gameIndex = "";

                for (let i = 0; i < savedNums.length; i++) {
                    for (let k = 0; k < this.state.testData.length; k++) {
                        if (savedNums[i].gameName === this.state.testData[k][0].name) {
                            gameIndex = k;
                            break;
                        }
                    }
                    let isBonusMatch = false;
                    let numMatches = 0;
                    let matchingNumsObject = {}
                    if (savedNums[i].gameName === this.state.testData[gameIndex][0].name) {
                    let bon = this.state.testData[gameIndex][0].bonus
                    bon = bon.length > 1 && bon[0] === '0' ? bon[1] : bon
                        if (savedNums[i].bonusNum === bon) {
                            isBonusMatch = true;
                        }
                        for (let j = 0; j < savedNums[i].nums.length; j++) {
                            let zeroAppend = "0";
                            if (savedNums[i].nums[j].length === 1) {
                                zeroAppend += savedNums[i].nums[j];
                            }
                            if (this.state.testData[gameIndex][0].winningNumbers.includes(savedNums[i].nums[j]) || (zeroAppend.length > 1 && this.state.testData[gameIndex][0].winningNumbers.includes(zeroAppend))) {
                                matchingNumsObject[savedNums[i].nums[j]] = true;
                            }
                        }
                        numMatches = Object.keys(matchingNumsObject).length;

                        let winningMessage = savedNums[i].gameName + ": ";
                        if (isBonusMatch && numMatches === 0) {
                            winningMessage += " Your bonus number " + savedNums[i].bonusNum + " matched 0 + 1. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "2"
                            } else {
                                winningMessage += "4"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (isBonusMatch && numMatches === 1) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 1 + 1. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "4"
                            } else {
                                winningMessage += "4"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (isBonusMatch && numMatches === 2) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 2 + 1. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "10"
                            } else {
                                winningMessage += "7"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (!isBonusMatch && numMatches === 3) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " matched 3 + 0. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "10"
                            } else {
                                winningMessage += "7"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (isBonusMatch && numMatches === 3) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " " + savedNums[i].bonusNum + " matched 3 + 1. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "200"
                            } else {
                                winningMessage += "100"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (!isBonusMatch && numMatches === 4) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " matched 4 + 0. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "500"
                            } else {
                                winningMessage += "100"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (isBonusMatch && numMatches === 4) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 4 + 1. Prize: $"
                            if (savedNums[i].gameName === "Mega Millions") {
                                winningMessage += "10000"
                            } else {
                                winningMessage += "50000"
                            }
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (!isBonusMatch && numMatches === 5) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " matched 5 + 0. Prize: $1000000"
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        } else if (isBonusMatch && numMatches === 5) {
                            winningMessage += "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 5 + 1. Prize: JACKPOT!"
                            messageList.push(winningMessage);
                            this.setState({modalVisible: true, modalMessage: messageList})
                        }


                    }
                }
            }
        }

    }


    render() {
        return (
            <View style={{alignSelf: "stretch", flex: 1, backgroundColor: "#f9f9f9"}}>
                <Header title="Winning Numbers" state = {this.state.loc} openDrawer={() => this.props.navigation.navigate('DrawerOpen')}/>
                <StatusBar hidden={true}/>

                {this.state.testData.length === 0 ?
                    <View style={{marginTop: 200, alignItems: 'center', justifyContent: 'center'}}><Image
                        source={require('./images/loading.gif')}/></View> : <ScrollView>
                            {this.state.testData.map((elem, index) =>
                                elem[0].showGame &&
                                <Results key={index} game={elem} navigate={this.props.navigation} state = {this.state.loc}></Results>
                            )}
                        </ScrollView>
                }

                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080'
                    }}>
                        <View style={{
                            backgroundColor: '#fff', padding: 20,
                            width: 300,
                            height: 300
                        }}>
                            <ScrollView>
                                <View style={{borderBottomColor: '#bbb', borderBottomWidth: 4,}}>
                                    <Text>You may have won
                                        on {this.state.testData.length > 0 && this.state.testData[0][0].date.split("T")[0]}!
                                        Check your numbers.</Text>
                                </View>
                                {this.state.modalMessage.map((elem, index) =>
                                    <View style={{
                                        borderBottomColor: '#bbb',
                                        borderBottomWidth: StyleSheet.hairlineWidth
                                    }}>
                                        <Text>{elem}</Text>
                                    </View>
                                )}

                            </ScrollView>
                            <Button title="Ok" onPress={() => {
                                this.setState({modalVisible: false})
                            }}/>
                        </View>

                    </View>

                </Modal>

            </View>
        );
    }
}



