import React, {Component} from 'react';
import {Icon} from 'react-native-elements'
import {AsyncStorage, Button, ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from "./Header"

let unsavedNums = {}
export default class WinningNumbers extends Component {
    static navigationOptions = {
        drawerLabel: 'My Saved Numbers',
        drawerIcon: () => (
            <Icon name='pound' type="material-community"/> ),
    };

    constructor(props) {
        super(props);
        this.state = {
            saveMegaMillionsGameVisible: false,
            savePowerBallGameVisible: false,
            myNums: this.initState(),
        };
    }

    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('MyGame');
            if (value !== null) {
                // We have data!!
                await this.setState({myNums: JSON.parse(value)})
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    async initState() {
        try {
            const value = await AsyncStorage.getItem('MyGame');
            if (value !== null) {
                // We have data!!
                await this.setState({myNums: JSON.parse(value)})
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    showMegaMillions() {
        this.setState({saveMegaMillionsGameVisible: true})
        unsavedNums = []
    }

    showPowerBall() {
        this.setState({savePowerBallGameVisible: true})
        unsavedNums = []
    }

    onChange(value, index) {
    value = value.length > 1 && value[0] === '0' ? value[1] : value
        unsavedNums[index] = value;
    }

    async saveGame(gameName) {
        let tempGame = {};
        let tempNums = [];
        if (unsavedNums["num0"]) tempNums.push(unsavedNums["num0"])
        if (unsavedNums["num1"]) tempNums.push(unsavedNums["num1"])
        if (unsavedNums["num2"]) tempNums.push(unsavedNums["num2"])
        if (unsavedNums["num3"]) tempNums.push(unsavedNums["num3"])
        if (unsavedNums["num4"]) tempNums.push(unsavedNums["num4"])
        if (tempNums.length > 0 || unsavedNums["bonusNum"]) {
            tempGame.gameName = gameName
            tempGame.nums = tempNums
            if (unsavedNums["bonusNum"]) tempGame.bonusNum = unsavedNums["bonusNum"]
        }
        let myGame;
        try {
            myGame = await AsyncStorage.getItem('MyGame');
            if (await myGame) {
                if (tempGame.gameName) {
                    let myGameList = JSON.parse(myGame);
                    myGameList.push(tempGame);
                    AsyncStorage.setItem('MyGame', JSON.stringify(myGameList));
                    await this.setState({myNums: myGameList})
                }
            } else {
                if (tempGame.gameName) {
                    let myGameList = [tempGame];
                    AsyncStorage.setItem('MyGame', JSON.stringify(myGameList))
                    await this.setState({myNums: myGameList})
                }
            }
        } catch (error) {
            console.log(error)
        }
        unsavedNums = []
        if (gameName === "Mega Millions")
            this.setState({saveMegaMillionsGameVisible: false})
        if (gameName === "Powerball")
            this.setState({savePowerBallGameVisible: false})
            this.setState({savePowerBallGameVisible: false})
    }

    clearGame() {
        AsyncStorage.removeItem('MyGame')
        unsavedNums = []
    }

    deleteGame(index) {
        let currentSavedGames = this.state.myNums;
        if (index > -1) {
            currentSavedGames.splice(index, 1);
        }
        this.setState({myNums: currentSavedGames})
        AsyncStorage.setItem('MyGame', JSON.stringify(currentSavedGames));
    }

    async showGames() {
        try {
            console.log(await AsyncStorage.getItem('MyGame'))

        } catch (error) {
            console.log("cannot show")
        }
    }

    render() {
        return (
            <View>
                <Header title="My Saved Numbers" openDrawer={() => this.props.navigation.navigate('DrawerOpen')}/>

                <StatusBar hidden={true}/>
                 <View style ={{justifyContent : 'space-around', flexDirection:'row'}}>
                 <View style = {{width: '50%', backgroundColor: '#5bc0de'}}>
                <Button style={{border:'1px solid black'}}
                    onPress={() => this.showMegaMillions()}
                    title="+ Mega Millions Game"
                    color="#5cb85c"
                    accessibilityLabel="Learn more about this purple button"
                />
                </View>
                <View style = {{width: '50%', backgroundColor: '#5bc0de'}}>
                <Button
                    onPress={() => this.showPowerBall()}
                    title="+ Powerball Game"
                    color="#5cb85c"
                    accessibilityLabel="Learn more about this purple button"
                />
                </View>
                </View>
                {this.state.saveMegaMillionsGameVisible && <View
                    style={{alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: '#000000'}}>
                    <Text style={styles.myText}>Mega Millions</Text>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num0")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num1")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num2")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num3")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />

                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num4")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.bonusCircle}
                            onChangeText={(text) => this.onChange(text, "bonusNum")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />


                        <Button
                            onPress={() => this.saveGame("Mega Millions")}
                            title="Save Game"
                            color="#5cb85c"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>}
                {this.state.savePowerBallGameVisible && <View
                    style={{alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: '#000000'}}>
                    <Text style={styles.myText}>Powerball</Text>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num0")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num1")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num2")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num3")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />

                        <TextInput
                            style={styles.circle}
                            onChangeText={(text) => this.onChange(text, "num4")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput
                            style={styles.bonusCircle}
                            onChangeText={(text) => this.onChange(text, "bonusNum")}
                            maxLength={2}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                        />


                        <Button
                            onPress={() => this.saveGame("Powerball")}
                            title="Save Game"
                            color="#5cb85c"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>}
                <ScrollView>
                    {this.state.myNums.length > 0 &&
                    this.state.myNums.map((elem, index) =>
                        <View key={index} style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            borderColor: '#000000'
                        }}>
                            <Text style={styles.myText}>{this.state.myNums[0].gameName}</Text>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}>
                                {elem.nums && elem.nums.map((num, index2) =>
                                    <Text key={index2}
                                          style={styles.circle}>{num[0] === "0" && num.length > 1 ? num[1] : num} </Text>
                                )}

                                {elem.bonusNum &&
                                <Text
                                    style={styles.bonusCircle}>{(elem.bonusNum[0] === "0" && elem.bonusNum.length > 1) ?
                                    elem.bonusNum[1] : elem.bonusNum}</Text>}

                            </View>
                            <Button
                                onPress={() => this.deleteGame(index)}
                                title="Delete"
                                color="#d9534f"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>)
                    }
                </ScrollView>
            </View>
        );
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
        borderRadius: 30,
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
        borderRadius: 30,
        backgroundColor: 'red',
    },
    bonusCircle2: {
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 45,
        width: 45,
        borderRadius: 30,
        backgroundColor: 'yellow',
    },
    extraStuff: {
        fontSize: 25
    }
});