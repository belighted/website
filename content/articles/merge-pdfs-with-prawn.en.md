---
lang: en
slug: merge-pdfs-with-prawn
originalPath: https://www.belighted.com/blog/merge-pdfs-with-prawn
title: Merge a bunch of Pdfs into a resulting one with Prawn
author: Stéphane A.
description: You have a bunch of Pdf documents? You want to concatenate them all
  into a resulting one? Using Prawn is your solution.
image: null
date: 2013-03-08
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
You have a bunch of Pdf documents and you want to concatenate them all into a resulting one, using the Prawn gem and this small piece of code, it’s now easily doable !

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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'prawn'</span></span>
</span><span class="line">
</span><span class="line"><span class="n">pdf_file_paths</span> <span class="o">=</span> <span class="o">[</span><span class="s2"><span class="string">"1.pdf"</span></span><span class="p">,</span> <span class="s2"><span class="string">"2.pdf"</span></span><span class="o">]</span>
</span><span class="line"><span class="ss"><span class="constant">Prawn</span></span><span class="constant"><span class="p">:</span><span class="ss">:Document</span></span><span class="ss"></span><span class="o">.</span><span class="n">generate</span><span class="p">(</span><span class="s2"><span class="string">"result.pdf"</span></span><span class="p">,</span> <span class="p">{</span><span class="ss"><span class="symbol">:page_size</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'A4'</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:skip_page_creation</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">true</span></span><span class="p">})</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">pdf</span><span class="o">|</span>
</span><span class="line"> <span class="n">pdf_file_paths</span><span class="o">.</span><span class="n">each</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">pdf_file</span><span class="o">|</span>
</span><span class="line"> <span class="k"><span class="keyword">if</span></span> <span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">exists?</span><span class="p">(</span><span class="n">pdf_file</span><span class="p">)</span>
</span><span class="line"> <span class="n">pdf_temp_nb_pages</span> <span class="o">=</span> <span class="ss"><span class="constant">Prawn</span></span><span class="constant"><span class="p">:</span><span class="ss">:Document</span></span><span class="ss"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss"><span class="symbol">:template</span></span> <span class="o">=&gt;</span> <span class="n">pdf_file</span><span class="p">)</span><span class="o">.</span><span class="n">page_count</span>
</span><span class="line"> <span class="p">(</span><span class="mi"><span class="number">1</span></span><span class="o">.</span><span class="n">.pdf_temp_nb_pages</span><span class="p">)</span><span class="o">.</span><span class="n">each</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">i</span><span class="o">|</span>
</span><span class="line"> <span class="n">pdf</span><span class="o">.</span><span class="n">start_new_page</span><span class="p">(</span><span class="ss"><span class="symbol">:template</span></span> <span class="o">=&gt;</span> <span class="n">pdf_file</span><span class="p">,</span> <span class="ss"><span class="symbol">:template_page</span></span> <span class="o">=&gt;</span> <span class="n">i</span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

If you want this feature fully integrated in the next Prawn version, just support **[my issue](https://github.com/prawnpdf/prawn/issues/376)** on Github !  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)