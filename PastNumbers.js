import React, {Component} from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import PastResults from "./PastResultsView"
import Header from "./Header"
import {Icon} from 'react-native-elements'


export default class PastNumbers extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    }

    render() {
        const pastGame = this.props.navigation.state.params.game.slice(0,20);
        return (
            <View style={{alignSelf: "stretch", flex: 1, backgroundColor: "#f9f9f9"}}>

                <Header title="Past Numbers" state= {this.props.navigation.state.params.state} openDrawer={() => this.props.navigation.navigate('DrawerOpen')}/>
                <StatusBar hidden={true}/>
                {pastGame.length === 0 ?
                    <View style={{marginTop: 200, alignItems: 'center', justifyContent: 'center'}}><Image
                        source={require('./images/loading.gif')}/></View> : <ScrollView>
                        {pastGame.map((elem, index) =>
                            <PastResults key={index} game={elem}></PastResults>
                        )}

                    </ScrollView>
                }
            </View>
        );
    }
}



