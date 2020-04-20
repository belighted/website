---
lang: en
slug: high-voltage-use-rails-to-create-static-pages
originalPath: https://www.belighted.com/blog/high-voltage-use-rails-to-create-static-pages
title: "High Voltage: Use rails to create static pages"
author: Stéphane A.
description: The high voltage gem allows you to create easilly static pages in
  your Rails application.
image: null
date: 1325376000000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
You certainly have frequent inclusion of one or even more static pages in your projects ! In order to succeed in this task, you have several choices: either code it into pure html (meaning include the entire layout of your pages which require a lot of boring work) or even worst, you could create a resource and all the linked views.

A better solution but quite time consuming is to implement a page controller which could handle all your static pages ( a bit like a cms) but this involve often a backend and a lot of other fancy things that you sometimes don’t need at all because these static pages are not going to change on a day to day basis and certainly because you’re a programmer and not a journalist !

Hopefully, a new solution comes out of the woods ! The high voltage gem ! This allow you to create easilly static pages in your Rails application.

Just include the gem in your Gemfile: `gem "high_voltage"`.

Write your static pages and put them in the RAILS\_ROOT/app/views/pages directory.

For instance: `app/views/pages/about.html.erb`

and finally call it elsewhere: `link_to "About", page_path("about")`

You’re done !

By the way using this gem allow you to keep all the ruby on rails magic stuffs you like and that are often so helpfull !

Here is usefull links if you need more information:

*   **[https://github.com/thoughtbot/high\_voltage](https://github.com/thoughtbot/high_voltage)**
*   **[https://robots.thoughtbot.com/post/11744619917/danger-danger-high-voltage-use-rails-3-1-for-static](https://robots.thoughtbot.com/post/11744619917/danger-danger-high-voltage-use-rails-3-1-for-static)**
*   **[https://rubygems.org/gems/high\_voltage/](https://rubygems.org/gems/high_voltage/)**

[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)