export default class Space {
    constructor(id, color, figure) {
        this.id = id;
        this.color = color;
        this.figure = figure;
        this.whiteThreat = [];
        this.blackThreat = [];
    }
}
