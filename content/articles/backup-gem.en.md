---
lang: en
slug: backup-gem
originalPath: https://www.belighted.com/blog/backup-gem
title: Backup gem
author: Philippe V.
description: The ultimate tool to manage your backup policy !
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
We all know that data is the most valuable asset of our client. Even if we know that fact, we tend to not handle it with the care it deserves and far too often we find ourselves in a position where we need to fix it or retrieve its previous state. That’s when most of us think to theirselves “I knew I should have setup the backup last week/month/year”

But why didn’t we do it ? Because it is booOOooring !

Rejoice everyone ! With the backup gem ( [https://github.com/meskyanichi/backup](https://github.com/meskyanichi/backup)) you can now : - setup a generational backup of your files and your DB in a few minutes ( + the time for reading the excellent documentation ) - keep your backup settings with your project files - schedule precisely when your backup should be performed - be notified of your failing backup - store your backup locally and/or in the cloud

The basic setup proposed on the official doc is to setup the backup directly on the server but we found it much easier to keep it with our project files. Therefore the first step is to add it to your Gemfile (without requiring it since it is not a dependency of your production code ). We are also going to add the whenever gem in order to setup some cron jobs for performing the backup regularly.

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># Backup utilities</span></span>
</span><span class="line"><span class="n">gem</span> <span class="s2"><span class="string">"backup"</span></span> <span class="p">,</span> <span class="ss"><span class="symbol">:require</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">false</span></span>
</span><span class="line"><span class="n">gem</span> <span class="s2"><span class="string">"whenever"</span></span> <span class="p">,</span> <span class="ss"><span class="symbol">:require</span></span> <span class="o">=&gt;</span> <span class="kp"><span class="keyword">false</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Next step is to configure the backup. Since we are working in a rails project, we will put the backup configuration under a “config/backup” subdirectory. The main config file will be used to define some configuration properties shared between the multiple triggers. We will then setup multiple triggers in order to have a multi-generational backup.

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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># config/backup/config.rb</span></span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># since we are stroring the backup config with the project files and not on the server</span></span>
</span><span class="line"><span class="c1"><span class="comment"># it is a good idea to keep track of the project root</span></span>
</span><span class="line"><span class="no"><span class="constant">FS_ROOT</span></span> <span class="o">=</span> <span class="no"><span class="constant">Pathname</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="no"><span class="constant">Config</span></span><span class="o">.</span><span class="n">config_file</span><span class="p">)</span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s1"><span class="string">'..'</span></span><span class="p">,</span> <span class="s1"><span class="string">'..'</span></span><span class="p">,</span> <span class="s1"><span class="string">'..'</span></span><span class="p">)</span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment"># * * * * * * * * * * * * * * * * * * * *</span></span>
</span><span class="line"><span class="c1"><span class="comment"># Do Not Edit Below Here.</span></span>
</span><span class="line"><span class="c1"><span class="comment"># All Configuration Should Be Made Above.</span></span>
</span><span class="line">
</span><span class="line"><span class="c1"><span class="comment">##</span></span>
</span><span class="line"><span class="c1"><span class="comment"># Load all models from the models directory.</span></span>
</span><span class="line">
</span><span class="line"><span class="no"><span class="constant">Dir</span></span><span class="o">[</span><span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">dirname</span><span class="p">(</span><span class="no"><span class="constant">Config</span></span><span class="o">.</span><span class="n">config_file</span><span class="p">),</span> <span class="s2"><span class="string">"models"</span></span><span class="p">,</span> <span class="s2"><span class="string">"*.rb"</span></span><span class="p">)</span><span class="o">].</span><span class="n">each</span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">model</span><span class="o">|</span>
</span><span class="line"> <span class="nb">instance_eval</span><span class="p">(</span><span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">read</span><span class="p">(</span><span class="n">model</span><span class="p">))</span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

The default backup config generator creates a subdirectory named “models” where it stores the different triggers. Even if we can easily change that directory name (and change the main config file accordingly) we find it a good idea to keep the same nomenclature as the other users of the gem.

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
<span class="line-number">24</span>
<span class="line-number">25</span>
<span class="line-number">26</span>
<span class="line-number">27</span>
<span class="line-number">28</span>
<span class="line-number">29</span>
<span class="line-number">30</span>
<span class="line-number">31</span>
<span class="line-number">32</span>
<span class="line-number">33</span>
<span class="line-number">34</span>
<span class="line-number">35</span>
<span class="line-number">36</span>
<span class="line-number">37</span>
<span class="line-number">38</span>
<span class="line-number">39</span>
<span class="line-number">40</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># config/backup/models/hourly.rb</span></span>
</span><span class="line"><span class="c1"><span class="comment"># https://github.com/meskyanichi/backup</span></span>
</span><span class="line">
</span><span class="line"><span class="ss"><span class="constant">Backup</span></span><span class="constant"><span class="p">:</span><span class="ss">:Model</span></span><span class="ss"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss"><span class="symbol">:hourly</span></span><span class="p">,</span> <span class="s1"><span class="string">'Backup DB and files hourly and keep them 48 hours'</span></span><span class="p">)</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">split_into_chunks_of</span> <span class="mi"><span class="number">250</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:avatars</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/avatars"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:generated_pdfs</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/generated_pdfs"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:uploads</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/uploads"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">database</span> <span class="no"><span class="constant">PostgreSQL</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">db</span><span class="o">|</span>
</span><span class="line"> <span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'yaml'</span></span>
</span><span class="line"> <span class="n">db_config_file</span> <span class="o">=</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s1"><span class="string">'config'</span></span><span class="p">,</span> <span class="s1"><span class="string">'database.yml'</span></span><span class="p">)</span>
</span><span class="line"> <span class="n">env</span> <span class="o">=</span> <span class="no"><span class="constant">ENV</span></span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="s1"><span class="string">'RAILS_ENV'</span></span><span class="p">){</span><span class="s1"><span class="string">'development'</span></span><span class="p">}</span>
</span><span class="line"> <span class="n">parsed_file</span> <span class="o">=</span> <span class="no"><span class="constant">ERB</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">read</span><span class="p">(</span><span class="n">db_config_file</span><span class="p">))</span><span class="o">.</span><span class="n">result</span>
</span><span class="line"> <span class="n">db_config</span> <span class="o">=</span> <span class="no"><span class="constant">YAML</span></span><span class="o">.</span><span class="n">load</span><span class="p">(</span><span class="n">parsed_file</span><span class="p">)</span><span class="o">[</span><span class="n">env</span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">name</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'database'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">username</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'username'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">password</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'password'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">host</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'host'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">additional_options</span> <span class="o">=</span> <span class="o">[</span><span class="s2"><span class="string">"-E=utf8"</span></span><span class="o">]</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">store_with</span> <span class="no"><span class="constant">Local</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">local</span><span class="o">|</span>
</span><span class="line"> <span class="n">local</span><span class="o">.</span><span class="n">path</span> <span class="o">=</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s1"><span class="string">'backups'</span></span><span class="p">)</span><span class="o">.</span><span class="n">expand_path</span>
</span><span class="line"> <span class="n">local</span><span class="o">.</span><span class="n">keep</span> <span class="o">=</span> <span class="mi"><span class="number">48</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">compress_with</span> <span class="no"><span class="constant">Gzip</span></span>
</span><span class="line">
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

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
<span class="line-number">24</span>
<span class="line-number">25</span>
<span class="line-number">26</span>
<span class="line-number">27</span>
<span class="line-number">28</span>
<span class="line-number">29</span>
<span class="line-number">30</span>
<span class="line-number">31</span>
<span class="line-number">32</span>
<span class="line-number">33</span>
<span class="line-number">34</span>
<span class="line-number">35</span>
<span class="line-number">36</span>
<span class="line-number">37</span>
<span class="line-number">38</span>
<span class="line-number">39</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment"># config/backup/models/daily.rb</span></span>
</span><span class="line"><span class="c1"><span class="comment"># https://github.com/meskyanichi/backup</span></span>
</span><span class="line">
</span><span class="line"><span class="ss"><span class="constant">Backup</span></span><span class="constant"><span class="p">:</span><span class="ss">:Model</span></span><span class="ss"></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss"><span class="symbol">:daily</span></span><span class="p">,</span> <span class="s1"><span class="string">'Backup DB and files daily and keep them 15 days'</span></span><span class="p">)</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">split_into_chunks_of</span> <span class="mi"><span class="number">250</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:avatars</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/avatars"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:generated_pdfs</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/generated_pdfs"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">archive</span> <span class="ss"><span class="symbol">:uploads</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">archive</span><span class="o">|</span>
</span><span class="line"> <span class="n">archive</span><span class="o">.</span><span class="n">add</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s2"><span class="string">"public/uploads"</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">database</span> <span class="no"><span class="constant">PostgreSQL</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">db</span><span class="o">|</span>
</span><span class="line"> <span class="nb"><span class="keyword">require</span></span> <span class="s1"><span class="string">'yaml'</span></span>
</span><span class="line"> <span class="n">db_config_file</span> <span class="o">=</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s1"><span class="string">'config'</span></span><span class="p">,</span> <span class="s1"><span class="string">'database.yml'</span></span><span class="p">)</span>
</span><span class="line"> <span class="n">env</span> <span class="o">=</span> <span class="no"><span class="constant">ENV</span></span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="s1"><span class="string">'RAILS_ENV'</span></span><span class="p">){</span><span class="s1"><span class="string">'development'</span></span><span class="p">}</span>
</span><span class="line"> <span class="n">parsed_file</span> <span class="o">=</span> <span class="no"><span class="constant">ERB</span></span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="no"><span class="constant">File</span></span><span class="o">.</span><span class="n">read</span><span class="p">(</span><span class="n">db_config_file</span><span class="p">))</span><span class="o">.</span><span class="n">result</span>
</span><span class="line"> <span class="n">db_config</span> <span class="o">=</span> <span class="no"><span class="constant">YAML</span></span><span class="o">.</span><span class="n">load</span><span class="p">(</span><span class="n">parsed_file</span><span class="p">)</span><span class="o">[</span><span class="n">env</span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">name</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'database'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">username</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'username'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">password</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'password'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">host</span> <span class="o">=</span> <span class="n">db_config</span><span class="o">[</span><span class="s1"><span class="string">'host'</span></span><span class="o">]</span>
</span><span class="line"> <span class="n">db</span><span class="o">.</span><span class="n">additional_options</span> <span class="o">=</span> <span class="o">[</span><span class="s2"><span class="string">"-E=utf8"</span></span><span class="o">]</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">store_with</span> <span class="no"><span class="constant">Local</span></span> <span class="k"><span class="keyword">do</span></span> <span class="o">|</span><span class="n">local</span><span class="o">|</span>
</span><span class="line"> <span class="n">local</span><span class="o">.</span><span class="n">path</span> <span class="o">=</span> <span class="no"><span class="constant">FS_ROOT</span></span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="s1"><span class="string">'backups'</span></span><span class="p">)</span><span class="o">.</span><span class="n">expand_path</span>
</span><span class="line"> <span class="n">local</span><span class="o">.</span><span class="n">keep</span> <span class="o">=</span> <span class="mi"><span class="number">15</span></span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"> <span class="n">compress_with</span> <span class="no"><span class="constant">Gzip</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

These two file are very simple examples of trigger files. The [doc](https://github.com/meskyanichi/backup/wiki) is really excellent at explaining all the options for other DBs, storing to the cloud, notifying successful and failed backups, etc.

The main details in those two files are the different name of the triggers and the number of backup to keep. The store path is the same because the trigger name will automatically be appended to it. The database block uses the database.yml file in order to make a dump of the database.

On our server, the “project\_root/backups” directory is automatically replaced by a symbolic link targetting a special directory on the server. This configuration allows us to have a structure working either in our development environment, our staging environment and our production environment.

We can now use the whenever gem to schedule the different triggers :

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
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="c1"><span class="comment">#config/shedule.rb</span></span>
</span><span class="line">
</span><span class="line"><span class="n">set</span> <span class="ss"><span class="symbol">:environment</span></span><span class="p">,</span> <span class="no"><span class="constant">ENV</span></span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="n">environment_variable</span><span class="p">){</span><span class="s1"><span class="string">'development'</span></span><span class="p">}</span>
</span><span class="line">
</span><span class="line"><span class="n">job_type</span> <span class="ss"><span class="symbol">:bundle_exec</span></span><span class="p">,</span> <span class="s2"><span class="string">"cd :path &amp;&amp; :environment_variable=:environment bundle exec :task :output"</span></span>
</span><span class="line">
</span><span class="line"><span class="n">every</span> <span class="mi"><span class="number">1</span></span><span class="o">.</span><span class="n">hour</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">bundle_exec</span> <span class="s1"><span class="string">'backup perform --trigger hourly --config-file ./config/backup/config.rb --data-path ./backups --tmp-path ./tmp'</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"><span class="n">every</span> <span class="mi"><span class="number">1</span></span><span class="o">.</span><span class="n">day</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">bundle_exec</span> <span class="s1"><span class="string">'backup perform --trigger daily --config-file ./config/backup/config.rb --data-path ./backups --tmp-path ./tmp'</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"><span class="n">every</span> <span class="mi"><span class="number">1</span></span><span class="o">.</span><span class="n">week</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">bundle_exec</span> <span class="s1"><span class="string">'backup perform --trigger weekly --config-file ./config/backup/config.rb --data-path ./backups --tmp-path ./tmp'</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span><span class="line">
</span><span class="line"><span class="n">every</span> <span class="mi"><span class="number">1</span></span><span class="o">.</span><span class="n">month</span> <span class="k"><span class="keyword">do</span></span>
</span><span class="line"> <span class="n">bundle_exec</span> <span class="s1"><span class="string">'backup perform --trigger monthly --config-file ./config/backup/config.rb --data-path ./backups --tmp-path ./tmp'</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div><div class="highlight"><span class="hs-cta-wrapper" id="hs-cta-wrapper-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><span class="hs-cta-node hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2" id="hs-cta-fb3606cc-cc1b-47d0-ae85-2c9f69837fe2"><a href="/content/images/legacy/AXiCET7u5jZd-YyzgzFaY.png" alt="New Call-to-action"></a></span></span></div></figure>