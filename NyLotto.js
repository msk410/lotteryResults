import React, { Component } from 'react';
import {Text, AppRegistry, Alert, TouchableOpacity,TextInput, Image ,StyleSheet, View, ScrollView } from 'react-native';
import Game from "./Game";
export default class NyLotto extends Component {

    constructor(props) {
        super(props);
          this.state = {
            nyLottories: []
          };

    }


     async componentWillMount() {
            try {
                let lottoData = [];
                //powerball
                const response1 = await fetch(`https://data.ny.gov/resource/8vkr-v8vh.json`, {
                    method: "GET",
                });
                let powerballData = await response1.json();
                let nums1 = [];
                powerballData.map((elem, index) => {
                    let tempGame = new Game("Powerball", elem.draw_date, elem.winning_numbers.split(" ").splice(0, 5),
                        elem.winning_numbers.split(" ")[5], elem.multiplier, " x ")
                    nums1.push(tempGame);
                })

                //megamillions
                const response2 = await fetch(`https://data.ny.gov/resource/h6w8-42p9.json`, {
                    method: "GET",
                });
                let megaMillionsData = await response2.json();
                let nums2 = [];
                megaMillionsData.map((elem, index) => {
                    let tempGame = new Game("Mega Millions", elem.draw_date, elem.winning_numbers.split(" "),
                        elem.mega_ball, elem.multiplier, " x ")
                    nums2.push(tempGame);
                })

                //cash 4 life
                const response3 = await fetch(`https://data.ny.gov/resource/7pxf-c5iz.json`, {
                    method: "GET",
                });
                let c4lData = await response3.json();
                let nums3 = [];
                c4lData.map((elem, index) => {
                    let tempGame = new Game("Cash 4 Life", elem.draw_date, elem.winning_numbers.split(" "),
                        elem.cash_ball, "", "")
                    nums3.push(tempGame);
                })
                const response4 = await fetch(`https://data.ny.gov/resource/etu4-7qqz.json`, {
                    method: "GET",
                });
                let nyLotto = await response4.json();
                let nums4 = [];
                nyLotto.map((elem, index) => {
                    let tempGame = new Game("New York Lotto", elem.draw_date, elem.winning_numbers.split(" "),
                        elem.bonus, "", "")
                    nums4.push(tempGame);
                })
                const response5 = await fetch(`https://data.ny.gov/resource/hh4x-xmbw.json`, {
                    method: "GET",
                });
                let take5 = await response5.json();
                let nums5 = [];
                take5.map((elem, index) => {
                    let tempGame = new Game("Take 5", elem.draw_date, elem.winning_numbers.split(" "),
                        "", "", "")
                    nums5.push(tempGame);
                })
                const response6 = await fetch(`https://data.ny.gov/resource/iy3t-z4bs.json`, {
                    method: "GET",
                });
                let dailyNumbers = await response6.json();
                let nums6 = [];
                let nums7 = [];
                let nums8 = [];
                let nums9 = [];
                dailyNumbers.map((elem, index) => {
                    let tempGame = new Game("NUMBERS Midday", elem.draw_date, [elem.midday_daily[0], elem.midday_daily[1], elem.midday_daily[2]],
                        "", elem.midday_daily_sum, " Lucky Sum: ")
                    let tempGame2 = new Game("NUMBERS Evening", elem.draw_date, [elem.evening_daily[0], elem.evening_daily[1], elem.evening_daily[2]],
                    "", elem.evening_daily_sum, " Lucky Sum: ")
                    let tempGame3 = new Game("Win4 Midday", elem.draw_date, [elem.midday_win_4[0], elem.midday_win_4[1], elem.midday_win_4[2], elem.midday_win_4[3]],
                        "", elem.midday_win_4_sum, " Lucky Sum: ")
                    let tempGame4 = new Game("Win4 Evening", elem.draw_date, [elem.evening_win_4[0], elem.evening_win_4[1], elem.evening_win_4[2], elem.evening_win_4[3]],
                        "", elem.evening_win_4_sum, " Lucky Sum: ")
                    nums6.push(tempGame);
                    nums7.push(tempGame2);
                    nums8.push(tempGame3);
                    nums9.push(tempGame4);

                })
                //TODO: need to do quick draw

                const response7 = await fetch(`https://data.ny.gov/resource/r9pz-ziyb.json`, {
                    method: "GET",
                });
                let pick10 = await response7.json();
                let nums10 = [];
                pick10.map((elem, index) => {
                    let tempGame = new Game("Pick 10", elem.draw_date, elem.winning_numbers.split(" "),
                        "", "", "")
                    nums10.push(tempGame);
                })

                lottoData.push(nums2);
                lottoData.push(nums1);
                lottoData.push(nums4);
                lottoData.push(nums3);
                lottoData.push(nums5);
                lottoData.push(nums6);
                lottoData.push(nums7);
                lottoData.push(nums8);
                lottoData.push(nums9);
                lottoData.push(nums10);

                this.setState({
                    nyLottories: lottoData
                })
            }
            catch (err) {
                console.log(err);
            }

        }
  render() {
    return (
<ScrollView>
<TouchableOpacity>

<View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 30, backgroundColor: 'pink'}}>
<Text>{this.state.nyLottories.length === 0 ? "emppty" : this.state.nyLottories[0][0].date}</Text>
 </View>
 </TouchableOpacity>
</ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  bigblue: {
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  circle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    width: 30,
    borderRadius: 30 ,
    backgroundColor: 'blue'
  }
});