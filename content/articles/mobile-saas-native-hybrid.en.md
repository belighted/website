---
lang: en
slug: mobile-saas-native-hybrid
originalPath: https://www.belighted.com/blog/mobile-saas-native-hybrid
title: "Mobile SaaS apps: should you go native or hybrid?"
author: Nicolas Jacobeus
description: Your SaaS app needs a mobile version. Now your developers are
  asking if you want a native app or a hybrid app. Learn the basics with our
  SaaS Development framework.
image: ./images/tech_stack_react_native_banner_Blog.jpg
date: 1514764800000
tags:
  - label: Product development / Continuous Development
    value: product-development-continuous-development
  - label: The Belighted Way
    value: the-belighted-way
  - label: SaaS development
    value: saas-development
status: published
---
Most SaaS app founders realize they **[must have a mobile counterpart](https://www.inc.com/rahul-varshneya/saas-businesses-don-t-screw-up-your-mobile-app.html)** to their web application, because users expect functionality on their phones.

It’s not enough to send people to the phone’s browser, though. A **[native or hybrid app](https://www.nngroup.com/articles/mobile-native-apps/)** - meaning an app built for functioning on a phone - is now necessary for most **[SaaS businesses](/saas-guide-to-software-as-service)**.

But when it comes to app development for **[SaaS](/saas-guide-to-software-as-service)**, how do you choose between hybrid or native? Is there a cost difference? Read on for more details and our preferred solution.

Differences between hybrid and native apps
------------------------------------------

A native app is an application developers create specifically for the operating system on a phone, usually Android or iOS. They need to create a separate app for each platform, because the two **[do not overlap](https://www.mobiloud.com/blog/native-web-or-hybrid-apps/)**. So while the app might appear the same on both Android and iOS phones, it’s actually two completely separate apps written in different programming languages. Some examples of native apps are Pokemon Go, What’s App, Gmail, and Twitter.

Hybrid apps take the web-based functionality and wrap a thin layer of native mobile development around it.

This may sound great if you’ve already got a web app. Just add a bit of iOS or Android around that and you’re good to go, right?

A hybrid approach brings **[many advantages](https://www.clickz.com/the-pros-cons-and-politics-of-hybrid-mobile-apps/93887/)**, especially the ability to update the app in one spot (the web part) and then deploy changes to both versions of the app at the same time. Otherwise, pure native apps requires updating separately. (At this point, you are probably already imagining the effect on your **[costs](https://clutch.co/app-developers/resources/cost-build-mobile-app-survey)**!)

**However, there are some times when an app should be developed specifically for the native mobile environment.** Philippe, a developer at Belighted, brings up the following examples:

*   apps with very custom screens (e.g. games)
*   apps that require specific hardware access (media player, camera app, etc.)
*   high-security apps (bank apps, authenticator apps)
*   apps that require specific knowledge of the OS (keyboard apps, dialer)

Salesforce developers have broken down the strengths and weaknesses of using web, native, or hybrid technologies for your mobile app:

![native](/images/legacy/1LeSdbB6WV1tF5EWM9GjT.png)\[**[Source](https://trailhead.salesforce.com/trails/mobile_sdk_intro/modules/mobile_sdk_introduction/units/mobilesdk_intro_scenarios)**\]

Whether you’re building a native or hybrid mobile app, your developers will want to work with a framework. This gives them access to ready-to-use code that they can incorporate as they need.

The React Native framework
--------------------------

There’s one framework that stands above the others: React Native.

**It offers the best of both worlds, letting you produce real native apps with the convenience of web-based app development. This means you will have the native look and feel of the platform interfaces, the native speed, etc.**

It’s not technically a hybrid technology because the end result is a native app - but developers do not have to produce two separate apps. With React Native the developer writes code similar to web code (using React and Javascript) and it is transformed into native code. With a typical hybrid tool the developer writes web code that will be wrapped in a native "webviewer" component.

Why we use React Native and how it benefits you
-----------------------------------------------

**The simple yet powerful benefit of working with React Native to create a mobile app is that your developer need only write the code once and it gets translated into both iOS and Android native languages.**

This brings some hefty benefits. You don’t need two separate development teams for the different operating systems. (In fact, your web team may be able to handle the mobile app since React Native has a lot in common with its web counterpart React.) You don’t need to worry about the differences that can find their way into each app experience. And it speeds up your time to launch  the app - a pretty big thing for a new SaaS business.

Instagram carried out an **[experiment](https://instagram-engineering.com/react-native-at-instagram-dd828a9a90c7)** on a native portion of its app and found they could ship new features much faster. Using React Native, the portion of shared code for certain features ranged from 85-99%, which greatly cut down on time needed to develop for each platform.

### Is React Native the perfect solution for your SaaS mobile app?

React Native is **[not 100% native](https://stxnext.com/blog/2018/01/24/why-use-react-native-your-mobile-app/)**.

This can show up in a couple areas, which may or may not matter to a SaaS mobile app. Most notably, without making any modifications to the framework out of the box, the user’s account would be stored in the app itself, rather than the overall system (if you have also a web app, for example). React Native also makes it a little harder to distinguish between WiFi versus mobile data usage in cases where that may be important. However, thanks to its flexibility, you can add as much or as little native code to achieve what you need.

You also can’t get away with knowing nothing about the iOS and Android native programming languages.

While developers need to know less than if they were to create a pure native app, “You still need to understand a lot about the architecture you are targeting,” Philippe says. “For example, even if a tool could translate to Hebrew, you must still know that it's written right to left and that a letter can completely change how the previous one is written.”

If you’re going to use React Native as a framework for your mobile app, your web app must be built using React. Learn more about why we like React as a front-end programming language.

Famous apps built with React Native
-----------------------------------

React Native has an active, growing open-source community of developers using it. This is key when choosing a framework for your SaaS startup. It means you’ll be able to find developers fluent in your technology more easily, and they’ll be able to tap into high-quality supporting resources for their work.

The React Native mobile development framework has a lot of big names on board now - not surprising considering it was originally created by developers at Facebook. The social media giant created ReactJS for its web app and then came up with React Native to improve its mobile apps.

**A few of the biggest names using React Native for their mobile apps are:**

*   Facebook
*   Instagram
*   Airbnb
*   Skype
*   Tesla
*   Walmart
*   Uber Eats

Many new SaaS startups first develop a web app and then reach a point where they know they need to create a mobile app. We’ve already made sure you’re positioned when it’s time, because we work in React for your web app’s front end.

Want to learn more about **[our processes](https://www.belighted.com/blog/product-development-methodology)** for developing tomorrow’s successful **[SaaS startups](/saas-guide-to-software-as-service)**? Subscribe to get our blog via email or **[drop us an email](https://www.belighted.com/contact)**. 

  
[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/50f74af8-9d07-4c18-a034-4214c0dc7956.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/50f74af8-9d07-4c18-a034-4214c0dc7956)