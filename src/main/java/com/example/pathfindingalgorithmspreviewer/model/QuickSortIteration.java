package com.example.pathfindingalgorithmspreviewer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class QuickSortIteration {
    Integer pivotIndex;
    Map<Integer, Integer> indexSwitchMap;
}
