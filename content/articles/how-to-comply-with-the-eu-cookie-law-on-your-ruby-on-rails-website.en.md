---
lang: en
slug: how-to-comply-with-the-eu-cookie-law-on-your-ruby-on-rails-website
originalPath: https://www.belighted.com/blog/how-to-comply-with-the-eu-cookie-law-on-your-ruby-on-rails-website
title: How to comply with the EU Cookie Law on your Ruby on Rails website
author: Stéphane A.
description: We'll start with a review of law texts about cookie usage on your
  website then introduce you with some common use cases and finally propose a
  convenient solution via a gem.
image: null
date: 1420070400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
The law
-------

As described in the UE Directive n° 2009/136/CE, websites are required to obtain consent from visitors to store or retrieve any information from a computer or any other web-connected device, like a smartphone or tablet. More specifically, the legislation is targeting tracking cookies (excepted for some technical matters). Nevertheless the law leaves us in the dark about the implementation of this consent.

In practice
-----------

The point is you only need to have implied consent from users to use cookies. Most websites explicitly inform users that the site uses cookies and don’t give an option to opt-out. Instead, they direct people to change the settings in their browser or leave the website. Ultimately adding a tailored privacy page on your website is also a good practice.

Some examples
-------------

Thomas Cook chooses to put a link in the header menu on its website:

![](https://assets.econsultancy.com/images/resized/0002/0286/cc_thomas_cook-blog-full.png)

John Lewis chooses a floating element in the header for its website:

![](https://assets.econsultancy.com/images/resized/0002/0278/cc_john_lewis-blog-full.png)

BBC chooses a floating element for its mobile website:

![](https://assets.econsultancy.com/images/resized/0002/0288/cc_bbc_mobile-blog-third.png)

But there is a gem for that
---------------------------

As you know, Belighted uses RoR on a daily basis, and the usual way of doing is looking for gems that already solves the problem in order to get you faster with the better solution. We found the 'cookies\_eu' gem that includes a fully customisable footer with all the css and js needed. Even a sample of a cookie privacy page is included. A perfect bundle to comply with the law.

References
----------

*   **[How to get you website to comply with the EU cookie law?](https://www.infinum.co/the-capsized-eight/articles/how-to-get-your-website-to-comply-with-the-eu-cookie-law)**
*   **[20+ examples of EU cookie law 'compliance'](https://econsultancy.com/blog/10205-20-examples-of-eu-cookie-law-compliance#i.1ian6tnf8vdtvx)**
*   **[gem 'cookies\_eu'](https://github.com/infinum/cookies_eu)**

**[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)**