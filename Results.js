import React, {Component} from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PastNumbers from "./PastNumbers"
export default class Results extends Component {


    getDate() {
    if(this.props.game[0].date === "") {
        return ""
    }
        let date = this.props.game[0].date.split("T")[0];
        let d = new Date(date);
        let day = d.getDay()-1;
        let dayOfWeek = "";
        switch(day) {
            case 0:
                dayOfWeek = "Mon, ";
                break;
            case 1:
                dayOfWeek = "Tues, ";
                break;
            case 2:
                dayOfWeek = "Wed, ";
                break;
            case 3:
                dayOfWeek = "Thurs, ";
                break;
            case 4:
                dayOfWeek = "Fri, ";
                break;
            case 5:
                dayOfWeek = "Sat, ";
                break;
            case 6:
                dayOfWeek = "Sun, ";
                break;
             default:
                dayOfWeek = "";
                break;
        }
        return dayOfWeek + date
    }

    render() {
        return (
            <View  style = {{alignItems: 'center', justifyContent:'center', borderWidth: 0.5,  borderColor: '#000000' }}>
                <Text style = {styles.myText}>{this.props.game[0].name} {this.getDate()}</Text>

                        <View style ={{alignItems: 'center', justifyContent:'center', flexDirection:'row', flexWrap:'wrap'}}>
                    {this.props.game[0].winningNumbers.map((elem, index) =>
                        <Text key = {index} style = {styles.circle}>{elem[0] === "0" && elem.length > 1 ? elem[1] : elem} </Text>
                    )}
                    {this.props.game[0].bonus.length != 0 ?
                    <Text style={ styles.bonusCircle}>
                        {this.props.game[0].bonus[0] === "0" && this.props.game[0].bonus.length > 1 ?
                         this.props.game[0].bonus[1] : this.props.game[0].bonus}
                                        </Text> : <Text/>}
                    </View>
                    <View style ={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Text >{"\n"}</Text><Text style ={styles.extraStuff}>{this.props.game[0].extraText}</Text>
                        <Text style = {styles.extraStuff}>{this.props.game[0].extra[0] === "0" && this.props.game[0].extra.length > 1 ? this.props.game[0].extra[1] : this.props.game[0].extra }</Text>
                    </View>

                <TouchableOpacity  onPress={() => this.props.navigate.navigate('PastNumbers', {game : this.props.game, state:this.props.state})}>
                    <Text style = {{color: "#838383"}}>Tap here to see past winning numbers</Text>
                </TouchableOpacity>
            </View>
        )
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
       height: 50,
       width: 50,
       borderRadius: 30 ,
       backgroundColor: 'white',
       paddingLeft: 5,
       borderWidth: 0.5,
       borderColor: '#000000',
     },
       bonusCircle: {
            fontSize: 25,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 50,
            width: 50,
            borderRadius: 30 ,
            backgroundColor: 'red',
          },
          extraStuff: {
                      fontSize: 25
                    }
});