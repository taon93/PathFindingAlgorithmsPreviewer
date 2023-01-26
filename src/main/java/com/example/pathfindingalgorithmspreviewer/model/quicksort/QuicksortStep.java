package com.example.pathfindingalgorithmspreviewer.model.quicksort;

import java.util.Optional;

public record QuicksortStep(Integer indexFrom, Optional<Integer> indexTo, Integer pivotIndex) {}
