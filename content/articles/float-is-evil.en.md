---
lang: en
slug: float-is-evil
originalPath: https://www.belighted.com/blog/float-is-evil
title: Float is evil
author: Dominique L.
description: Are floats bad? What should be used in its place? I took some time
  to explain the problem behind a float number. Come have a look to this
  explanation.
image: null
date: 2012-04-24
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Base 2 representation of real numbers is to me an artifact of the time when every single bit and every single flop mattered, but I have to admit that with the memory and computing power we have today, I don’t understand why modern languages do not use base 10 representation by default.

Let me explain. It is important to remember that a number with a finite base 10 representation does not necessarily have a finite base 2 representation, and conversely. Of course, this problem is not inherent to base 2 but the fact is, in everyday life - some geeks apart - we compute in base 10: we expect 1/3 to have an infinite number of digits after the decimal point, not 12/10. In that respect, base 2 can sometime give some surprising results. To convince yourself, just type the following line in your Ruby console:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="mi"><span class="number">1</span></span><span class="number"><span class="o">.</span><span class="mi">2</span></span><span class="mi"></span> <span class="o">-</span> <span class="mi"><span class="number">1</span></span><span class="number"><span class="o">.</span><span class="mi">0</span></span><span class="mi"></span> <span class="o">==</span> <span class="mi"><span class="number">0</span></span><span class="o">.</span><span class="mi"><span class="number">2</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

For most computations errors are maybe small enough to ignore, but there is always the risk that they will add up. If your application handles money one way or another, this can become a real problem (accountants don’t like cents appearing or disappearing without reason).

The not so good idea: working with cents
----------------------------------------

I often read that to avoid base conversion errors when dealing with money, you should work in cents, as to only use integers. This may look like a simple and elegant solution, but it simply doesn’t work for two simple reasons.

First, the cent is not _always_ the smallest unit of money: just think about an application dealing with gas pump prices or exchange rates. Second, even if it is the case in your application, or you are working with nanocents, you will eventually end up with real numbers: divide 12 cents by 10 (e.g. to compute a mean) and you will be back at square one.

Decimal representation in your code and the database
----------------------------------------------------

Ruby and SQL allow you to store numbers in their decimal representation, using the `BigDecimal` and the `decimal` (sometimes also called `numeric`) field type, respectively. Behind the scenes, `Float` and `BigDecimal` both use a floating-point representation of the form `significant_digits x base^exp`; the difference being that the base is 2 if the first case, 10 in the second.

Using `BigDecimal`, your calculations will therefore always return what a human being expects. Moreover, you can gain total control on your mathematical operations by specifying the precision (number of significant digits), scale (digits after the dot), and rounding strategy, ensuring you will never get unexpected results. `BigDecimal` also has the ability to represent special numbers such as Infinity or NaN.

On the database side, just use the `decimal` type in your migration and specify a `precision` and `scale` (defaults can differ), ActiveRecord will take care of the rest. Even better: data from `decimal` fields will automatically by retrieved into `BigDecimal` objects.

Read more:

**[BigDecimal Rdoc](https://ruby-doc.org/stdlib-1.9.3/libdoc/bigdecimal/rdoc/BigDecimal.html)**

**[Precision and scale defaults of different RDBMS](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html#method-i-column)**

  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)