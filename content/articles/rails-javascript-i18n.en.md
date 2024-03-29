---
lang: en
slug: rails-javascript-i18n
originalPath: https://www.belighted.com/blog/rails-javascript-i18n
title: Rails, JavaScript and I18n
author: Stéphane A.
description: Here are some techniques, tools and tips that will help you get
  started with I18n, in order to avoid a lot of trouble for your app in the long
  run.
image: null
date: 2012-05-02
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
First and foremost, internationalizing an existing application is a tedious, repetitive task. So even though your customer may not need it as part of the first development, paying attention to this aspect is not only recommended, but often turns out to be quite necessary. This will avoid a lot of trouble for you in the long run!

Here are some techniques, tools and tips that will help you get started. But first, let’s review how i18n (I’m not typing _that_ word a second time) works in Rails.

First of all, you don’t need any extra gem to internationalize your application. Everything is already built into the framework.

The default language is English (`:en`), and all your translations (in YAML files) are stored into `config/locales/`.

The format of these files is relatively free, except for the names of ActiveRecord models and attributes, and validation error messages. As usual with Rails, conventions exist and the process will be a lot easier if you follow them.

<figure class="code"><figcaption><span>order.en.yml</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
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
<span class="line-number">41</span>
<span class="line-number">42</span>
<span class="line-number">43</span>
<span class="line-number">44</span>
<span class="line-number">45</span>
<span class="line-number">46</span>
<span class="line-number">47</span>
<span class="line-number">48</span>
<span class="line-number">49</span>
<span class="line-number">50</span>
<span class="line-number">51</span>
<span class="line-number">52</span>
<span class="line-number">53</span>
<span class="line-number">54</span>
<span class="line-number">55</span>
<span class="line-number">56</span>
</pre></td><td class="code"><pre><code class="yaml undefined"><span class="line"><span class="l-Scalar-Plain">en</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">order</span><span class="p-Indicator">:</span> <span class="s">"Order"</span>
</span><span class="line"> <span class="l-Scalar-Plain">activerecord</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">models</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">order</span><span class="p-Indicator">:</span> <span class="s">"Order"</span>
</span><span class="line"> <span class="l-Scalar-Plain">attributes</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">order</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">quote_id</span><span class="p-Indicator">:</span> <span class="s">"Quote"</span>
</span><span class="line"> <span class="l-Scalar-Plain">internal_reference</span><span class="p-Indicator">:</span> <span class="s">"Internal</span><span class="nv"> </span><span class="s">reference"</span>
</span><span class="line"> <span class="l-Scalar-Plain">user_id</span><span class="p-Indicator">:</span> <span class="s">"User"</span>
</span><span class="line"> <span class="l-Scalar-Plain">patent_id</span><span class="p-Indicator">:</span> <span class="s">"Patent"</span>
</span><span class="line"> <span class="l-Scalar-Plain">currency</span><span class="p-Indicator">:</span> <span class="s">"Currency"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_country_id</span><span class="p-Indicator">:</span> <span class="s">"Billing</span><span class="nv"> </span><span class="s">country"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_title</span><span class="p-Indicator">:</span> <span class="s">"Title"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_lastname</span><span class="p-Indicator">:</span> <span class="s">"Lastname"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_firstname</span><span class="p-Indicator">:</span> <span class="s">"Firstname"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_function</span><span class="p-Indicator">:</span> <span class="s">"Function"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_company</span><span class="p-Indicator">:</span> <span class="s">"Company"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_vat_number</span><span class="p-Indicator">:</span> <span class="s">"VAT#</span><span class="nv"> </span><span class="s">of</span><span class="nv"> </span><span class="s">the</span><span class="nv"> </span><span class="s">company/firm"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_address_1</span><span class="p-Indicator">:</span> <span class="s">"Address</span><span class="nv"> </span><span class="s">line</span><span class="nv"> </span><span class="s">1"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_address_2</span><span class="p-Indicator">:</span> <span class="s">"Address</span><span class="nv"> </span><span class="s">line</span><span class="nv"> </span><span class="s">2"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_city</span><span class="p-Indicator">:</span> <span class="s">"City"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_postcode</span><span class="p-Indicator">:</span> <span class="s">"Post/Zip</span><span class="nv"> </span><span class="s">Code"</span>
</span><span class="line"> <span class="l-Scalar-Plain">reference</span><span class="p-Indicator">:</span> <span class="s">"Reference"</span>
</span><span class="line"> <span class="l-Scalar-Plain">ordering_paralegal_id</span><span class="p-Indicator">:</span> <span class="s">"Ordering</span><span class="nv"> </span><span class="s">paralegal"</span>
</span><span class="line"> <span class="l-Scalar-Plain">provided_translation_ids</span><span class="p-Indicator">:</span> <span class="s">"Provided</span><span class="nv"> </span><span class="s">translations"</span>
</span><span class="line"> <span class="l-Scalar-Plain">person_in_charge</span><span class="p-Indicator">:</span> <span class="s">"Person</span><span class="nv"> </span><span class="s">in</span><span class="nv"> </span><span class="s">charge"</span>
</span><span class="line"> <span class="l-Scalar-Plain">first_annuities_offices_ids</span><span class="p-Indicator">:</span> <span class="s">"First</span><span class="nv"> </span><span class="s">annuities</span><span class="nv"> </span><span class="s">offices"</span>
</span><span class="line"> <span class="l-Scalar-Plain">annuities_offices_ids</span><span class="p-Indicator">:</span> <span class="s">"Annuities</span><span class="nv"> </span><span class="s">offices"</span>
</span><span class="line"> <span class="l-Scalar-Plain">ordered_at</span><span class="p-Indicator">:</span> <span class="s">"Order</span><span class="nv"> </span><span class="s">date"</span>
</span><span class="line"> <span class="l-Scalar-Plain">orders</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">certificates_have_been_ordered</span><span class="p-Indicator">:</span> <span class="s">"Your</span><span class="nv"> </span><span class="s">certificates</span><span class="nv"> </span><span class="s">have</span><span class="nv"> </span><span class="s">been</span><span class="nv"> </span><span class="s">correctly</span><span class="nv"> </span><span class="s">ordered"</span>
</span><span class="line"> <span class="l-Scalar-Plain">thank_you</span><span class="p-Indicator">:</span> <span class="s">"Thank</span><span class="nv"> </span><span class="s">you</span><span class="nv"> </span><span class="s">for</span><span class="nv"> </span><span class="s">your</span><span class="nv"> </span><span class="s">order!"</span>
</span><span class="line"> <span class="l-Scalar-Plain">place_an_order</span><span class="p-Indicator">:</span> <span class="s">"Place</span><span class="nv"> </span><span class="s">an</span><span class="nv"> </span><span class="s">order</span><span class="nv"> </span><span class="s">in</span><span class="nv"> </span><span class="s">4</span><span class="nv"> </span><span class="s">simple</span><span class="nv"> </span><span class="s">steps."</span>
</span><span class="line"> <span class="l-Scalar-Plain">place_order_now</span><span class="p-Indicator">:</span> <span class="s">"Place</span><span class="nv"> </span><span class="s">order</span><span class="nv"> </span><span class="s">now"</span>
</span><span class="line"> <span class="l-Scalar-Plain">nothing_to_down</span><span class="p-Indicator">:</span> <span class="s">"Nothing</span><span class="nv"> </span><span class="s">to</span><span class="nv"> </span><span class="s">download"</span>
</span><span class="line"> <span class="l-Scalar-Plain">process_steps</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">quote_summary</span><span class="p-Indicator">:</span> <span class="s">"Quote</span><span class="nv"> </span><span class="s">Summary"</span>
</span><span class="line"> <span class="l-Scalar-Plain">special_requests</span><span class="p-Indicator">:</span> <span class="s">"Special</span><span class="nv"> </span><span class="s">Requests"</span>
</span><span class="line"> <span class="l-Scalar-Plain">billing_mailing_info</span><span class="p-Indicator">:</span> <span class="s">"Billing/Mailing</span><span class="nv"> </span><span class="s">Info"</span>
</span><span class="line"> <span class="l-Scalar-Plain">confirmation</span><span class="p-Indicator">:</span> <span class="s">"Confirmation"</span>
</span><span class="line"> <span class="l-Scalar-Plain">fast_track_process_steps</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">ft_service_selection</span><span class="p-Indicator">:</span> <span class="s">"Service</span><span class="nv"> </span><span class="s">Selection"</span>
</span><span class="line"> <span class="l-Scalar-Plain">ft_special_requests</span><span class="p-Indicator">:</span> <span class="s">"Special</span><span class="nv"> </span><span class="s">Requests"</span>
</span><span class="line"> <span class="l-Scalar-Plain">ft_billing_mailing_info</span><span class="p-Indicator">:</span> <span class="s">"Billing/Mailing</span><span class="nv"> </span><span class="s">Info"</span>
</span><span class="line"> <span class="l-Scalar-Plain">ft_confirmation</span><span class="p-Indicator">:</span> <span class="s">"Confirmation"</span>
</span><span class="line"> <span class="l-Scalar-Plain">footer</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">print_page</span><span class="p-Indicator">:</span> <span class="s">"Print</span><span class="nv"> </span><span class="s">this</span><span class="nv"> </span><span class="s">page"</span>
</span><span class="line"> <span class="l-Scalar-Plain">start_valid</span><span class="p-Indicator">:</span> <span class="s">"Start</span><span class="nv"> </span><span class="s">a</span><span class="nv"> </span><span class="s">new</span><span class="nv"> </span><span class="s">validation</span><span class="nv"> </span><span class="s">quote</span><span class="nv"> </span><span class="s">for</span><span class="nv"> </span><span class="s">this</span><span class="nv"> </span><span class="s">patent"</span>
</span><span class="line"> <span class="l-Scalar-Plain">back_to</span><span class="p-Indicator">:</span> <span class="s">"Back</span><span class="nv"> </span><span class="s">to</span><span class="nv"> </span><span class="s">cases"</span>
</span><span class="line"> <span class="l-Scalar-Plain">export_pdf</span><span class="p-Indicator">:</span> <span class="s">"Export</span><span class="nv"> </span><span class="s">to</span><span class="nv"> </span><span class="s">PDF"</span>
</span><span class="line"> <span class="l-Scalar-Plain">export_exel</span><span class="p-Indicator">:</span> <span class="s">"Export</span><span class="nv"> </span><span class="s">to</span><span class="nv"> </span><span class="s">Excel"</span>
</span><span class="line"> <span class="l-Scalar-Plain">header</span><span class="p-Indicator">:</span>
</span><span class="line"> <span class="l-Scalar-Plain">placed</span><span class="p-Indicator">:</span> <span class="s">"placed</span><span class="nv"> </span><span class="s">on"</span>
</span><span class="line"> <span class="l-Scalar-Plain">you_can</span><span class="p-Indicator">:</span> <span class="s">"You</span><span class="nv"> </span><span class="s">can</span><span class="nv"> </span><span class="s">review</span><span class="nv"> </span><span class="s">your</span><span class="nv"> </span><span class="s">order</span><span class="nv"> </span><span class="s">here."</span>
</span><span class="line"> <span class="l-Scalar-Plain">validation_certificates</span><span class="p-Indicator">:</span> <span class="s">"Validation</span><span class="nv"> </span><span class="s">certificates</span><span class="nv"> </span><span class="s">ordering"</span>
</span></code></pre></td></tr></tbody></table></div></figure>

You can put all your texts in a single file (such as `en.yml`), but we recommend splitting them into different theme files, which must be name`some_theme.language_code.yml` (e.g. `users.en.yml`).

The first thing you need to do is set the locale of the application. Here is how you would do it if your `User` model has a stored locale:

<figure class="code"><figcaption><span>application_controller.rb</span></figcaption><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">ApplicationController</span></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="no"><span class="parent">ActionController</span></span><span class="parent"><span class="o">::</span><span class="no">Base</span></span><span class="no"></span></span><span class="no"></span></span><span class="no"></span>
</span><span class="line"> <span class="n">before_filter</span> <span class="ss"><span class="symbol">:set_locale</span></span>
</span><span class="line">
</span><span class="line"> <span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">set_locale</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="no"><span class="constant">I18n</span></span><span class="o">.</span><span class="n">locale</span> <span class="o">=</span> <span class="p">(</span><span class="vi"><span class="variable">@current_user</span></span><span class="o">.</span><span class="n">locale</span><span class="o">.</span><span class="n">to_sym</span> <span class="o">||</span> <span class="no"><span class="constant">I18n</span></span><span class="o">.</span><span class="n">default_locale</span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Now that we know which local to use, we need to replace all the text in our views, controllers, etc by a method code, which will select the correct translation. This is the `translate(key)` method (aliased to `t` for short). This method is automatically available in views. In controllers, you will need to call `I18n.t(key)`.

As said before, the translation files have conventions as to their structure. Here is where they will prove useful: let’s say you want to display the text “Print this page” (line 48), you could call`t('orders.footer.print_page')`, but that is a little long, especially if you consider you will have to do this for every single link, button, header and paragraph of your view (I warned you it was tedious). But if you’re in `app/views/orders/_footer.html.erb`, you can simply call `t('.print_page')`. Rails will know to complete the missing hierarchy of your key with the path to the current view or partial. Of course, you can still use the complete path whenever you need to access translations outside your current scope.

Lastly, a little tip for the text in your JavaScript: have a look at the **[i18n-js gem](https://github.com/fnando/i18n-js)**, which lets you use similar tools as what is provided by Rails from JavaScript.

Read more: [**I18n on RailsGuides**  
  
](/content/images/legacy/tm709aCoGkL-2JfBO6CIu.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)