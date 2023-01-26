export class MergesortVisualiser {
    constructor(apiPath) {
        this.apiPath = apiPath + "sort/merge-sort";
    }
    apiPath;
    processIterationStep = function (iterationStep, index, columnArray) {

    }
    getEndpoint() { return this.apiPath; }
    getProcessIterationStep() { return this.processIterationStep; }
}