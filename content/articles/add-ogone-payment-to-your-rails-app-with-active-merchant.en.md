---
lang: en
slug: add-ogone-payment-to-your-rails-app-with-active-merchant
originalPath: https://www.belighted.com/blog/add-ogone-payment-to-your-rails-app-with-active-merchant
title: Add Ogone payment to your Rails app with active_merchant
author: Joel C.
description: We recently added a few functionality to the Ogone payment
  processing gem. It's a good time to take it from the top and detail how you
  can use this service in your own Rails application.
image: null
date: 1325376000000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
We recently added a few functionality to the **[Ogone](https://www.ogone.com)** gateway of the popular **[active\_merchant](https://github.com/Shopify/active_merchant)** payment processing gem, and felt it was a good time to take it from the top and detail how you can use this service in your own Rails application.

> **Warning:** Handling and storing bank information is a dangerous task, and may be regulated in your country. Make sure your application conforms to the required norms and standards ( **[PSI DSS](https://www.pcisecuritystandards.org/security_standards/getting_started.php)** might be a good place to start) before implementing payment yourself.

Installation
------------

As usual, you will need to add active\_merchant to your Gemfile:

<figure class="code"><figcaption><span>Gemfile</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">gem</span> <span class="s1"><span class="string">'activemerchant'</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Then you need to create a new Ogone gateway with your account settings. Depending on how often and where you accept payments, you may want to put this in a initializer:

<figure class="code"><figcaption><span>active_merchant.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="no"><span class="constant">OGONE_GATEWAY</span></span> <span class="o">=</span> <span class="no"><span class="constant">ActiveMerchant</span></span><span class="constant"><span class="o">::</span><span class="no">Billing</span><span class="o">::</span><span class="no">OgoneGateway</span></span><span class="no"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span>
</span><span class="line"> <span class="ss"><span class="symbol">:login</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"login of your Ogone account (PDPID)"</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:user</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"username of API user (Userid)"</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:password</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"password for API user"</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:signature</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"SHA-IN Pass phrase"</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:signature_encryptor</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"sha512"</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:test</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span> <span class="c1"><span class="comment"># Change to false when using your production account</span></span>
</span><span class="line"><span class="p">)</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Usage
-----

To make a simple payment, create a credit card and make a purchase with it:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">credit_card</span> <span class="o">=</span> <span class="no"><span class="constant">ActiveMerchant</span></span><span class="constant"><span class="o">::</span><span class="no">Billing</span><span class="o">::</span><span class="no">CreditCard</span></span><span class="no"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span>
</span><span class="line"> <span class="ss"><span class="symbol">:first_name</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'John'</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:last_name</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'Matrix'</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:number</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'4111 1111 1111 1111'</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:month</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">4</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:year</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">2013</span></span><span class="p">,</span>
</span><span class="line"> <span class="ss"><span class="symbol">:verification_value</span></span> <span class="o">=&gt;</span> <span class="mi"><span class="number">123</span></span> <span class="c1"><span class="comment"># CVC code</span></span>
</span><span class="line"><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Charge 10 EUR</span></span>
</span><span class="line"><span class="n">response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">purchase</span><span class="p">(</span><span class="mi"><span class="number">1000</span></span><span class="p">,</span> <span class="n">credit_card</span><span class="p">,</span> <span class="ss"><span class="symbol">:order_id</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"1"</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:store</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"john_matrix"</span></span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="nb">puts</span> <span class="n">response</span><span class="o">.</span><span class="n">success?</span> <span class="c1"><span class="comment"># Check whether the transaction was successful</span></span>
</span><span class="line"><span class="nb">puts</span> <span class="n">response</span><span class="o">.</span><span class="n">message</span> <span class="c1"><span class="comment"># Retrieve the message returned by Ogone</span></span>
</span><span class="line"><span class="nb">puts</span> <span class="n">response</span><span class="o">.</span><span class="n">authorization</span> <span class="c1"><span class="comment"># Retrieve the unique transaction ID returned by Ogone (you should save this somewhere)</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

`order_id` is optional, and will be automatically generated by Ogone if left blank. `store` is optional and used to remember a credit card that will be used regularly, but more on this in a while.

Refunds and authorization
-------------------------

Making a refund is as easy as charging a customer, simply call `refund` with the authorization you received after calling `purchase`:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># Refund 10 EUR</span></span>
</span><span class="line"><span class="n">refund_response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">refund</span><span class="p">(</span><span class="mi"><span class="number">1000</span></span><span class="p">,</span> <span class="n">response</span><span class="o">.</span><span class="n">authorization</span><span class="p">)</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Transactions can also be done in two steps. First, we will `authorize` the amount on the credit card, which will make sure it is available, and freeze it on the credit card for 7 days. Within these 7 days, we can then `capture` the amount to make the actual transaction.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># Freeze 10 EUR on the credit card</span></span>
</span><span class="line"><span class="n">response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">authorize</span><span class="p">(</span><span class="mi"><span class="number">1000</span></span><span class="p">,</span> <span class="n">credit_card</span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Charge the frozen 10 EUR</span></span>
</span><span class="line"><span class="n">capture_response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">capture</span><span class="p">(</span><span class="mi"><span class="number">1000</span></span><span class="p">,</span> <span class="n">response</span><span class="o">.</span><span class="n">authorization</span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Or unfreeze them</span></span>
</span><span class="line"><span class="n">void_response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">void</span><span class="p">(</span><span class="n">response</span><span class="o">.</span><span class="n">authorization</span><span class="p">)</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Storing credit cards
--------------------

As I mentioned before, you can store credit cards you charge regularly using Ogone’s Alias feature. This can be done either at the first purchase with the `store` option, or using the new `store` method.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># Storing at first purchase</span></span>
</span><span class="line"><span class="n">response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">purchase</span><span class="p">(</span><span class="mi"><span class="number">1000</span></span><span class="p">,</span> <span class="n">credit_card</span><span class="p">,</span> <span class="ss"><span class="symbol">:store</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"john_matrix"</span></span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Storing without a purchase</span></span>
</span><span class="line"><span class="n">response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">store</span><span class="p">(</span><span class="n">credit_card</span><span class="p">,</span> <span class="ss"><span class="symbol">:store</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"john_matrix"</span></span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Storing with an Ogone-generated alias</span></span>
</span><span class="line"><span class="n">response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">store</span><span class="p">(</span><span class="n">credit_card</span><span class="p">)</span>
</span><span class="line"><span class="nb">puts</span> <span class="n">response</span><span class="o">.</span><span class="n"><span class="keyword">alias</span></span> <span class="c1"><span class="comment"># Retrieve the generated alias</span></span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># Future purchases can now be made using the alias:</span></span>
</span><span class="line"><span class="n">new_response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">purchase</span><span class="p">(</span><span class="mi"><span class="number">2000</span></span><span class="p">,</span> <span class="s2"><span class="string">"john_matrix"</span></span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># The alias can be used any time in place of the credit card:</span></span>
</span><span class="line"><span class="n">new_response</span> <span class="o">=</span> <span class="no"><span class="constant">OGONE_GATEWAY</span></span><span class="o">.</span><span class="n">authorize</span><span class="p">(</span><span class="mi"><span class="number">1500</span></span><span class="p">,</span> <span class="s2"><span class="string">"john_matrix"</span></span><span class="p">)</span>
</span></code></pre></td></tr></tbody></table><p><span class="hs-cta-wrapper" id="hs-cta-wrapper-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><span class="hs-cta-node hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2" id="hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><a href="/content/images/legacy/AXiCET7u5jZd-YyzgzFaY.png" alt="New Call-to-action"></a></span></span></p></div></figure>