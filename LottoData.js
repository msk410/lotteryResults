import Game from "./Game"

export default class ArkansasScraper {

    async getAllData(url, state) {
        let games = [];
        try {
            let rawData = await fetch(url + '/' + state, {
                     method: "GET",
                 });

            let data = await rawData.json();
            if(data !== 'undefined' || data.length !== 0) {
                games = data;
                }


        } catch (err) {
            return [];
        }
        return games;
    }

}