---
lang: en
slug: nomadsuite-development-workflow
originalPath: https://www.belighted.com/blog/nomadsuite-development-workflow
title: Nomad Suite development workflow
author: Joel C.
description: An overview of our handcrafted development workflow for Nomad Suite
  relying on a bunch of web services.
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
For a few months here at Belighted, we are all committed to release what could be a new breakthrough into the service related ERP world! We crafted it using such amazing tools as AngularJS and other trending ones!

But in our way to achieve such a challenge, we needed to put in place a workflow which needed to be as complete as possible in order to allow a high quality level of crafted code as well as traceability and as easy and lean as possible in order to focus only on features development.

In order to make things as smooth as possible for everybody, we rely on a few great tools, integrated together so everything that can be is automatic.

Starting a feature
------------------

As with any agile project, features of **[Nomad Suite](https://nomadsuite.com/)** are described as _stories_, ordered by priority on the popular [Pivotal Tracker](https://www.pivotaltracker.com).

The first step is therefore to _start_ the first story in the backlog. This lets everybody know who is working on what and, because we use [HipChat](https://www.hipchat.com/) for internal communication and we [hooked both tools together](https://help.hipchat.com/knowledgebase/articles/64449-pivotal-tracker-integration), all stakeholders are notified.

![](/content/images/legacy/zA5mVivoUH-uyVgGB5SsZ.png)

Next, we create a new feature branch, with a clear and concise name — it is destined to be pushed, so it shouldn’t confuse other developers. Some of us like to add the story ID from Pivotal, but the truth is we don’t really have a strict pattern. Feature branches are extremely important to us because they allow you to experiment at will, commit, share your changes, and rollback if need be, all without disrupting the work of other and, most importantly, staging and production deployments.

> On rare occasions, we do commit directly on **master** , but the change must then meet two conditions:
> 
> *   It doesn’t need review by another developer. This is true for very small bugs, typos and some settings changes, but not much else.
> *   It must be trivial enough that if you get interrupted, it can be stashed or discarded, and easily applied when you come back to it. ## Continuous reporting

At every push to [GitHub](https://github.com), the team is notified on HipChat. This is a great way to let everybody interested know how the feature progressing.

![](/content/images/legacy/ncuz9pHf5mcJoqkmIzu7J.png)

Our CI, [Semaphore](https://semaphoreapp.com/), is also notified, and will let you know if all tests are green through — you guessed it — HipChat. This allows developers to not run the entire test suite, as some tests can take a few minutes. It is perfectly OK to break a feature branch.

![](/content/images/legacy/l6n5TWqQQ4HqssEJI-Yep.png)

Finishing up
------------

Once the feature is implemented, tested, and all tests are green, the feature branch is ready to be merged into **master**.

Or is it? Now is the time to look at the commits, and squash the branch if necessary.

> As for branch names, we don’t have explicit guidelines on commits and messages, but here are a few things we hate to see, from bad to worst:
> 
> *   Incomplete (not functionnal) feature
> *   Untested feature
> *   Broken tests
> *   “wip”

All commits should reference the Pivotal Tracker story ID and the last one should say it finishes it, so GitHub can [update the tracker for us](https://www.pivotaltracker.com/help/api?version=v3#scm_post_commit). The story is now automatically marked as **finished** , but it still needs review. Time to open a **Pull Request** on GitHub.

![](/content/images/legacy/mdSMCBN2gKb_15cLZhagg.png)

Review
------

Because we want to make sure this is the best code we can write, and we can all learn something from somebody else, all changes need to be reviewed by another developer. It can be anybody — the important thing, like with pair programming, is to have another pair of eyes, but we will sometimes ask someone with particular expertise to do the review.

After a little back and forth (with amended commits and forced pushes), the reviewer can finally decide to merge the feature. He is also reassured by Semaphore, which tested the branch and [reports status](https://semaphoreapp.com/blog/2012/09/04/semaphore-implements-githubs-status-api-in-record-time.html) on the Pull Request.

![Semaphore status on Pull Request](/content/images/legacy/koEfpcv-nl0MsBKrSi2pF.png)

Deployment
----------

After the merge, Semaphore will run tests on the new master. They should all be green, so it will deploy on [Heroku](https://heroku.com) for us (and yes, notify HipChat). Our custom deploy script also uses the [tracker-git](https://github.com/robb1e/tracker-git) gem, so stories will now automatically be **delivered**.

Time for the next story!..

![](/content/images/legacy/l4VlDVXR-Y-yhF8dd4gfd.jpg)

Hoping this post could help people looking for an efficient way of organizing their job !  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)