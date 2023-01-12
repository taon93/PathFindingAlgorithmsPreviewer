export class CanvasInterface {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.resizeCanvasToWindowSize();
    }
    canvas;
    context;
    resizeCanvasToWindowSize(){
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }
    setVisualisedAlgorithm(visualisedAlgorithm) {
        this.visualisedAlgorithm = visualisedAlgorithm;
    }
    getCanvas() { return this.canvas; }
    getContext() { return this.context; }
    clearCanvas() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);}
}