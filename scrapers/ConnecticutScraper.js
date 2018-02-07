import Game from "../Game"

export default class ConnecticutScraper {

    async getAllData() {
        let connecticutGames = [];
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
            connecticutGames.push(powerballData);

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
            connecticutGames.push(megaMillions);

            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('https://www.ctlottery.org/Modules/Games/archive.aspx?id=6') + '&callback=?', {
                method: "GET",
            });

            rawData = await rawData.text();
            re2 = /td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<td>([\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+)</g
            numbersRaw;
            dateRaw;
            let lotto = [];
            for (let index = 0; index < 20; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = "";
                tempGame.extra = "";
                tempGame.extraText = "";
                tempGame.name = "Lotto! ";
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                    tempGame.date = formatedDate;
                    let formattedNums = [];
                    formattedNums = numbersRaw[1].split("-")
                    tempGame.winningNumbers = formattedNums;
                    lotto.push(tempGame);
                }
            }
            connecticutGames.push(lotto);


            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('https://www.ctlottery.org/Modules/Games/archive.aspx?id=12') + '&callback=?', {
                method: "GET",
            });

            rawData = await rawData.text();
            re2 = /td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<td>([\d]+-[\d]+-[\d]+-[\d]+-[\d]+)&nbsp;LB([\d]+)</g
            numbersRaw;
            dateRaw;
            let luckyForLife = [];
            for (let index = 0; index < 20; index++) {
                let tempGame = new Game();

                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = numbersRaw[2]
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
                    formattedNums = numbersRaw[1].split("-")
                    tempGame.winningNumbers = formattedNums;
                    luckyForLife.push(tempGame);
                }
            }
            connecticutGames.push(luckyForLife);

            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('https://www.ctlottery.org/Modules/Games/archive.aspx?id=1') + '&callback=?', {
                method: "GET",
            });

            rawData = await rawData.text();
            re2 = /td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<\/td><td>([\d]{3}|Pending)<\/td><td><div[\w\s="\(\)',;:]*>View<\/div><\/td><td><a[\w\s"=?./&-]*>View<\/a><\/td><td>([\d]{3}|Pending)/g
            numbersRaw;
            dateRaw;
            let play3 = [];
            let addName = ["Day", "Night"];
            let addNameIndex = 0;
            for (let index = 0; index < 20; index++) {
                let tempGame = new Game();
                let tempGame2 = new Game();
                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = ""
                tempGame2.bonus = ""
                tempGame.extra = "";
                tempGame2.extra = "";
                tempGame.extraText = "";
                tempGame2.extraText = "";
                tempGame.name = "Play3 " + addName[0];
                tempGame2.name = "Play3 " + addName[1];
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    if (numbersRaw[1] !== "Pending") {
                        let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                        tempGame.date = formatedDate;
                        tempGame2.date = formatedDate;
                        let formattedNums = [];
                        formattedNums = numbersRaw[1].split("");
                        tempGame.winningNumbers = formattedNums;
                        formattedNums = numbersRaw[2].split("");
                        tempGame2.winningNumbers = formattedNums;
                        if (numbersRaw[2] !== 'Pending') {
                            play3.push(tempGame2);
                            play3.push(tempGame);
                        } else {
                            play3.push(tempGame);
                        }
                    }
                }
            }
            connecticutGames.push(play3);

            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('https://www.ctlottery.org/Modules/Games/archive.aspx?id=2') + '&callback=?', {
                method: "GET",
            });

            rawData = await rawData.text();
            re2 = /td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<\/td><td>([\d]{4}|Pending)<\/td><td><div[\w\s="\(\)',;:]*>View<\/div><\/td><td><a[\w\s"=?./&-]*>View<\/a><\/td><td>([\d]{4}|Pending)/g
            numbersRaw;
            dateRaw;
            let play4 = [];
            addName = ["Day", "Night"];
            addNameIndex = 0;
            for (let index = 0; index < 20; index++) {
                let tempGame = new Game();
                let tempGame2 = new Game();
                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = ""
                tempGame2.bonus = ""
                tempGame.extra = "";
                tempGame2.extra = "";
                tempGame.extraText = "";
                tempGame2.extraText = "";
                tempGame.name = "Play4 " + addName[0];
                tempGame2.name = "Play4 " + addName[1];
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    if (numbersRaw[1] !== "Pending") {
                        let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                        tempGame.date = formatedDate;
                        tempGame2.date = formatedDate;
                        let formattedNums = [];
                        formattedNums = numbersRaw[1].split("");
                        tempGame.winningNumbers = formattedNums;
                        formattedNums = numbersRaw[2].split("");
                        tempGame2.winningNumbers = formattedNums;
                        if (numbersRaw[2] !== 'Pending') {
                            play4.push(tempGame2);
                            play4.push(tempGame);
                        } else {
                            play4.push(tempGame);
                        }
                    }
                }
            }
            connecticutGames.push(play4);
            rawData = await fetch('https://allorigins.us/get?method=raw&url=' + encodeURIComponent('https://www.ctlottery.org/Modules/Games/archive.aspx?id=8') + '&callback=?', {
                method: "GET",
            });

            //<\/td><td><div[\w\s="\(\)',;:]*>View<\/div><\/td><td><a[\w\s"=?./&-]*>View<\/a><\/td><td>([\d]+-[\d]+-[\d]+-[\d]+-[\d]+[\d]+-[\d]+-[\d]+|Pending)


            rawData = await rawData.text();
            re2 = /td>([\d]+\/[\d]+\/[\d]{4})/g
            re = /<\/td><td>([\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+&nbsp;[\d]X|Pending)<\/td><td><div[\w\s="\(\)',;:]*>View<\/div><\/td><td><a[\w\s"=?./&-]*>View<\/a><\/td><td>([\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+|Pending)/g
            numbersRaw;
            dateRaw;
            let luckyLinks = [];
            addName = ["Day", "Night"];
            addNameIndex = 0;
            for (let index = 0; index < 20; index++) {
                let tempGame = new Game();
                let tempGame2 = new Game();
                numbersRaw = re.exec(rawData)
                dateRaw = re2.exec(rawData);
                tempGame.bonus = ""
                tempGame2.bonus = ""
                tempGame.extra = "";
                tempGame2.extra = "";
                tempGame.extraText = "";
                tempGame2.extraText = "";
                tempGame.name = "Lucky Links " + addName[0];
                tempGame2.name = "Lucky Links " + addName[1];
                if (numbersRaw && dateRaw) {

                    let d = new Date(dateRaw[1]);
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    month <= 9 ? month = "0" + (month).toString() : month = month;
                    date <= 9 ? date = "0" + (date).toString() : date = date
                    if (numbersRaw[1] !== "Pending") {
                        let formatedDate = d.getFullYear() + "-" + month + "-" + date + "Taaaaa"
                        tempGame.date = formatedDate;
                        tempGame2.date = formatedDate;
                        let formattedNums = [];
                        formattedNums = numbersRaw[1].split("&")[0];
                        formattedNums = formattedNums.split("-");
                        tempGame.winningNumbers = formattedNums;
                        formattedNums = numbersRaw[2].split("-");
                        tempGame2.winningNumbers = formattedNums;
                        if (numbersRaw[2] !== 'Pending') {
                            luckyLinks.push(tempGame2);
                            luckyLinks.push(tempGame);
                        } else {
                            luckyLinks.push(tempGame);
                        }
                    }
                }
            }
            connecticutGames.push(luckyLinks);


        } catch (err) {
            console.log(err + "error");
        }
        return connecticutGames;
    }

}