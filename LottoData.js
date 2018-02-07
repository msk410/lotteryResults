import Game from "./Game"

export default class ArkansasScraper {

    async getAllData(url, gamesList, state) {
        let games = [];
        try {
            for(let i = 0; i < gamesList.length; i++) {
            let rawData = await fetch(url + '/' + state + '/' + gamesList[i], {
                     method: "GET",
                 });

            let data = await rawData.json();
            if(data !== 'undefined' || data.length !== 0)
                games.push(data)
         }

        } catch (err) {
            return games;
        }
        return games;
    }

}