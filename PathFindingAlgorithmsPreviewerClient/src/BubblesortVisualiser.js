export class BubblesortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/bubble-sort";
    }
    apiPath;
    processIterationStep = function (step, index, columnsArray) {
        let color = "grey";
        columnsArray.forEach(column => column.setColor(color));
        if(step) {
            color = "red";
            let temp = columnsArray[index].getHeight();
            columnsArray[index].setHeight(columnsArray[index + 1].getHeight());
            columnsArray[index + 1].setHeight(temp);
        } else  {
            color = "green"
        }
        columnsArray[index].setColor(color);
        columnsArray[index + 1].setColor(color);
        return columnsArray;
    }
    getEndpoint() { return this.apiPath; }
    getProcessIterationStep() { return this.processIterationStep; }
}