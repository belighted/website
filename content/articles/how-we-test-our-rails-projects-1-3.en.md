---
lang: en
slug: how-we-test-our-rails-projects-1-3
originalPath: https://www.belighted.com/blog/how-we-test-our-rails-projects-1-3
title: How we test our Rails projects (1/3)
author: Philippe V.
description: >-
  First of a series of 3 articles about how we write automatic tests for our
  rails projects.

  This article focuses on the tools we use.
image: null
date: 1451606400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

This series of blog posts will explain how we write automatic tests for our Rails projects. It will be split in 3 parts discussing the following topics :

*   Part 1 : The tools. This part will present the third party tools we use and what are their purpose in our stack.
*   **[Part 2 : The structure. This part will present the file structure we use to organize the tests and the code related to them.](https://belighted.com/blog/how-we-test-our-rails-projects-2-3)**
*   **[Part 3 : The flow. This part will explain what kind of test we write, when we write them and how we go from the test to the code backand forth.](https://belighted.com/blog/how-we-test-our-rails-projects-3-3)**

Having automatic tests is an **idea** everybody finds great but very often the concretization of that idea is difficult. Tests take time to be written, tend to be an obstacle when the code needs to be changed, and need their own maintenance. When a project grows, so does the test suite and so does the time to run it, making the suite **feel** less valuable.

We hope that sharing with you some of our test habits will make your tests less of a _burden_ and more of an _asset_.

Part 1 : The tools
------------------

### [RSpec](https://rspec.info/)

First of all we need a test framework. Ruby comes bundled with Minitest which had some great improvements in the last few years, but since we have a working stack with RSpec there is no reason for us to fix it if it ain't broken.

RSpec biggest strength is also its biggest weakness : its DSL. When you read or write it for the first time, you do not have the feeling of writing ruby. You don't see directly where are your modules, classes, method definition and method calls which make it difficult to leverage some of your coding techniques but on the other hand almost all the abstraction you need have already been abstracted and the few additional you might are pluggable in a clearly documented way.

RSpec is a testing framework where Minitest is a testing library.

RSpec covers : Writing specs, Running specs, Creating test doubles, Verifying assertions, Creating new assertions, Creating example contexts, ...

Internally, RSpec is splitted in several sub projects making it possible to only pick some parts but we always take the whole package including RSpec Core, RSpec Expectations, RSpec Mocks, RSpec Rails.

### [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner)

When writing specs in a rails application, you certainly will end up writing data in a database.

Obviously it's not always the case, and it should not be the case when writing isolation specs for instance but when you're verifying an ActiveRecord object or when you're writing a smoke test, you will probably have to persist some data.

RSpec already offers to wrap every example in a transaction which is a very good strategy but it's not enough once you start writing feature specs using a real browser.

In those cases you need two processes sharing data through the database, thus you cannot use a transaction.

DatabaseCleaner is a tiny tool allowing to choose what strategy you want depending on the test, therefore you can use a transaction strategy for almost all your tests and a truncation strategy for your feature specs.

If you have to manage multiple databases or datastores, this tool offers you a central configuration to manage their cleaning between specs.

### [Capybara](https://github.com/jnicklas/capybara), and [Poltergeist](https://github.com/teampoltergeist/poltergeist)

Capybara is a set of tools for manipulating an html page like a user would do. It works with multiple drivers ( a driver is a way to hold a page, send request and receive responses), but we will only use two : the default **rack-test** driver which is like a fake in-memory browser with no support for css or javascript, and **poltergeist** which is a driver delegating to a **[phantomjs](https://phantomjs.org/)** process.

Capybara is a tool enabling us to write scenarios using abstraction like "click that button" or "visit that url", instead of "send a PUT request whith that formdata payload" or "send a GET request with those headers". The objective is to be much closer to describing the user intent, which is the point of a user story.

### [SitePrism](https://github.com/natritmeyer/site_prism)

SitePrism is again a tiny library which is great because it fits perfectly its small purpose. This library sits on top of capybara and its goal is to allow you to write **page objects**. A page object is an object allowing you to easily manipulate a page from a feature spec without having to know the characteristics of that page. It also enables you to put that knowledge in a ruby class and then use the page objects in every feature spec going through that page.

Imagine how many user stories must go through the login page, then imagine your login page has changed just a little bit and requires an additional click, or the css class you used to target the login field has changed. You wouldn't want to edit all your stories and you shouldn't have to. ! Your stories haven't changed, the page has. With the help of a page object, the scenarios capture the behaviour of the user and the page objects translate them into page manipulation.

### [Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot)

This one is more about sugar on the cake but I've really come to enjoy it a lot. This gem will automatically take a screenshot of every failed feature spec when the failure happened. If the spec driver was rack-test, then the screenshot take the form of an html page, if you were using poltergeist then you have both an html file and a png image.

That's all it does.

And it's incredibely useful when you've just rerun a suite of 40 feature spec expecting them to pass (because if you're working on your feature and do not expect your spec to pass, then you should probably not run 40 of them together) and 2 out of the 40 failed. When that happens, it's really cool to not have to rerun the failed ones in order to understand what went wrong but already have the error message AND the screenshots available.

If you don't like the automatic screenshot feature, this gem is still awesome for it's ability to take and open a screenshot when running a scenario step by step in a debugger.

### [Factory Girl](https://github.com/thoughtbot/factory_girl)

When writing specs, one always needs data.

Sometimes that data is a quite simple structure : a String, a Hash, a Message, ... Sometimes we need a very complex graph of data : An invoice with an attached user having a premium plan, A thread with 4 messages and 10 comments each having different authors, ...

When facing the second case, we often have to provide details for building valid data structures but most of those details are irrelevant for the test.

This is where Factory Girl can be used. The point of this tool is to help building complex graphs of valid objects by only specifying what is useful for the current test and let the factory _fill_ the other details with whatever is required to make those objects valid.

This tool helps to drastically reduce the noise in your test.

It is so easy to use that you might overuse it by requesting a complex graph when you could have done your spec with a simple object. The point of Factory Girl is not to be the only way for you to generate data for your test, the point is to have an easy, inconspicuous way of building complex graphs. And it does that very effectively.

Update : the next part is ready, you can find it **[here](https://belighted.com/blog/how-we-test-our-rails-projects-2-3)**, you can also go directly to the **[last part  
  
](https://belighted.com/blog/how-we-test-our-rails-projects-3-3)**

**[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)**