package com.datumbox.opensource.examples;

import classifiers.NaiveBayes;
import dataobjects.NaiveBayesKnowledgeBase;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NaiveBayesExample {

    /**
     * Reads the all lines from a file and places it a String array. In each 
     * record in the String array we store a training example text.
     * 
     * @param url
     * @return
     * @throws IOException 
     */
    public static String[] readLines(URL url) throws IOException {

        Reader fileReader = new InputStreamReader(url.openStream(), Charset.forName("UTF-8"));
        List<String> lines;
        try (BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            lines = new ArrayList<>();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                lines.add(line);
            }
        }
        return lines.toArray(new String[lines.size()]);
    }
    
    /**
     * Main method
     * 
     * @param args the command line arguments
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {
        //map of dataset files
        Map<String, URL> trainingFiles = new HashMap<>();
//        trainingFiles.put("English", NaiveBayesExample.class.getResource("/datasets/training.language.en.txt"));
//        trainingFiles.put("French", NaiveBayesExample.class.getResource("/datasets/training.language.fr.txt"));
//        trainingFiles.put("German", NaiveBayesExample.class.getResource("/datasets/training.language.de.txt"));
        trainingFiles.put("Công nghe", NaiveBayesExample.class.getResource("/datasets/cn.txt"));
        trainingFiles.put("Giao duc", NaiveBayesExample.class.getResource("/datasets/gd.txt"));
        
        
        //loading examples in memory
        Map<String, String[]> trainingExamples = new HashMap<>();
        for(Map.Entry<String, URL> entry : trainingFiles.entrySet()) {
            trainingExamples.put(entry.getKey(), readLines(entry.getValue()));
        }
        
        //train classifier
        NaiveBayes nb = new NaiveBayes();
        nb.setChisquareCriticalValue(6.63); //0.01 pvalue
        nb.train(trainingExamples);
        
        //get trained classifier knowledgeBase
        NaiveBayesKnowledgeBase knowledgeBase = nb.getKnowledgeBase();
        
        nb = null;
        trainingExamples = null;
        
        
        //Use classifier
        nb = new NaiveBayes(knowledgeBase);
//        String exampleEn = "I am English";
//        String outputEn = nb.predict(exampleEn);
//        System.out.format("The sentense \"%s\" was classified as \"%s\".%n", exampleEn, outputEn);
//        
//        String exampleFr = "Je suis Français";
//        String outputFr = nb.predict(exampleFr);
//        System.out.format("The sentense \"%s\" was classified as \"%s\".%n", exampleFr, outputFr);
//        
//        String exampleDe = "Ich bin Deutsch";
//        String outputDe = nb.predict(exampleDe);
//        System.out.format("The sentense \"%s\" was classified as \"%s\".%n", exampleDe, outputDe);
//        
          String examCN = "Việt Nam xếp hạng 3 trong kỳ thi IMO 2017";
          String outputCN = nb.predict(examCN);
          System.out.format("The sentense \"%s\" was classified as \"%s\".%n", examCN, outputCN);

          String examGD = "học sinh";
          String outputGD = nb.predict(examGD);
          System.out.format("The sentense \"%s\" was classified as \"%s\".%n", examGD, outputGD);

    }
    
}
