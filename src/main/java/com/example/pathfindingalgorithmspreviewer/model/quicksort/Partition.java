package com.example.pathfindingalgorithmspreviewer.model.quicksort;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
public class Partition {
    public Partition(List<Integer> inputSubCollection, Integer nonRelativeCollectionStartIndex) {
        this.inputSubCollection = new ArrayList<>(inputSubCollection);
        this.nonRelativePartitionStartIndex = nonRelativeCollectionStartIndex;
        this.sorted = inputSubCollection.size() < 2 ? Boolean.TRUE : Boolean.FALSE;
        this.transformationMap = new ArrayList<>();
        this.pivotIndex = inputSubCollection.size() - 1;
    }
    public Partition(Partition partition) {
        this.pivotIndex = partition.getInputSubCollection().size() - 1;
        this.sorted = pivotIndex < 2 ? Boolean.TRUE : Boolean.FALSE;
        this.inputSubCollection = new ArrayList<>(partition.getInputSubCollection());
        this.transformationMap = new ArrayList<>();
        this.nonRelativePartitionStartIndex = partition.getNonRelativePartitionStartIndex();
    }

    private Integer pivotIndex;
    private Boolean sorted;
    private List<Integer> inputSubCollection;
    private Partition greaterThanPivot;
    private Partition smallerThanPivot;
    private List<ElementInRespectToPivot> transformationMap;
    private final int nonRelativePartitionStartIndex;
    public Integer getNonRelativeIndex(Integer relativeIndex) {
        return nonRelativePartitionStartIndex + relativeIndex;
    }
    public void sort() {
        Integer pivot = inputSubCollection.get(pivotIndex);
        int pivotNewIndex = 0;
        for(int i = 0; i < pivotIndex; i++){
            if(inputSubCollection.get(i) > pivot) {
                transformationMap.add(ElementInRespectToPivot.Bigger);
            }
            else {
                transformationMap.add(ElementInRespectToPivot.Smaller);
                Collections.swap(inputSubCollection, pivotNewIndex, i);
                pivotNewIndex++;
            }
        }
        Collections.swap(inputSubCollection, pivotNewIndex, pivotIndex);
        smallerThanPivot = new Partition(
            inputSubCollection.subList(0, pivotNewIndex), getNonRelativeIndex(0));
        greaterThanPivot = new Partition(
            inputSubCollection.subList(pivotNewIndex, inputSubCollection.size()),
            getNonRelativeIndex(pivotNewIndex));
    }
}
