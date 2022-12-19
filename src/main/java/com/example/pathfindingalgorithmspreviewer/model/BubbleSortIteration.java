package com.example.pathfindingalgorithmspreviewer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class BubbleSortIteration {
    private ArrayList<Boolean> swapsRecord;
    private ArrayList<Integer> collection;
    private static Boolean sorted = false;
    public static Boolean isSorted() {return sorted;}
    public static void setToSorted() {sorted = true;}
}

