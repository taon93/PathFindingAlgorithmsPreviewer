package com.example.pathfindingalgorithmspreviewer.controller;

import com.example.pathfindingalgorithmspreviewer.model.mergesort.MergesortStep;
import com.example.pathfindingalgorithmspreviewer.model.quicksort.QuicksortStep;
import com.example.pathfindingalgorithmspreviewer.service.BubblesortService;
import com.example.pathfindingalgorithmspreviewer.service.MergesortService;
import com.example.pathfindingalgorithmspreviewer.service.QuicksortService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class AlgorithmVisualisationController {
    @PostMapping("/sort/bubble-sort")
    public List<List<Boolean>> createBubblesortIterations(@RequestBody ArrayList<Integer> sortRequest) {
        BubblesortService bubblesortService = new BubblesortService(sortRequest);
        return bubblesortService.bubblesort();
    }

    @PostMapping("/sort/quick-sort")
    public List<List<QuicksortStep>> createQuicksortIterations(
            @RequestBody ArrayList<Integer> sortRequest) {
        QuicksortService quicksortService = new QuicksortService(sortRequest);
        return quicksortService.quicksort();
    }

    @PostMapping("sort/merge-sort")
    public List<List<MergesortStep>> createMergesortIterations(
            @RequestBody ArrayList<Integer> sortRequest) {
        MergesortService mergesortService = new MergesortService(sortRequest);
        return mergesortService.mergesort();
    }
}
