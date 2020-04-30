---
lang: en
slug: memcached-dalli
originalPath: https://www.belighted.com/blog/memcached-dalli
title: "Application performance improvement via in memory key-value store:
  MemCached and the Dalli Ruby Gem"
author: Stéphane A.
description: Have some performance drop in one of your application? Discover how
  we figured it out with one of our project with Memcached and the Dalli Ruby
  Gem.
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Some time ago, as we were facing a performance drop in one of our projects, the decision was made to cache some intensively used data pieces and thus improve the overall system read efficiency.

After some research, we found some interesting key-value stores (as MemCached, Redis,…) which could perfectly do the trick. Since one has to be chosen, we finally picked up Memcached.

MemCached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) coming from results of database calls, API calls, or page rendering.

The system uses a client–server architecture wherein servers maintain a key–value associative array and clients populate this array and query it. To do so clients use client-side libraries to contact servers which, by default, expose their service on port 11211.

Using MemCached in your applications will allow to layer your requests, resulting in faster responses coming from RAM when available and falling back on a slower store such as a database otherwise.

But pay attention, values stored in MemCached are only available until the server runs out of memory. At which point, oldest data is discarded, a mechanism known as LRU. Therefore, clients must treat Memcached as a transitory cache. They cannot assume that data stored in Memcached is still there when they need it.

And as quite everything is well thought and done in our ruby world, a MemCached client implementation exists through the ruby Dalli gem (Which is the officiall MemCached client since Rails 4).

Installation and usage
----------------------

So, what do we need precisely to incorporate of all these features into our application?

First of all, an up and running MemCached server (The set up could differ from one OS to another):

*   for Mac OS (via HomeBrew):
    
    <figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
    </pre></td><td class="code"><pre><code class="undefined"><span class="line">brew install memcached</span></code></pre></td></tr></tbody></table></div></figure>
    
*   for debian-based linux distributions:
    
    <figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
    </pre></td><td class="code"><pre><code class="undefined"><span class="line">apt-get install memcached</span></code></pre></td></tr></tbody></table></div></figure>
    

Then you can simply install the Dalli gem (or put it into your gemfile):

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">gem</span> <span class="n">install</span> <span class="n">dalli</span>
</span></code></pre></td></tr></tbody></table></div></figure>

and use it into your ruby/rails project as shown in this piece of code:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'dalli'</span></span>
</span><span class="line"><span class="n">dc</span> <span class="o">=</span> <span class="ss"><span class="constant">Dalli</span></span><span class="constant"><span class="p">:</span><span class="ss">:Client</span></span><span class="ss"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="s1"><span class="string">'localhost:11211'</span></span><span class="p">)</span>
</span><span class="line"><span class="n">dc</span><span class="o">.</span><span class="n">set</span><span class="p">(</span><span class="s1"><span class="string">'abc'</span></span><span class="p">,</span> <span class="mi"><span class="number">123</span></span><span class="p">)</span>
</span><span class="line"><span class="n">value</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s1"><span class="string">'abc'</span></span><span class="p">)</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Some tips
---------

If you pass an array of strings, for instance: `["offices", "BE"]`, as key. Dalli will concatenate all those using backslashes as separator, resulting into `"offices/BE"` being really sent to the MemCached server.

You can even contact a MemCached server without ruby or rails using telnet.

If you’re in a rails project, you can even directly use MemCached as rails cache store via this additional configuration put into the desired environnement configuration file (rails 3 feature) :

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">config</span><span class="o">.</span><span class="n">cache_store</span> <span class="o">=</span> <span class="ss"><span class="symbol">:dalli_store</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

We’ll certainly talk about some other no sql alternatives, their advantages, drawbacks and use cases in further blog posts, so stay tuned !

References
----------

*   **[https://memcached.org/](https://memcached.org/)**
*   **[https://github.com/mperham/dalli](https://github.com/mperham/dalli)**
*   **[https://en.wikipedia.org/wiki/Memcached](https://en.wikipedia.org/wiki/Memcached)**

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)