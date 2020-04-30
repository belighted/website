---
lang: en
slug: enable-new-relic-monitoring-with-puma
originalPath: https://www.belighted.com/blog/enable-new-relic-monitoring-with-puma
title: Enable New Relic monitoring with Puma
author: Kévin V.
description: Today we tried out Puma for you. This resulted in different
  feedbacks that are published in this post.
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Today I wanted to try out Puma on a Heroku project. Works great, but I quickly realized my app wasn’t reporting to New Relic, which is kind of a bummer. Here’s a compilation of what I found to be working with the latest version, 1.6.2 at the time of writing.

### 1\. Add an environment variable.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="no"><span class="constant">NEWRELIC_DISPATCHER</span></span><span class="o">=</span><span class="n">puma</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Or, if you use something like [Figaro](https://github.com/laserlemon/figaro), just add the following to your `application.yml`, and run the `rake figaro:heroku` task.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="no"><span class="constant">NEWRELIC_DISPATCHER</span></span><span class="p"><span class="symbol">:</span></span> <span class="n">puma</span>
</span></code></pre></td></tr></tbody></table></div></figure>

### 2\. Add it to your New Relic config.

Paste the followig in your `newrelic.yml` config file.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="ss">dispatcher</span><span class="p"><span class="symbol">:</span></span> <span class="s1"><span class="string">'puma'</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

There, two easy steps and it’s all better.

See you next time !

[![New Call-to-action](/images/legacy-cta/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)