package com.example.pathfindingalgorithmspreviewer.model.quicksort;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Data
public class Partition {
    public Partition(List<Integer> inputSubCollection, Integer nonRelativeCollectionStartIndex) {
        this.inputSubCollection = new ArrayList<>(inputSubCollection);
        this.nonRelativePartitionStartIndex = nonRelativeCollectionStartIndex;
        this.sorted = inputSubCollection.size() < 2 ? Boolean.TRUE : Boolean.FALSE;
        this.results = new ArrayList<>();
        this.pivotIndex = inputSubCollection.size() - 1;
    }
    public Partition(Partition partition) {
        this.pivotIndex = partition.getInputSubCollection().size() - 1;
        this.sorted = pivotIndex < 2 ? Boolean.TRUE : Boolean.FALSE;
        this.inputSubCollection = new ArrayList<>(partition.getInputSubCollection());
        this.results = new ArrayList<>();
        this.nonRelativePartitionStartIndex = partition.getNonRelativePartitionStartIndex();
    }

    private Integer pivotIndex;
    private Boolean sorted;
    private List<Integer> inputSubCollection;
    private Partition greaterThanPivot;
    private Partition smallerThanPivot;
    private List<QuicksortPartitionResult> results;
    private final int nonRelativePartitionStartIndex;
    public Integer getNonRelativeIndex(Integer relativeIndex) {
        return nonRelativePartitionStartIndex + relativeIndex;
    }
    public void sort() {
        Integer pivot = inputSubCollection.get(pivotIndex);
        int pivotNewIndex = 0;
        Integer indexFrom = nonRelativePartitionStartIndex;
        Integer indexTo = nonRelativePartitionStartIndex;
        int nonRelativePivotIndex = pivotIndex + nonRelativePartitionStartIndex;
        for(int i = 0; i < pivotIndex; i++){
            if(inputSubCollection.get(i) > pivot) {
                results.add(new QuicksortPartitionResult(indexFrom, Optional.empty(), nonRelativePivotIndex));
            }
            else {
                results.add(new QuicksortPartitionResult(indexFrom, Optional.of(indexTo), nonRelativePivotIndex));
                Collections.swap(inputSubCollection, pivotNewIndex, i);
                pivotNewIndex++;
                indexTo++;
            }
            indexFrom++;
        }
        results.add(new QuicksortPartitionResult(indexFrom, Optional.of(indexTo), nonRelativePivotIndex));
        Collections.swap(inputSubCollection, pivotNewIndex, pivotIndex);
        smallerThanPivot = new Partition(
            inputSubCollection.subList(0, pivotNewIndex), getNonRelativeIndex(0));
        greaterThanPivot = new Partition(
            inputSubCollection.subList(pivotNewIndex, inputSubCollection.size()),
            getNonRelativeIndex(pivotNewIndex));
    }
}
