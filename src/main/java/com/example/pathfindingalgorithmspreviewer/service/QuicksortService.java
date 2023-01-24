package com.example.pathfindingalgorithmspreviewer.service;

import com.example.pathfindingalgorithmspreviewer.model.quicksort.Iteration;
import com.example.pathfindingalgorithmspreviewer.model.quicksort.Partition;
import com.example.pathfindingalgorithmspreviewer.model.quicksort.QuicksortPartitionResult;
import lombok.extern.java.Log;

import java.util.ArrayList;
import java.util.List;

@Log
public class QuicksortService {
    public QuicksortService(ArrayList<Integer> sortRequest) {
        this.algorithmIterations = new ArrayList<>(List.of(new Iteration(List.of(new Partition(sortRequest, 0)))));
    }
    private final List<Iteration> algorithmIterations;
    public Iteration getLastIteration() { return algorithmIterations.get(algorithmIterations.size() -1); }


    public List<List<QuicksortPartitionResult>> quicksort() { // List of Iterations, each Iteration consisting with a list of steps.
        Iteration currentIteration = getLastIteration();
        if(currentIteration.isSorted()) {
            return algorithmIterations.stream()
                    .flatMap(iteration -> iteration.getInputPartitions().stream().map(Partition::getResults))
                    .toList();}
        algorithmIterations.add(new Iteration(currentIteration.processIteration()));
        return quicksort();
    }
}
