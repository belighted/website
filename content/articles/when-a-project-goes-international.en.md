---
lang: en
slug: when-a-project-goes-international
originalPath: https://www.belighted.com/blog/when-a-project-goes-international
title: When a project goes international
author: Philippe V.
description: "How we helped a client expand its market from a single country to
  international. "
image: ../images/blog/going-international.jpg
date: 2016-11-24
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

Recently, one of our customers asked us to help them expand their market to a new country: France. Peek behind the scenes to see what we did and then check out the results in the [case study](https://www.belighted.com/case-studies/listminut-increases-their-product-development-speed-by-90-with-belighted) for Listminut.

The [ListMinut](https://listminut.be) platform is a marketplace allowing people to find service providers for small jobs like babysitting, plumbing, or gardening. The location is therefore extremely important and they wanted the French users to browse a France-scoped site while keeping the current experience the same for the Belgian users. 

They also wanted to keep a single administration panel and also not fork the codebase in order to easily fix bugs or make global changes in the future.

Therefore we needed to evolve their current codebase so that a single application could handle differently users visiting [www.listminut.be](www.listminut.be) and [www.listminut.fr](www.listminut.fr)

We had a meeting with them in order to plan the evolution of the app and prioritize steps based on the criticity of the task and the external constraints.

After some discussions we agreed with them on the following steps :

*   The app must be able to tell the country of a request
*   The bank account format must be validated differently depending on the country
*   The national identification number must be validated differently depending on the country
*   The locations must be searched only for the current country
*   The address suggestions (using google place autocomplete) must be scoped for the current country
*   The payment gateway must propose different payment methods depending on the country
*   The URLs in the emails sent by the application must use the correct hostname
*   The job categories proposed must be different from one country to another
*   The language switcher must only propose languages of the country or must be hidden if the country only has one language
*   The admin panel must propose a combinable filter on the country (which means all the current filters can optionally be combined with a country)
*   The newsletter must be different from one country to another
*   The highlighted reviews exposed on the home page must have been posted by people of the same country
*   The default prices of a job category must depend upon the country
*   The cache must take the country into account when relevant

Some of these changes were structural ones while others were much simpler. Let's review the most interesting changes.

The app must be able to tell the country of a request
-----------------------------------------------------

Obviously nothing can be done until we can tell if a request comes from France or Belgium or any other country the system might handle in the future.

Since the French users will access the website using [www.listminut.fr](www.listminut.fr) and the current Belgian users will access it using [www.listminut.be](www.listminut.be), the straightforward solution is to check the hostname and choose a country based on the TLD.

The problem with this approach is that it will only work in production. Whenever we are in dev, test, staging or any other environment than production we won't have a TLD at our disposal. We could use a trick on a development machine but it would not work for staging or **[ci environment](https://www.belighted.com/blog/continuous-delivery-startups)**.

Thus we decided to set a chain of places to lookup for a country hint and this chain would end with the TLD. Before that we would check for a custom cookie (easily settable with a browser plugin) or even a query\_string param.

Technically speaking, we thought this solution was very close to the one of setting the locale of the request and added a `before_action` in our `HasLocale` controller concern. This also enabled us to choose the default locale depending on the country.

From this moment we were able to call `current_country` from any controller and be sure to get a `Country` record.

Some validations depend on the country
--------------------------------------

This looked like a tricky one but ended up easier than we thought. Our first idea was to pass the request country down to the validation process like some kind of context. But something felt wrong and we realized going down that path would mean passing the country along in a lot of calls. Then we thought about storing the country in some kind of thread/request-specific variable (like `I18n.locale`) but we didn't like that idea either because it is just a disguised constant in terms of dependency management; and actually most of us do not like how any piece of code can access `I18n.locale`. Then we walked a step back and realised the country should be an associated record of our main object: a `User` is deeply associated with a country (at least in this project), a `Worker` also and so is a `Job` and an `Address`. Validating correctly a social security number, a bank account IBAN or a VAT number was just a matter of delegating the validation to the indirectly associated country.

The main problem was resolved but we were left with a more tricky one: countries were instances of a `Country` class but different instances needed different implementation of the same method. The `belgium.verify_national_id_number(user, national_number)` should be different than `france.verify_national_id_number(user, national_number)` even if those two objects were of the same `Country` class.

This is a typical data vs. code problem and we solved it using the well-known [strategy pattern](https://www.oodesign.com/strategy-pattern.html).

Once users were associated with countries, we easily found solutions for the email URLs problem and the separate newsletter.

The job categories must be different from one country to another
----------------------------------------------------------------

This one was probably the most interesting for us. The initial codebase was several years old and was authored by one senior developer and several trainees over the year. This meant that the categories were displayed on several parts of the webapps and almost every time in a different fashion. Most of the times the categories were even requested from the database directly in the template.

We solved the problem in 3 steps:

1\. Create a PORO `CategoryTree` representing a browsable (enumerable) tree of the category.

2\. Use that `CategoryTree` everywhere it could be used.

3\. Add factory methods to build country-specific or level-specific (categories are either primary or secondary) trees.

It turned out to be very effective and even allowed us to fix some bugs and dramatically improve the performance on most pages because our tree was buildable in a pair of requests instead of N+1.

Since part of the app is built on angular 2, we also built a `CategoryTree` object in javascript, easily transferable from the server.

Conclusion
----------

The rest of the problems were either straightforward (change some controller actions by using the newly provided `current_country`) or mostly non-technical (contact the [payment gateway provider](https://www.belighted.com/blog/choosing-payment-processor-marketplace) to propose payment mechanisms based on the country).

In the end we managed to do the expected work in a tight schedule (around one man month) and our client has been able to launch its service in Paris as expected.

It was also very interesting for us to make such a deep change in an external codebase. The biggest lesson we learnt (again) was not technical but organisational: the communication between the people involved (developers and business actors) was critical to achieve this success.

Thank you again ListMinut for your trust and we wish you the best in France!

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)