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

Also, a majority of this post will be related to classification uncertainty since LLMs are auto-regressive token *classifiers*.


## What exactly is uncertainty in ML?
> All models are wrong, but models that know when they are wrong, are useful.

Uncertainty measures how much we can trust the predictions from a model. There are two types of uncertainty in ML:
- epistemic: uncertainty from model (learned parameters)
- aleatoric: uncertainty from the data (stochasticity of observations)

Epistemic is said to be reducible, meaning that in the presence of more data our model can do better at solving a given task. Assuming we had a model with infinite capacity (aka ability to learn any data pattern), our epistemic uncertainty would fall to 0 if we gave it infinite data. This is equivalent to saying if you overfit a model trained on every possible datapoint, you can always be certain your model will correctly classify that data. A model will have high epistemic uncertainty when looking at a datapoint that comes from a different distribution than the data it was trained on (and vice versa). This uncertainty can be measured by training multiple models on different subsets of data and measuring the variability of the predictions. 

add little blurb on how to measure this type of uncertainty

For LLMs, epistemic uncertainty comes from not having seen enough content on a particular topic. For example, if I ask an LLM that has not been trained on arabic to translate a piece of text for me, it most likely will produce some bad output.

Aleatoric is irreducible, meaning that even in the presence of infinite data there will still be uncertainty in our predictions. This is due to the inherent randomness of data. Typically, observations/data we get from our environment will be noisy and we will not be able to know how that noise is distributed ahead of time. Because we cannot account for these perturbations, we have to accept that our model may be subject to data that is out of distribution (OOD) from its training data.

I think aleatoric is a little trickier to define for LLMs, but I like to think of it in terms of prompting. Prompts are our "input" to LLMs, so any vagueness or ambiguity will cause uncertainty to be high (even if we had a uber intelligent model). A question like "What am I wearing today?" would produce an answer with high uncertainty*. In general, random noise added to the prompt (ambiguity, typos, etc) can be considered alleatoric.

> *NOTE: To be honest I read this example in a paper, but don't know if I agree with it 100%. Conceptually, it makes sense if we assume just pure text completion training, but most LLMs are alligned (via RLHF, DPO, ORPO, etc.) to return an answer along the lines of "I don't know how to answer that" (which is technically correct). I think that gets into a deeper philosophical question about an LLMs capability to understanding their limitations.  

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
- Entropy: Measures how random/surprising a models predictions are

Research in this space concerns itself with estimating the different types of uncertainty, and coming up with a total uncertainty measure that is representative of the task a particular model is trying to solve. 

There are a couple things I think are important to note:

There is a difference between model uncertainty and model performance. Model performance considers the label output of the model compared to some known labels and uncertainty considers whether we should be asking the model to provide labels in the first place. Its the difference between saying "this image is a dog" and "I am 90% sure this is a dog"

The uncertainty you see from a models prediction are not always indicative of real life certainty. In fact, it has been shown models tend to be overconfident with their predictive probabilities. This is all to say that probabilities from a model alone are not enough to determine real world uncertainty. It is very possible for a model to be very confident in its prediction but in reality be completely wrong (especially when giving it OOD data).

## Generation makes things a little tricky

I like to think of the generation task as a sequence of classifications or regressions (supervised tasks). For example, LLM text completions are sequences of auto-regressive token classifications, and image generations are sequences of pixel regressions. Generative ML makes uncertainty measures a little bit more difficult for a few different reasons:
- Uncertainty can pop up in many different places in the sequence
- OOD is much harder to define
- Aggregating uncertainty across a sequence 
- Generative models have an extraordinary large number of model parameters
- etc. 

## Recap of LLM problem setup
LLMs are given an input prompt and generate an output sequence based on the instructions of the prompt. We consider the prompt a sequence of tokens $X = [x_1, x_2, ... x_n]$, and the model returns another sequence of tokens $Y = [y1, y2, ...y_m]$. The general decoding process is: $y_j = f([X, y_1, y_2, ...])$. This means that the $j^{th}$ output token is a function of the prompt and the previously generated tokens. The function is itself the LLM that has learned to output a probability distribution over next possible tokens in a sequence. 

The function is parameterized by the parameters of the ML model (underlying transformer architecture) and parameters of the sampling. The parameters of the ML model are fixed based on the pre-training the LLM provider had done, while the sampling parameters can be dictated by the user. These parameters include: 
- Temperature
- Top_p
- Top_k
- Max output tokens
- etc.

What each of these parameters mean and how to effectively use those are included in another blog post.

### How do we classify OOD data for LLMs
OOD data for a classifier can be considered any input that does not belong to the predefined classes or deviates from the input distribution within those classes. For something like a dog vs cat classifier, OOD data could be a picture of a bird or a picture of a dog/cat its never seen before (for example, asking it to classify a chihuaha when it has only seen pictures of huskies). 

For LLMs, the "does not belong to predefined classes" definition doesn't hold up as well* because the LLM has been trained to see all types of tokens. Put another way, the vocabulary is finite and it has seen every token in the vocabulary. Thus, OOD data in this case refers more to knowledge than individual tokens. Prompting with information the model has never seen before (or has been aligned on), is considered OOD. 

> *Note: For the purposes of describing OOD data we'll assume the LLM has been trained on the language it is being queried with. Asking an LLM that only knows English a question in Spanish would be considered OOD in the predefined classes sense, but we won't consider that case because it is fairly rare. 

## Why can't we use output probabilities to measure uncertainty?

Because LLMs output token probabilities, it would seem reasonable that the probability of a sequence would be a good proxy for uncertainty. Or, at the very least, there would be some meaningful way to combine token probabilities to make a good uncertainty metric. Let's start with the simplest case: a single token output. Consider the following example (and assume True/False are 1 token): 

Prompt: 
Given the following headline, determine if it is related to AI. Respond with only a true or false.

Headline:
Elon Musk sues OpenAI over mission statement 

Answer:
True

This case is similar to classification: we have an input that maps to a singular output. To measure total uncertainty, we can calculate the total uncertainty using token level entropy. I am planning a blog post on information theories role in ML, where I will dive in a little bit deeper to what this all means. Presented informally, the token level probability for this particular sequence would be: 

$H(t_{j}) = \sum \limits_{i=1}^m P(t_{j} = token_i)*\log P(t_{j} = token_i)$

Where $t_{j}$ is the token we are predicting a position $j$, and $token_i$ is the $i^{th}$ token in an LLMs vocabulary. In slightly less technical terms, this is considered the average "surprise" of observing $t_j$ as the value that it is. The maximum entropy would be the case where every token is just as likely aka $P(t_{j} = token_i) = \frac{1}{m}$ because there would be no indication that any token is favored over another. We can use this fact to normalize token level entropy to get a representative value between 0-1. Considering it is normalized by the maxium entropy (uncertainty), 0 would represent a deterministic output (aka completely certain) and 1 would represent uniform output (aka completely uncertain).

$H_{norm}(t_{j}) = \frac{H(t_{j})}{H_{max}}$

For the particular case above, the normalized entropy* is ____. We can see that the value is close to 0, meaning the model is fairly certain its prediction!

Once we start to relax some of these assumptions, issues arise. First, let's revise the prompt to let it know that we can accept the answers True, False, Yes, or No.

Prompt: 
Given the following headline, determine if it is related to AI. Respond with a single label that is either true, false, yes, or no.

Headline:
Elon Musk sues OpenAI over mission statement 

Answer:
True

If we calculate the normalized token level entropy again, we get ____. Even though we got the same answer from the LLM, it is more uncertain. This is because of semantics, and it is one of the main drivers for why uncertainty estimation is so difficult. Since True and Yes are both valid answers to the quesetion, the output token probability distribution is a lot more flat. We can see this below:

Insert picture of probablities here

This may seem like a contrived example, but imagine a scenario where instead of constraining the input to True, False, Yes, or No you asked something like "Give me a one word answer". We would still see the same issue because many single words can answer the question. The point is that total uncertainty cannot be measured by entropy alone becuase there are many ground truth labels.

Let's relax the assumption again and not constrain the output to being within a pre-defined set.

However, we cannot use that same confidence (probability) metric when we have an answer that is not constrained to a pre-defined set. Consider if the answer to the above question was instead something like:

Prompt: 
Given the following headline, determine if it is related to AI.

Headline:
Elon Musk sues OpenAI over mission statement 

Answer:
"Yes, this article is related to AI"

Semantically, this is the same answer as the ones above. However, we now have multiple sources of uncertainty because there are multiple sequential predictions. One method we could do is find the token level entropies for each predicition and consolidate them to get some representative total uncertainty. For example:
- Average across all tokens to get an average token level uncertainty, 
- Take the max value to say "we are only as certain as our most uncertain token"
- etc. 

Doing this introduces more complications because:
- Each aggregation would have tradeoffs
- Semantics are not well correlated with uncertainty
- Output sequence lengths are non-standard
- Only certain parts of a sequence are relevant for answering the prompt

If we relax our problem completely to any arbitrary type of problem (not necessarily just classification) you can imagine OUR uncertainty in how to measure the models uncertainty gets bigger and bigger. 

### Does asking an LLM to rate its own output work?

### What evaluation metrics has research come up with? 

### 

Sources 
https://arxiv.org/pdf/2307.10236.pdf
https://arxiv.org/pdf/2307.10236.pdf
https://www.watchful.io/blog/decoding-llm-uncertainties-for-better-predictability
https://cookbook.openai.com/examples/using_logprobs 
https://arxiv.org/pdf/2307.15703.pdf 
https://imerit.net/blog/a-comprehensive-introduction-to-uncertainty-in-machine-learning-all-una/
