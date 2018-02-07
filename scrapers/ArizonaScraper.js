import Game from "../Game"

export default class ArizonaScraper {

    async getAllData() {
        let arizonaGames = [];
        try {

            let rawData = await
                fetch('http://192.168.1.74:8080/az/powerball', {
                    method: "GET",
                });

               let powerballData = await rawData.json();
               arizonaGames.push(powerballData)

//            rawData = await
//                rawData.text();
//            let re2 = /\d\d\/\d\d\/\d\d\d\d/g
//            let re = /  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]/g
//
//            let numbersRaw;
//            let dateRaw;
//            let powerballData = [];
//            //         do {
//            for (let i = 0; i < 20; i++) {
//                let tempGame = new Game();
//                tempGame.name = "Powerball"
//                numbersRaw = re.exec(rawData);
//                dateRaw = re2.exec(rawData);
//                tempGame.bonus = "";
//                tempGame.extra = "";
//                tempGame.extraText = "";
//                if (numbersRaw && dateRaw) {
//                    let d = new Date(dateRaw[0]);
//                    let month = d.getMonth() + 1;
//                    let date = d.getDate();
//                    month <= 9 ? month = "0" + (month).toString() : month = month;
//                    date <= 9 ? date = "0" + (date).toString() : date = date
//                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
//
//                    tempGame.date = formatedDate;
//                    let formattedNums = numbersRaw[0].trim().split("  ").slice(0, 5);
//                    formattedNums.sort();
//                    tempGame.winningNumbers = formattedNums
//                    tempGame.bonus = numbersRaw[0].trim().split("  ")[5];
//                    tempGame.extra = numbersRaw[0].trim().split("  ")[6];
//                    tempGame.extraText = "Power Play x "
//                    powerballData.push(tempGame);
//                }
//                // console.log(tempGame)
//                //    } while (numbersRaw && dateRaw);
//            }
//            arizonaGames.push(powerballData);
//
//            const response2 = await
//                fetch(`https://data.ny.gov/resource/h6w8-42p9.json`, {
//                    method: "GET",
//                });
//            let megaMillionsData = await
//                response2.json();
//            let megaMillions = [];
//            megaMillionsData.map((elem, index) => {
//                let tempGame = new Game("Mega Millions", elem.draw_date, elem.winning_numbers.split(" "),
//                    elem.mega_ball, elem.multiplier, " Megaplier x ")
//                megaMillions.push(tempGame);
//            })
//            arizonaGames.push(megaMillions);
//
//
//            rawData = await fetch('localhost:8080/az/5 card cash', {
//                method: "GET",
//            });
//            rawData = await rawData.text();
//            re2 = /"gridcell">([\d]+\/[\d]+\/[\d]{4})/g
//            re = /"gridcell">([\d|\w][\w]-[\d|\w][\w]-[\d|\w][\w]-[\d|\w][\w]-[\d|\w][\w])/g
//            numbersRaw;
//            dateRaw;
//            let fiveCardCash = [];
//            //   do {
//            for (let index = 0; index < 20; index++) {
//                let tempGame = new Game();
//
//                numbersRaw = re.exec(rawData)
//                dateRaw = re2.exec(rawData);
//                tempGame.bonus = "";
//                tempGame.extra = "";
//                tempGame.extraText = "";
//                tempGame.name = "5 Card Cash ";
//                if (numbersRaw && dateRaw) {
//
//                    let d = new Date(dateRaw[1]);
//                    let month = d.getMonth() + 1;
//                    let date = d.getDate();
//                    month <= 9 ? month = "0" + (month).toString() : month = month;
//                    date <= 9 ? date = "0" + (date).toString() : date = date
//                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
//                    tempGame.date = formatedDate;
//                    let formattedNums = [];
//                    formattedNums = numbersRaw[1].split("-")
//                    tempGame.winningNumbers = formattedNums;
//                    fiveCardCash.push(tempGame);
//                }
//                //     } while (numbersRaw && dateRaw);
//            }
//            arizonaGames.push(fiveCardCash);
//
//            rawData = await fetch('localhost:8080/az/the pick', {
//                method: "GET",
//            });
//            rawData = await rawData.text();
//            re2 = /"gridcell">([\d]+\/[\d]+\/[\d]{4})/g
//            re = /"gridcell">([\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+)/g
//            numbersRaw;
//            dateRaw;
//            let thePick = [];
//            //   do {
//            for (let index = 0; index < 20; index++) {
//                let tempGame = new Game();
//
//                numbersRaw = re.exec(rawData)
//                dateRaw = re2.exec(rawData);
//                tempGame.bonus = "";
//                tempGame.extra = "";
//                tempGame.extraText = "";
//                tempGame.name = "The Pick ";
//                if (numbersRaw && dateRaw) {
//
//                    let d = new Date(dateRaw[1]);
//                    let month = d.getMonth() + 1;
//                    let date = d.getDate();
//                    month <= 9 ? month = "0" + (month).toString() : month = month;
//                    date <= 9 ? date = "0" + (date).toString() : date = date
//                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
//                    tempGame.date = formatedDate;
//                    let formattedNums = [];
//                    formattedNums = numbersRaw[1].split("-")
//                    tempGame.winningNumbers = formattedNums;
//                    thePick.push(tempGame);
//                }
//                //     } while (numbersRaw && dateRaw);
//            }
//            arizonaGames.push(thePick);
//            rawData = await fetch('localhost:8080/az/fantasy 5', {
//                method: "GET",
//            });
//            rawData = await rawData.text();
//            re2 = /"gridcell">([\d]+\/[\d]+\/[\d]{4})/g
//            re = /"gridcell">([\d]+-[\d]+-[\d]+-[\d]+-[\d]+)/g
//            numbersRaw;
//            dateRaw;
//            let fantasyFive = [];
//            //   do {
//            for (let index = 0; index < 20; index++) {
//                let tempGame = new Game();
//
//                numbersRaw = re.exec(rawData)
//                dateRaw = re2.exec(rawData);
//                tempGame.bonus = "";
//                tempGame.extra = "";
//                tempGame.extraText = "";
//                tempGame.name = "Fantasy 5 ";
//                if (numbersRaw && dateRaw) {
//
//                    let d = new Date(dateRaw[1]);
//                    let month = d.getMonth() + 1;
//                    let date = d.getDate();
//                    month <= 9 ? month = "0" + (month).toString() : month = month;
//                    date <= 9 ? date = "0" + (date).toString() : date = date
//                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
//                    tempGame.date = formatedDate;
//                    let formattedNums = [];
//                    formattedNums = numbersRaw[1].split("-")
//                    tempGame.winningNumbers = formattedNums;
//                    fantasyFive.push(tempGame);
//                }
//                //     } while (numbersRaw && dateRaw);
//            }
//            arizonaGames.push(fantasyFive);
//            rawData = await fetch('localhost:8080/az/pick-3', {
//                method: "GET",
//            });
//            rawData = await rawData.text();
//            re2 = /"gridcell">([\d]+\/[\d]+\/[\d]{4})/g
//            re = /"gridcell">([\d]+-[\d]+-[\d]+)/g
//            numbersRaw;
//            dateRaw;
//            let pickThree = [];
//            //   do {
//            for (let index = 0; index < 20; index++) {
//                let tempGame = new Game();
//
//                numbersRaw = re.exec(rawData)
//                dateRaw = re2.exec(rawData);
//                tempGame.bonus = "";
//                tempGame.extra = "";
//                tempGame.extraText = "";
//                tempGame.name = "Pick 3 ";
//                if (numbersRaw && dateRaw) {
//
//                    let d = new Date(dateRaw[1]);
//                    let month = d.getMonth() + 1;
//                    let date = d.getDate();
//                    month <= 9 ? month = "0" + (month).toString() : month = month;
//                    date <= 9 ? date = "0" + (date).toString() : date = date
//                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
//                    tempGame.date = formatedDate;
//                    let formattedNums = [];
//                    formattedNums = numbersRaw[1].split("-")
//                    tempGame.winningNumbers = formattedNums;
//                    pickThree.push(tempGame);
//                }
//                //     } while (numbersRaw && dateRaw);
//            }
//            arizonaGames.push(pickThree);
//
//
////            rawData = await fetch('localhost:8080/az/all or nothing', {
////                method: "GET",
////            });
////            rawData = await rawData.text();
////            re2 = /"gridcell">([\d]+\/[\d]+\/[\d]{4}) ([\w]{2})/g
////            re = /"gridcell">([\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+)/g
////            numbersRaw;
////            dateRaw;
////            let allOrNothing = [];
////            //   do {
////            for (let index = 0; index < 20; index++) {
////                let tempGame = new Game();
////
////                numbersRaw = re.exec(rawData)
////                dateRaw = re2.exec(rawData);
////                tempGame.bonus = "";
////                tempGame.extra = "";
////                tempGame.extraText = "";
////                let addName = "";
////                dateRaw[2] === "AM" ? addName = "Morning" : addName = "Evening"
////                tempGame.name = "All or Nothing " + addName;
////                if (numbersRaw && dateRaw) {
////
////                    let d = new Date(dateRaw[1]);
////                    let month = d.getMonth() + 1;
////                    let date = d.getDate();
////                    month <= 9 ? month = "0" + (month).toString() : month = month;
////                    date <= 9 ? date = "0" + (date).toString() : date = date
////                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
////                    tempGame.date = formatedDate;
////                    let formattedNums = [];
////                    formattedNums = numbersRaw[1].split("-")
////                    tempGame.winningNumbers = formattedNums;
////                    allOrNothing.push(tempGame);
////                }
////                //     } while (numbersRaw && dateRaw);
////            }
////            arizonaGames.push(allOrNothing);
        } catch (err) {
            console.log(err + "error");
        }
        return arizonaGames;
    }

}