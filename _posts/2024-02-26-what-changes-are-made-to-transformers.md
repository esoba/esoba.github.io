---
layout: post
title: Common modifications to vanilla Transformers
date: 2024-02-26 17:00:10
description: How do LLMs change the transformer architecture?
tags: NLP GenAI 
categories: advanced
---
**More coming soon**
## Intro

When people first start learning NLP, I think it is really easy to get wrapped up in the transformer architecture and just assume 

Large Language Models (LLMs) are able to generate content by sampling from a learned probability distribution over possible next tokens. Even though modern LLMs have been trained on most of the internet (multiple times over) and have billions of parameters, there is no real guarentee on an LLMs output. To date, there is no way to fully measure how certain an LLM output is besides human verification. If we can understand what makes an LLM certain/uncertain in its output, it would have huge implications not only for LLM applications, but also for the publics trust in AI as a whole. Below, I'll explore some concepts and why this is such a hard problem.

### Uncertainty vs Confidence vs Calibration

For the purposes of not confusing terminology, I want to define explicitly what is meant by uncertainty, confidence, and calibration. In statistics/ML, these all have some slight variation on how they are used. To motivate this, consider the following example: 

Say a language model is given the phrase "The sky is ____". This model will take in the phrase and output a probability distribution over all the possible tokens that should come next in the phrase. 

This is how I think of them:

When I think of confidence, I think of the output probability from a model. For example, if some language model sees the phrase: 

"The sky is ____"

It will return a distribution across all tokens in its corpus. 

When it comes to measuring how sure a model is that the prediction/generation its giving is correct,



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