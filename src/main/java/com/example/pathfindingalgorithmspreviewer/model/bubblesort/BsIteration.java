package com.example.pathfindingalgorithmspreviewer.model.bubblesort;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;

@RequiredArgsConstructor
@Data
public class BsIteration {
    public BsIteration(BsIteration iteration) {
        this.collection = new ArrayList<>(iteration.getCollection());
        this.iterationSteps = new ArrayList<>();
        this.numberOfElementsToSort = iteration.getNumberOfElementsToSort();
    }
    public BsIteration(ArrayList<Boolean> iterationSteps, ArrayList<Integer> collection) {
        this.iterationSteps = new ArrayList<>(iterationSteps);
        this.collection = new ArrayList<>(collection);
        this.numberOfElementsToSort = collection.size();
    }
    private ArrayList<Boolean> iterationSteps;
    private ArrayList<Integer> collection;
    private static Boolean sorted;
    @Getter
    // TODO: this should be limited be last occurrence of false, from previous iteration.
    private int numberOfElementsToSort;
    private void decrementNumberOfElementsToSort() { numberOfElementsToSort--; }
    public static Boolean isSorted() { return sorted; }
    public static void setSorted(Boolean isSorted) { sorted = isSorted; }
    public void sort() {
        sorted = Boolean.TRUE;
        for(int i = 1; i < getNumberOfElementsToSort(); i++)
            if (collection.get(i - 1) > collection.get(i)) {
                sorted = Boolean.FALSE;
                Collections.swap(collection, i - 1, i);
                iterationSteps.add(Boolean.TRUE);
            } else iterationSteps.add(Boolean.FALSE);
        decrementNumberOfElementsToSort();
    }
}

