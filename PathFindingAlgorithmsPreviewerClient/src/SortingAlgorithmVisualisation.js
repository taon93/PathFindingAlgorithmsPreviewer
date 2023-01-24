import {CanvasInterface} from "./CanvasInterface";
import * as utils from "./utils";
const _ = require("lodash");

export class SortingAlgorithmVisualisation {
    constructor(form){
        this.extractCollectionSpecsFromForm(form);
        this.canvasInterface = new CanvasInterface();
        this.baseHeight = this.canvasInterface.getCanvas().height / 12; // arbitrary value
        this.initColumnElements();

        addEventListener('resize', () => {
            this.initColumnElements();
        })
    }

    baseHeight;
    canvasInterface;
    collectionToSort;
    canvasColumnsArray = [];

    extractCollectionSpecsFromForm(form) {
        const elementsNo = parseInt(utils.getDataFromForm(form, "#elements-number"));
        const lowerBound = parseInt(utils.getDataFromForm(form, "#lower-bound"));
        const upperBound = parseInt(utils.getDataFromForm(form, '#upper-bound'));

        this.collectionToSort =  _.range(elementsNo).map(() => (Math.random() * (upperBound - lowerBound) + lowerBound) | 0);
    }

    async visualiseAlgorithm(responseFromServer, callback) {
        console.log(responseFromServer.data);
        for (const iteration of responseFromServer.data) {
            await this.displayIteration(iteration, callback);
        }
    }

    getCollection() { return this.collectionToSort; }

    drawBaseLine() {
        const context = this.canvasInterface.getContext()
        context.beginPath();
        context.moveTo(0, this.baseHeight);
        context.lineTo(this.canvasInterface.getCanvas().width, this.baseHeight);
        context.lineWidth = 1;
        context.strokeStyle = "blue";
        context.stroke();
    }

    async displayIteration(iteration, algorithmHandlerCallback) {
        for(let i = 0; i < iteration.length; i++) {
            await new Promise(resolve =>
                setTimeout(resolve, document.querySelector("#time-interval").value))
                .then(() => {
                    this.canvasColumnsArray = algorithmHandlerCallback(
                        iteration[i], i, this.canvasColumnsArray);
                    this.drawCollection();
                });
        }
        this.canvasColumnsArray.forEach(elem => elem.setColor("grey"))
        this.drawCollection();
    }

    findStartingPointForDrawingCollection(visualisationSpecs) {
        const arrayLength = this.collectionToSort.length;
        const dW = visualisationSpecs.delimiterWidth;
        const cW = visualisationSpecs.widthOfTheColumn;
        const halfOfTheElements = arrayLength / 2 | 0;
        const halfOfTheSpaceThatArrayOccupy = arrayLength % 2 === 1 ?
            halfOfTheElements * (dW + cW) + cW / 2 :
            halfOfTheElements * (cW + dW) - dW / 2;
        let x = this.canvasInterface.getCanvas().width / 2 - halfOfTheSpaceThatArrayOccupy;
        const y = this.baseHeight + 1;
        return {
            getX: function(){
                let currentX = x;
                x += cW + dW;
                return currentX; },
            getY: function(){ return y; }
        }
    }

    initColumnElements() {
        this.canvasInterface.resizeCanvasToWindowSize();
        const collection = this.collectionToSort;
        const canvas = this.canvasInterface.getCanvas();
        this.canvasColumnsArray = [];
        const visualisationSpecs = {
            widthOfTheColumn: canvas.width / 2 / collection.length,
            delimiterWidth: 3,
            heightOfTheColumnUnit: canvas.height * 2 / 3 / _.chain(collection).max()
        };
        const startingPoint = this.findStartingPointForDrawingCollection(visualisationSpecs)

        collection.map(elem => new CanvasColumnElement(
            startingPoint.getX(),
            startingPoint.getY(),
            visualisationSpecs.widthOfTheColumn,
            visualisationSpecs.heightOfTheColumnUnit * elem,
            "grey"))
            .forEach(column => this.canvasColumnsArray.push(column)) // this may be dangerous
        this.drawCollection();
    }
    clearCanvas() { this.canvasInterface.clearCanvas(); }
    drawCollection() {
        this.clearCanvas();
        this.drawBaseLine();
        const ctx = this.canvasInterface.getContext();

        this.canvasColumnsArray.forEach(column => {
            const d = column.getDimensions();
            ctx.beginPath();
            ctx.rect(d.x, d.y, d.w, d.h);
            ctx.fillStyle = d.c;
            ctx.fill();
        })
    }
}

class CanvasColumnElement {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    getDimensions() {
        return {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height,
            c: this.color
        };
    }

    getHeight() {
        return this.height;
    }
    setHeight(h) {
        this.height = h;
    }
    setColor(c) {
        this.color = c;
    }
}