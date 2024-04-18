---
layout: post
title: Exploring LLM uncertainty
date: 2024-02-26 17:00:10
description: How much can we trust the output of an LLM?
tags: NLP AI-Trust/Safety GenAI 
categories: advanced
---

## Intro

Large Language Models (LLMs) are able to generate content by sampling from a learned probability distribution over possible next tokens. Even though modern LLMs have been trained on trillions of words (tokens) and have billions of parameters, there is no real guarentee on an LLMs output. To date, there is no way to fully measure how certain an LLM output is besides human verification. If we can understand what makes an LLM certain/uncertain in its output, it would have huge implications not only for LLM applications, but also for the publics trust in AI as a whole. Below, I'll explore some concepts and why this is such a hard problem.

## Quick Note
There is a bunch of research into ML model uncertainty and I won't be able to cover it all in this post. When doing research into this topic, I fell into countless rabit holes covering many areas related to probability theory and its role in Machine Learning. If you are like me and enjoy that deep dive into pure fundamentals, I think this [slide deck](https://www.gatsby.ucl.ac.uk/~balaji/balaji-uncertainty-talk-cifar-dlrl.pdf) is a great place to start. I am also planning on doing a deep dive into Bayesian statistics and it's role in ML so keep a look out for that!

Also, a majority of this post will be related to classification uncertainty since LLMs are auto-regressive token *classifiers*. There is a lot more to be said about uncertainty for regression and unsupervised problems but I u


## What exactly is uncertainty in ML?
> All models are wrong, but models that know when they are wrong, are useful.

Uncertainty measures how much we can trust the predictions from a model. There are two types of uncertainty in ML:
- epistemic: uncertainty from model (learned parameters)
- aleatoric: uncertainty from the data (stochasticity of observations)

Epistemic is said to be reducible, meaning that in the presence of more data our model can do better at solving a given task. Assuming we had a model with infinite capacity (aka ability to learn any data pattern), our epistemic uncertainty would fall to 0 if we gave it infinite data. This is equivalent to saying if you overfit a model trained on every possible datapoint, you can always be certain your model will correctly classify that data. A model will have high epistemic uncertainty when looking at a datapoint that comes from a different distribution than the data it was trained on (and vice versa). This uncertainty can be measured by training multiple models on different subsets of data and measuring the variability of the predictions. 

Aleatoric is irreducible, meaning that even in the presence of infinite data there will still be uncertainty in our predictions. This is due to the inherent randomness of data. Typically, observations/data we get from our environment will be noisy and we will not be able to know how that noise is distributed ahead of time. Because we cannot account for these perturbations, we have to accept that our model may be subject to data that is out of distribution (OOD) from its training data.

When people refer to uncertainty without any particular label (like epistemic or aleatoric), they are typically referring to total uncertainty: 

Total Uncertainty = Epistemic + Aleatoric

Uncertainty estimates fall into 4 categories: 
- Single deterministic methods: Measure uncertainty based single pass through model
- Ensemble methods: Measure uncertainty based on multiple models output
- Bayesian methods: Measure uncertainty based on stoachasticity of model
- Test time augmentation methods: Measure uncertainty by augmenting data

Common evaluation metrics for uncertainty include: 
- Calibration: Measures the agreement between predicted probabilities and observed frequencies 
    - Of all the times a model predicted class X with probability P, what fraction did we observe class X?
- Log liklihood: Measures how well the model fit the data it was trained on
- Entropy: How random/surprising a models predictions are

Research in this space concerns itself with estimating the different types of uncertainty, and coming up with a total uncertainty measure that is representative of the task a particular model is trying to solve. 

One thing I think is important to note here is that there is a difference between model uncertainty and model performance. Model performance considers the label output of the model compared to some known labels and uncertainty considers whether we should be asking the model to provide labels in the first place. 

## Generation makes things a little tricky
For supervised learning tasks (classification/regression), the problem statement for measuring total uncertainty is relatively straight forward: given a set of predictions and ground truth labels, what can we say about how sure the model is of its predictions? In classification settings, we can make statements about uncertainty based on a models output probabilities. In regression settings, we can make statements Consider a model that classifies dogs, cats, and birds. f we are trying to identify a picture of a cow, we can When we shift to generation tasks, the problem statement gets a little fuzzy. It is something like: 

I like to think of the generation task as a sequence of classifications or regressions. For example, LLM text completions are sequences of auto-regressive token classifications, and image generations are sequences of pixel regressions.  In addition, data is being 

In classification problems, the output of our models is a probability distribution $p(y | x)$. This naturally translates to 

a model is only as certain as it most certain token?

## Why can't we use output probabilities to measure uncertainty?

Because LLMs output token probabilities, it would seem reasonable that the probability of a sequence would be a good proxy for uncertainty. Or, at the very least, there would be some meaningful way to combine token probabilities to make a good uncertainty metric. With a singular token output, this could work. Consider the following example (and assume True/False are 1 token): 

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


#### Token Probability Entropy

### What evaluation metrics has research come up with? 

### Does asking an LLM to rate its own output work?

### 

sources 
https://arxiv.org/pdf/2307.10236.pdf