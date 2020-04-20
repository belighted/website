---
lang: en
slug: ruby-mine-foreman
originalPath: https://www.belighted.com/blog/ruby-mine-foreman
title: Rubymine & Foreman
author: Kévin V.
description: Discover by practice Rubymine & Foreman gem.
image: null
date: 1356998400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
[Rubymine](https://jetbrains.com/ruby) is a fantastic IDE that goes above and beyond in letting you keep and/or improve your existing workflows.

[Foreman](https://github.com/ddollar/foreman) allows you to easily manage your runtime dependencies, such as Redis, Delayed Jobs, etc. It is the system used by Heroku, which is another good argument for using it in development if your projects are hosted there.

One of my first customization needs was to be able to easily start/stop Foreman and see its output without leaving the IDE. Turns out it’s really easy.

Of course, you’ll need to have foreman installed.

    gem install foreman
    

In Rubymine, go to “Edit Configurations” from the main toolbar.

![](https://i.imgur.com/Qog0syh.png)

Click on the “+” icon and select “Gem Command”.

![](https://i.imgur.com/G8gC9KB.png)

Input “foreman” for the gem name and the executable name, and “start” as the command argument. You can leave the other defaults as is.

![](https://i.imgur.com/2B1OCMO.png)

And that’s it. As long as you already have a Procfile in your project directory, you’re good to go. Here’s an example of the result :

![](https://i.imgur.com/ujO0H5z.png)

Note that “Gem Command” can have a lot of other clever uses. Be creative. :)  
  

[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)