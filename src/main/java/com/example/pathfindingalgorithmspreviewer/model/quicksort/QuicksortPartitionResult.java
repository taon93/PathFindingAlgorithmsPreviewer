package com.example.pathfindingalgorithmspreviewer.model.quicksort;

import java.util.List;

public record QuicksortPartitionResult(List<ElementInRespectToPivot> elements,
                                       Integer nonRelativePartitionStartIndex) {
}
