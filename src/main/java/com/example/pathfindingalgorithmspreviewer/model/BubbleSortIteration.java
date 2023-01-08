package com.example.pathfindingalgorithmspreviewer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Data
public class BubbleSortIteration {
    public BubbleSortIteration(BubbleSortIteration iteration) {
        this.collection = new ArrayList<>(iteration.getCollection());
        this.swapsRecord = new ArrayList<>();
        this.numberOfElementsToSort = iteration.getNumberOfElementsToSort();
    }
    public BubbleSortIteration(ArrayList<Boolean> swapsRecord, ArrayList<Integer> collection) {
        this.swapsRecord = new ArrayList<>(swapsRecord);
        this.collection = new ArrayList<>(collection);
        this.numberOfElementsToSort = collection.size();
    }
    private ArrayList<Boolean> swapsRecord;
    private ArrayList<Integer> collection;
    private static Boolean sorted;
    @Getter
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
                swapsRecord.add(Boolean.TRUE);
            } else swapsRecord.add(Boolean.FALSE);
        decrementNumberOfElementsToSort();
    }
}

