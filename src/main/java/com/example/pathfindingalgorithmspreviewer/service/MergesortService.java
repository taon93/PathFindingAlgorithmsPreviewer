package com.example.pathfindingalgorithmspreviewer.service;

import com.example.pathfindingalgorithmspreviewer.model.mergesort.MsIteration;
import com.example.pathfindingalgorithmspreviewer.model.mergesort.MergesortStep;

import java.util.ArrayList;
import java.util.List;

public class MergesortService {
    public MergesortService(List<Integer> request) {
        resultIterations = new ArrayList<>();
        previousIterationResult = new ArrayList<>(request);
        requestSize = request.size();
    }

    private List<Integer> previousIterationResult;
    private final List<List<MergesortStep>> resultIterations;
    private final Integer requestSize;
    public List<List<MergesortStep>> mergesort() {
        int step = 2;
        while(step <= requestSize){
            MsIteration currentIteration = new MsIteration(previousIterationResult, step);
            resultIterations.add(currentIteration.sort());
            step *= 2;
            previousIterationResult = currentIteration.getColToSort();
        }
        resultIterations.add(new MsIteration(previousIterationResult, requestSize).sort());
        return resultIterations;
    }
}
