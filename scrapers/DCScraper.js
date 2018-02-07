import Game from "../Game"

export default class DCscraper {

    async getAllData() {
        let dcGames = [];
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
            dcGames.push(powerballData);

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
            dcGames.push(megaMillions);


            rawData = await fetch('http://dclottery.com/games/lucky-for-life/pastdata.aspx', {
                method: "GET",
            });
            rawData = await rawData.text();
            re2 = /<td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li class="yellow">([\d]+)<\/li>/g
            numbersRaw;
            dateRaw;
            let luckyForLife = [];
            for (let index = 0; index < 9; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = "";
                tempGame.extra = "";
                tempGame.extraText = "";
                tempGame.name = "Lucky for Life ";
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for (let i = 1; i < 6; i++) {
                        formattedNums.push(numbersRaw[i]);
                    }
                    tempGame.winningNumbers = formattedNums;
                    luckyForLife.push(tempGame);
                }
            }
            dcGames.push(luckyForLife);

            rawData = await fetch('http://dclottery.com/games/dc5/pastdata.aspx', {
                method: "GET",
            });
            rawData = await rawData.text();
            re2 = /<td>([\d]+\/[\d]+\/[\d]{4})<\/td><td>([\w]+)<\/td>/g
            re = /<li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li>/g
            numbersRaw;
            dateRaw;
            let dc5 = [];
            for (let index = 0; index < 9; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = "";
                tempGame.extra = "";
                tempGame.extraText = "";
                let extraName = "";
                dateRaw[2] === 'evening' ? extraName = "Evening" : extraName = "Mid-Day";
                tempGame.name = "DC-5 " + extraName;
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for (let i = 1; i < 6; i++) {
                        formattedNums.push(numbersRaw[i]);
                    }
                    tempGame.winningNumbers = formattedNums;
                    dc5.push(tempGame);
                }
            }
            dcGames.push(dc5);

            rawData = await fetch('http://dclottery.com/games/dc4/pastdata.aspx', {
                method: "GET",
            });
            rawData = await rawData.text();
            re2 = /<td>([\d]+\/[\d]+\/[\d]{4})<\/td><td>([\w]+)<\/td>/g
            re = /<li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li>/g
            numbersRaw;
            dateRaw;
            let dc4 = [];
            for (let index = 0; index < 10; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = "";
                tempGame.extra = "";
                tempGame.extraText = "";
                let extraName = "";
                dateRaw[2] === 'evening' ? extraName = "Evening" : extraName = "Mid-Day";
                tempGame.name = "DC-4 " + extraName;
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for (let i = 1; i < 5; i++) {
                        formattedNums.push(numbersRaw[i]);
                    }
                    tempGame.winningNumbers = formattedNums;
                    dc4.push(tempGame);
                }
            }
            dcGames.push(dc4);
            rawData = await fetch('http://dclottery.com/games/dc3/pastdata.aspx', {
                method: "GET",
            });
            rawData = await rawData.text();
            re2 = /<td>([\d]+\/[\d]+\/[\d]{4})<\/td><td>([\w]+)<\/td>/g
            re = /<li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li>/g
            numbersRaw;
            dateRaw;
            let dc3 = [];
            for (let index = 0; index < 10; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = "";
                tempGame.extra = "";
                tempGame.extraText = "";
                let extraName = "";
                dateRaw[2] === 'evening' ? extraName = "Evening" : extraName = "Mid-Day";
                tempGame.name = "DC-3 " + extraName;
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for (let i = 1; i < 4; i++) {
                        formattedNums.push(numbersRaw[i]);
                    }
                    tempGame.winningNumbers = formattedNums;
                    dc3.push(tempGame);
                }
            }
            dcGames.push(dc3)

            rawData = await fetch('http://dclottery.com/games/race2riches/pastdata.aspx', {
                method: "GET",
            });
            rawData = await rawData.text();
            re2 = /<td>([\d]+\/[\d]+\/[\d]{4})<\/td><td>([\d]+)<\/td>/g
            re = /<li>([\d]+)<\/li><li>([\d]+)<\/li><li>([\d]+)<\/li>(<li class="yellow">([\d]+))?/g
            numbersRaw;
            dateRaw;
            let race2Riches = [];
            for (let index = 0; index < 10; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                typeof numbersRaw[5] !== 'undefined' ? tempGame.bonus = numbersRaw[5] : tempGame.bonus = ""

                tempGame.extra = "";
                tempGame.extraText = "";
                tempGame.name = "Race 2 Riches" + "#" + dateRaw[2];
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    for (let i = 1; i < 4; i++) {
                        formattedNums.push(numbersRaw[i]);
                    }
                    tempGame.winningNumbers = formattedNums;
                    race2Riches.push(tempGame);
                }
            }
            dcGames.push(race2Riches);

        } catch (err) {
            console.log(err + "error");
        }
        return dcGames;
    }

}