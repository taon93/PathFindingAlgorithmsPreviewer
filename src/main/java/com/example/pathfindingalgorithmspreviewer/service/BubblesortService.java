package com.example.pathfindingalgorithmspreviewer.service;

import com.example.pathfindingalgorithmspreviewer.model.bubblesort.BsIteration;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BubblesortService {
    public BubblesortService(ArrayList<Integer> sortRequest) {
        this.result = new ArrayList<>();
        BsIteration firstIteration =
                new BsIteration(new ArrayList<>(sortRequest.size() - 1), sortRequest);
        BsIteration.setSorted(Boolean.FALSE);
        result.add(firstIteration);
    }
    List<BsIteration> result;
    public List<List<Boolean>> bubblesort() {
        do {
            BsIteration nextIteration =
                    new BsIteration(result.get(result.size() - 1));
            nextIteration.sort();
            result.add(nextIteration);
        } while(!BsIteration.isSorted());
        return result.stream()
                .map(BsIteration::getIterationSteps)
                .collect(Collectors.toList());
    }
}
