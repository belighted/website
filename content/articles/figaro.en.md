---
lang: en
slug: figaro
originalPath: https://www.belighted.com/blog/figaro
title: Figaro gem - Simple, Heroku-friendly Rails app configuration using ENV
  and a single YAML file
author: Stéphane A.
description: An overview of the figaro gem, a library tailored to handle app
  variables configuration on many deployment platforms including heroku.
image: null
date: 2014-01-20
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
![](https://github-camo.global.ssl.fastly.net/5172f94b51071b7f0164beb8a7dc5e9d371fd150/687474703a2f2f696d61676573322e77696b69612e6e6f636f6f6b69652e6e65742f5f5f636232303130303632383139323732322f6469736e65792f696d616765732f352f35332f50696e6f636368696f2d70696e6f636368696f2d343934373839302d3936302d3732302e6a7067)

Even if you’re kind enough to offer your hard work to the community (as a just reward for all the pretty gems we use every day), it quickly comes to your mind that some parts of your credentials need to be kept private (even for an open source project). These risks can be avoided by setting ENV variables (key/value) on your local environment and calling them in your code.

<figure class="code"><figcaption><span>config/initializers/credentials.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="no"><span class="constant">MyApp</span></span><span class="o">.</span><span class="n">app_id</span> <span class="o">=</span> <span class="no"><span class="constant">ENV</span></span><span class="o">[</span><span class="s2"><span class="string">"MY_APP_ID"</span></span><span class="o">]</span>
</span><span class="line"><span class="no"><span class="constant">MyApp</span></span><span class="o">.</span><span class="n">key</span> <span class="o">=</span> <span class="no"><span class="constant">ENV</span></span><span class="o">[</span><span class="s2"><span class="string">"MY_APP_KEY"</span></span><span class="o">]</span>
</span><span class="line"><span class="no"><span class="constant">MyApp</span></span><span class="o">.</span><span class="n">secret</span> <span class="o">=</span> <span class="no"><span class="constant">ENV</span></span><span class="o">[</span><span class="s2"><span class="string">"MY_APP_SECRET"</span></span><span class="o">]</span>
</span></code></pre></td></tr></tbody></table></div></figure>

As an alternative, that could furthermore allow you to set environment specific variables, comes the figaro gem.

Simply add `gem "figaro"` to your gemfile and run the `bundle install` command.

Next step is to launch `rails generate figaro:install` which will create the `config/application.yml` file and add it into your `.gitignore`.

You don’t even need to update your initialization file, the gem handle the ENV variable creation and as mentioned earlier in this post, you can now specify some values according to the environment.

<figure class="code"><figcaption><span>config/application.yml</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="yaml undefined"><span class="line"><span class="l-Scalar-Plain">MY_APP_ID</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">111111</span>
</span><span class="line"><span class="l-Scalar-Plain">development</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">MY_APP_ID</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">222222</span>
</span><span class="line"><span class="l-Scalar-Plain">staging</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">MY_APP_ID</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">333333</span>
</span><span class="line"><span class="l-Scalar-Plain">production</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">MY_APP_ID</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">444444</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Let’s now deploy it !
---------------------

Either with capistrano:

And then you should consider adding something like this into your `deploy.rb` script:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">namespace</span> <span class="ss"><span class="symbol">:deploy</span></span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">desc</span> <span class="s1"><span class="string">'Symlink shared directories and files'</span></span>
</span><span class="line"> <span class="n">task</span> <span class="ss"><span class="symbol">:symlink_directories_and_files</span></span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">run</span> <span class="s2"><span class="string">"ln -s </span></span><span class="string"><span class="si"><span class="subst">#{</span></span><span class="subst"><span class="n">shared_path</span><span class="si">}</span></span><span class="si"></span><span class="s2">/config/application.yml </span><span class="si"><span class="subst">#{</span></span><span class="subst"><span class="n">release_path</span><span class="si">}</span></span><span class="si"></span><span class="s2">/config/application.yml"</span></span><span class="s2"></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Or, if you’re using platform like Heroku, the gem includes a nice Rake task which allows you to set all the needed ENV variables:

`rake figaro:heroku`

For further information:

*   **[https://github.com/laserlemon/figaro](https://github.com/laserlemon/figaro)**
*   [**https://railsapps.github.io/rails-environment-variables.html**  
    ](https://railsapps.github.io/rails-environment-variables.html)

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)