---
lang: en
slug: organize-rails-files-by-topic
originalPath: https://www.belighted.com/blog/organize-rails-files-by-topic
title: Organize Rails files by topic
author: Philippe V.
description: Very often we work on rails projects which slowly grow until they
  reach the point when we open the controllers or models folder and must
  navigate between dozens of files. We propose here an alternative way of
  structuring folders and files to handle this problem without the hassle of
  splitting the projects into multiple subprojects.
image: ./images/illu-rails-assets.jpg
date: 1420070400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
The Problem
-----------

Rails is an opiniated framework and one of these opinions is about how the files and folders are structured. Rails has chosen to make a stereotyped structure - the files are grouped by kind : controllers, views, models, …

When an app is growing, most developpers find themselves needing new stereotypes in order to keep small files : decorators, policies , inputs, interactors\* …

Finding new stereotypes is a very important design step. It is one of the main way to have a layered application and when it comes to code design lasagna tastes much better than spaghetti !

Thankfully for us, Rails allows developers to add new subfolders to the `app` directory and it will consider all those direct subfolders as a potential source of ruby code.

Unfortunately when an app continues to grow, those folders contains more and more files and the app is not able to scale very well. The folder directory is there to help us find the file we are looking for and opening a folder containing 50 files isn’t very helpful.

If the app is becoming very large, we could split it in different engines or gems but this will bring new problems concerning dependencies between the components. There is a spot - somwhere between 20 and 50 models - where you have too many files to group them by stereotype but you do want to keep a monolithical app anyway. A monolithical app in this context is an app where any topic of the app might know about every other topic of the app, therefore making engine extraction really hard.

Our solution
------------

Some time ago we started experimenting a new way of structuring files when we encountered that problem : topic folders.

Since Rails allows us to put any ruby class in any direct subfolder of `app`, nothing prevents us to put controller classes in the `models` directory … except common sense.

What common sense doesn’t prevent us to do is to take all the invoice related classes and put them in an `invoice` folder. Then do the same for the `audit` code, and again for every “topic” of our app.

![Organize Rails files by topic - image 01](https://lh5.googleusercontent.com/15Orf5ERW2tFkbb8_tiBHlMUmeJCgIkXcSiAvx1ATCRyuspdyFTyP52wNvRwbjoC5k9IADmMsQhYU4Hn3AWAYcgGoNFcOgS_FxCqQ1s-M_GRR4XeR5qqmIY1b67E2QFjw4ouyEA)

> Example : this app is about passing surveys and getting reports from the results.
> 
> *   \- legacy\_models contains models stored in an old database
> *   \- survey\_redaction contains code about writing new surveys
> *   \- survey\_take contains code about a participant taking a survey
> *   \- reports contains code about the reports a participant can print after having taken a survey

The size of the topic will determine how many files are in that folder so we try to keep topic about 2-to-5 resources max. If we have a topic related to 3 resources ( e.g. `invoice` will be about the `Invoice`, `InvoiceLine` and `Payment` models ) then the `invoice` folder will contain `3 * n` files, `n` being the number of stereotypes we need to handle that topic. Of course, this is also compatible with namespaces, so we can probably have an `invoice/admin_corner` and `invoice/user_corner` subfolder where we will put namespaced controllers. If there is some processing to be done with the invoice, we can also have an `invoice/invoice_processing` folder which will group all the code under the `InvoiceProcessing` namespace.

One of the main advantage of doing this topic segregation is the proximity of related files. When someone adds a method to a controller, he will probably need to edit the policy and when editing the `InvoiceProcessor`, one will probbaly want to add methods to the related records. It is way easier to jump from one file to another when they are grouped by topic than grouped by stereotype !

![Organize Rails files by topic - image 02](https://lh3.googleusercontent.com/8WpuMQ7ws04eVAGFHP_JocHqvo0l9uezqKnWrT22tDwQejnoicEQHNS9917H-POEFeqdTit4d8nFDHgJQs1Gii9rCmVU2RQXcdNwQgrEzkNVgE9RAYXMci2oE5T4t19lFkWBpZw)

> The reports directory contains models at it roots, I do no want to namespace those classes. Among them we can find record classes (Report, Chapter, Variant), decorator classes (\*Decorator) and POROs (ReportInstance).

What about the views and assets ?
---------------------------------

Any direct subfolder of `app` can be used to put classes, yes, but what about non ruby files : views and assets ? We think (and Rails is about opinions, isn’t it) that assets are to be kept together. Rails will concatenate all the assets files and treat them as a single bundle so we found it better to keep those files in a single folder.

But the views are tightly coupled to the controllers so we should move them in the topic folder. Unfortunately Rails needs to be “configured” in order to consider the topic folder as a potential source for the views. We could easily get all the subfolders of `app` and tell Rails to add them to the lookup chain when searching a view template but it would slow down the rendering of all requests and it would not scale very well. Therefore we chose to add only the `views` subfolder related to the controller when the controller handle a request. We did so by adding the following macro on the controller `prepend_topic_view_path(__FILE__)` and defined the macro like this (we also added `extend TopicController` to ApplicationController )

    module TopicController
      def prepend_topic_view_path(controller_file_location)
        views_path = File.expand_path("../../views", controller_file_location)
        relative_path = Pathname.new(views_path).relative_path_from(Rails.root).to_s
        prepend_view_path relative_path
       end
     end
    

This particular piece of code takes into account that our controller classes are _always_ namespaced. It’s an habit we have to easily add an `api` or `admin` namespace when we need it but it would be easy to change the code a little bit to recursely visit the directory path of the controller and add any `views` subfolder it finds. The good news is that this macro is run with the definition of the controller, thus for every request in dev but only once in production. This is why it is completely scalable with the number of topic folders we have.

Once this is done we can have a `views` subfolder in our topic directory and when the controller handle the request it will add that folder to the lookup path.

![Organize Rails files by topic - image 03](https://lh6.googleusercontent.com/7RWOoUIMRA2eP7M8A0XPF6-OjcnLpU2HQK12jiCkLid8UAwdExS7E6RTBaES2BTPDSe6Bhyokjy9EruWcs0aJCTyhyzwCKvLgLVlW7ryfYB2JbpuUOplyly4mLgPEiVIGlGa2Sw)

> Namespace folders allow us to write very specific code like everything related to report processing (the complex mechanism to generate a report tailored for the participant ) or namespaced controllers and policies. Pundit policy classes can either be found in the root namespace (like VariantPolicy) or in a spcific namespace (like Front::VariantPolicy). We use an homemade extension to Pundit to find the correct policy. The view templates follow the same structure as usual but in the topic folder.

It is just one more string to your bow
--------------------------------------

One of the best reasons we like this solution is because it can be adopted without any change. You can still have stereotyped folders for everything related to many topics - we keep a `User` class in the `models` directory and split its methods between multiple concerns placed in topics folders.

You should also keep stereotyped folders for everything not tightly related to the topics of your app : we keep an `inputs` folder for our custom inputs for instance. We also keep some referential resources in their old stereotyped folders, classes like `Country`, `Language`, `Address`. But we will move `InvoiceAddress` in `invoice` folder because it will probably behave slightly differently than a vanilla address.

Since this is a solution to growing apps problem, we mostly found ourselves trying to apply this solution to existing code without having the time to “topic-ify” all the code at the same time. It was no problem for us to do it gradually, starting with the pure ruby code which just had to be moved, then to the Rails-related code - except the controllers - then finally the controllers and views. The only problem with this step by step approach is that your team must be aware that the code might be found in multiple folders. Most of the time a topic can be extracted quite quickly since it is only a matter of finding groups of a few related files.

Many thanks to the authors and contributors of draper, pundit, simple\_form and interactor gems !  
  
[![New Call-to-action](/images/legacy-cta/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)