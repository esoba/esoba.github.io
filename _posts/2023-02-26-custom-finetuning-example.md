---
layout: post
title: Custom fine-tuning example
date: 2024-02-26 17:00:10
description: How can we fine-tune a model more explicitly?
tags: NLP GenAI 
categories: advanced
---

## Intro

When I first got into NLP, my first couple projects involved building some basic classification, clustering, and RAG algorithms using [sentence embeddings](https://www.sbert.net/) or [OpenAI embeddings](https://platform.openai.com/docs/guides/embeddings). I think this was a great start because it made me realize that [NLP isn't much different than other ML areas](), but as I kept going down the NLP rabbit hole I realized I didn't truly understand these embeddings. 

Looking back, I don't blame myself too much for my lack of understanding because word embeddings are a lot more intuitive. Without diving into specifics (which can be found [here]()), word embeddings are created by analyzing the relationships between words and surrounding context in a corpus. The output of a perfect word embedding model are vectors whose geometric similarity (like cosine similarity) are representative of their semantic similarity. Thus, we can expect words with similar meanings to be closer together in the vector space. 

Even though I understood how word embeddings worked, I struggled with sentences for a couple different reasons. These were some of my qualms: 
- Can't there be an infinite number of sentences constructed from words in a corpus?
- How can you embed paragraphs? 
- Even if you used attention to update vector representations, how do you combine them?

## Pooling

You may have heard of pooling before in other ML contexts, particularly in Computer Vision where pooling refers to downsampling convolutional kernel output (aka feature maps). You perform pooling for a couple different reasons, primarily to: 
- Reduce dimensionality (makes computation faster)
- Promote translation invariance (makes network less sensitive to feature location)
- Abstract/Consolidate features (makes network focus on large patterns vs local details)

In NLP pooling has a different meaning, but can be thought of in the same way as the CV case. Pooling is a method of converting a sequence of word embeddings into a singular embedding that represents primary features of the entire sequence (aka downsampling!). As opposed to Convolutional Neural Networks where pooling is applied after every convolution layer, NLP pooling is only applied at the very end of self-attention blocks. Sentence embeddings are just the output of the pooling operation on context-aware word embeddings (typically from the final attention layer/block). 

## Different pooling methods 

Like in CV, there are different pooling methods that can be employed to get a representative embedding that captures the meaning of a sentence. 

## Answers to my previous qualms 
1. Can't there be an infinite number of sentences constructed from words in a corpus?

Technically yes if we define a sentence to be a length-unrestricted sequence of words (tokens). I can see the confusion where the thought process is "there are an infinite number of combinations so how can an infinite combination fit in one embedding space". My counter to that is unlike word embeddings, they do not all sit in one space. There is no sentence embedding space like words, it is more so sentence embeddings are a function of embeddings that live in the word embedding space. That function is the pooling operation and can be 

2. How can you embed paragraphs? 

Same way you would a sentence (aka pooling). A period (what delimits sentences from each other) is just a token, there is nothing special about it from the perspective of a language model. Assuming the paragraph you want to embed is not larger than the context limit of the language model you are passing it to, the process would be the exact same for a singular sentence. 

3. Even if you used attention to update vector representations, how do you combine them?

Depends on the pooling method you choose. The default method (most common) is just to take the embedding of the classification token (usually <cls> or <s>) from a sequence. The idea is that the classification token captures all of the relevant sequence level information and it's embedding is updated just like the rest of the word embeddings. Another technique is to average the embeddings of all the words in the sentence. There is no consensus on which method to choose, but for models trained on classification tasks its best to just use the cls representation
 

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