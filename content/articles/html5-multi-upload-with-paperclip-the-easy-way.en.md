---
lang: en
slug: html5-multi-upload-with-paperclip-the-easy-way
originalPath: https://www.belighted.com/blog/html5-multi-upload-with-paperclip-the-easy-way
title: "HTML5 multi upload with paperclip: The easy way"
author: Yannick S.
description: You sometimes need to attach many files to a rails model, you can
  find a lot of tutorials on the web. Here is a simple way to do it.
image: null
date: 1325376000000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
If you sometimes need to attach many files to a rails model, we find on the web a lot of tutos with uploadify and so on. Here is a simple way to do it only with HTML5, paperclip and rails.

<figure class="code"><figcaption><span>attachment.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Attachment</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line"> <span class="n">belongs_to</span> <span class="ss"><span class="symbol">:note</span></span>
</span><span class="line"> <span class="n">has_attached_file</span> <span class="ss"><span class="symbol">:attachment</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

<figure class="code"><figcaption><span>note.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Note</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActiveRecord</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line"> <span class="n">has_many</span> <span class="ss"><span class="symbol">:attachments</span></span>
</span><span class="line"> <span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">attachments_array</span></span><span class="title"><span class="o">=</span></span><span class="o"></span><span class="p"><span class="params">(</span></span><span class="params"><span class="n">array</span><span class="p">)</span></span><span class="p"></span></span><span class="p"></span>
</span><span class="line"> <span class="n">array</span><span class="o">.</span><span class="n">each</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">file</span><span class="o">|</span>
</span><span class="line"> <span class="n">attachments</span><span class="o">.</span><span class="n">build</span><span class="p">(</span><span class="ss"><span class="symbol">:attachment</span></span> <span class="o">=&gt;</span> <span class="n">file</span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

With only that little of HTML5 magic, we can upload has many files that we want only by adding this input file in the note form.

<figure class="code"><figcaption><span>note_form.html</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="html undefined"><span class="line"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">file</span> <span class="na">name=</span><span class="s">attachments_array</span> <span class="na">multiple</span> <span class="nt">/&gt;</span></span></code></pre></td></tr></tbody></table><p><span class="hs-cta-wrapper" id="hs-cta-wrapper-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><span class="hs-cta-node hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2" id="hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><a href="/content/images/legacy/XJLxUBV_xCUWXMj4IM4v3.png" alt="New Call-to-action" align="middle"></a></span></span></p></div></figure>