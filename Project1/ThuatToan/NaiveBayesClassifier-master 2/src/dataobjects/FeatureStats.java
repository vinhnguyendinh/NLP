package dataobjects;

import java.util.HashMap;
import java.util.Map;

public class FeatureStats {
    /**
     * total number of Observations
     */
    public int n;
    
    /**
     * It stores the co-occurrences of Feature and Category values
     */
    public Map<String, Map<String, Integer>> featureCategoryJointCount;
    
    /**
     * Measures how many times each category was found in the training dataset.
     */
    public Map<String, Integer> categoryCounts;

    /**
     * Constructor
     */
    public FeatureStats() {
        n = 0;
        featureCategoryJointCount = new HashMap<>();
        categoryCounts = new HashMap<>();
    }
}