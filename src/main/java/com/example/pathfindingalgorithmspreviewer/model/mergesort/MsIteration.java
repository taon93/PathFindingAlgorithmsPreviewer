package com.example.pathfindingalgorithmspreviewer.model.mergesort;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Data
public class MsIteration {
    public MsIteration(List<Integer> request, Integer step) {
        colToSort = new ArrayList<>(request);
        this.step = step;
    }
    private final List<Integer> colToSort;
    private final Integer step;
    public List<MergesortStep> sort() {
        final List<MergesortStep> resultIteration = new ArrayList<>();
        int middlePoint;
        int firstToCompare, secondToCompare;
        for(int relStartIndex = 0; relStartIndex < colToSort.size(); relStartIndex += step) {
            middlePoint = relStartIndex + step >= colToSort.size() ?
                    colToSort.size() - (relStartIndex + step) / 2 :
                    step / 2;
            for(int i = relStartIndex, j = relStartIndex + middlePoint;
                i < middlePoint && j < colToSort.size();
                i++, j++) {
                firstToCompare = colToSort.get(i);
                secondToCompare = colToSort.get(j);
                if(firstToCompare > secondToCompare) {
                    Collections.swap(colToSort, i, j);
                    resultIteration.add(new MergesortStep(i, j, Mode.Swap));
                } else {
                    resultIteration.add(new MergesortStep(i, j, Mode.NoSwap));
                }
            }
        }
        return resultIteration;
    }
}
