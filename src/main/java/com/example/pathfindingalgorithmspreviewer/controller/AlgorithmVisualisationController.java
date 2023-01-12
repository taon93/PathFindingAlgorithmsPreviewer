package com.example.pathfindingalgorithmspreviewer.controller;

import com.example.pathfindingalgorithmspreviewer.model.BubbleSortIteration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class AlgorithmVisualisationController {
    @PostMapping("/sort/bubble-sort")
    public List<List<Boolean>> createBubbleSortIterations(@RequestBody ArrayList<Integer> sortRequest) {
        List<BubbleSortIteration> result = new ArrayList<>();
        BubbleSortIteration firstIteration =
                new BubbleSortIteration(new ArrayList<>(sortRequest.size() - 1), sortRequest);
        BubbleSortIteration.setSorted(Boolean.FALSE);
        result.add(firstIteration);
        return bubbleSort(result);
    }
    private List<List<Boolean>> bubbleSort(List<BubbleSortIteration> algorithmIterations) {
        do {
            BubbleSortIteration nextIteration =
                new BubbleSortIteration(algorithmIterations.get(algorithmIterations.size() - 1));
            nextIteration.sort();
            algorithmIterations.add(nextIteration);
        } while(!BubbleSortIteration.isSorted());
        return algorithmIterations.stream()
                .map(BubbleSortIteration::getIterationSteps)
                .collect(Collectors.toList());
    }
}
