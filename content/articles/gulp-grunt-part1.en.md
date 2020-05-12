---
lang: en
slug: gulp-grunt-part1
originalPath: https://www.belighted.com/blog/gulp-grunt-part1
title: "Gulp & Grunt: How to automate the work of front-end developer?"
author: Simon H.
description: An introduction to some new tools that make your life easier as a
  front-end developer.
image: null
date: 2014-03-26
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
![/content/images/legacy/rR0iUW8zPzJMnZnz_3dOU.jpg)

_This article will be split in two distinct parts: the first will be more “theoretical” and will explain the main principles of Gulp and Grunt, as well as what I prefer to use; in the second, we will show you how to build a boilerplate for your project (in both way)._

As front-end developers, we are often faced in our daily work with recurring and time consuming tasks. For the sake of efficiency and comfort of work, we have listed a few things that could improve the workflow of our team:

*   Fast and automated creation of a common working environment.
*   Automation of tasks such as image compression, JS files concatenation or SASS files compilation.

To meet these needs, two tools are in competition: Grunt and Gulp.

Grunt and Gulp are two task runners that automate most tasks (compilation, test creation,…), saving time and helping us to focus on the essential: development.

Ultimately, Grunt and Gulp do exactly the same job. The communities around the two systems are quite large and modules can be found fairly easily for each of the two systems. What differentiates the two is their mode of operation.

Grunt
-----

Grunt works on the principle of “per plugins” configuration. This means that each plugin must be independently configured and used in tasks. Here’s how a plugin is configured, with options, a source and sometimes a destination file:

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
</pre></td><td class="code"><pre><code class="undefined"><span class="line">sass: {
</span><span class="line"> dist: {
</span><span class="line"> options: {
</span><span class="line"> style: 'expanded'
</span><span class="line"> },
</span><span class="line"> files: {
</span><span class="line"> 'dist/assets/css/main.css': 'src/styles/main.scss',
</span><span class="line"> }
</span><span class="line"> }
</span><span class="line">},
</span><span class="line">
</span><span class="line">autoprefixer: {
</span><span class="line"> dist: {
</span><span class="line"> options: {
</span><span class="line"> browsers: [
</span><span class="line"> 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
</span><span class="line"> ]
</span><span class="line"> },
</span><span class="line"> src: 'dist/assets/css/main.css',
</span><span class="line"> dest: 'dist/assets/css/main.css'
</span><span class="line"> }
</span><span class="line">},
</span><span class="line">
</span><span class="line">grunt.registerTask('styles', ['sass', 'autoprefixer']);</span></code></pre></td></tr></tbody></table></div></figure>

This methodology allows to configure plugins, then inject them into tasks.

The advantage is that each plug-in is independent of the others.

The downside is manipulating files between tasks. If you plan a series of tasks via plug-ins, this means that the files will be handled as many times as the number of defined tasks.

Gulp
----

Gulp, meanwhile, works on the principle of “per tasks” configuration. The big difference is that here we will configure and inject all the plugins we need within the task configuration:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line">gulp.task(<span class="string">'sass'</span>, function() {
</span><span class="line"> <span class="keyword">return</span> gulp.src(<span class="string">'src/styles/main.scss'</span>)
</span><span class="line"> .pipe(sass({ style<span class="symbol">:</span> <span class="string">'compressed'</span> }))
</span><span class="line"> .pipe(autoprefixer(<span class="string">'last 2 version'</span>, <span class="string">'safari 5'</span>, <span class="string">'ie 8'</span>, <span class="string">'ie 9'</span>, <span class="string">'opera 12.1'</span>, <span class="string">'ios 6'</span>, <span class="string">'android 4'</span>))
</span><span class="line"> .pipe(gulp.dest(<span class="string">'dist/assets/css'</span>))
</span><span class="line">});</span></code></pre></td></tr></tbody></table></div></figure>

The situation here is quite different: the different desired plugins are injected into the “pipe”.

The advantage of Gulp is that the file does not pass from one task to another, but is transformed once. This prevents handling the final files multiple times. It also use the powerful NodeJS Stream (see at the end of this article for Stream)

The disadvantage is that the same configuration for a task can be repeated multiple times. (If we take care of the HTML files in a different way, it is possible to have re-write the same code in multiple places)

Conclusion
----------

Both technologies meet our needs, with the same result. The big difference is their functional approach. You may prefer to configure the entire plugins and add tasks or conversely, create jobs and inject plugins.

Next week we will dive deeper in these two technologies, with more specific examples. So stay tuned!

Here are some good articles about streams:

*   **[https://github.com/substack/stream-handbook](https://github.com/substack/stream-handbook)**

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)