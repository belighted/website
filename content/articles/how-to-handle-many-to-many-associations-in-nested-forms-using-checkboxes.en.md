---
lang: en
slug: how-to-handle-many-to-many-associations-in-nested-forms-using-checkboxes
originalPath: https://www.belighted.com/blog/how-to-handle-many-to-many-associations-in-nested-forms-using-checkboxes
title: How to handle many to many associations in nested forms using checkboxes !
author: Stéphane A.
description: How can you deal with many to many relations using check boxes.?
  Find out more of it in this post.
image: null
date: 2012-06-25
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
As everybody know thanks to one of the first awesome Ryan Bates’ railscasts (see [https://railscasts.com/episodes/17-habtm-checkboxes](https://railscasts.com/episodes/17-habtm-checkboxes) or the revised one [https://railscasts.com/episodes/17-habtm-checkboxes-revised](https://railscasts.com/episodes/17-habtm-checkboxes-revised) ), you can easily deal with many to many relations using check\_box\_tags.

For instance, if we have books and categories, here is the code you could obtain!

The classes:

<figure class="code"><figcaption><span>book.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Book</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line">
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:classifications</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:dependent</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:destroy</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:autosave</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span> <span class="p">,</span> <span class="ss"><span class="symbol">:inverse_of</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:book</span></span>
</span><span class="line"> <span class="n">accepts_nested_attributes_for</span> <span class="ss"><span class="symbol">:classifications</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:allow_destroy</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:reject_if</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:all_blank</span></span>
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:categories</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:through</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:classifications</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

<figure class="code"><figcaption><span>category.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Category</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line">
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:classifications</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:dependent</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:destroy</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:autosave</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span> <span class="p">,</span> <span class="ss"><span class="symbol">:inverse_of</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:category</span></span>
</span><span class="line"> <span class="n">accepts_nested_attributes_for</span> <span class="ss"><span class="symbol">:classifications</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:allow_destroy</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:reject_if</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:all_blank</span></span>
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:books</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:through</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:classifications</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

<figure class="code"><figcaption><span>classification.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Classification</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line">
</span><span class="line"> <span class="n">belongs_to</span> <span class="ss"><span class="symbol">:category</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:inverse_of</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:classifications</span></span>
</span><span class="line"> <span class="n">belongs_to</span> <span class="ss"><span class="symbol">:book</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:inverse_of</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:classifications</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

And the form:

<figure class="code"><figcaption><span>new.html.erb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
<span class="line-number">18</span>
<span class="line-number">19</span>
<span class="line-number">20</span>
<span class="line-number">21</span>
</pre></td><td class="code"><pre><code class="erb undefined"><span class="line"><span class="cp">&lt;%=</span> <span class="n">form_for</span> <span class="vi">@book</span> <span class="k">do</span> <span class="o">|</span><span class="n">f</span><span class="o">|</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line">
</span><span class="line"><span class="x"> &lt;p&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">f</span><span class="o">.</span><span class="n">label</span> <span class="ss">:name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">f</span><span class="o">.</span><span class="n">text_field</span> <span class="ss">:name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/p&gt;</span>
</span><span class="line">
</span><span class="line"><span class="x"> &lt;p&gt;Categories&lt;/p&gt;</span>
</span><span class="line"><span class="x"> &lt;ul&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="vi">@categories</span><span class="o">.</span><span class="n">each</span> <span class="k">do</span> <span class="o">|</span><span class="n">cat</span><span class="o">|</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">hidden_field_tag</span> <span class="s2">"book_category_ids_none"</span><span class="p">,</span> <span class="kp">nil</span><span class="p">,</span> <span class="p">{</span><span class="ss">:name</span> <span class="o">=&gt;</span> <span class="s2">"book[category_ids][]"</span><span class="p">}</span><span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;li&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">check_box_tag</span> <span class="s2">"book_category_ids_</span><span class="si">#{</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="p">,</span> <span class="p">(</span><span class="n">f</span><span class="o">.</span><span class="n">object</span><span class="o">.</span><span class="n">categories</span><span class="o">.</span><span class="n">present?</span> <span class="o">&amp;&amp;</span> <span class="n">f</span><span class="o">.</span><span class="n">object</span><span class="o">.</span><span class="n">categories</span><span class="o">.</span><span class="n">include?</span><span class="p">(</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="p">)),</span> <span class="p">{</span><span class="ss">:name</span> <span class="o">=&gt;</span> <span class="s2">"book[category_ids][]"</span><span class="p">}</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">label_tag</span> <span class="s2">"book_category_ids_</span><span class="si">#{</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="n">cat</span><span class="o">.</span><span class="n">name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/li&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="k">end</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/ul&gt;</span>
</span><span class="line">
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">f</span><span class="o">.</span><span class="n">submit</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line">
</span><span class="line"><span class="cp">&lt;%</span> <span class="k">end</span> <span class="cp">%&gt;</span><span class="x"></span>
</span></code></pre></td></tr></tbody></table></div></figure>

But now, how to handle this if we introduce the new concept of library. And furthermore, if you need to had books with all these linked categories directly from the library creation or edition form.

You’ll need to use a unique reference to identify these nested objects, a convenient way exists to solve this problem.

First, install the cocoon gem (All detailed information are available here [https://github.com/nathanvda/cocoon](https://github.com/nathanvda/cocoon))

Then, here is the new library class and the partial form used with cocoon

<figure class="code"><figcaption><span>classification.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Library</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line">
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:books</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:dependent</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:destroy</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:autosave</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span> <span class="p">,</span> <span class="ss"><span class="symbol">:inverse_of</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:library</span></span>
</span><span class="line"> <span class="n">accepts_nested_attributes_for</span> <span class="ss"><span class="symbol">:books</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:allow_destroy</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:reject_if</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:all_blank</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

<figure class="code"><figcaption><span>_book_fields.html.erb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
<span class="line-number">18</span>
<span class="line-number">19</span>
<span class="line-number">20</span>
<span class="line-number">21</span>
</pre></td><td class="code"><pre><code class="erb undefined"><span class="line"><span class="x">&lt;div&gt;</span>
</span><span class="line"><span class="x"> &lt;h3&gt;Book&lt;/h3&gt;</span>
</span><span class="line">
</span><span class="line"><span class="x"> &lt;p&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">f</span><span class="o">.</span><span class="n">label</span> <span class="ss">:name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">f</span><span class="o">.</span><span class="n">text_field</span> <span class="ss">:name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;p&gt;</span>
</span><span class="line">
</span><span class="line"><span class="x"> &lt;p&gt;Categories&lt;/p&gt;</span>
</span><span class="line"><span class="x"> &lt;ul&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="vi">@categories</span><span class="o">.</span><span class="n">each</span> <span class="k">do</span> <span class="o">|</span><span class="n">cat</span><span class="o">|</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">hidden_field_tag</span> <span class="s2">"</span><span class="si">#{</span><span class="n">f</span><span class="o">.</span><span class="n">object_name</span><span class="si">}</span><span class="s2">_category_ids_none"</span><span class="p">,</span> <span class="kp">nil</span><span class="p">,</span> <span class="p">{</span><span class="ss">:name</span> <span class="o">=&gt;</span> <span class="s2">"</span><span class="si">#{</span><span class="n">f</span><span class="o">.</span><span class="n">object_name</span><span class="si">}</span><span class="s2">[category_ids][]"</span><span class="p">}</span><span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;li&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">check_box_tag</span> <span class="s2">"</span><span class="si">#{</span><span class="n">f</span><span class="o">.</span><span class="n">object_name</span><span class="si">}</span><span class="s2">_category_ids_</span><span class="si">#{</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="p">,</span> <span class="p">(</span><span class="n">f</span><span class="o">.</span><span class="n">object</span><span class="o">.</span><span class="n">categories</span><span class="o">.</span><span class="n">present?</span> <span class="o">&amp;&amp;</span> <span class="n">f</span><span class="o">.</span><span class="n">object</span><span class="o">.</span><span class="n">categories</span><span class="o">.</span><span class="n">include?</span><span class="p">(</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="p">)),</span> <span class="p">{</span><span class="ss">:name</span> <span class="o">=&gt;</span> <span class="s2">"</span><span class="si">#{</span><span class="n">f</span><span class="o">.</span><span class="n">object_name</span><span class="si">}</span><span class="s2">[category_ids][]"</span><span class="p">}</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">label_tag</span> <span class="s2">"</span><span class="si">#{</span><span class="n">f</span><span class="o">.</span><span class="n">object_name</span><span class="si">}</span><span class="s2">_category_ids_</span><span class="si">#{</span><span class="n">cat</span><span class="o">.</span><span class="n">id</span><span class="si">}</span><span class="s2">"</span><span class="p">,</span> <span class="n">cat</span><span class="o">.</span><span class="n">name</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/li&gt;</span>
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%</span> <span class="k">end</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x"> &lt;/ul&gt;</span>
</span><span class="line">
</span><span class="line"><span class="x"> </span><span class="cp">&lt;%=</span> <span class="n">link_to_remove_association</span> <span class="s2">"Remove book"</span><span class="p">,</span> <span class="n">f</span> <span class="cp">%&gt;</span><span class="x"></span>
</span><span class="line"><span class="x">&lt;/div&gt;</span>
</span></code></pre></td></tr></tbody></table></div></figure>

As you can see the method object\_name give you the complete name of the newly instanciated object requested by the form. The same way, the method object\_id could give you only the id of this object.  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)