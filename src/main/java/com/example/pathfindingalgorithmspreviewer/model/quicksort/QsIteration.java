package com.example.pathfindingalgorithmspreviewer.model.quicksort;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class QsIteration {
    public QsIteration(List<Partition> input) {
        this.inputPartitions = input;
        outputPartitions = new ArrayList<>();
    }

    private List<Partition> inputPartitions;
    private List<Partition> outputPartitions;

    public Boolean isSorted() {
        return inputPartitions.stream().allMatch(Partition::getSorted);
    }

    public List<Partition> getNotSorted() {
        return inputPartitions.stream().filter(p -> !p.getSorted()).toList();
    }

    public List<Partition> processIteration() {
        getNotSorted().forEach(notSortedP -> {
            notSortedP.sort();
            outputPartitions.add(new Partition(notSortedP.getSmallerThanPivot()));
            outputPartitions.add(new Partition(notSortedP.getGreaterThanPivot()));
        });
        return outputPartitions;
    }
}
