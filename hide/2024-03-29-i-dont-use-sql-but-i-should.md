---
layout: post
title: I don't use SQL as much as I should
date: 2024-02-26 17:00:10
description: Intro SQL guide for people who should know SQL
tags: cs-skills
categories: basic
---

## Intro

The title kind of speaks for itself, but I admittedly haven't had many opportunities to work with SQL. Because I am in the ML field and also because my technical title for work is Data Scientist, it is assumed that I know SQL and use it on a day to day basis. The truth is, I am often looking at open source datasets or getting data handed to me (a bit privileged, I know). I say I know SQL, but really I only know the basics and don't get to practice these skills very often. Luckily, I had some exposure to it in college and know Pandas pretty well so I can dig through some documentation and understand whats going on.

The guide below is for people who are in my shoes - ML practicioners who should know SQL just by virtue of just being in the field. Almost every Data Science, Data Engineer, Machine Learning Engineer job posting I've seen has some sort of requirement on SQL, so even if you never use SQL it will be good to know. 

I got a lot of this material from random sources and YouTube videos (all will be linked below), but I think the best resource for my learning was [select star sql](https://selectstarsql.com/). I have no affiliation with the person who made this site, but going through his chapters was super intuitive and interactive. His book gives you the ability to run queries in real time (I'll just be showing code snippets here) which really solidified my learning.

Also because I need some examples to actually show SQL in action, I opted to test out the knowledge on a select number of hackerrank SQL questions. I am not a fan of companies using hackerrank to weed out applicants (which I talk about in a [blog post](https://selectstarsql.com/)), but for the sake of building skills I think it is pretty useful (especially here). There will be some basic examples in the sections describing core concepts, and harder examples towards the end

## Different types of SQL

Whenver I see SQL in the wild, its always followed by some modifier: PostgreSQL, MySQL, SQLite (what I first learned in college), etc. I never really understood the difference, but its about time I (we) do. 

The way I have come to understand the differences is that SQL is a standardized language used to manage/manipulate relational databases. All of the other flavors (like the ones that I listed above) is a specific relational database management system (RDBMS) that uses SQL as its querying language. The different flavors can also provide additional features/functionalities specific to the database system. 

As one [redditor](https://www.reddit.com/r/SQL/comments/e0ao31/newbie_what_the_difference_between_sql_and_mysql/) put it, SQL = the English language, MySQL (or any other flavor) = a novel that was written using the English language. In terms of the additional functionalities mentioned above, you can think of a huge chunk (lets call it 95%) of the base functionality being the same and 5% being flavor specific.

For the guide, I am going to go through SQLite because it is the [most widely deployed](https://www.sqlite.org/mostdeployed.html) and the one I am most familiar with. Assuming the information I just mentioned above is true, the knowledge below should be widely applicable to all flavors.

## Convention
If you see SQL in the wild, its typically written out in a pretty consistent (and human readable) format. The main conventions in SQL are the following:
- SQL specific keywords are capitalized, while database schema specific keywords (like table names) are lowercase. 
    - Some flavors of SQL can be case sensitive, verify that the flavor doesn't have a restriction on this 
- As long as you don't smush two words together, SQL is not very sensitive to whitespace. Improve readability by putting each command on a new line 
- Arithmetic stays in integer form unless .0 is added to the hardcoded numbers. A common trick is to multiply a number by 1.0 to make it decimal
- Strings are denoted by single quotes
- Semicolons at the end of queries separate individual queries from each other

## Basic commands

SELECT:
- Indicates what you want to output
- The * wildcard means "all columns"
- You can make your own columns from some combination of other columns
- You can use the AS keyword to alias some column 

In pandas, this is analogous to df['column_name'] or just simple look up. If you wanted to combine different columns, you could index columns and do whatever operation you want. For example df['col1'] + df['col2']. The aliasing comes from whatever you decide to name the resultant dataframe

FROM:
- Indicates what table in the database should be used 
- Technically don't need the FROM block if nothing from the table is being used 

With pandas it is assumed that the dataframe you have is not connected to multiple potential dataframes so the FROM keyword does not have a good analog.

WHERE: 
- Indicates what filters should be applied before outputting 
- Done with boolean indexing using operators like >, = (not ==), etc.
- For strings, SQL supports a couple different, more powerful operators
    - Use the LIKE to do wildcard searches 
    - LIKE '%val' means any combo of strings + val 
    - LIKE '_val' means single character match + val
    - See documenation for more like this
- To determine is something is NULL, use the keyword IS (val IS null)

This is equivalent to something like df[df['col1'] < 5] except of course you can replace < with any operator and 5 with any desired filter value. Like in pandas, it is up to you to make sure the operator + filter value you choose is in line with the datatype you are dealing with (for example if col1 was all string data, the expression above wouldnt make sense).

NOTE: The mental model I like to keep for WHERE (or pandas boolean indexing) is for loops. I imagine every WHERE clause or df[df['col1'] < 5] as being:
- for row in df (or table) if row meets clause output row else skip

[EXAMPLE](https://www.hackerrank.com/challenges/japanese-cities-attributes/problem)

```sql
SELECT * 
FROM CITY 
WHERE countrycode = 'JPN'
```

ORDER BY: 
- Indicates the ordering of output based on a colum 
- You can order by multiple things by separating columns by commas

In pandas, this is like calling the sort_values() method

LIMIT: 
- Indicates how many results should be output

This is equivalent to making your query in pandas and adding [:limit number] or [limit number:]. Essentially indexing the final output. 

## Aggregating 

NOTE: The flavor of SQL you use may have different syntax than the aggregators here or additional aggregate functionality. Refer to the documentation for your specific flavor for details. For completion, below are some of the most common ones

COUNT:
- Counts the number of non-null rows in a column
- Can use COUNT(*) to get the length of an entire table
    - Counts rows as long as any one of their columns is non-null

DISTINCT: 
- Returns only unique parts of a column and no duplicates

SUM/MIN/MAX/AVG: 
- Does the aggregation specified

LENGTH/LEN:
- Returns the number of characters in a string

[EXAMPLE](https://www.hackerrank.com/challenges/weather-observation-station-18/)

```sql
SELECT ROUND(MAX(lat_n) - MIN(lat_n) + MAX(long_w) - MIN(long_w), 4)
FROM STATION
```

NOTE: In most cases, if you try to output a column and an aggregation from SELECT you will get just one output. The column output will be some singular random output instead. This is because SQL doesn't know how to output a singular value (which the aggregator returns) with multiple values from the specified column

You can do aggregating either on the entire table, or a subset of the table (more info in the nested query section)

## Group By 
GROUP BY: 
- Gathers identical column values to allow aggregators to be used on them
- Always comes after a WHERE block

This is pretty much identical to pandas groupby.

HAVING: 
- Allows you to filter after output after performing group by logic
- Essentially the WHERE clause, except specifically for groupby outputs
    - WHERE happens before grouping and aggregation

[Example](https://www.hackerrank.com/challenges/earnings-of-employees/problem)

```sql
SELECT salary*months as tot_sal, COUNT(*)
FROM employee
GROUP BY tot_sal
ORDER BY tot_sal DESC
LIMIT 1
```

NOTES: 
GROUP BY breaks the NOTE above because if you SELECT a column and some aggregate when a groupby is introduced, the aggregate will be performed first allowing each column to have some number associated with it. This is of course assuming that you are consistent with what you are grouping by (For example, SELECT **city**, COUNT(city) FROM city_table GROUP BY **city**)

If you group by multiple objects and there is nothing to display for a particular group, nothing will be returned. I think the best explanation for this can be found in the (decade age example)[https://selectstarsql.com/longtail.html]. Essentially if (group1, group2) has an aggregation that doesnt exist, it will not show up in the output.   

In pandas, you get some group by functionality out of the box. For example, the value_counts() method is really just a short hand for groupby('column').size() (or .count() if you do not want to consider NaN values). I am not sure if you get the same OOB funcionality with SQL

## Nested Queries/Subsets

CASE WHEN: 
- A way to introduce if-else logic into SQL
- The syntax is CASE WHEN clause THEN result ...(more statements here)... ElSE result END (END needed to conclude statement) 

You can use this to create subsets of the table in a specified way (you get to specify each case or if statement)

[EXAMPLE](https://www.hackerrank.com/challenges/binary-search-tree-1/problem?isFullScreen=true):

Without CASE WHEN 
```sql
SELECT N, 'Leaf'
FROM BST
WHERE N NOT IN (SELECT DISTINCT P FROM BST WHERE P IS NOT NULL)

UNION

SELECT N, 'Inner'
FROM BST
WHERE N IN (SELECT P FROM BST WHERE P IS NOT NULL AND P != (SELECT N FROM BST WHERE P is null))

UNION

SELECT N, 'Root'
FROM BST
WHERE P is null
ORDER BY N;
```

WITH CASE WHEN 
```sql
SELECT N, 
CASE 
    WHEN P IS null THEN 'Root'
    WHEN N NOT IN (SELECT P FROM BST WHERE P is NOT NULL) THEN 'Leaf'
    ELSE 'Inner'
END
    
FROM BST 
ORDER BY N;
```

Sometimes, you need to aggregate both within groups and across the entire dataset. Unfortunately, this cannot be done at the same time with a single query. To bypass this, you can create a query that generates a subset of the data, and wrap it in parenthesees to isolate it from the rest of the query. 

## Joins

LEFT/RIGHT/OUTER/INNER JOIN:
- Joins two tables together based on the specified [JOIN type](https://www.w3schools.com/sql/sql_join.asp)
- By default, using the JOIN keyword will do an INNER JOIN
- You typically join on a key that is the same across different tables 
    - FROM table1 JOIN table 2 on table1.uid = table2.uid 
- You can join a table with itself (Useful when you make subsets w/different columns)
- You can alias without using AS 
- You can optionally join on another boolean operator (useful if you don't care about duplicates)

[EXAMPLE](https://www.hackerrank.com/challenges/asian-population/problem?isFullScreen=true):

```sql
SELECT SUM(c.population)
FROM city c
JOIN country co ON c.countrycode = co.code
WHERE co.continent = 'Asia'
```
NOTE: As mentioned above, we aliased city and country without specifying AS

## Other important keywords
RIGHT/LEFT:
- Extract characters from a string starting from either left or right - LEFT/RIGHT("my_str", # char to extract)

[Example](https://www.hackerrank.com/challenges/weather-observation-station-6/problem?isFullScreen=true):

```sql
SELECT DISTINCT city
FROM station
WHERE LEFT(city, 1) in ('a', 'e', 'i', 'o', 'u')
```

SUBSTR:
- Extract a substring from a string -  SUBSTR("my_str", start_position, # of extract characters)
- Can modify the above example to use substr instead of left

CONCAT:
- Concatentate strings together - CONCAT (string1, string2, ...)

[Example](https://www.hackerrank.com/challenges/the-pads/problem?isFullScreen=true):

```sql
SELECT CONCAT(name, '(', LEFT(occupation, 1), ')') as paren
FROM occupations
ORDER BY name;

SELECT CONCAT('There are a total of ', COUNT(*), ' ', LOWER(occupation), 's.')
FROM occupations
GROUP BY occupation
ORDER BY COUNT(*)
```

WITH:
- Define a subset of a table to reference later - WITH reference_name AS (Subtable query)

UNION:
- Combine the result set of two or more SELECT statements

BETWEEN: 
- Operator that selects values within a given range - col BETWEEN val1 AND val2 

[EXAMPLE](https://www.hackerrank.com/challenges/the-report/problem?isFullScreen=true)

```sql
WITH comb AS 
(SELECT s.name, g.grade, s.marks
FROM students s
LEFT JOIN grades g 
ON s.marks BETWEEN g.min_mark AND g.max_mark)

(SELECT name, grade, marks
FROM comb
WHERE grade >= 8)

UNION 

(SELECT NULL as name, grade, marks
FROM comb
WHERE grade < 8)

ORDER BY grade DESC, name ASC;
```

## More Examples
Coming soon!

## Note on LLMs for SQL

Because the base functionality of SQL is very close to written language, it is is the perfect candidate for a task that can be done with Large Language Models (LLMs). For the examples above in hackerrank, GPT-4 was able to reproduce most of the answers I wrote by just providing a description of the task and database schema. The ones that it did get wrong could easily be fixed by understanding all of the concepts above. There are also some LLMs out there that were fine-tuned 

## Sources
[select star sql](https://selectstarsql.com/)
[basic sql YT playlist](https://www.youtube.com/watch?v=gm6tNK_iOHs&list=PLR0triVyTrBWOLNu3ato7Y9hnGVyhTe1c)
[SQL in 100 seconds](https://www.youtube.com/watch?v=zsjvFFKOm3c&pp=ygUMc3FsIGZpcmVzaGlw)
[guy answers all hackerrank sql questions](https://www.youtube.com/watch?v=vpzO8QTrgbc&pp=ygUOc3FsIGhhY2tlcnJhbms%3D)

