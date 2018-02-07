import * as $ from "jquery";
import Game from "../Game"
export default class CaliScraper {

     async getAllData() {
        let caliGames = [];
        try {

        let rawData = await fetch('http://www.powerball.com/powerball/winnums-text.txt', {
                        method: "GET",
                        });

                rawData = await rawData.text();
                let re2 = /\d\d\/\d\d\/\d\d\d\d/g
                let re = /  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]/g

                let numbersRaw;
                let dateRaw;
                let powerballData = [];
      //         do {
      for(let i = 0; i < 20; i++) {
                   let tempGame = new Game();
                   tempGame.name = "Powerball"
                    numbersRaw = re.exec(rawData);
                    dateRaw = re2.exec(rawData);
                    tempGame.bonus = "";
                    tempGame.extra = "";
                    tempGame.extraText = "";
                   if (numbersRaw && dateRaw) {
                    let d = new Date(dateRaw[0]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"

                    tempGame.date = formatedDate;
                    let formattedNums = numbersRaw[0].trim().split("  ").slice(0,5);
                    formattedNums.sort();
                    tempGame.winningNumbers = formattedNums
                    tempGame.bonus = numbersRaw[0].trim().split("  ")[5];
                    tempGame.extra  = numbersRaw[0].trim().split("  ")[6];
                    tempGame.extraText = "Power Play x "
                    powerballData.push(tempGame);
                   }
                 // console.log(tempGame)
            //    } while (numbersRaw && dateRaw);
            }
                 caliGames.push(powerballData);

                const response2 = await fetch(`https://data.ny.gov/resource/h6w8-42p9.json`, {
                    method: "GET",
                });
                let megaMillionsData = await response2.json();
                let megaMillions = [];
                megaMillionsData.map((elem, index) => {
                    let tempGame = new Game("Mega Millions", elem.draw_date, elem.winning_numbers.split(" "),
                        elem.mega_ball, elem.multiplier, " Megaplier x ")
                    megaMillions.push(tempGame);
                })
                caliGames.push(megaMillions);

        rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('http://www.calottery.com/play/draw-games/superlotto-plus/winning-numbers') + '&callback=?', {
                method: "GET",
                });
        rawData = await rawData.text();
         re2 = /([a-zA-Z]{3} [\d]+, [\d]{4}) - [\d]{4}/g
         re = /<td><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span>/g
         let bonusRe = /<td class="center">([\d]+)/g

         numbersRaw;
         dateRaw;
        let superLottoPlus = [];
    //   do {
    for(let index = 0; index < 20; index++) {
           let tempGame = new Game();
           tempGame.name = "SuperLotto Plus"
            numbersRaw = re.exec(rawData);
            dateRaw = re2.exec(rawData);
            let bonusRaw = bonusRe.exec(rawData);
            tempGame.bonus = "";
            tempGame.extra = "";
            tempGame.extraText = "";
           if (numbersRaw && dateRaw) {

            let d = new Date(dateRaw[1]);
            let month = d.getMonth() + 1;
            let date = d.getDate();
            month <= 9 ? month = "0" + (month).toString() : month = month;
            date <= 9 ? date = "0" + (date).toString() : date = date
            let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
            tempGame.date = formatedDate;
            tempGame.bonus = bonusRaw[1]
            let formattedNums = [];
            for(let i = 1; i < 6; i++) {
                formattedNums.push(numbersRaw[i])
            }
             formattedNums.sort();
            tempGame.winningNumbers = formattedNums;
            superLottoPlus.push(tempGame);
           }
   //     } while (numbersRaw && dateRaw);
   }
         caliGames.push(superLottoPlus);

        rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('http://www.calottery.com/play/draw-games/fantasy-5/winning-numbers') + '&callback=?', {
                        method: "GET",
                        });
                rawData = await rawData.text();
                 re2 = /([a-zA-Z]{3} [\d]+, [\d]{4}) - [\d]+/g
                 re = /<td><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span>/g

                 numbersRaw;
                 dateRaw;
                let fantasy5data = [];
            //   do {
            for(let index = 0; index < 20; index++) {
                   let tempGame = new Game();
                   tempGame.name = "Fantasy 5"
                    numbersRaw = re.exec(rawData);
                    dateRaw = re2.exec(rawData);
                    let bonusRaw = bonusRe.exec(rawData);
                    tempGame.bonus = "";
                    tempGame.extra = "";
                    tempGame.extraText = "";
                   if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for(let i = 1; i < 6; i++) {
                        formattedNums.push(numbersRaw[i])
                    }
                     formattedNums.sort();
                    tempGame.winningNumbers = formattedNums;
                    fantasy5data.push(tempGame);
                   }
           //     } while (numbersRaw && dateRaw);
           }
                 caliGames.push(fantasy5data);


            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('http://www.calottery.com/play/draw-games/daily-3/winning-numbers') + '&callback=?', {
                            method: "GET",
                            });
                    rawData = await rawData.text();
                     re2 = /([a-zA-Z]{3} [\d]+, [\d]{4}) - [\d]+ ([\w]+)/g
                     re = /<td><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span>/g

                     numbersRaw;
                     dateRaw;
                    let daily3 = [];
                //   do {
                for(let index = 0; index < 20; index++) {
                       let tempGame = new Game();

                        numbersRaw = re.exec(rawData);
                        dateRaw = re2.exec(rawData);
                        tempGame.bonus = "";
                        tempGame.extra = "";
                        tempGame.extraText = "";
                       tempGame.name = "Daily 3 " + dateRaw[2];
                       if (numbersRaw && dateRaw) {

                        let d = new Date(dateRaw[1]);
                        let month = d.getMonth() + 1;
                        let date = d.getDate();
                        month <= 9 ? month = "0" + (month).toString() : month = month;
                        date <= 9 ? date = "0" + (date).toString() : date = date
                        let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                        tempGame.date = formatedDate;
                        let formattedNums = [];
                        for(let i = 1; i < 4; i++) {
                            formattedNums.push(numbersRaw[i])
                        }
                        tempGame.winningNumbers = formattedNums;
                        daily3.push(tempGame);
                       }
               //     } while (numbersRaw && dateRaw);
               }
                     caliGames.push(daily3);

               rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('http://www.calottery.com/play/draw-games/daily-4/winning-numbers') + '&callback=?', {
                           method: "GET",
                           });
                   rawData = await rawData.text();
                    re2 = /([a-zA-Z]{3} [\d]+, [\d]{4}) - [\d]+/g
                    re = /<td><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span><span>([\d]+)<\/span>/g

                    numbersRaw;
                    dateRaw;
                   let daily4 = [];
               //   do {
               for(let index = 0; index < 20; index++) {
                      let tempGame = new Game();

                       numbersRaw = re.exec(rawData);
                       dateRaw = re2.exec(rawData);
                       tempGame.bonus = "";
                       tempGame.extra = "";
                       tempGame.extraText = "";
                      tempGame.name = "Daily 4 ";
                      if (numbersRaw && dateRaw) {

                       let d = new Date(dateRaw[1]);
                       let month = d.getMonth() + 1;
                       let date = d.getDate();
                       month <= 9 ? month = "0" + (month).toString() : month = month;
                       date <= 9 ? date = "0" + (date).toString() : date = date
                       let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                       tempGame.date = formatedDate;
                       let formattedNums = [];
                       for(let i = 1; i < 5; i++) {
                           formattedNums.push(numbersRaw[i])
                       }
                       tempGame.winningNumbers = formattedNums;
                       daily4.push(tempGame);
                      }
              //     } while (numbersRaw && dateRaw);
              }
                    caliGames.push(daily4);

               rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('http://www.calottery.com/play/draw-games/daily-derby/winning-numbers') + '&callback=?', {
                                          method: "GET",
                                          });
                                  rawData = await rawData.text();
                                   re2 = /([a-zA-Z]{3} [\d]+, [\d]{4}) - [\d]+/g
                                   re = /<strong>([\d]+) - [\w]+ [\w]+<\/strong>/g

                                   numbersRaw;
                                   dateRaw;
                                  let dailyDerby = [];
                              //   do {
                              for(let index = 0; index < 20; index++) {
                                     let tempGame = new Game();

                                      numbersRaw = re.exec(rawData)
                                      dateRaw = re2.exec(rawData);
                                      tempGame.bonus = "";
                                      tempGame.extra = "";
                                      tempGame.extraText = "";
                                     tempGame.name = "Daily Derby ";
                                     if (numbersRaw && dateRaw) {

                                      let d = new Date(dateRaw[1]);
                                      let month = d.getMonth() + 1;
                                      let date = d.getDate();
                                      month <= 9 ? month = "0" + (month).toString() : month = month;
                                      date <= 9 ? date = "0" + (date).toString() : date = date
                                      let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                                      tempGame.date = formatedDate;
                                      let formattedNums = [];
                                      formattedNums.push(numbersRaw[1])
                                      numbersRaw = re.exec(rawData);
                                      formattedNums.push(numbersRaw[1]);
                                      numbersRaw = re.exec(rawData);
                                      formattedNums.push(numbersRaw[1]);
                                      tempGame.winningNumbers = formattedNums;
                                      dailyDerby.push(tempGame);
                                     }
                             //     } while (numbersRaw && dateRaw);
                             }
                                   caliGames.push(dailyDerby);
                        } catch (err) {
                        console.log(err + "error");
     }
        return caliGames;
    }

}