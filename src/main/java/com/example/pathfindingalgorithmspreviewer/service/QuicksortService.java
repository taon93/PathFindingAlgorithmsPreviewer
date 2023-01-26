package com.example.pathfindingalgorithmspreviewer.service;

import com.example.pathfindingalgorithmspreviewer.model.quicksort.QsIteration;
import com.example.pathfindingalgorithmspreviewer.model.quicksort.Partition;
import com.example.pathfindingalgorithmspreviewer.model.quicksort.QuicksortStep;
import lombok.extern.java.Log;

import java.util.ArrayList;
import java.util.List;

@Log
public class QuicksortService {
    public QuicksortService(ArrayList<Integer> sortRequest) {
        this.algorithmIterations = new ArrayList<>(List.of(new QsIteration(List.of(new Partition(sortRequest, 0)))));
    }
    private final List<QsIteration> algorithmIterations;
    public QsIteration getLastIteration() { return algorithmIterations.get(algorithmIterations.size() -1); }


    public List<List<QuicksortStep>> quicksort() { // List of Iterations, each Iteration consisting with a list of steps.
        QsIteration currentIteration = getLastIteration();
        if(currentIteration.isSorted()) {
            return algorithmIterations.stream()
                    .flatMap(iteration -> iteration.getInputPartitions().stream().map(Partition::getResults))
                    .toList();}
        algorithmIterations.add(new QsIteration(currentIteration.processIteration()));
        return quicksort();
    }
}
