import React, {Component} from 'react';
import {AsyncStorage, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements'
import Header from "./Header"
import nyGames from "./seeds/nySeeds"
import {
  AdMobBanner,
} from 'react-native-admob'

export default class MyLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myLocation: '',
        };
    }

    static navigationOptions = {
        drawerLabel: 'My Location',
        drawerIcon: () => (
            <Icon
                name='map-marker'
                type="material-community"/>
        ),
    };

    componentWillMount() {
        this.getLocation().then((data) => {
            this.setState({
                myLocation: data
            })
        }).catch((err) => console.log(err))

    }

    saveLocation(loc) {
        let selectedGames = []
        try {
            AsyncStorage.setItem('@MyLocation:key', loc);
            if (this.state.myLocation !== loc) {
                this.setState({
                    myLocation: loc
                })
                let list = [];

                if (loc.toLowerCase() === "az") {
                    list = nyGames['az']
                } else if(loc.toLowerCase() == 'ar') {
                list = nyGames['ar']
                } else if(loc.toLowerCase() == 'co') {
                list = nyGames['co']
                } else if(loc.toLowerCase() == 'ct') {
                list = nyGames['ct']
                } else if(loc.toLowerCase() == 'ca') {
                list = nyGames['ca']
                } else if(loc.toLowerCase() == 'de') {
                list = nyGames['de']
                } else if(loc.toLowerCase() == 'dc') {
                list = nyGames['dc']
                } else if(loc.toLowerCase() == 'fl') {
                list = nyGames['fl']
                } else if(loc.toLowerCase() == 'ga') {
                list = nyGames['ga']
                } else if(loc.toLowerCase() == 'id') {
                list = nyGames['id']
                } else if(loc.toLowerCase() == 'il') {
                list = nyGames['il']
                } else if(loc.toLowerCase() == 'in') {
                list = nyGames['in']
                } else if(loc.toLowerCase() == 'ia') {
                list = nyGames['ia']
                } else if(loc.toLowerCase() == 'ky') {
                list = nyGames['ky']
                } else if(loc.toLowerCase() == 'la') {
                list = nyGames['la']
                } else if(loc.toLowerCase() == 'me') {
                list = nyGames['me']
                } else if(loc.toLowerCase() == 'md') {
                list = nyGames['md']
                } else if(loc.toLowerCase() == 'ma') {
                list = nyGames['ma']
                } else if(loc.toLowerCase() == 'mi') {
                list = nyGames['mi']
                } else if(loc.toLowerCase() == 'mn') {
                list = nyGames['mn']
                } else if(loc.toLowerCase() == 'mo') {
                list = nyGames['mo']
                } else if(loc.toLowerCase() == 'mt') {
                list = nyGames['mt']
                } else if(loc.toLowerCase() == 'ne') {
                list = nyGames['ne']
                } else if(loc.toLowerCase() == 'nh') {
                list = nyGames['nh']
                } else if(loc.toLowerCase() == 'nj') {
                list = nyGames['nj']
                } else if(loc.toLowerCase() == 'nm') {
                list = nyGames['nm']
                } else if(loc.toLowerCase() == 'ny') {
                list = nyGames['ny']
                } else if(loc.toLowerCase() == 'nc') {
                list = nyGames['nc']
                } else if(loc.toLowerCase() == 'nd') {
                list = nyGames['nd']
                } else if(loc.toLowerCase() == 'oh') {
                list = nyGames['oh']
                } else if(loc.toLowerCase() == 'ok') {
                list = nyGames['ok']
                } else if(loc.toLowerCase() == 'or') {
                list = nyGames['or']
                } else if(loc.toLowerCase() == 'pa') {
                list = nyGames['pa']
                } else if(loc.toLowerCase() == 'ri') {
                list = nyGames['ri']
                } else if(loc.toLowerCase() == 'sc') {
                list = nyGames['sc']
                } else if(loc.toLowerCase() == 'sd') {
                list = nyGames['sd']
                } else if(loc.toLowerCase() == 'tn') {
                list = nyGames['tn']
                } else if(loc.toLowerCase() == 'tx') {
                list = nyGames['tx']
                } else if(loc.toLowerCase() == 'vt') {
                list = nyGames['vt']
                } else if(loc.toLowerCase() == 'va') {
                list = nyGames['va']
                } else if(loc.toLowerCase() == 'wa') {
                list = nyGames['wa']
                } else if(loc.toLowerCase() == 'wv') {
                list = nyGames['wv']
                } else if(loc.toLowerCase() == 'wi') {
                list = nyGames['wi']
                } else if(loc.toLowerCase() == 'wy') {
                list = nyGames['wy']
                }
                let selectedGames = [];
                list.map((elem, map) => {
                let temp = {};
                temp[elem] = true;
                    selectedGames.push(temp)
                })
                AsyncStorage.setItem('selectedGames', JSON.stringify(selectedGames))
            }
        } catch (error) {
            // Error saving data
            console.log("save error")
        }
        this.props.navigation.navigate("WinningNumbers")
    }

    async getLocation() {
        try {
            const value = await AsyncStorage.getItem('@MyLocation:key');

            if (value !== null) {
                // We have data!!
                return value
            }
        } catch (error) {
            // Error retrieving data
            console.log("error")
            return "CA";
        }
    }

    render() {
        return (

            <View style={{flex: 1, backgroundColor: "#f9f9f9"}}>
                <StatusBar hidden={true}/>
                <Header openDrawer={() => this.props.navigation.navigate('DrawerOpen')} title={"Select Your State"}/>
                <FlatList
                    data={[
                        {
                            key: 'Arizona',
                            ab: "AZ"
                        },

                        {
                            key: 'Arkansas',
                            ab: "AR"
                        },
                        {
                            key: 'California',
                            ab: "CA"
                        },
                        {
                            key: 'Colorado',
                            ab: "CO"
                        },
                        {
                            key: 'Connecticut',
                            ab: "CT"
                        },
                        {
                            key: 'Delaware',
                            ab: "DE"
                        },
                        {
                            key: 'District of Columbia',
                            ab: "DC"
                        },
                        {
                            key: 'Florida',
                            ab: "FL"
                        },
                        {
                            key: 'Georgia',
                            ab: "GA"
                        },
                        {
                            key: 'Idaho',
                            ab: "ID"
                        },
                        {
                            key: 'Illinois',
                            ab: "IL"
                        },
                        {
                            key: 'Indiana',
                            ab: "IN"
                        },
                        {
                            key: 'Iowa',
                            ab: "IA"
                        },
                        {
                            key: 'Kansas',
                            ab: "KS"
                        },
                        {
                            key: 'Kentucky',
                            ab: "KY"
                        },
                        {
                            key: 'Louisiana',
                            ab: "LA"
                        },
                        {
                            key: 'Maine',
                            ab: "ME"
                        },
                        {
                            key: 'Maryland',
                            ab: "MD"
                        },
                        {
                            key: 'Massachusetts',
                            ab: "MA"
                        },
                        {
                            key: 'Michigan',
                            ab: "MI"
                        },
                        {
                            key: 'Minnesota',
                            ab: "MN"
                        },
                        {
                            key: 'Mississippi',
                            ab: "MS"
                        },
                        {
                            key: 'Missouri',
                            ab: "MO"
                        },
                        {
                            key: 'Montana',
                            ab: "MT"
                        },
                        {
                            key: 'Nebraska',
                            ab: "NE"
                        },
                        {
                            key: 'New Hampshire',
                            ab: "NH"
                        },
                        {
                            key: 'New Jersey',
                            ab: "NJ"
                        },
                        {
                            key: 'New Mexico',
                            ab: "NM"
                        },
                        {
                            key: 'New York',
                            ab: "NY"
                        },
                        {
                            key: 'North Carolina',
                            ab: "NC"
                        },
                        {
                            key: 'North Dakota',
                            ab: "ND"
                        },
                        {
                            key: 'Ohio',
                            ab: "OH"
                        },
                        {
                            key: 'Oklahoma',
                            ab: "OK"
                        },
                        {
                            key: 'Oregon',
                            ab: "OR"
                        },
                        {
                            key: 'Pennsylvania',
                            ab: "PA"
                        },
                        {
                            key: 'Rhode Island',
                            ab: "RI"
                        },
                        {
                            key: 'South Carolina',
                            ab: "SC"
                        },
                        {
                            key: 'South Dakota',
                            ab: "SD"
                        },
                        {
                            key: 'Tennessee',
                            ab: "TN"
                        },
                        {
                            key: 'Texas',
                            ab: "TX"
                        },
                        {
                            key: 'Vermont',
                            ab: "VT"
                        },
                        {
                            key: 'Virginia',
                            ab: "VA"
                        },
                        {
                            key: 'Washington',
                            ab: "WA"
                        },
                        {
                            key: 'West Virginia',
                            ab: "WV"
                        },
                        {
                            key: 'Wisconsin',
                            ab: "WI"
                        },
                        {
                            key: 'Wyoming',
                            ab: "WY"
                        },
                    ]}
                    renderItem={({item}) => <TouchableOpacity style={{
                        backgroundColor: "#ffffff",
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        borderBottomColor: '#bbb',
                        borderBottomWidth: StyleSheet.hairlineWidth
                    }} onPress={() => this.saveLocation(item.ab)}>
                        <Text style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 10,
                            fontSize: 30,
                            marginTop: 5,
                        }}>{item.key}
                        </Text>
                        {this.state.myLocation === item.ab &&
                        <Icon name='check' type="material-community" color="#428bca"/>}
                    </TouchableOpacity>}
                />
                <AdMobBanner
                  adSize="banner"
                  adUnitID="ca-app-pub-3940256099942544/6300978111"
                  testDevices={[AdMobBanner.simulatorId]}
                  onAdFailedToLoad={error => console.error(error)}
                />
            </View>

        );
    }
}