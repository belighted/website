---
lang: en
slug: an-innovative-way-to-reduce-spam-on-your-website
originalPath: https://www.belighted.com/blog/an-innovative-way-to-reduce-spam-on-your-website
title: An innovative way to reduce spam on your website
author: Philippe B.
description: We introduce here an innovative way to handle the flow of unwanted
  e-mails through a new anti-spam technique in replacement of the well-known
  CAPTCHA.
image: ./images/289348-grum-spambot-shut-down-massive-botnet-created-18-percent-of-worlds-spa.jpg
date: 1420070400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
What we wanted
--------------

As you may have noticed, we’ve recently launched our brand new website. And as a web development agency, the contact form is our primary channel for leads creation. We wanted to keep it as simple as possible to let our customers get in touch with us without any unnecessary hassle.

The issue
---------

The contact form was quickly used by spammers, filling our inbox with unwanted and useless e-mails, and costing us time and energy to handle.

Existing solution
-----------------

The most common way to avoid those annoying e-mails is to use CAPTCHAs, because users are familiar with it. However we didn’t want to force our customers to fill in this additional input: the user could be driven to stop his action because of this too complicated contact form.

Our solution
------------

After some research, we found out that since bots are basically computers they manage to visit our website and send a successful contact request in less than 5 seconds. Our idea was to set a timer, in order to block the requests that are suspicious.

In your Rails app, this means adding the following code to the application configuration:

    #config/application.rb
    Rails.application.config.antispam_timer = 30
    

In our case, the number the antispam\_timer is set to 30 seconds. You can now add time-related information to the user session in your application controller using a before\_filter, like this:

    #controllers/application.rb
    class ApplicationController < ActionController::Base
       before_filter :anti_spam
    
        def anti_spam
         session['antispam_timer'] ||= Time.now
        end
    
    end
    

Finally, you can use this information in your contact request controller. This is how we used it:

    class ContactRequestsController < ApplicationController
      def create
        # checking for contact spam
        contact_spam = false
        time_to_comment = Time.now.to_time - session['antispam_timer'].to_time
        if time_to_comment < Rails.application.config.antispam_timer
          spam_logger.warn("There is potential spam detected
              for IP #{request.env['REMOTE_ADDR']}. Antispam
              threshold not reached (took #{time_to_comment.to_i}s).")
          spam_logger.warn("Params were : #{params}")
          contact_spam = true
        end
        # U can use the contact_spam boolean to check 
            # if you have to send or not your mail. 
    end
    

For your information, there exists another solution, implemented in a Rails gem: [Honeypot CAPTCHA](https://github.com/curtis/honeypot-captcha). Practically, it adds a hidden field in your form that must stay empty as the user isn’t able to see it, but that bots will actually fill. Then in your backend controller you can easily check if the request is coming from a real user or from a bot.

  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)