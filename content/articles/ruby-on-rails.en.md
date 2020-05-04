---
lang: en
slug: ruby-on-rails
originalPath: https://www.belighted.com/blog/ruby-on-rails
title: Demystifying Ruby on Rails
author: Nicolas Jacobeus
description: Ruby on Rails. See what you need to know about this jewel of a
  language/framework pair if you’re considering dev of your app.
image: ../images/blog/Demystifier%20ruby%20on%20rails.png
date: 1546300800000
tags:
  - label: Product development / Continuous Development
    value: product-development-continuous-development
  - label: The Belighted Way
    value: the-belighted-way
  - label: Développement MVP
    value: développement-mvp
  - label: SaaS development
    value: saas-development
status: published
---
### Software development is an expensive part of the journey of a startup. **[Speed](https://www.belighted.com/blog/successful-startups-speed)** of development can make the difference between getting off the ground or crashing and burning.

The technology stack you build your app with plays a big role in that equation. Today we’ll offer up the [**non-technical startup founder**](https://www.belighted.com/blog/non-technical-startup-founders)’s guide to our preferred programming language and framework for the server side when building an app: Ruby on Rails (RoR).

What’s a framework, exactly?
----------------------------

A framework is **[like a skeleton](https://www.techopedia.com/definition/6005/application-framework)** that provides a predefined structure for building an application. For an app built in Ruby on Rails, Ruby is the programming language and Rails is the framework.

While a framework is not necessary when building an app -- developers could write everything from scratch -- **using a framework shaves off time and potential for error by reducing the amount of code they have to write. They can pick and choose from common libraries of code written and tested by other programmers.**

There are other frameworks created to support various programming languages, but we prefer Ruby on Rails (RoR) for the back-end when building **[SaaS web applications](/saas-guide-to-software-as-service)**. And we’re not alone. Check out some very famous web apps built using Ruby on Rails:

*   **Airbnb is a large web app built with Ruby on Rails.**![air bnb-1](/content/images/legacy/oMfEntUy9gI4CXAdSxr0I.png)  
      
    
*   **Fiverr is made possible thanks to Ruby on Rails.**![Fiverr is made possible thanks to Ruby on Rails.](/content/images/legacy/pByfg92KeYqFr8vFeOZBh.png)  
    
*   **Shopify - another site you might not have known was built on Rails.**![shopify](/content/images/legacy/TNJRV6oBL7G3VE1pjh4u9.png)
*   **Groupon** 
*   **Kickstarter**
*   Dribbble
*   **Basecamp**
*   Pixlr
*   See lots **[more here](https://skillcrush.com/2015/02/02/37-rails-sites/)**

Why we love Ruby on Rails
-------------------------

Your choice of framework is important because, as Peter Wayner **[says](https://www.infoworld.com/article/2902242/application-development/7-reasons-why-frameworks-are-the-new-programming-languages.html?page=2)**, “The frameworks establish the rules for their corner of the Internet and you must live within them once you choose them.” It’s hard to switch frameworks and languages once you’ve built an app, so you want to “investigate carefully and choose wisely.”

Here are some of the reasons we think Ruby on Rails is ideally suited to building a startup software app.

### Reliable, less prone to bugs

Ruby has been around since 1995 and Rails since 2004. RoR continues to inspire a passionate open source community of developers who contribute to its improvements and add to its high-quality, curated libraries. These greatly reduce the code that must be written, and therefore the chance to introduce error. You can just grab and reuse boilerplate code that has already been thoroughly battle tested.

**RoR centralizes things as much as possible when building complete web applications. This means the front end and back end can both access the same resources rather than creating a version for each.** (The front end refers to the part of a website or application you see and interact with. The back end, or server side, is the portion that stores and processes data.)

Since Ruby code is easy to understand, developers can also track down and fix bugs and errors quickly.

### Inspires productivity

From the start, Ruby on Rails focused on pleasing developers. Its thriving community of contributors boast of **[better, more fulfilling](https://rubyonrails.org/doctrine/)** working lives. We all know that **[happiness breeds engagement and productivity](https://www.5dynamics.com/happy-employees-efficient-productive-stay-longer/)**, which shows in a better end product.

**Philippe, a back-end developer at Belighted, explains what he appreciates most about RoR: “Personally I enjoy the expressiveness: the code carries my thought with very little noise and bends to my paradigm instead of forcing me to bend to its own,** like Python would. **I also enjoy that it’s a sharp tool, forcing me to be precise and clean but allowing me to do extreme tasks.”**

### Speed of development

The most cited reason against Ruby on Rails is that it’s slow. But while it may be slower in terms of running and processing requests by a few milliseconds here and there, it’s much faster to develop than other options out there.

Did someone say Ruby is slow? Let’s clear that up.

RoR is known as an excellent framework for prototyping and getting a startup MVP up fast. It lets you set up an infrastructure strategy at a low cost that will also improve the performance of your app. The resource that you will want to optimize first is your developers, and RoR shines there.

Ruby on Rails may help development to go **[30 to 40% faster](https://www.forbes.com/sites/quora/2018/04/03/is-ruby-a-dying-language/#52ede56e6a3d)** than with other programming languages. That is a powerful advantage when it comes to testing, getting feedback and meeting product/market fit as quickly as possible.

Well-defined conventions in Rails help everyone get with the program faster. We’re able to save time by using ready-made code for repetitive tasks. By helping developers make a decision only once, it allows for faster progress in areas that really matter.

**Dominique, a senior back-end developer at Belighted explains, “By taking care of all the nuts and bolts and hiding them behind an intuitive and unobtrusive interface, Rails helps you to focus on what’s really important: the business logic of your application.”**

For the vast majority of web applications, Ruby on Rails is plenty fast. If it faces a growing load thanks to your app hitting sudden popularity (congrats!) it can be scaled easily at that time. Plus, **[Ruby is continuing to get faster](https://www.speedshop.co/2017/07/11/is-ruby-too-slow-for-web-scale.html).**

### Easy hand-off among developers

The well-defined conventions in RoR standardize most things, so your developers won’t spend too much time scratching their heads trying to figure out what the team before them did.

Even novice developers can use Ruby on Rails fairly quickly. (**[Rails Girls](https://railsgirls.com/)** teaches young girls how to begin coding in only one day!)

A note about scalability
------------------------

Some companies have migrated out of Ruby on Rails after reaching a certain size, most famously Twitter.

However, even at the height of success, very few apps will ever have to deal with the number  of requests per second that Twitter does.

**“You can really live with an RoR application during the whole life of a product,” explains Michaël Albert, a project manager at Belighted.** “There may be times you face issues and using another more expensive and less flexible framework is the best alternative. Twitter **[switched from RoR](https://www.infoq.com/news/2013/08/scaling-twitter)** because of issues highlighted during a massive peak caused by the 2010 World Cup. Very few apps will ever need to plan for that volume.”

Philippe adds, “A very important point here is that every big company who migrated out of Ruby for scalability reasons said that they wouldn't have chosen their new stack from the start if they were to do it over. They considered Rails a great tool to reach their size.”

For every app that migrated, there’s one that stayed. Airbnb continues to work with Ruby as it grows, working through the challenges of its **[large-scale payments system](https://medium.com/airbnb-engineering/large-scale-payments-systems-and-ruby-on-rails-bfe5b89f6f4)**. Shopify, one of the largest websites in the world today (**[80K requests per second](https://twitter.com/dhh/status/885776244532551680?lang=en)**), even **[teaches its partners](https://www.shopify.com/partners/blog/building-a-shopify-app-in-one-week)** how to use Ruby to build their own Shopify apps.

Choosing the language and framework for your SaaS application
-------------------------------------------------------------

The question of language and framework is a big one. Once you commit to a framework, it can be a challenge to migrate later.  
  
[![The ultimate Guide to Software as a Service](/content/images/legacy/axTDnlmGeCfdTR5eawUvn.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/0b551323-0d58-4d8c-882c-e42a03a01459)  

We believe that Ruby on Rails is a safe bet for most **[SaaS](/saas-guide-to-software-as-service)** software startups. But it’s worth discussing. It’s a big decision, one that will shape the future of your app development for a long time to come.

Up next in our blog: **[React vs Angular for front-end development](/blog/front-end-react-angular?hs_preview=BSfWfuwy-5972023739)**