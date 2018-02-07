import React, {Component} from 'react';
import {AsyncStorage, Button, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Results from "./Results"
import Testing from "./Testing"
import Header from "./Header"
import TexasScraper from "./TexasScraper"
import {Icon} from 'react-native-elements'
import CaliScraper from "./scrapers/CaliScraper"
import LottoData from "./LottoData"
import ConnecticutScraper from "./scrapers/ConnecticutScraper";
import DCScraper from "./scrapers/DCScraper";
import FloridaScraper from "./scrapers/FloridaScraper";


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
            if (value !== null && value != oldState) {
                // We have data!!
                let lottoData = new LottoData();
                let url = "http://192.168.1.82:8080"
                let gameInfo = [];
                this.setState({
                loc: "(" + value + ")"
                })
                if (value === "AZ") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'the pick', 'pick 3',
                    'all or nothing morning', 'fantasy 5', 'all or nothing evening', '5 card cash'], 'az');
                } else if (value === "AR") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'natural state jackpot', 'cash 3 midday',
                    'cash 3 evening', 'cash 4 midday', 'cash 4 evening', 'lucky for life'], 'ar');
//                } else if (value === "CA") {
//                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'super lotto plus', 'daily 3 midday',
//                    'daily 3 evening', 'fantasy 5', 'daily 4'], 'ca');
                } else if (value === "CO") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'pick 3 midday',
                    'pick 3 evening', 'lotto', 'cash 5'], 'co');
                } else if (value === "CT") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'play 3 day',
                    'play 3 night', 'play 4 day', 'play 4 night', 'lucky links day', 'lucky links night', 'lotto!', 'cash 5'], 'ct');
                } else if (value === "DE") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america',
                    'play 3 day', 'play 3 night', 'play 4 day', 'play 4 night', 'multi win'], 'de');
                } else if (value === "DC") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'dc-5 midday',
                        'dc-5 evening', 'dc-4 midday', 'dc-4 evening', 'dc-3 midday', 'dc-3 evening'], 'dc');
//                } else if (value === "FL") {
//                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'pick 5 midday',
//                        'pick 5 evening', 'pick 4 midday', 'pick 4 evening', 'pick 3 midday', 'pick 3 evening', 'pick 2 midday',
//                        'pick 2 evening', 'lucky money', 'lotto', 'fantasy 5'], 'fl');
//                } else if (value === "GA") {
//                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'all or nothing morning', 'all or nothing day',
//                        'all or nothing evening', 'all or nothing night', 'georgia five midday', 'georgia five evening', 'cash 4 midday', 'cash 4 evening','cash 4 night', 'cash 3 midday',
//                        'cash 3 evening', 'cash 3 night', 'jumbo bucks lotto', 'fantasy 5', '5 card cash'], 'ga');
                } else if (value === "ID") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', 'weekly grand', 'pick 3 day',
                    'pick 3 night', 'idaho cash'], 'id');
                } else if (value === "IL") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky day lotto midday', 'lucky day lotto evening', 'pick 4 midday',
                    'pick 4 evening','pick 3 midday', 'pick 3 evening',  'lotto'], 'il');
                } else if (value === "IN") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'quick draw midday', 'quick draw evening',
                     'daily 4 midday', 'daily 4 evening', 'daily 3 midday', 'daily 3 evening', 'hoosier lotto', 'cash 5'], 'in');
                } else if (value === "IA") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', 'pick 4 midday',
                     'pick 4 evening', 'pick 3 midday', 'pick 3 evening'], 'ia');
                } else if (value === "KS") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', '2by2',
                     'super kansas cash', 'pick 3 midday', 'pick 3 evening'], 'ks');
                } else if (value === "KY") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'pick 4 midday', 'pick 4 evening',
                     'pick 3 midday', 'pick 3 evening', 'cash ball', '5 card cash'], 'ky');
                } else if (value === "LA") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','pick 4', 'pick 3', 'lotto', 'easy 5'], 'la');
                } else if (value === "ME") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','megabucks plus', 'lucky for life', 'lotto america',
                    'gimme 5', 'world poker tour', 'pick 4 day', 'pick 4 eve', 'pick 3 day', 'pick 3 eve'], 'me');
                } else if (value === "MD") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','cash 4 life', 'pick 4 midday', 'pick 4 evening',
                     'pick 3 midday', 'pick 3 evening', 'multi match', 'bonus match 5', '5 card cash'], 'md');
                } else if (value === "MA") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','lucky for life', 'numbers game midday', 'numbers game evening',
                     'megabucks doubler', 'mass cash'], 'ma');
                } else if (value === "MI") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','lucky for life', 'daily 4 midday', 'daily 4 evening',
                     'daily 3 midday', 'daily 3 evening','keno!', 'fantasy 5', 'classic lotto 47'], 'mi');
                } else if (value === "MN") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions','lucky for life','lotto america','north star cash',
                    'gopher 5', 'daily 3'], 'mn');
                } else if (value === "MS") {
                    gameInfo = await lottoData.getAllData(url, ['mega millions','pick 3 midday', 'pick 3 evening', 'pick 4 midday' , 'pick 4 evening'], 'ms');
                } else if (value === "MO") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'show me cash', 'lotto', 'pick 3 midday',
                     'pick 3 evening', 'pick 4 midday' , 'pick 4 evening'], 'mo');
                } else if (value === "MT") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', 'montana cash','big sky bonus'], 'mt');
                } else if (value === "NE") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', '2by2', 'pick 5','pick 3', 'my day'], 'ne');
                } else if (value === "NH") {
                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'megabucks', 'lucky for life', 'gimme 5',
                    'pick 3 day', 'pick 3 evening', 'pick 4 day', 'pick 4 evening'], 'nh');
//                } else if (value === "NJ") {
//                    gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'pick 6 xtra', 'gimme 5',
//                    'pick 3 day', 'pick 3 evening', 'pick 4 day', 'pick 4 evening'], 'nj');
//                } else if (value === "NM") {
//                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lotto america', 'roadrunner cash', 'pick 3 midday',
//                        'pick 3 evening'], 'nm');
                } else if (value === "NY") {
                      gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'ny lotto', 'win 4 midday', 'win 4 evening',
                      'take 5', 'pick 10', 'numbers midday', 'numbers evening'], 'ny');
               } else if (value === "NC") {
                      gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'pick 4 daytime', 'pick 4 evening',
                      'pick 3 daytime', 'pick 3 evening','cash 5'], 'nc');
               } else if (value === "ND") {
                      gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', '2by2'], 'nd');
//               } else if (value === "OH") {
//                      gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'pick 5 midday', 'pick 5 evening',
//                      'rolling cash 5', 'pick 4 midday', 'pick 4 evening', 'pick 3 midday', 'pick 3 evening', 'classic lotto'], 'oh');
               } else if (value === "OK") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lotto america', 'poker pick', 'pick 3',
                     'cash 5'], 'ok');
               } else if (value === "OR") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'win for life', 'pick 4 1pm', 'pick 4 4pm',
                     'pick 4 7pm', 'pick 4 10pm', 'megabucks', 'lucky lines'], 'or');
               } else if (value === "PA") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'treasure hunt', 'match 6', 'cash 5',
                     'pick 5 midday', 'pick 5 evening', 'pick 4 midday', 'pick 4 evening', 'pick 3 midday', 'pick 3 evening',
                      'pick 2 midday', 'pick 2 evening'], 'pa');
               } else if (value === "RI") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'wild money',
                     'the numbers midday', 'the numbers evening'], 'ri');
               } else if (value === "SC") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'pick 4 midday', 'pick 4 evening',
                     'pick 3 midday', 'pick 3 evening', 'palmetto cash 5'], 'sc');
               } else if (value === "SD") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lucky for life', 'lotto america', 'dakota cash'], 'sd');
               } else if (value === "TN") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lotto america', 'cash 4 life', 'tennessee cash',
                     'cash 4 morning', 'cash 4 mid-day', 'cash 4 evening', 'cash 3 morning', 'cash 3 mid-day', 'cash 3 evening'], 'tn');
               } else if (value === "TX") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'texas two step', 'texas triple chance','lotto texas',
                      'daily 4 morning', 'daily 4 day', 'daily 4 evening', 'daily 4 night','pick 3 morning', 'pick 3 day', 'pick 3 evening', 'pick 3 night',
                     'all or nothing morning', 'all or nothing day', 'all or nothing evening', 'all or nothing night', 'cash 5'], 'tx');
               } else if (value === "VT") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'megabucks', 'lucky for life', 'gimme 5',
                     'pick 4 day', 'pick 4 evening', 'pick 3 day', 'pick 3 evening'], 'vt');
               } else if (value === "VA") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cash 4 life', 'pick 4 day', 'pick 4 night',
                     'pick 3 day', 'pick 3 night', 'cash 5 day', 'cash 5 night', 'bank a million'], 'va');
               } else if (value === "WA") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'match 4', 'lotto', 'daily keno', 'hit 5', 'the daily game'], 'wa');
//               } else if (value === "WV") {
//                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'lotto america', 'daily 4', 'daily 3', 'cash 25'], 'wv');
               } else if (value === "WI") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'megabucks', 'super cash', 'pick 4', 'pick 3',
                     'badger 5', '5 card cash'], 'wi');
               } else if (value === "WY") {
                     gameInfo = await lottoData.getAllData(url, ['powerball', 'mega millions', 'cowboy draw'], 'wy');
               }

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

            } else if(value === oldState) {
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



