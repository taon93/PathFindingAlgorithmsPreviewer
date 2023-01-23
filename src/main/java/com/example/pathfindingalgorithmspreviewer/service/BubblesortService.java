package com.example.pathfindingalgorithmspreviewer.service;

import com.example.pathfindingalgorithmspreviewer.model.bubblesort.BubbleSortIteration;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BubblesortService {
    public BubblesortService(ArrayList<Integer> sortRequest) {
        this.result = new ArrayList<>();
        BubbleSortIteration firstIteration =
                new BubbleSortIteration(new ArrayList<>(sortRequest.size() - 1), sortRequest);
        BubbleSortIteration.setSorted(Boolean.FALSE);
        result.add(firstIteration);
    }
    List<BubbleSortIteration> result;
    public List<List<Boolean>> bubblesort() {
        do {
            BubbleSortIteration nextIteration =
                    new BubbleSortIteration(result.get(result.size() - 1));
            nextIteration.sort();
            result.add(nextIteration);
        } while(!BubbleSortIteration.isSorted());
        return result.stream()
                .map(BubbleSortIteration::getIterationSteps)
                .collect(Collectors.toList());
    }
}
