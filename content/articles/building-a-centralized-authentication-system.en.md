---
lang: en
slug: building-a-centralized-authentication-system
originalPath: https://www.belighted.com/blog/building-a-centralized-authentication-system
title: Building a centralized authentication system
author: Dominique L.
description: Some time ago one of our customers, for which we had already
  developed a highly specialized e-commerce/ERP, decided to add a new service to
  the one they were already offering. Discover how we handle a single sign-in
  and sign-out system through multiple applications.
image: null
date: 2014-09-23
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Some time ago one of our customers, for which we had already developed a highly specialized e-commerce/ERP, decided to add a new service to the one they were already offering. So they naturally asked us to extend the existing application with a whole new section covering their new business. However, the legacy code was build on top of Rails 3.0 and for various reasons[1](#cas-note-1) it was if not impossible, at least highly impractical for us to upgrade to the most recent version (3.2 at the time). As we didn’t want to write this new part (which we knew would become larger and more complex than the original in the long run) on an already outdated framework, we decided to write a new, separated, Rails application.

The single sign on problem
--------------------------

If this solution allowed us to use the latest version of the gems and to write everything from scratch (a luxury developers can not always afford), it generated another problem: from the end users’ point of view, these two applications had to be seen as two parts of a single, integrated, one. That meant that when they were logged in on one application, they should have been automatically considered logged in on the other as well.

The Devise gem provides an easy way to authenticate users through third party OAuth2 service providers like Google or Facebook, but in our case using an external service was out of the question: the users are employees, and they have to go through a request/approval procedure before gaining access to any application. Furthermore, they already had their credentials on the legacy application. So we wrote a third application: our own OAuth2 service provider[2](#cas-note-2). We used Devise to manage the server-side authentication and Doorkeeper to provide the authorization mechanism: in addition to the user credentials used for client-side authentication, the application also controls the access to resources such as user profile information and preferences. It is also this application that manages the whole user registration and approval process.

The other side of the equation: single sign out
-----------------------------------------------

Single sign on is fairly straightforward to implement: even if you have to write your own OAuth2 provider, there are a lot of gems, tutorials and examples to just help you do that (actually, Devise and Doorkeeper documentation should cover 99% of your needs). Troubles arise when you try to consider the reverse operation: single sign out. To understand the problem and the solution we eventually used, you first need to understand how the sign on with Devise and OAuth2 works.

Let’s say we have two client applications A1 and A2, and the authentication server AS. When a user tries to access A1 for the first time, Devise checks the session cookie associated with the domain name of A1 to see if the user is already locally logged in. If not, it contacts AS and asks for some user credentials. On AS, Devise checks the session cookie associated with AS domain and if the user is not already logged in, it asks for his e-mail and password. Once the user is properly authenticated, AS calls back A1 on a specific callback URL and sends the signed user’s credentials (mainly its UUID). With this information, A1 can retrieve the user from its own database (or create a new one if he does not exist yet) and log him in locally (i.e. set up a proper session cookie). Now when the user goes to A2, the same process takes place, but as he is already logged in on AS, AS calls back A2 directly without presenting the login screen to the user, and A2 logs him in locally. From the user’s point of view, it’s as if he was already logged in on A2.

The problem is when the user wants to log out. Since he is actually logged in independently on the three applications, if he logs out from AS (i.e. technically his session cookie associated with AS domain is destroyed or invalidated), he is still locally logged in on A1 and A2.

Our solution
------------

The first solution we tried was to implement a logout callback on A1 and A2, that would be called by AS when the user signs out. Unfortunately this didn’t work: the session is specific to each HTTP client (you can be logged in on your Gmail account in Chrome but logged out in Firefox), and since AS had to instanciate its own HTTP client to call back A1 or A2, the session information was lost.

Eventually, the trick was to exploit a specificity of our production environment: the domain of A1, A2 and AS were all of the form xyz.ourcustomer.com. Browsers send back cookies only to servers within the emitting domain, which means that if the browser has saved the three session cookies (from a1.ourcustomer.com, a2.ourcustomer.com and as.ourcustomer.com), it will only send the a1.ourcustomer.com cookie with its requests to A1, because the other two don’t belong to the same domain. However, you can configure your Rails application to mark your session cookies as belonging to the top level domain instead of the fully specified one with the ‘domain’ parameter:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="ss"><span class="constant">MyApp</span></span><span class="constant"><span class="p">:</span><span class="ss">:Application</span></span><span class="ss"></span><span class="o">.</span><span class="n">config</span><span class="o">.</span><span class="n">session_store</span> <span class="ss"><span class="symbol">:cookie_store</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:key</span></span> <span class="o">=&gt;</span> <span class="s2"><span class="string">"_my_app_key"</span></span><span class="p">,</span> <span class="ss"><span class="symbol">:domain</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:all</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

Once our three applications were configured this way, their respective session cookies were all emitted as belonging to \*.ourcustomer.com and each of them received the three session cookies with each request[3](#cas-note-3). It then sufficed to destroy all three session cookies (since we now had access to them) when logging out from any of the application, effectively logging out from the others as well:

<figure class="code"><div class="highlight"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
</pre></td><td class="code"><pre><code class="ruby"><span class="line"><span class="k"><span class="class"><span class="keyword">class</span></span></span><span class="class"> <span class="nc"><span class="title">Users</span></span><span class="title"><span class="o">::</span><span class="no">SessionsController</span></span><span class="no"></span> <span class="o"><span class="inheritance">&lt;</span></span><span class="inheritance"> <span class="ss"><span class="parent">Devise</span></span><span class="parent"><span class="p">:</span><span class="ss">:SessionsController</span></span><span class="ss"></span></span><span class="ss"></span></span><span class="ss"></span>
</span><span class="line"> <span class="k"><span class="function"><span class="keyword">def</span></span></span><span class="function"> <span class="nf"><span class="title">destroy</span></span></span><span class="nf"></span>
</span><span class="line"> <span class="k"><span class="keyword">super</span></span>
</span><span class="line"> <span class="n">cookies</span><span class="o">.</span><span class="n">clear</span><span class="p">(</span><span class="ss"><span class="symbol">:domain</span></span> <span class="o">=&gt;</span> <span class="ss"><span class="symbol">:all</span></span><span class="p">)</span>
</span><span class="line"> <span class="k"><span class="keyword">end</span></span>
</span><span class="line"><span class="k"><span class="keyword">end</span></span>
</span></code></pre></td></tr></tbody></table></div></figure>

This solution is probably not the most elegant, but it is now deployed in production for more than one year and without any problem so far. Anyway, if you think of a more orthodox way of doing it, feel free to post it in the comments: we always look forward to improve our applications.

References
----------

*   Devise: **[https://github.com/plataformatec/devise](https://github.com/plataformatec/devise)**
*   Doorkeeper: **[https://github.com/doorkeeper-gem/doorkeeper](https://github.com/doorkeeper-gem/doorkeeper)**
*   OAuth2 protocol definition: **[https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)**
*   OAuth2 is not the only way to implement Single Sign On on Rails; for example, Casino uses the CAS protocol (authentication, but NOT authorization): **[https://casino.rbcas.com/](https://casino.rbcas.com/)**

#### Notes

*   \[1\] Mainly, some parts of the code heavily relied on gems whose newer versions were totally incompatible with the older ones and an upgrade would have forced us to rewrite these parts entirely, something which wasn’t on the planning.
*   \[2\] To be accurate, OAuth2 is not an authentication mechanism. It is an authorization mechanism to control access to resources. It can however be used for authentication, typically by requesting access to the user’s credentials.
*   \[3\] However, since each cookie is encrypted with a different secret token, the applications are only able to read the content of their own.

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)