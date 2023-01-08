package com.example.pathfindingalgorithmspreviewer.controller;

import com.example.pathfindingalgorithmspreviewer.model.BubbleSortIteration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class AlgorithmVisualisationController {
    @PostMapping("/sort/bubble-sort")
    public List<BubbleSortIteration> createBubbleSortIterations(@RequestBody ArrayList<Integer> sortRequest) {
        List<BubbleSortIteration> result = new ArrayList<>();
        BubbleSortIteration firstIteration =
                new BubbleSortIteration(new ArrayList<>(sortRequest.size() - 1), sortRequest);
        firstIteration.setSorted(Boolean.FALSE);
        result.add(firstIteration);
        return bubbleSort(result);
    }
    private List<BubbleSortIteration> bubbleSort(List<BubbleSortIteration> algorithmIterations) {
        do {
            BubbleSortIteration nextIteration =
                new BubbleSortIteration(algorithmIterations.get(algorithmIterations.size() - 1));
            nextIteration.sort();
            algorithmIterations.add(nextIteration);
        } while(BubbleSortIteration.isSorted() != true);
        return algorithmIterations;
    }
}
