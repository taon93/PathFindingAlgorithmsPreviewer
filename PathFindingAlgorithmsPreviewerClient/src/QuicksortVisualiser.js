export class QuicksortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/quick-sort";
    }
    apiPath;
    processIterationStep = function (subiteration, columnArray) {
        console.log(subiteration);
        const relativeStart = subiteration.step.nonRelativePartitionStartIndex;
        let indexToSwap = subiteration.step.nonRelativePartitionStartIndex;
        const iterationLength = subiteration.step.elements.length;
        for(let i = 0; i < iterationLength; i++) {
            if (subiteration.step.elements[i] === "Smaller") {
                columnArray = QuicksortVisualiser.swapColumnsHeight(
                    columnArray,
                    relativeStart + i,
                    indexToSwap);
                indexToSwap++;
            }
        }
        columnArray = QuicksortVisualiser.swapColumnsHeight(
            columnArray,
            relativeStart + iterationLength,
            indexToSwap);
        return columnArray;
    }
    getEndpoint() { return this.apiPath; }
    getProcessIterationStep() { return this.processIterationStep; }

    static swapColumnsHeight(colArr, idx1, idx2) {
        let tHght = colArr[idx1].getHeight();
        colArr[idx1].setHeight(colArr[idx2].getHeight());
        colArr[idx2].setHeight(tHght);
        return colArr;
    }
}