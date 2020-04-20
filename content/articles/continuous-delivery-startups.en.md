---
lang: en
slug: continuous-delivery-startups
originalPath: https://www.belighted.com/blog/continuous-delivery-startups
title: "Continuous Delivery: Faster Product-Market Fit for Startups"
author: Nicolas Jacobeus
description: See how we help startups reach product-market fit faster with
  continuous delivery. Simple explanation of benefits, terminology & why your
  lean startup needs it.
image: ./images/businessman-with-tablet-pc-high-tech-skyscrapers.jpg
date: 1514764800000
tags:
  - label: Entrepreneurship
    value: entrepreneurship
  - label: Product development / Continuous Development
    value: product-development-continuous-development
  - label: The Belighted Way
    value: the-belighted-way
  - label: Développement MVP
    value: développement-mvp
status: published
---
Every time you use Amazon, Gmail or **[Facebook](https://code.facebook.com/posts/270314900139291/rapid-release-at-massive-scale/)**, you are using the latest version. In fact, the software may have been updated 15 times that day already. 

The average user won’t even notice. But **continuous delivery** is a big deal for software developers and users alike. It **means developers can deliver small enhancements as soon as they are ready instead of waiting for the next big release. For the user, it means the latest version is always the one they see.**

You don’t have to be a giant in the tech space to benefit from continuous delivery of code. In fact, startups may benefit most, as it helps them **[reach product-market fit faster](https://www.belighted.com/blog/continuous-delivery-startups)**. Compressing the time to market addresses one of the biggest problems startups face: time. With continuous delivery, feedback is faster, and you can adapt faster. In fact the benefits extend even further.

**Why continuous delivery is important for startups and lean projects**
-----------------------------------------------------------------------

### **1\. Accelerated time to market**

The ultimate benefit of continuously delivering code enhancements is fast, efficient response to the market.

When you’re operating a startup, nothing spells death like running out of time. Reaching product-market fit is one of the most important challenges for a startup company -- and achieving it sooner rather than later makes a huge difference.

**For startups, continuous delivery gives you the opportunity to rapidly respond to user demands, fix bugs and pivot or persevere according to feedback from your early adopters. [Joel York](https://chaotic-flow.com/finding-saas-product-market-fit/)** discusses the importance of creating a continuous loop of customer feedback and product development in the context of SaaS startups. In that process of listen, build, deliver...listen, build, deliver...continuous delivery is almost mandatory.

### **2\. Improved efficiency** 

In a DevOps culture, your software team will be operating more efficiently. Since continuous delivery requires **[automation for components like testing](https://www.belighted.com/blog/software-testing-basics-types-when-to-automate)** and deployment, developers have more time for productive work. **[Eugene Kenny](https://blog.intercom.com/why-continuous-deployment-just-keeps-on-giving/)** at Intercom points out that it helps new team members become productive faster. He also notes that it removes temptation to route around bugs that would be tedious to address head on in a traditional environment.

We regularly see this increased efficiency firsthand. Recently, Belighted worked with the **[Sortlist](/case-studies/sortlist-improves-web-app-quality-and-team-productivity-by-20-with-belighted)** app startup development team to implement these best practices resulting in approximately 20% improvement in productivity.

### **3\. Reduced risk**

Continuous small changes carry a lot less risk than making big, sweeping changes. If your product incorporates updates frequently, you run less risk of alienating early users since they can adapt easier to changes bit by bit. The risk of moving in the wrong direction is also mitigated somewhat, since the commitment to improvements is incremental.

When we are working on software, whether for our own projects or for a client, we are able to address bugs quickly. Thanks to continuous delivery, we can deploy code 30 minutes to an hour after learning of a bug, which greatly minimizes any impact.

### **4\. Better transparency and team innovation**

Continuous deployment may bring some benefits that don’t immediately come to mind but are nonetheless important, especially for startups grappling with measuring costs and progress.

Continuous delivery of code enhancements helps costs become more apparent, progress more easily measured, and innovation a natural trait of your team, as **[Dan Quine](https://medium.com/continuous-delivery/why-continuous-deployment-matters-to-business-6a79b5602145)**, a startup tech entrepreneur and lecturer points out.

### **5\. Support for scalability**

 While the Intercom team is now large and deploys code over 100 times per day, it started working on automated deployment systems when there were only six people on its team.

 Consider the case of Facebook, also. The study **[Continuous Deployment at Facebook and OANDA](https://research.fb.com/wp-content/uploads/2017/01/paper_icse-savor-2016.pdf?)** examined Facebook data from 2008-2014. During that time, the engineering team grew by 20X and the size of the code base by 50X. The authors concluded this occurred without negatively impacting developer productivity or software quality because of a commitment to continuous deployment.

**So, what exactly is continuous delivery?**
--------------------------------------------

In a **[DevOps culture of collaboration](https://en.wikipedia.org/wiki/Continuous_delivery)**, various departments work together to help deliver software rapidly. There is an emphasis on automation and monitoring at all steps of software construction, aiming at shorter development cycles, increased deployment frequency and more dependable releases in close alignment with business objectives.

**How it works**
----------------

To imagine how continuous delivery works, picture the common stages in software deployment: build, integration, testing and production release.

First developers build code. In order to build code, they need to take a copy of the current code base to work on it. As he or she (and other developers at the same time) make improvements, it moves away from the existing code base that end users are using.

Then the new code must all be integrated with the existing code. It used to be that software builds were integrated infrequently, often quarterly. Now teams that use continuous integration (CI) will merge all developer work on a product several times a day.

The new code is deployed automatically to a pre-production environment for testing. Testing in the pre-production environment is a big part of continuous integration. Tests can be manual, automated or a combination. This frequent integration and testing saves a lot of time by reducing conflicts and finding errors earlier. **[See how we test our Rails](https://www.belighted.com/blog/how-we-test-our-rails-projects-1-3) [projects](https://www.belighted.com/blog/how-we-test-our-rails-projects-1-3)[.](https://www.belighted.com/blog/how-we-test-our-rails-projects-1-3)**

Once testing is complete, the code is released into production, meaning it becomes part of reality for users.

**Continuous delivery refers to the process that makes it possible for every change to be deployed to production (released) automatically.** The team can choose not to automate deployment in certain instances, for example for business reasons. (It’s called **continuous deployment** **when they automatically deploy every code change to production**. In this case, there is no human intervention unless a test fails.) 

If you want to read more on the definitions of continuous integration, continuous delivery and continuous deployment, the folks behind Jira and Trello at Atlassian do a great job of **[explaining CI and CD](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd)**. 

**How to start moving your startup toward continuous delivery**
---------------------------------------------------------------

If you are building a new software product and you have no users, you can begin immediately incorporating these concepts. You will reap the benefits such as finding product-market fit faster from the start. 

However, if you already have an application and people are using your software, you will want to approach these changes through a cadence. Start with continuous deployment to staging, letting your software development team deploy their changes to the pre-production environment faster, where testing can take place. Next, move onto continuous integration, which will involve automating tests. Start with automating unit tests, and then move onto improving automated testing until all three types of testing can be accomplished automatically.

**Organizational buy-in is important**
--------------------------------------

Perhaps even more important than setting up the process is preparing the mindset at your organization.

If your team is not using continuous integration, it will require a shift in thinking to move to continuous delivery or deployment. Often the shift must happen first in the company leadership. And it will affect your whole organization. Consider the roles of customer support and marketing, for example, when you are changing from occasional updates to frequent minor updates for users.

Continuous deployment requires continuous investments in educating and coaching developers as well as in building, improving and maintaining **[tool infrastructure](/blog/technology-stack)**. As we see with the success of small and large firms alike, the benefits are well worth it.

 Would you like to discuss how to set up a continuous integration process for your development team? [**Book a Scoping Workshop**](https://www.belighted.com/scoping-workshop#scoping-workshop) with us today. [![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)