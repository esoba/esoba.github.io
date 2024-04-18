---
layout: post
title: LLMs in layman's term
date: 2024-02-26 17:00:10
description: Explaining LLMs with analogies
tags: NLP GenAI 
categories: non-technical
---

## LLM talk in the wild

The other day, I heard one of my friends (who works in some business capacity) talking about the work his team was supporting. He said something along the lines of:

"I'm working with this AI team that has a model thats able to make classifications on text. Its the same type of technology that ChatGPT uses."

This was before I knew he was on the business side of things, so I excitedly asked him "Are you working with transformers?!?" to which he replied "uuhhhhh maybe". 

In another interaction, one of my friends asked me about the work I was doing. He is an actuary and I know he understands/loves math so I started divulging into some of the specifics about LLMs and the work I was doing in Generative AI. At some point he interrupted me with two statements: 

"Doesn't ChatGPT just look up information on the internet before answering someones question?"

"Wait so how does the model use the internet"

A final interaction that stuck with me was talking to my friends cousin about a business opportunity in medical AI. He was a genius doctor/business man that wanted to know how he could integrate "AI" into his workflows to make the doctors office more efficient. I was super excited and started brainstorming a whole bunch of Generative AI ideas like QA over medical documents, automatic scribing, etc. I put together a little pitch and at the end he mentioned it wasn't exactly what he was looking for. He countered with:

"Imagine if we took the app for our practice and sent automated messages reminding people to eat right or get more steps in for the day".

As the hype for Generative AI grows (as it should!), terms like ChatGPT, LLMs, AI, Machine Learning, etc. are all getting bundled together to mean the same thing. I think if you are someone who wants to use Generative AI, it is worth it to understand at a high level what LLMs can/cannot do and how they work. This will not only ground expectations for Generative AI applications, but also make it easier to talk to talent who will eventually make those applications. 

## LLMs described for a non-technical audience

Imagine you gave a person, let's call her Gill, a huge encyclopedia and asked her to read it. After reading, you give her a test: a bunch of open ended questions about the content of the book. 

How well do you think she would perform?

Whatever metric you have in your mind, how much better would she do if she could read the encyclopedia multiple times?

Assuming she was able to pass the test eventually, what would the performance look like if she was given a similar test but with information not contained in the encyclopedia?

If you can understand this mental model, you can understand LLMs! To get to LLMs, do the following: 
- Replace the person with a statistical model designed to understand the relationship between texts
- Replace the encyclopedia with the entire internet 
- Replace the test with any user question 

Any question you have about LLMs, first ask the question to Gill. For example:

(LLM Question)
Why do LLMs return non-factual information?

LLM Related Answer:
- LLMs learn a probability distribution over next possible tokens in a sequence. When you give an LLM an input it will try to complete it by sampling tokens it thinks should come next (according to the distribution it learned). They are auto-regressive, so they use their own outputs to generate more input. LLMs technically don't memorize information, if it did it would overfit to the exact specific information it was trained on. Because everything is based on probabilities, sampling can cause information to be false. Likewise, because it is autoregressive, one improperly sampled token creates a downstream affect that can lead to a non-factual answer. Just because a LLM may have seen a particular bit of information during training, doesn't mean the signal was strong enough to influence the learned probability distribution.

(Converted Gill Question)
Why did you get that question on the test wrong?

Gills Answer:

I read about information regarding the question, but I couldnt remember during the test. It was such a small part of the encyclopedia so I couldnt recall the exact details. 

(LLM Question)
Can LLMs do math?

Technically, numbers are also encoded as tokens so they can generate output with numbers. Asking something like "What is 2 + 2" could lead to an LLM, by virtue of its training, to output a high probability for the token "4". In this sense it can do math, but realistically it is just text completion in a math setting. If you start asking more complex questions, performance will drop considerably because LLMs are text reasoning engines not math reasoning engines. To get LLMs to do math, a better way is to ask the LLM what would be needed to solve the problem (like a particular technique) and have it send extracted numbers to a downstream computer program that can accept the inputs. For example if you ask it what is 100 + 300/2, you can have it reason what steps it needs to take and hook it up to a calculator to do the actual computations.

(Converted Gill Question)
Based on what you read in the math section of the encylopedia, can you solve this math problem for me?

I read about how to solve something like this, but I've never had to actual do it. I understand what is being asked but I can't solve it. 

I could go on, but most of these questions are going to be future blog posts! Next time you have a high level question about LLMs, think of Gill first. 