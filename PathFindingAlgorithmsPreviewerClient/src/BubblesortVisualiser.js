import * as utils from "./utils";

export class BubblesortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/bubble-sort";
    }
    apiPath;
    processIterationStep = function (step, index, columnArray) {
        let color = "grey";
        columnArray.forEach(column => column.setColor(color));
        if(step) {
            color = "red";
            utils.swapColumnsHeight(columnArray, index, index + 1);
        } else  {
            color = "green"
        }
        columnArray[index].setColor(color);
        columnArray[index + 1].setColor(color);
        return columnArray;
    }
    getEndpoint() { return this.apiPath; }
    getProcessIterationStep() { return this.processIterationStep; }
}