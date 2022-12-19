package com.example.pathfindingalgorithmspreviewer.controller;

import com.example.pathfindingalgorithmspreviewer.model.BubbleSortIteration;
import lombok.extern.slf4j.Slf4j;
import com.example.pathfindingalgorithmspreviewer.model.QuickSortIteration;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class AlgorithmVisualisationController {
    @PostMapping("/sort/bubble-sort")
    public ArrayList<BubbleSortIteration> bubbleSortAlgorithmPreview(@RequestBody ArrayList<Integer> sortRequest) {
        return createBubbleSortIterations(sortRequest);
    }

    private List<ArrayList<Boolean>> createBubbleSortIterations(ArrayList<Integer> elementsToSort) {
        ArrayList<BubbleSortIteration> result = new ArrayList<>();
        result.add(new BubbleSortIteration(new ArrayList<Boolean>(), elementsToSort));
        return bubbleSort(result);
    }

    private List<ArrayList<Boolean>> bubbleSort(ArrayList<BubbleSortIteration> bubbleSortIterations) {
        if(BubbleSortIteration.isSorted() == true)
            return bubbleSortIterations.stream().map(elem -> elem.getSwapsRecord()).toList();
//        TODO: FINNISH THIS RECURSIVE FUNCTION
//        shouldContinueSorting = false;
//        BubbleSortIteration iteration = new BubbleSortIteration();
//        for(int i = 0; i < elementsToSort.size() - 2; i++) {
//            if(elementsToSort.get(i) > elementsToSort.get(i+1)) {
//                shouldContinueSorting = true;
//                iteration.getIteration().add(true);
//                Collections.swap(elementsToSort, i, i+1);
//            }
//            else iteration.getIteration().add(false);
//        }
//        return iteration
    }
}
