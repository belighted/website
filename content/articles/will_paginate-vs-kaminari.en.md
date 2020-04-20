---
lang: en
slug: will_paginate-vs-kaminari
originalPath: https://www.belighted.com/blog/will_paginate-vs-kaminari
title: will_paginate vs. Kaminari
author: Stéphane A.
description: What is the main differences between will_paginate and Kaminari
  gems ? Take a quick look to this post in order to discover our comparaison.
image: null
date: 1325376000000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
In order to start this comparison, let’s just explain the way of working of both gem.

Assume we have a class of objects named `Book`.

In order to paginate your list of books, will\_paginate needs you to put:

In your controller:

<figure class="code"><figcaption><span>books_controller.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">index</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="vi"><span class="variable">@books</span></span> <span class="o">=</span> <span class="no"><span class="constant">Book</span></span><span class="o">.</span><span class="n">paginate</span><span class="p">(</span><span class="ss"><span class="symbol">:page</span></span> <span class="o">=&gt;</span> <span class="n">params</span><span class="o">[</span><span class="ss"><span class="symbol">:page</span></span><span class="o">]</span><span class="p">,</span> <span class="ss"><span class="symbol">:per_page</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">10</span></span><span class="p">)</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

and in your view:

<figure class="code"><figcaption><span>index.html.erb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
<span class="line-number">9</span>
<span class="line-number">10</span>
<span class="line-number">11</span>
<span class="line-number">12</span>
<span class="line-number">13</span>
<span class="line-number">14</span>
<span class="line-number">15</span>
<span class="line-number">16</span>
<span class="line-number">17</span>
</pre></td><td class="code"><pre><code class="erb undefined"><span class="line"><span class="x">&lt;table&gt;</span>
</span><span class="line"><span class="x"> &lt;thead&gt;</span>
</span><span class="line"><span class="x"> &lt;tr&gt;</span>
</span><span class="line"><span class="x"> &lt;th&gt;Title&lt;/th&gt;</span>
</span><span class="line"><span class="x"> &lt;th&gt;Price&lt;/th&gt;</span>
</span><span class="line"><span class="x"> &lt;/tr&gt;</span>
</span><span class="line"><span class="x"> &lt;/thead&gt;</span>
</span><span class="line"><span class="x"> &lt;tbody&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="vi">@books</span><span class="o">.</span><span class="n">each</span> <span class="k">do</span> <span class="o">|</span><span class="n">book</span><span class="o">|</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;tr&gt;</span>
</span><span class="line"><span class="x"> &lt;td&gt;</span><span class="cp">&lt;%=</span> <span class="n">book</span><span class="o">.</span><span class="n">name</span> <span class="cp">%&gt;</span><span class="x">&lt;/td&gt;</span>
</span><span class="line"><span class="x"> &lt;td&gt;</span><span class="cp">&lt;%=</span> <span class="n">book</span><span class="o">.</span><span class="n">price</span> <span class="cp">%&gt;</span><span class="x">&lt;/td&gt;</span>
</span><span class="line"><span class="x"> &lt;/tr&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="k">end</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/tbody&gt;</span>
</span><span class="line"><span class="x">&lt;/table&gt;</span>
</span><span class="line"><span class="cp">&lt;%=</span> <span class="n">will_paginate</span> <span class="vi">@books</span> <span class="cp">%&gt;</span><span class="x"></span>
</span></code></pre></td></tr></tbody></table></div></figure>

TIP: If you have to paginate an array (instead of an activerecord collection), just add this line in one of your initializer:

<figure class="code"><figcaption><span>will_paginate_array.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'will_paginate/array'</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

You obtain directly the pagination you want. One drawback, additionally with this small disadvantage of not handling arrays natively, is that you can’t personalize the way the HTML and links are generated by will\_paginate (for instance, if you need to add some parameters to links, or if you want to use div instead of span, whatever).

Let’s now see how Kaminari works!

In your controller:

<figure class="code"><figcaption><span>books_controller.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">index</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="vi"><span class="variable">@books</span></span> <span class="o">=</span> <span class="no"><span class="constant">Book</span></span><span class="o">.</span><span class="n">page</span><span class="p">(</span><span class="n">params</span><span class="o">[</span><span class="ss"><span class="symbol">:page</span></span><span class="o">]</span><span class="p">)</span><span class="o">.</span><span class="n">per</span><span class="p">(</span><span class="mi"><span class="number">10</span></span><span class="p">)</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

and in your view:

<figure class="code"><figcaption><span>index.html.erb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
<span class="line-number">9</span>
<span class="line-number">10</span>
<span class="line-number">11</span>
<span class="line-number">12</span>
<span class="line-number">13</span>
<span class="line-number">14</span>
<span class="line-number">15</span>
<span class="line-number">16</span>
<span class="line-number">17</span>
</pre></td><td class="code"><pre><code class="erb undefined"><span class="line"><span class="x">&lt;table&gt;</span>
</span><span class="line"><span class="x"> &lt;thead&gt;</span>
</span><span class="line"><span class="x"> &lt;tr&gt;</span>
</span><span class="line"><span class="x"> &lt;th&gt;Title&lt;/th&gt;</span>
</span><span class="line"><span class="x"> &lt;th&gt;Price&lt;/th&gt;</span>
</span><span class="line"><span class="x"> &lt;/tr&gt;</span>
</span><span class="line"><span class="x"> &lt;/thead&gt;</span>
</span><span class="line"><span class="x"> &lt;tbody&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="vi">@books</span><span class="o">.</span><span class="n">each</span> <span class="k">do</span> <span class="o">|</span><span class="n">book</span><span class="o">|</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;tr&gt;</span>
</span><span class="line"><span class="x"> &lt;td&gt;</span><span class="cp">&lt;%=</span> <span class="n">book</span><span class="o">.</span><span class="n">name</span> <span class="cp">%&gt;</span><span class="x">&lt;/td&gt;</span>
</span><span class="line"><span class="x"> &lt;td&gt;</span><span class="cp">&lt;%=</span> <span class="n">book</span><span class="o">.</span><span class="n">price</span> <span class="cp">%&gt;</span><span class="x">&lt;/td&gt;</span>
</span><span class="line"><span class="x"> &lt;/tr&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="k">end</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/tbody&gt;</span>
</span><span class="line"><span class="x">&lt;/table&gt;</span>
</span><span class="line"><span class="cp">&lt;%=</span> <span class="n">paginate</span> <span class="vi">@books</span> <span class="cp">%&gt;</span><span class="x"></span>
</span></code></pre></td></tr></tbody></table></div></figure>

As you see, both systems are similar. But Kaminari improves that by allowing you to personalize your pagination. You can generate default view templates (via the following command rails g kaminari:views default) and even create themes if you need several distinct presentations (Go to the newly created kaminari folder in your views, create a new folder for your theme and copy / paste default views previously generated in this folder and modify them as you desire). Then, you simply have to call

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="erb ruby"><span class="line"><span class="cp">&lt;%=</span> <span class="n">paginate</span> <span class="vi"><span class="variable">@books</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:theme</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'my_theme'</span></span> <span class="cp">%&gt;</span><span class="x">. </span>
</span></code></pre></td></tr></tbody></table></div></figure>

Both gems give straightly a good pagination system to your application, you can even use several ones on a same page, but our love can’t go to one of them, due to their pro and con’s, Kaminari is really amazing with his additional personalization features, nevertheless, it doesn’t handle arrays at all (even if some tricks could be used in that purpose). Will paginate, in the other hand, can handle a lot more situations (arrays, activeRecord associations, …).

Furthermore, if you have to use both gems in your app (Yes, it could happen ;) ). Just add this in one of your initializer:

<figure class="code"><figcaption><span>will_paginate_kaminari.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
<span class="line-number">9</span>
<span class="line-number">10</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="keyword">if</span></span> <span class="n"><span class="keyword">defined</span>?</span><span class="p">(</span><span class="no"><span class="constant">WillPaginate</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="class"><span class="keyword">module</span></span></span><span class="class"> <span class="nn"><span class="title">WillPaginate</span></span></span><span class="nn"></span>
</span><span class="line"> <span class="k"><span class="class"><span class="keyword">module</span></span></span><span class="class"> <span class="nn"><span class="title">ActiveRecord</span></span></span><span class="nn"></span>
</span><span class="line"> <span class="k"><span class="class"><span class="keyword">module</span></span></span><span class="class"> <span class="nn"><span class="title">RelationMethods</span></span></span><span class="nn"></span>
</span><span class="line"> <span class="n">alias_method</span> <span class="ss"><span class="symbol">:per</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:per_page</span></span>
</span><span class="line"> <span class="n">alias_method</span> <span class="ss"><span class="symbol">:num_pages</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:total_pages</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

For further information about these two gems:

will\_paginate: **[https://github.com/mislav/will\_paginate](https://github.com/mislav/will_paginate)**

Kaminari: [**https://github.com/amatsuda/kaminari**  
  
](https://github.com/amatsuda/kaminari)[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)