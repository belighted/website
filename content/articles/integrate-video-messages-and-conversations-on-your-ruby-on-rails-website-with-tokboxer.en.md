---
lang: en
slug: integrate-video-messages-and-conversations-on-your-ruby-on-rails-website-with-tokboxer
originalPath: https://www.belighted.com/blog/integrate-video-messages-and-conversations-on-your-ruby-on-rails-website-with-tokboxer
title: Video messages and conversations on your website
author: Nicolas J.
description: >+
  “TokBox” is a free video calling / messaging platform which integrates with
  any website without any download involved. It proposes widgets to play/record
  videos and do live conversations with the user’s microphone and webcam,
  directly from the website itself. Up until now, Tok …

image: ./images/blog%20tech%20standard%20image-1.png
date: 1199145600000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
[TokBox](https://www.tokbox.com) is a free video calling / messaging platform which integrates with any website without any download involved. It proposes widgets to play/record videos and do live conversations with the user’s microphone and webcam, directly from the website itself.

Up until now, Tokbox was missing a Ruby interface to [their API](https://developers.tokbox.com/index.php/Main_Page). Thanks to a close collaboration with their team (based in San Francisco), we have just released [TokBoxer](https://rubyforge.org/projects/tokboxer/) (source code available [on GitHub](https://github.com/njacobeus/tokboxer/)), a Ruby gem which fills this gap. Of course, the library is still in its early stages (version 0.1.3 as of this writing), but we will obviously improve it over time.

Feel free to try it by simply typing “sudo gem install tokboxer” and following the instructions in the README file.

We are using TokBox and TokBoxer on [iStockCV](https://www.istockcv.com/), the online recruiting social network which we are currently developing. This new feature will allows candidates and companies to interact and make online interviews, which is quite exciting.  
  
[![New Call-to-action](/images/legacy-cta/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)