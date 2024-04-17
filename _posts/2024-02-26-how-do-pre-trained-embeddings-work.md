---
layout: post
title: How do pre-trained sentence embeddings work?
date: 2024-02-26 17:00:10
description: What does it mean to embed a sentence?
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

Like in CV, there are different pooling methods that can be employed to get a representative embedding that captures the meaning of a sentence. The most common method is CLS pooling. In this method, a special classification token (usually called <CLS> or <s>) is appended to the beginning of every sentence/phrase/sequence of tokens the model is trained on. This token goes through the attention mechanism and is trained like how all other tokens would be (with the exception that the CLS token is never masked). Thus, it also has a representation that can be updated with contextually aware information. The CLS token is like the innocent bystander of the attention process - it is updated with relevant information but not necessarily apart of the sentence itself. Because of this, the representation of the CLS token has been chosen as a way to pool all of the word embeddings from a sentence. The idea is that the CLS token contains the same sentence level representation without being biased by any local semantics. A little more on BERT, the go-to language model for explaining/performing the state of the art, can be found [here](). 

To go back to CV for a moment, this is a bit analogous to max pooling in the sense that there are other pooling options but research consistently uses one method. Some other methods for pooling in NLP include averaging all of the embeddings, taking the max value at every index across all embeddings, etc. I have not gone into full depth on if a particular pooling method is preferred for a particular usecase, but I suspect there wouldn't be much of a difference (especially if the embedding is going to be fed into another neural network). 

NOTE: Because attention (at its most basic form) is a context-aware weighted average, CLS pooling can be thought of as a weighted average of token embeddings. What's nice is that the computation/weights for that average fall out naturally by virtue of passing text through the model. 

NOTE: Not every language model has a CLS token with its pre-training objective, so if you care to know the behind the scenes on how the model you are using does its embedding I would suggest reading through HuggingFace/architecture diagrams.

## Answers to my previous qualms 
1. Can't there be an infinite number of sentences constructed from words in a corpus?

Technically yes if we define a sentence to be a length-unrestricted sequence of words (tokens). I can see the confusion where the thought process is "there are an infinite number of combinations so how can an infinite combination fit in one embedding space". My counter to that is unlike word embeddings, they do not all sit in one space. There is no sentence embedding space like words, it is more so sentence embeddings are a function of embeddings that live in the word embedding space. That function is the pooling operation and it is dependent on the model you are getting embeddings from.

2. How can you embed paragraphs? 

Same way you would a sentence (aka pooling). A period (what delimits sentences from each other) is just a token, there is nothing special about it from the perspective of a language model. Assuming the paragraph you want to embed is not larger than the context limit of the language model you are passing it to, the process would be the exact same for a singular sentence. 

3. Even if you used attention to update vector representations, how do you combine them?

Depends on the pooling method you choose. The default method (most common) is just to take the embedding of the classification token (usually <cls> or <s>) from a sequence. The idea is that the classification token captures all of the relevant sequence level information and it's embedding is updated just like the rest of the word embeddings. Another technique is to average the embeddings of all the words in the sentence. There is no consensus on which method to choose, but for models trained on classification tasks its best to just use the cls representation.