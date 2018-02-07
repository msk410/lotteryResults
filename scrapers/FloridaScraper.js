import Game from "../Game"

export default class FloridaScraper {

    async getAllData() {
        let floridaGames = [];
        try {

            let rawData = await
                fetch('http://www.powerball.com/powerball/winnums-text.txt', {
                    method: "GET",
                });

            rawData = await
                rawData.text();
            let re2 = /\d\d\/\d\d\/\d\d\d\d/g
            let re = /  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]{2}  [\d]/g

            let numbersRaw;
            let dateRaw;
            let powerballData = [];
            //         do {
            for (let i = 0; i < 20; i++) {
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
                    let formattedNums = numbersRaw[0].trim().split("  ").slice(0, 5);
                    formattedNums.sort();
                    tempGame.winningNumbers = formattedNums
                    tempGame.bonus = numbersRaw[0].trim().split("  ")[5];
                    tempGame.extra = numbersRaw[0].trim().split("  ")[6];
                    tempGame.extraText = "Power Play x "
                    powerballData.push(tempGame);
                }
                // console.log(tempGame)
                //    } while (numbersRaw && dateRaw);
            }
            floridaGames.push(powerballData);

            const response2 = await
                fetch(`https://data.ny.gov/resource/h6w8-42p9.json`, {
                    method: "GET",
                });
            let megaMillionsData = await
                response2.json();
            let megaMillions = [];
            megaMillionsData.map((elem, index) => {
                let tempGame = new Game("Mega Millions", elem.draw_date, elem.winning_numbers.split(" "),
                    elem.mega_ball, elem.multiplier, " Megaplier x ")
                megaMillions.push(tempGame);
            })
            floridaGames.push(megaMillions);


            rawData = await fetch('https://www.mylottos.com/lotto/Florida%20Lotto%20with%20Xtra/fl', {
                method: "GET",
            });
            console.log(rawData)

            // rawData = await rawData.text();
            // re2 = /"value">([\d]+\/[\d]+\/[\d]{4})/g
            // re = /field-item-[\d]([\d]+)</g
            // numbersRaw;
            // dateRaw;
            // console.log(rawData)
            // let naturalState = [];
            //   do {
            // for (let index = 0; index < 20; index++) {
            //     let tempGame = new Game();
            //
            //     numbersRaw = re.exec(rawData)
            //     dateRaw = re2.exec(rawData);
            //     tempGame.bonus = "";
            //     tempGame.extra = "";
            //     tempGame.extraText = "";
            //     tempGame.name = "Natural State Jackpot ";
            //     if (numbersRaw && dateRaw) {
            //
            //         let d = new Date(dateRaw[1]);
            //         let month = d.getMonth() + 1;
            //         let date = d.getDate();
            //         month <= 9 ? month = "0" + (month).toString() : month = month;
            //         date <= 9 ? date = "0" + (date).toString() : date = date
            //         let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
            //         tempGame.date = formatedDate;
            //         let formattedNums = [];
            //         formattedNums.push(numbersRaw[1]);
            //         numbersRaw = re.exec(rawData);
            //         formattedNums.push(numbersRaw[1]);
            //         numbersRaw = re.exec(rawData);
            //         formattedNums.push(numbersRaw[1]);
            //         numbersRaw = re.exec(rawData);
            //         formattedNums.push(numbersRaw[1]);
            //         numbersRaw = re.exec(rawData);
            //         formattedNums.push(numbersRaw[1]);
            //         numbersRaw = re.exec(rawData);
            //         tempGame.winningNumbers = formattedNums;
            //         naturalState.push(tempGame);
            //     }
            //     //     } while (numbersRaw && dateRaw);
            // }
          //  floridaGames.push(naturalState);


        } catch (err) {
            console.log(err + "error");
        }
        return floridaGames;
    }

}