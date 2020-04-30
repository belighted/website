---
lang: en
slug: overriding-equals-equals
originalPath: https://www.belighted.com/blog/overriding-equals-equals
title: Overriding ==, eql? and hash
author: Dominique L.
description: It is quite usual in object-oriented programming to redefine the
  criteria of equivalence between two instances of a class.
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
It is quite usual in object-oriented programming to redefine the criteria of equivalence between two instances of a class. For example, let’s write a class representing a specific point in a three-dimensional space:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Point</span></span></span><span class="nc"></span>
</span><span class="line"> <span class="kp">attr_reader</span> <span class="ss"><span class="symbol">:x</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:y</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:z</span></span>
</span><span class="line"> <span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">initialize</span></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">z</span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="vi"><span class="variable">@x</span></span><span class="p">,</span> <span class="vi"><span class="variable">@y</span></span><span class="p">,</span> <span class="vi"><span class="variable">@z</span></span> <span class="o">=</span> <span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">z</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Given two points p1 and p2 with the same x, y and z coordinates, it seems natural that p1 be considered equivalent to p2, whether p1 and p2 are the same instance (i.e. the same memory object) or not. In Ruby, the method used to check the equivalence of two objects is `==`. Its default implementation (on the Object class) checks for instance identity, so we have to override it in our class to satisfy our domain specific notion of equivalence:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">==</span></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">other</span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="n">x</span> <span class="o">==</span> <span class="n">other</span><span class="o">.</span><span class="n">x</span> <span class="o">&amp;&amp;</span> <span class="n">y</span> <span class="o">==</span> <span class="n">other</span><span class="o">.</span><span class="n">y</span> <span class="o">&amp;&amp;</span> <span class="n">z</span> <span class="o">==</span> <span class="n">other</span><span class="o">.</span><span class="n">z</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Let’s try it:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">irb</span><span class="p">(</span><span class="n">main</span><span class="p">)<span class="symbol">:</span></span><span class="mo"><span class="number">001</span></span><span class="p"><span class="symbol">:</span></span><span class="mi"><span class="number">0</span></span><span class="o">&gt;</span> <span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span> <span class="o">==</span> <span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span>
</span><span class="line"><span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

So far, so good.

### Using our objects as hash keys

Now what if we want to use our newly defined objects as a key in a Hash?

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">irb</span><span class="p">(</span><span class="n">main</span><span class="p">)<span class="symbol">:</span></span><span class="mo"><span class="number">001</span></span><span class="p"><span class="symbol">:</span></span><span class="mi"><span class="number">0</span></span><span class="o">&gt;</span> <span class="n">labels</span> <span class="o">=</span> <span class="p">{</span> <span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span> <span class="o">=&gt;</span> <span class="err">“</span><span class="no"><span class="constant">Origin</span></span><span class="err">”</span> <span class="p">}</span>
</span><span class="line"><span class="n">irb</span><span class="p">(</span><span class="n">main</span><span class="p">)<span class="symbol">:</span></span><span class="mo"><span class="number">002</span></span><span class="p"><span class="symbol">:</span></span><span class="mi"><span class="number">0</span></span><span class="o">&gt;</span> <span class="n">labels</span><span class="o">[</span><span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span><span class="o">]</span>
</span><span class="line"><span class="o">=&gt;</span> <span class="kp"><span class="keyword">nil</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Not exactly what we want. This is because Hash does not use the `==` method when it looks for a key. Rather, it uses the eql? method as well as the hash method, which are also defined on Object. So, let’s first redefine `eql?`. As is often the case, it is perfectly sensible in our example to make `eql?` and `==` synonymous:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">eql?</span></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">other</span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="nb"><span class="keyword">self</span></span> <span class="o">==</span> <span class="n">other</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Now hash. This method returns an integer representing a kind of address where the key should be stored or found in a hashtable, called the hash value of the object. According to its specification, if `object1.eql?(object2)` is true then `object1.hash` MUST be equal to `object2.hash` (i.e. if a key matches another, they must be found at the same address). The reverse does not have to be true: `object1.hash` can be equal to `object2.hash` even when `object1.eql?(object2)` is false, this situation being called a collision. However, lookup performances tend to drop as the number of collisions rises, so a good implementation should try to minimize their probability (a property of the hash function called uniformity, see reference 4). There are many possible ways to compute a hash value for our Point instances (this topic deserves its own blogpost), but here is a simple one (assuming that the implementation provided by Array is a good one):

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">hash</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="o">[</span> <span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="n">z</span> <span class="o">].</span><span class="n">hash</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Now if we try again, we get:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">irb</span><span class="p">(</span><span class="n">main</span><span class="p">)<span class="symbol">:</span></span><span class="mo"><span class="number">001</span></span><span class="p"><span class="symbol">:</span></span><span class="mi"><span class="number">0</span></span><span class="o">&gt;</span> <span class="n">labels</span> <span class="o">=</span> <span class="p">{</span> <span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span> <span class="o">=&gt;</span> <span class="err">“</span><span class="no"><span class="constant">Origin</span></span><span class="err">”</span> <span class="p">}</span>
</span><span class="line"><span class="n">irb</span><span class="p">(</span><span class="n">main</span><span class="p">)<span class="symbol">:</span></span><span class="mo"><span class="number">004</span></span><span class="p"><span class="symbol">:</span></span><span class="mi"><span class="number">0</span></span><span class="o">&gt;</span> <span class="n">labels</span><span class="o">[</span><span class="no"><span class="constant">Point</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">,</span> <span class="mi"><span class="number">0</span></span><span class="p">)</span><span class="o">]</span>
</span><span class="line"><span class="o">=&gt;</span> <span class="err">“</span><span class="no"><span class="constant">Origin</span></span><span class="err">”</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Bingo!

### Other equality/equivalence related methods

Object also defines two other methods that are related to equality/equivalence: `equal?` determines object identity (i.e if a is the same instance as b) and should never be overridden. On the other hand, case statements use the `===` method to select the appropriate when, so here again you can override it to provide class specific equivalence for a switch statement (Range is a good example of this, see the documentation).

### References and further reading:

1.  **[Specification of ==, eql? and equal?](https://ruby-doc.org/core-1.9.3/Object.html#method-i-eql-3F)**
2.  **[Specification of hash](https://ruby-doc.org/core-1.9.3/Object.html#method-i-hash)**
3.  **[A more complete blogpost on basic concepts that can be implemented/overridden in a class](https://blog.rubybestpractices.com/posts/rklemme/018-Complete_Class.html)**
4.  **[Definition and properties of hash values](https://en.wikipedia.org/wiki/Hash_value)**
5.  **[In depth view of Hash implementation in MRI](https://edwinmeyer.com/Release_Integrated_RHG_09_10_2008/chapter03.html)**
6.  **[A blogpost on the implementation of a hashtable (here called a dictionary)](https://www.laurentluce.com/posts/python-dictionary-implementation/)** It’s in Python, but the principles are the same.

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)