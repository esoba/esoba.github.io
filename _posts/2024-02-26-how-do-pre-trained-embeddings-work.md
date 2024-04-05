---
layout: post
title: How do pre-trained embeddings work
date: 2024-02-26 17:00:10
description: What does it mean to embed a sentence?
tags: NLP GenAI 
categories: advanced
---

## Intro

When I first got into NLP, my first couple projects involved building some basic classification, clustering, and RAG algorithms using [sentence embeddings](https://www.sbert.net/) or [OpenAI embeddings](https://platform.openai.com/docs/guides/embeddings). I think this was a great start because it made me realize that [NLP isn't much different than other ML areas](), but as I kept going down the NLP rabbit hole I realized I didn't truly understand these embeddings. 

Looking back, I don't blame myself too much for my lack of understanding because word embeddings are a lot more intuitive. Without diving into specifics (which can be found [here]()), word embeddings are created by analyzing the relationships between words and surrounding context in a corpus. The output of a word embedding model are vectors whose geometric similarity (like cosine similarity) are representative of their semantic similarity. Thus, we can expect words with similar meanings to be closer together in the vector space. 

Even though I understood how word embeddings worked, I struggled with sentences for a couple different reasons. These were some of my qualms: 
- Can't there be an infinite number of sentences constructed from words in a corpus?
- How can you embed paragraphs? 
- Even if you used attention to update vector representations, how do you combine them?

 

My original thought process 

### Uncertainty vs Confidence vs Calibration





### Difference between uncertainty and hallucination detection

### Why can't we use output probabilities to measure uncertainty?

Because LLMs output token probabilities, it would seem reasonable that the probability of a sequence would be a good proxy for uncertainty. Or, at the very least, there would be some meaningful way to combine token probabilities to make a good uncertainty metric. With a singular token output, this could work. Consider the following example: 

> Enter diagram for LLM output here

In this simple example, we ask the LLM a yes or no question. We can look at the probability that the output token is "yes" and say 

#### Token Probability Entropy
E

### What evaluation metrics has research come up with? 

### Does asking an LLM to rate its own output work?

### 