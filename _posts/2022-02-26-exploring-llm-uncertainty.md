---
layout: post
title: Exploring LLM uncertainty
date: 2024-02-26 17:00:10
description: How much can we trust the output of an LLM?
tags: NLP AI-Trust/Safety GenAI 
categories: advanced
---
**Coming 04/19!**

## Intro

Large Language Models (LLMs) are able to generate content by sampling from a learned probability distribution over possible next tokens. Even though modern LLMs have been trained on most of the internet (multiple times over) and have billions of parameters, there is no real guarentee on an LLMs output. To date, there is no way to fully measure how certain an LLM output is besides human verification. If we can understand what makes an LLM certain/uncertain in its output, it would have huge implications not only for LLM applications, but also for the publics trust in AI as a whole. Below, I'll explore some concepts and why this is such a hard problem.

### Uncertainty vs Confidence vs Calibration

### Why can't we use output probabilities to measure uncertainty?

Because LLMs output token probabilities, it would seem reasonable that the probability of a sequence would be a good proxy for uncertainty. Or, at the very least, there would be some meaningful way to combine token probabilities to make a good uncertainty metric. With a singular token output, this could work. Consider the following example: 

Prompt: 
Given the following headline, determine if it is related to AI. Respond with only a true or false.

Headline:
Elon Musk sues OpenAI over mission statement 

Answer:
True

There was only 1 token output as an answer, so confidence in that token (aka the probability the next token is True given the sequence) represents an LLMs confidence in the answer 

However, we cannot use that same confidence (probability) metric when we have an answer that is not constrained to a pre-defined set. Consider if the answer to the above question was instead something like:

"Yes, this article is related to AI"

Semantically, these are the same answer. If I tried to calculate a probability that it would return this exact sequence, I would have to do the following calculation:

P(Yes|input_sequence)*Prob(,|input_sequence + Yes) * Prob(this|input_sequence + Yes,) … 

The probability that this sequence is the answer would not be the same as the probability from the discrete “True” answer above. Sparing the math, the main point is that semantic similarity is not preserved when calculating confidence for a completion that is >1 token long. 
In many applications for eDiscovery, the completion is never just a simple yes or no. There is typically a reasoning or some other meta data extraction behind it. This makes it difficult to come up with a confidence score based on token probabilities alone. 
This is also why asking an LLM itself to return a confidence score is not a great solution either. Consider an example where I ask an LLM to return confidence on a scale of 1-10. If it returns 5 with say 40% confidence, were getting a number its 1) not confident in the first place and 2) not in line with the actual proportion for 1-10. 

### What evaluation metrics has research come up with? 

### Does asking an LLM to rate its own output work?

### 