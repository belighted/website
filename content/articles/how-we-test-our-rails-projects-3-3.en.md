---
lang: en
slug: how-we-test-our-rails-projects-3-3
originalPath: https://www.belighted.com/blog/how-we-test-our-rails-projects-3-3
title: How we test our Rails projects (3/3)
author: Philippe V.
description: Last of a series of 3 articles about how we write automatic tests
  for our rails projects. This article focuses on the flow we follow to write
  tests for a single feature.
image: ../images/blog/flow.png
date: 1451606400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

This blog post is the last of a series of 3 articles explaining how we write automatic tests for our Rails projects.

The 3 parts discuss the following topics :

*   **[Part 1 : The tools. This part will present the third party tools we use and what are their purpose in our stack](https://belighted.com/blog/how-we-test-our-rails-projects-1-3).**
*   **[Part 2 : The structure. This part will present the file structure we use to organize the tests and the code related to them.](https://belighted.com/blog/how-we-test-our-rails-projects-2-3)**
*   Part 3 : The flow. This part will explain what kind of test we write, when we write them and how we go from the test to the code back and forth.

Part 3 : The flow
-----------------

### The initial feature spec

We start our work with the specification of a feature. A feature is a series of interactions between the user and the app - or sometimes between several users and the app - which brings value to at least one of the actors.

The "multiple steps" part is the reason why a feature spec is sometimes called integration spec (because we test how the steps integrate into each other) or what we like to call a "flow spec" because we exercise one of the flows of the application.

We start our example file with a name for the feature and a very succint text describing who are the actors, why they participate in the feature and how they participate.

The header of a feature example might look like this :

    # spec/features/subscribe_to_artist.rb
    Rspec.feature "subscribe to artist", '
        As a user
        In order to be notified when an artist shares a new song
        I want to subscribe to this artist
    ' do
    #...
    end
    

The format we use is an alternate version of the [User Story](https://en.wikipedia.org/wiki/User_story) format, which is meant to be free text (as opposed to structured).

It is basic text so you can choose to write anything you like but we have found out that identifying the actors (user/artist), the verbs (subscribe/share/notify) and the items (song) goes a long way into introducing a common vocabulary which then will help to communicate about the app and choose good names when writing the code. Understanding why the actor does something is also really important : having a feature because it is legally required might drive it differently than having it in order to save time.

We think the stakeholder and the purpose are the most important segments so we start with them, then we finish with one or multiple lines to describe the way to reach that purpose.

Now that we have the big picture, we try to break it down into a series of steps the actor would have to follow in order to reach its goal. We start with an initial scenario which illustrates our best flow. It might look like this :

    # spec/features/follow_artist.rb
    scenario "user subscribes to artist, artist shares song, user is notified" do
      as(user) do
        i_visit_the_page_of_the_artist
        i_subscribe_to_the_artist
        a_message_is_displayed_telling_me_my_subscription_is_valid
      end
    
      the_artist_shares_a_new_song
    
      as(user) do
        a_message_tells_me_about_the_new_song_of_the_artist
        i_follow_the_link_from_the_notification
        the_page_about_the_new_song_is_displayed
      end
    end
    

It's a simple story but it gives us a lot. Its purpose is to provide a high level description of the flow. If we do not expect the notification to provide a path towards another page, we should talk about it now. If the notification should be done by email or sms, we can discuss it. If there is no song page but we should display the artist page we can again know it very soon. All it has cost us is a dozen lines of pseudo code / pseudo english.

As explained in the [previous article](https://belighted.com/blog/how-we-test-our-rails-projects-2-3) we use some simple narrative rules to differentiate between 3 kinds of steps :

*   sentences using the active first person describe interactions initiated by the user.
*   sentences using an active third person describe an external event.
*   sentences using passive mode describe a verification run against the current state of the app (current page or current database state).

the `as(actor)` helper is the one described in the previous article. It is a very high signal/noise helper allowing us to authenticate a user and clearly read which steps are done by which actor and during which time unit. In this example we can easily spot that there are 3 time units : the subscription, the sharing of a new song, and the notification.

You might have noticed that the sharing of a new song is not described in a multiple steps narrative. This is because this scenario is about the subscription. The sharing a of a new song will have its own scenario but in this one it's a detail which we do not want to describe. If the mechanics for sharing a new song changes, this scenario should not change, but the one about sharing a song should.

Keep each scenario focused on its purpose and you will avoid the refactoring hell of changing all your scenarios because something basic (e.g. authentication) has changed. I can't stress this strongly enough : _keep your scenarios focused !_ This is the main reason people give up on automatic testing. When one does not respect the Single Responsibility Principle, a single change in the code may imply a thousand changes in the specs and then you will want to drop all your tests.

### Writing the steps

Now that we have our initial scenario, we can follow the rules of TDD and run it. Yes, really.

From now on, we can repeat a very simple cycle :

*   Try to guess where and why the test will fail.
*   Run the test.
*   Change the code or change the spec in order to make it pass or fail somewhere else.

Strictly speaking, we are not following the rules of TDD because the official cycle is Red/Green/Refactor and we are only doing Red/Green. The reason is that we found it easier to do our best when writing the code the first time and then refactor either when seeing an opportunity or when the lack of an improvement can be treated as a Red step. This is a choice and it might not fit your style or your environment; never forget that agility is about adapting to your constraints, so feel free to take what is meaningful, drop what is not, and change whatever suits you best.

If we run the spec in its current state (and supposing we have the structure described in the previous article), we will have an error about the method `i_visit_the_page_of_the_artist` not being defined. Excellent ! This is exactly the point of using TDD as a design tool : the compiler and all the tools will always help us to go to the next step. If you have another error then it's alright, too. It means that you have forgotten or you ignore something about your system. The treatment is the same : learn what is wrong and when you understand it, fix it.

So the system is telling us to write the _step definition_, so we follow its advice :

    def i_visit_the_page_of_the_artist
      visit artist_path(id: artist)
    end
    

Almost every step definition is a one liner. Their purpose is to transform the narative style of the scenario into a imperative OOP style. We get the `visit` method from Capybara because we are in a feature spec. We imagine the `artist_path` coming from the routes helper. We always use the named parameters instead of the positional parameters when using the routes helper because it has happened several times that a change in the url schema brought a new parameter _before_ the existing ones. This typically happens when you decide to scope all your url in a `locale` prefix. T he last part is the call to an `artist` method which does not exist (yet); if we were to run your spec now this would be the failing part.

### Going back to the scenario

For this story, we need an existing artist. We do not want to pollute the scenario with the details of its creation but the dependency of an existing artist is not something we want to hide.

We usually choose one of those three solutions for the problem of dependent data :

*   if the dependent data is needed as part of the basic data set required for the application to work, we add it to the seeds. We write our seeds to be idempotent; they can be rerun on every deploy and they also can be run before every test suite including feature specs. The seeds tables _are not_ cleaned between specs because feature specs are not meant to change those and unit specs are run in rolled back transactions. Examples : Country list, Credit card providers, etc.
*   if the dependent data is needed in several scenarios, we make a _shared\_context_ with a simple name describing the state created by all the records created. The shared context ensures the record are created and we have methods to access them easily. Examples : "Usual accounts exist", "An artist has several songs", etc.
*   if the dependent data is required only for one or two scenarios and only in one feature spec, we make a narrative private method with a meaningful name describing the context which has to be set up. Examples: `the_user_has_enough_credits`, `the_artist_has_a_concert_soon`, etc.

We suppose we are going to need a valid artist in several scenarios, so we write a `shared_context`

    #spec/support/shared_contexts/usual_accounts_exist.rb
    RSpec.shared_context 'usual accounts exist' do
    
      let!(:user){
        create(:user)
      }
    
      let!(:artist){
        create(:user, :admin)
      }
    
      let!(:admin){
        create(:user, :admin)
      }
    
    end
    

For the sake of not having an anemic shared context, I've added two other typical user accounts. We suppose here that we have a factory able to create those objects but for complex object graphs you might resort to more specific strategies. Please read the [previous article](https://belighted.com/blog/how-we-test-our-rails-projects-2-3) for more details about shared\_contexts.

Now we can use this context in our scenario and call the `artist` method

    # spec/features/follow_artist.rb
    include_context 'usual accounts exist'
    scenario "user subscribe to artist, artist share song, user is notified" do
      ....
    end
    

### The cycle restarts

The first step is done, we can start the cycle again and expect the test to fail on the second step. Complaining about the method `i_subscribe_to_the_artist` not being defined. But that's not what's happening. It complains about the `artist_path` method not being defined.

I said, it should be coming from the rails router but we haven't written it yet. Since this blog post is not about Rails code, let's assume we follow the track of error messages so we write :

*   a route, then the error message is about a missing controller
*   a controller then the error message is about a missing template
*   the missing template

Now we're back at the specs with an error message about the missing `i_subscribe_to_the_artist` method. So we write it.

    def i_subscribe_to_the_artist
      artist_page.subscribe
    end
    

This is definitely the best example of what I meant by "transforming the narrative style into an imperative style". It looks like nothing but this has value :

*   we can have the benefit of the narrative style as explained earlier
*   we can have different narrative for doing the same action, meaning the narrative is focused on the intent
*   the narrative, and thus the scenario does not change if we refactor our page object

Now we rerun the test and it complains about `artist_page` not being defined. We create the page object as explained in the previous post, and then it complains about the `subscribe` method not being defined.

Once again we just follow the hints of the error message and we add the method :

    # spec/support/pages/artist_page.rb
    purpose_element :subscribe_button
    
    def subscribe
       subscribe_button.click
    end
    

The `purpose_element` macro is explained in the previous article, it allows us to target a DOM element based on its `data-purpose` attribute.

The next failure is therefore about no element on the page having a `data-purpose` attribute with the value `subscribe_button`.

From there we :

*   add the missing button, which requires a form
*   add the form which requires a route
*   add the route which requires a controller
*   add the controller which can redirect to the same artist page

Then we run the test again which complains about the missing `message_is_displayed_telling_me_my_subscription_is_valid` method. So we add it :

    def message_is_displayed_telling_me_my_subscription_is_valid
      expect(artist_page).to have_message_about_valid_subscription
    end
    

then in the page object :

    element :message_about_valid_subscription, ".notification", text:  18n.t("artists.show.notifications.valid_subscription_message")
    

and finally we follow the error message path again until we :

*   have a translation key
*   add a notification in the flash during the subscription
*   display the notification inside a ".notification" element

### Mid feature Summary

Currently we have half the spec passing and yet we haven't built anything useful so far. Or have we ?

Actually I think we have done a lot :

*   We have defined one of the scenario allowing to complete the feature.
*   We have discovered some of the urls, controllers and actions needed for our feature.
*   We have an automated spec exercising a path and ensuring no compile error or misnamed entity is used in it.
*   We have completely separated the flow spec from any design details.

What we have done so far is building drawers for our future code. Some drawers will stay quite simple and some will contains lot of content. Some drawers will have a very low [churn](https://docs.codeclimate.com/docs/churn) and some will have a much higher one. Writing and testing the content of those drawers will be the topic of isolated tests but we have managed so far to not need it.

This means our spec is not finished.

### The external event

Now we have to write the `the_artist_shares_a_new_song` step. This step might be and extremely complicated one. And we must find a way to not care about its complexity since it's only a detail of our current scenario.

In the real world one of those two options happens : we either already have another feature spec concerning that feature or we pause our current feature to make that one. In both cases when we continue this feature, the other one already exists and is tested.

If that other feature is extremely simple, say it's a matter of adding one record in the DB, we can simply emulate it in a private method. Most probably it's a quite complex one which is business centric and will change over time and we cannot afford logic duplication.

This is where _interactors_ come into play. Interactors (which are sometimes called "Service objects") are objects reprensenting a business interaction. They are instantiated by a controller and populated with data extracted fom the request, they are responsible for executing one job, and they can be inquired about the result of their interaction. We use the [interactor gem](https://github.com/collectiveidea/interactor) a lot because it's a very simple one which fullfills its purpose perfectly without trying to overstep its boundaries.

Back to our spec ! If sharing a new song happens to be a quite complex task there is probably an interactor responsible for it and if there is not, now is a good time to write one - this is exactly what I meant by being opportunist on the refactor part of Red/Green/Refactor - and keep the spec about it green.

Now that we are sure we have an interactor, we can just instantiate it and run it from our spec. By doing so we ensure that any change in the sharing song feature would automatically be taken into account in this spec.

    def the_artist_shares_a_new_song
      song_attributes = attributes_for(:song)
      song_params = {
        title: song_attributes[:title],
        song_file: song_attributes[:song_file],
      }
      sharing = ShareNewSong.call(artist: artist, params: song_params)
      sharing.success? or raise "ShareNewSong interaction failed during rspec example : #{sharing.error_message}"
    end
    

### The main logic

So now we can finally attack the main code of our feature, the part when we need to send notifications.

Running our cycle again we get a message about a missing `a_message_tells_me_about_the_new_song_of_the_artist` method. So we write it :

    def a_message_tells_me_about_the_new_song_of_the_artist
        song = artist.songs.last
       expect(navbar).to have_notification_about_new_song(song)
    end
    

then the page object

    def has_notification_about_new_song?(song)
        has_css?(".song-notification", text: song.title)
    end
    

and now the test fails because the notification is not present.

We think and decide the best "drawer" to place this logic is inside the interactor.

So we open the isolated spec about that interactor (one of the beauty of the interactors : they can be tested in isolation) and we add an example about the notifications :

    # spec/songs/share_song_spec.rb
    ...
      it "delivers the expected notifications" do
        subscription = create(:subscription, artist: artist)
    
        expect{
        interactor.call(artist: artist, params: valid_song_params) # we suppose this is the usual way to call the interactor
        }.to change{ subscription.user.song_notifications.count }.by(1)
      end
    ...
    

Now we run this new isolations spec and of course it is failing because the interactor does not create the `song_notification` record. So we update the code of the interactor and rerun the isolation spec and it is green. Then we run the feature spec and it is still red because the `song_notifications` are not displayed. We update the code of the navigation bar to display the notifications and our feature spec is finally green !

### The rabbit hole

Actually things are not that simple. When you ran the updated isolated spec, you would have raised a new failure about `subscription` factory not exising. Then about User not having a `song_notifications` association, and fixing this means writing another isolated example about user. Then when writing the template for displaying the song notifications will bring questions about which notifications to display, and this will lead you into new methods to filter only recent notifications and those also need to be tested...

This might feel like going down the rabbit hole, and it is. But you're going down with a safe line : every step you go further, you have a failing test reminding you what to do. Those tests are like golf flags telling you in what direction you must shoot. Even if you have a very poor memory, there is no problem starting a new test because you can always run your test suite which will tell you exactly what you were trying to achieve.

### The end

Eventually, all your test go green. Your feature is done and repeatable. The methods you added in your business layer are tested in isolation. You have page objects allowing you to abstract the intent of using your pages into actions on DOM elements. You have set up reusable contexts.

You can start again for a new feature.

It is also very likely you realised when writing code that the scenario you wrote is not exactly what you want. It's ok, the scenario is not written in stone. You did your best to write a good initial scenario, then thought about it and improved it before starting to write the code but writing the very code will bring new questions and new answers. You will have a better understanding of your problems when writing your code and it is ok to change your scenario at any time in the light of that understanding.

Your scenario is also very likely to change in the future because your client or your users have a better understanding of what they want. It's ok to change your scenario at any time for those reasons, and then to make your tests green again following the same cycle.

What you do not want to do is having to change your spec when something totally unrelated has changed, and we hope the method described here will help you minimize that event like it did for us.

We hope you enjoyed reading this series of posts and you now have a better grasp on how testing rails applications can be done. Please share with us any comments or remarks about what you think of our process or about how yours is different.

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)