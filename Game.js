export default class Game {
    constructor(name, date, winningNumbers, bonus, extra, extraText) {
        this.name = name;
        this.date = date;
        this.winningNumbers = winningNumbers;
        this.bonus = bonus;
        this.extra = extra;
        this.extraText = extraText;
        this.showGame = true;
    }
}