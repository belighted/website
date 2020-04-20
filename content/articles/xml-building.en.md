---
lang: en
slug: xml-building
originalPath: https://www.belighted.com/blog/xml-building
title: Handcrafted xml files with Ruby!
author: Stéphane A.
description: How to easily write your own XML files in Ruby ! 2 methods accessible for all !
image: ./images/blog%20tech%20standard%20image-1.png
date: 1388534400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
On a daily basis we build API in order to feed all our projects ( such as our hot new [NomadSuite](https://nomadsuite.com/) ) and in our way to face such difficulties, we rely on the good old JSON format.

But sometimes, the industry standards required us to use the well known and spread XML format.

Here are two gems that can allow you to easily craft your own xml file, an old one called [Builder](https://github.com/jimweirich/builder) and another, a bit more complete, called [Nokogiri](https://github.com/sparklemotion/nokogiri).

We’ll take this last one to show you, what are these capabilities:

First of all, add `gem "nokogiri"` to your gemfile and run the `bundle install` command.

Then, start to write your script !

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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="n">builder</span> <span class="o">=</span> <span class="ss"><span class="constant">Nokogiri</span></span><span class="constant"><span class="p">:</span><span class="ss">:XML</span><span class="o">::</span><span class="no">Builder</span></span><span class="no"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss"><span class="symbol">:encoding</span></span> <span class="o">=&gt;</span> <span class="s1"><span class="string">'UTF-8'</span></span><span class="p">)</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">xml</span><span class="o">|</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">Documents</span></span> <span class="p">{</span>
</span><span class="line"> <span class="n">documents</span><span class="o">.</span><span class="n">each</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">document</span><span class="o">|</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">Document</span></span> <span class="p">{</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">DocumentTypeH</span></span> <span class="n">document</span><span class="o">.</span><span class="n">document_type</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">DocumentNb</span></span> <span class="n">document</span><span class="o">.</span><span class="n">document_nb</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">Lines</span></span> <span class="p">{</span>
</span><span class="line"> <span class="n">document</span><span class="o">.</span><span class="n">lines</span><span class="o">.</span><span class="n">each_with_index</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">line</span><span class="p">,</span> <span class="n">index</span><span class="o">|</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">Line</span></span> <span class="p">{</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">DocumentType</span></span> <span class="n">document</span><span class="o">.</span><span class="n">document_type</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">DocumentNb</span></span> <span class="n">document</span><span class="o">.</span><span class="n">document_nb</span>
</span><span class="line"> <span class="n">xml</span><span class="o">.</span><span class="n"><span class="constant">LineNb</span></span> <span class="p">(</span><span class="n">index</span> <span class="o">+</span> <span class="mi"><span class="number">1</span></span><span class="p">)</span>
</span><span class="line"> <span class="p">}</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="p">}</span>
</span><span class="line"> <span class="p">}</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"> <span class="p">}</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="n">builder</span><span class="o">.</span><span class="n">to_xml</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Another option that we consider sometimes, is also to use the famous `erb` template language to generate the desired XML output.

For instance, have a look at this small piece of code:

You basicaly need nothing more than ruby (as `erb` is a ruby core library).

Just instanciate the class: `ERB.new(File.read("./documents.xml.erb"), 0, '>').result(binding)` (`binding` allow you to access all call context variables).

Then, here is the XML template:

<figure class="code"><figcaption><span>./documents.xml.erb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="o">&lt;</span><span class="no">Documents</span><span class="o">&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="sx">% documents.each </span><span class="k">do</span> <span class="o">|</span><span class="n">document</span><span class="o">|</span> <span class="sx">%&gt;</span>
</span><span class="line"><span class="sx"> &lt;Document&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="no">DocumentTypeH</span><span class="o">&gt;&lt;</span><span class="sx">%= document.document_type %&gt;&lt;/DocumentTypeH&gt;</span>
</span><span class="line"><span class="sx"> &lt;DocumentNb&gt;&lt;%=</span> <span class="n">document</span><span class="o">.</span><span class="n">document_nb</span> <span class="sx">%&gt;&lt;/DocumentNb&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="no">Lines</span><span class="o">&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="sx">% document.lines.each_with_index </span><span class="k">do</span> <span class="o">|</span><span class="n">line</span><span class="p">,</span> <span class="n">index</span><span class="o">|</span> <span class="sx">%&gt;</span>
</span><span class="line"><span class="sx"> &lt;Line&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="no">DocumentType</span><span class="o">&gt;&lt;</span><span class="sx">%= document.document_type %&gt;&lt;/DocumentType&gt;</span>
</span><span class="line"><span class="sx"> &lt;DocumentNb&gt;&lt;%=</span> <span class="n">document</span><span class="o">.</span><span class="n">document_nb</span> <span class="sx">%&gt;&lt;/DocumentNb&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="no">LineNb</span><span class="o">&gt;&lt;%=</span> <span class="n">index</span> <span class="o">+</span> <span class="mi">1</span> <span class="sx">%&gt;&lt;/LineNb&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="sr">/Line&gt;</span>
</span><span class="line"><span class="sr"> &lt;% end %&gt;</span>
</span><span class="line"><span class="sr"> &lt;/</span><span class="no">Lines</span><span class="o">&gt;</span>
</span><span class="line"> <span class="o">&lt;</span><span class="sr">/Document&gt;</span>
</span><span class="line"><span class="sr"> &lt;% end %&gt;</span>
</span><span class="line"><span class="sr">&lt;/</span><span class="no">Documents</span><span class="o">&gt;</span>
</span></code></pre></td></tr></tbody></table></div></figure>

Don’t hesitate to share your xml creation process !  
  
[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)