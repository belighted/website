---
lang: en
slug: with-a-little-help-from-json-spec-and-rack-test
originalPath: https://www.belighted.com/blog/with-a-little-help-from-json-spec-and-rack-test
title: With a little help from Json_spec and Rack::Test
author: Yannick S.
description: How to use Sinatra, to design a json API in a few days. Discover a
  small example.
image: null
date: 1325376000000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Last week, I had to design a little json API. It had to be fast and furious. For that purpose, we made it with Sinatra.

The point was we didn’t want to make a single file Sinatra app. We made a **[small reusable skeleton](https://github.com/ys/sinatra-skeleton)** of a Sinatra app using ActiveRecord to store the small amount of objects.

It had to be full stack tested. For that we used Rspec and **[Rack Test](https://github.com/brynary/rack-test/)** for the API testing part.

You can easily check the response payload with something like **[json\_spec](https://github.com/collectiveidea/json_spec/)**. It’s so easy to use.

Here is a small example:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"> <span class="o">.</span><span class="n">.</span><span class="o">.</span>
</span><span class="line"> <span class="n">it</span> <span class="s1"><span class="string">'get the greeting'</span></span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">get</span> <span class="s2"><span class="string">"/api/</span></span><span class="string"><span class="si"><span class="subst">#{</span></span><span class="subst"><span class="n">person</span><span class="o">.</span><span class="n">name</span><span class="si">}</span></span><span class="si"></span><span class="s2">"</span></span><span class="s2"></span>
</span><span class="line"> <span class="n">last_response</span><span class="o">.</span><span class="n">should</span> <span class="n">be_ok</span>
</span><span class="line"> <span class="n">last_json</span><span class="o">.</span><span class="n">should</span> <span class="n">have_json_path</span> <span class="s1"><span class="string">'name'</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="o">.</span><span class="n">.</span><span class="o">.</span>
</span></code></pre></td></tr></tbody></table></div></figure>

The `last_json` object is simply a method defined into the spec\_helper.rb file which looks like this:

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
<span class="line-number">16</span>
<span class="line-number">17</span>
<span class="line-number">18</span>
<span class="line-number">19</span>
<span class="line-number">20</span>
<span class="line-number">21</span>
<span class="line-number">22</span>
<span class="line-number">23</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="no"><span class="constant">ENV</span></span><span class="o">[</span><span class="s1"><span class="string">'RACK_ENV'</span></span><span class="o">]</span> <span class="o">=</span> <span class="s1"><span class="string">'test'</span></span>
</span><span class="line"><span class="c1"><span class="comment"># Load the Sinatra app</span></span>
</span><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span> <span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">dirname</span><span class="p">(</span><span class="bp"> __FILE_<span class="number">_</span> </span><span class="p">),</span> <span class="s1"><span class="string">'..'</span></span><span class="p">,</span> <span class="s1"><span class="string">'server'</span></span> <span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'rspec'</span></span>
</span><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'rack/test'</span></span>
</span><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'json_spec'</span></span>
</span><span class="line">
</span><span class="line"><span class="n">set</span> <span class="ss"><span class="symbol">:environment</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:test</span></span>
</span><span class="line">
</span><span class="line"><span class="no"><span class="constant">RSpec</span></span><span class="o">.</span><span class="n">configure</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">conf</span><span class="o">|</span>
</span><span class="line"> <span class="n">conf</span><span class="o">.</span><span class="n"><span class="keyword">include</span></span> <span class="no"><span class="constant">Rack</span></span><span class="constant"><span class="o">::</span><span class="no">Test</span><span class="o">::</span><span class="no">Methods</span></span><span class="no"></span>
</span><span class="line"> <span class="n">conf</span><span class="o">.</span><span class="n"><span class="keyword">include</span></span> <span class="no"><span class="constant">JsonSpec</span></span><span class="constant"><span class="o">::</span><span class="no">Helpers</span></span><span class="no"></span>
</span><span class="line"> <span class="c1"><span class="comment">#all your others informations</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">last_json</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="n">last_response</span><span class="o">.</span><span class="n">body</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">app</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="no"><span class="constant">App</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

With json\_spec, you have access to some great matchers like `be_json_eq`, `have_json_path` or`have_json_size` which help a lot doing things like `have_json_size(0).at_path("friends")`. The doc is really helpful for that.

With Rack::Test, you have a lot of helpers like the classic http methods. And access to an object `last_response` which contains the http response of the last request.

All that helped to get a working API in a couple of days. For more information about the sinatra skeleton, I recommend you another **[blog post](https://blog.yannick.io/blog/2012/07/28/sinatra-skeleton/)** I wrote on my own blog or don’t hesitate to ask as many questions as you want!  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)