import * as utils from "./utils";

export class QuicksortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/quick-sort";
    }
    apiPath;
    processIterationStep = function (iterationStep, index, columnArray) {
        columnArray.forEach(column => column.setColor("grey"));
        columnArray[iterationStep.pivotIndex].setColor("orange");
        if(iterationStep.indexTo != null){
            columnArray[iterationStep.indexTo].setColor("green");
            columnArray[iterationStep.indexFrom].setColor("blue");
            columnArray = utils.swapColumnsHeight(columnArray, iterationStep.indexFrom, iterationStep.indexTo);
        } else {
            columnArray[iterationStep.indexFrom].setColor("red");
        }
        return columnArray;
    }
    getEndpoint() { return this.apiPath; }
    getProcessIterationStep() { return this.processIterationStep; }

    // static swapColumnsHeight(colArr, idx1, idx2) {
    //     let tHght = colArr[idx1].getHeight();
    //     colArr[idx1].setHeight(colArr[idx2].getHeight());
    //     colArr[idx2].setHeight(tHght);
    //     return colArr;
    // }
}