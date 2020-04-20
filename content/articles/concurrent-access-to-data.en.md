---
lang: en
slug: concurrent-access-to-data
originalPath: https://www.belighted.com/blog/concurrent-access-to-data
title: The problem of concurrent access to data
author: Dominique L.
description: Techniques to avoid inconsistencies in the backup data in
  applications (and especially avoid problems of the kind, order two times the
  same objects in a store so that there is more)
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Imagine that your application manages a store, and that you have a model that represents the number of items in stock for each product:

<figure class="code"><figcaption><span>product_stock.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">ProductStock</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="ss"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="p">:</span><span class="ss">:Base</span></span><span class="ss"></span></span><span class="ss"></span></span><span class="ss"></span>
</span><span class="line"> <span class="n">belongs_to</span> <span class="ss"><span class="symbol">:product</span></span>
</span><span class="line"> <span class="n">validates</span> <span class="ss"><span class="symbol">:product</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:presence</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span>
</span><span class="line"> <span class="n">validates</span> <span class="ss"><span class="symbol">:stock_size</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:presence</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:numericality</span></span> <span class="o">=&gt;</span> <span class="p">{</span> <span class="ss"><span class="symbol">:only_integer</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:greater_than_or_equal_to</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">0</span></span> <span class="p">}</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

When a clerk sells a product item, your application will typically call a method like this on the corresponding ProductStock model:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">decrement</span></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">number_of_items</span> <span class="o">=</span> <span class="mi"><span class="number">1</span></span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="nb"><span class="keyword">self</span></span><span class="o">.</span><span class="n">stock_size</span> <span class="o">=</span> <span class="n">stock_size</span> <span class="o">-</span> <span class="n">number_of_items</span>
</span><span class="line"> <span class="n">save</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Now what if two clerks sell the same product at the same time? This situation might seem very unlikely but, if there are a lot of clerks and your product is a real bestseller, it can happen sooner than you think (imagine an Apple Store on the new iPhone release date). Unless you limited the server to handle only one request at a time (probably not a very practical decision), both requests will be treated by concurrent threads. A possible sequence of events is the following:

1.  Thread 1 loads the model from the database, with a `stock_size` value of, say, 10.
2.  Thread 2 loads the model from the database, also with a `stock_size` value of 10.
3.  Thread 1 decreases the `stock_size` value by one. On its own copy of the model, this value is now 9.
4.  Thread 2 decreases the `stock_size` value by one. Again, on its own copy of the model, this value is now 9.
5.  Thread 1 saves its modified version of the model.
6.  Thread 2 saves its modified version of the model.

What you end up with is an incorrect inventory: your application now says there are 9 items in stock, while obviously there are only 8 on the shelves. The problem is that the second thread never knew that the value was changed by the first. This is a typical example of what is known as a _race condition_.

Simply calling `reload` at the beginning of your method won’t make the problem disappear: thread 1 could still save the new value right after the model copy of thread 2 is reloaded (You can easily simulate this by calling `sleep(30.seconds)` just after the call to `reload` and play with two parallel Rails consoles). What you really need is a way to prevent outdated data from being written in the database by implementing a _locking strategy_. Fortunately for you, Rails makes it really easy to use the two most well-known, respectively called _pessimistic locking_ and _optimistic locking_.

Pessimistic locking
-------------------

The idea of pessimistic locking is to prevent more than one process to access a record in the database at the same time: when a process wants to load an object in order to modify it, it puts a lock on the corresponding record[1](#note-1), forcing any other process to wait for this lock to be released before they can load the record. Basically, the purpose is thus to bring atomicity to a series of operations.

In ActiveRecord, when you are inside a transaction, you can load models with the `:lock => true` option or call `lock!` on an already loaded model to put a lock on the corresponding record (if you are not inside a transaction, the lock is released as soon as it is acquired). You can also start a transaction and acquire the lock in one go by calling `with_lock` with a block:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">decrement</span></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">number_of_items</span> <span class="o">=</span> <span class="mi"><span class="number">1</span></span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="n">with_lock</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="nb"><span class="keyword">self</span></span><span class="o">.</span><span class="n">stock_size</span> <span class="o">=</span> <span class="n">stock_size</span> <span class="o">-</span> <span class="n">number_of_items</span>
</span><span class="line"> <span class="n">save</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Note that placing a lock on a model will automatically force it to be reloaded.

This strategy is not without its problems, however. Indeed, a process can potentially acquire a lock and keep it for as long as it wants or even never release it, forcing all the other processes that need access to the locked record to wait indefinitely (this is called _starvation_). Another potential problem are _deadlocks_: process A locks record 1, then tries to lock record 2, but record 2 has already been locked by process B which now needs to lock record 1 to complete. Both processes are unable to complete, each waiting for the record the other has locked.

Optimistic locking
------------------

In optimistic locking, a version number is assigned to each row. When a model is updated, its version number is checked against the one in the database. If they are the same, the changes are committed and the version number of the row is incremented (within the same atomic operation); if not, that means another process has updated the row since you loaded the model, and the update fails. In this case, you need to reload the model and try again.

To enable optimistic locking in Rails, you only need to add a “lock\_version” column on your table:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">AddLockVersionToInventory</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="ss"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="p">:</span><span class="ss">:Migration</span></span><span class="ss"></span></span><span class="ss"></span></span><span class="ss"></span>
</span><span class="line"> <span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">change</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="n">add_column</span> <span class="ss"><span class="symbol">:product_stocks</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:lock_version</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:integer</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:null</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">false</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:default</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">0</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

If your record is outdated, ActiveRecord will raise a ActiveRecord::StaleObjectError; it is then your responsibility to deal with the conflict. Note also that for optimistic locking to work across all web requests, you should add lock\_version as a hidden field to your form, and to the list of attr\_accessible (or to the filtered set of attributes for strong\_parameters).

The main drawback of optimistic locking is that it can cause a lot of updates to fail if the same record is often accessed concurrently (this could be the case in our example, actually), which can be quite tedious from the end user point of view.

References
----------

*   [https://api.rubyonrails.org/classes/ActiveRecord/Locking/Pessimistic.html](https://api.rubyonrails.org/classes/ActiveRecord/Locking/Pessimistic.html)
*   [https://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html](https://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html)
*   [https://blog.engineyard.com/2011/a-guide-to-optimistic-locking](https://blog.engineyard.com/2011/a-guide-to-optimistic-locking)
*   [https://en.wikipedia.org/wiki/Locking\_(computer\_science)#Database\_locks](https://en.wikipedia.org/wiki/Locking_(computer_science)#Database_locks)
*   [https://en.wikipedia.org/wiki/Race\_condition](https://en.wikipedia.org/wiki/Race_condition)
*   [https://en.wikipedia.org/wiki/Deadlock](https://en.wikipedia.org/wiki/Deadlock)

#### Notes

\[1\] Note that some RDBMS put locks on the whole table, not on the records.  
  
[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)