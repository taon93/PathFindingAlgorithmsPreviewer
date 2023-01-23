export class BubblesortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/bubble-sort";
    }
    apiPath;
    processIterationStep = function (subiteration, columnsArray) {
        let color = "grey";
        const index = subiteration.index;
        columnsArray.forEach(column => column.setColor(color));
        if(subiteration.step) {
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