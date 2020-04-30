---
lang: en
slug: software-testing-basics-types-when-to-automate
originalPath: https://www.belighted.com/blog/software-testing-basics-types-when-to-automate
title: "Software testing basics: types, benefits and when to automate"
author: Nicolas Jacobeus
description: Software testing basics - types, benefits and when to invest in
  automated testing. An overview for the non-technical startup founder.
image: ./images/futuristic-technology-interface.jpg
date: 1514764800000
tags:
  - label: Product development / Continuous Development
    value: product-development-continuous-development
  - label: The Belighted Way
    value: the-belighted-way
  - label: Développement MVP
    value: développement-mvp
status: published
---
Testing is an investment. Like investing in security of a software product, it’s sometimes a hard sell, because you don’t immediately see a return. There’s no tangible output, no new feature to wow users.  
  
However, there are several advantages to building testing into your product development that can pay off. The key is balance.  
  

**Advantages of building automated testing into your software product**
-----------------------------------------------------------------------

Tests are automated by writing code that developers can run, typically before deploying an update to a software product. **When a test fails, it will alert developers that something isn’t working in the software.** There are several advantages to building automated testing into your software product:

*   It can provide **more accurate test results**. Manual tests require repetition and thus are prone to human error. Setting up the testing conditions to run through manually can be difficult since you need the system to operate in a given state to experience it just like a real user.
*   Good testing **ensures a higher quality product**. A test will catch errors before they make it to the end version the customer is using.
*   Testing improves **continuity** among developers working on the code, so there is less dependency on individuals. The test is a living type of documentation that tells the team when it is out of sync.
*   Automated testing promotes a more **organized approach**. It requires some questions to be answered much sooner, which avoids time lost working on the the “wrong” path.
*   **It enables future changes.** The bigger a product grows, the harder it is to change or add features because interdependencies accumulate. Automated tests will highlight all those interdependencies and force you to consider how a new feature fits. Without tests, those links often remain hidden, making it more likely that a new feature will break an existing interdependency.

To understand how testing benefits your software product, first consider the main types of tests and what they do.  
  

**Three main types of testing in software products  
**
-------------------------------------------------------

There’s really no way to automate all testing. After all, someone still has to write the code to create the testing program. However, the most common types of tests used in software development are:  
  

3.  **Unit or isolation tests**
    
    Imagine you want to test code that calculates interest on money. You could enter different amounts manually and check that the output is correct. Or you could write an automated test that runs examples to make sure it is functioning correctly. Consider how many units you need to test, and how often. It will take exactly the same amount of time to write the testing code and run it once - or a thousand times.
    
4.  **Acceptance, feature or system tests  
    **Imagine the program to calculate interest is used via a form on a website where you input an amount and the answer appears. In this case, you’re testing that the algorithm works and also that the form works. You are checking that different modules of software work together. The testing code will simulate a human’s choices. You can automate this, but it’s difficult to account for every variable combination. 
5.  **User acceptance tests (manual)  
    **User acceptance tests typically take place in a staging or pre-production environment that is as close to the final ‘live’ version as possible. In these types of tests, the user interacts with the product as if he or she were a customer. It might be the product managers or QA folks acting as the end user. While automated tests make this step easier, there are certain things that are better tested by a human: visual glitches, wrong picture formats, alignment problems, translation errors, etc. All these things are hard to catch for an automated test.

Lots of software products you use every day use automated testing and **[continuous deployment](https://www.belighted.com/blog/continuous-delivery-startups)** to update features little by little: Facebook, Gmail, Amazon and so on.  
  
But when you’re developing a startup software product, it may not be feasible to automate all testing. We’ll talk a little more about how we decide what to automate below. But first let’s look at the expected outcome of automated testing.  

**Automated testing and catching “bugs” in your software product  
**
---------------------------------------------------------------------

To illustrate the expected outcome of automated testing, consider this typical scenario. Let’s say you’re developing a new app, and you can expect 10 bugs to surface.  
  
**If you do not write an automated test for the new app, the bugs will show up at the worst time -- when customers are using your product -- causing your app to lose their trust. Each bug will take 10 hours to fix, also costing you money.**  
  
If you decide to automate testing for your app instead, you will have to write 50 tests. Each test may take 1 hour to write. **Nine of those tests will help you catch 9 of the 10 bugs.** You can fix each in 1 additional hour -- before the end user ever sees it.  
  
You will still have the tenth bug. Catching it would have required you to write 500 tests, which was too expensive for your project.  
  
There’s no way to know beforehand which of the 50 tests will help you find the bug. If you write them you won't notice the 9 bugs that did not happen -- only the one that did.  
  

**Why doesn’t every software product automate testing?  
**
-----------------------------------------------------------

When a startup company faces the choice of where to invest funds, it has to consider **opportunity cost**. Developing a new feature may win out over automating testing. After all, tests don’t add visible value, and writing code for tests is time consuming.  
  
Additionally, automated testing implies that a feature is well thought out and stable. Some features in a young product are exploratory. It’s expected they may change. Writing automated tests for a feature will only make changing it harder when that time comes.  
  
Other barriers may prevent some software developers from using automated tests. Setting up automated testing requires experience, discipline and organized processes. **Tests must be maintained as the product evolves.** The testing environment must be as close as possible to the actual end user’s environment. And occasionally there are regulations that may prevent testing, such as when handling medical information.  

**A balanced approach to testing - how we do it**
-------------------------------------------------

Completely automating software tests can be expensive, so there will always be a tradeoff in how thoroughly you test your code. The first step is to identify which tests are best done manually and which it will make sense to automate.  
  
This can depend on where you are in your product lifecycle. For example, **[we automate tests](https://www.belighted.com/blog/how-we-test-our-rails-projects-1-3)** for the most crucial parts when **[building an MVP](https://www.belighted.com/mvp-development)** (minimum viable product).  
  
Consider your signup or payment page. If users can’t join or pay, you will waste your marketing efforts and lose potential customers. It makes sense to automate tests for these points.  
  
**Belighted builds in testing for critical points on all our projects - our own as well as our clients’. It’s a best practice that we believe adds reliability to everything we create.**  
  
In addition, our tests act as technical documentation. We often function as **[a startups’ first development team](https://www.belighted.com/blog/10-pros-and-cons-of-outsourcing-mvp-development)**, so we want to be sure our work can transfer seamlessly as the company grows. As new developers enter the team, they can become productive very quickly.  
  
Whether software is tested usually depends on **[the culture](https://www.belighted.com/about)** of a company. Developers love having it. And when balanced with other development priorities, it can improve the quality of your software product, save time, preserve continuity and help keep your team aligned.

Discover more about how we approach product development in our blog **[the Belighted way](/blog/product-development-methodology)**.

[![New Call-to-action](/images/legacy-cta/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)