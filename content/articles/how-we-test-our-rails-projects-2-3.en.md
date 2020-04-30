---
lang: en
slug: how-we-test-our-rails-projects-2-3
originalPath: https://www.belighted.com/blog/how-we-test-our-rails-projects-2-3
title: How we test our Rails projects (2/3)
author: Philippe V.
description: >
  Second of a series of 3 articles about how we write automatic tests for our
  rails projects.

  This article focuses on the supporting code we wrote.
image: null
date: 1451606400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

This blog post is the second of a series of 3 articles explaining how we write automatic tests for our Rails projects.

The 3 parts discuss the following topics :

*   **[Part 1 : The tools. This part will present the third party tools we use and what are their purpose in our stack](https://belighted.com/blog/how-we-test-our-rails-projects-1-3).**
*   Part 2 : The structure. This part will present the file structure we use to organize the tests and the code related to them.
*   **[Part 3 : The flow. This part will explain what kind of test we write, when we write them and how we go from the test to the code backand forth.](https://belighted.com/blog/how-we-test-our-rails-projects-3-3)**

Part 2 : The structure
----------------------

### /spec

Since we are using RSpec, we won't be using the `test` folder but the `spec` one.

This folder will keep all our example files (an example is any kind of automatic test in RSpec terms), but also code and assets specific to our tests. More precisely there will be 3 subfolders dedicated to store files helping our examples and as many folders storing example files.

The 3 sub folders containing helping files are :

*   `factories` : Where we put `FactoryGirl` factory definitions. Usually one file by object tree we need to build.
*   `resources` : Where we put static files we need in our examples. Those can be files we need to simulate an upload, files we need to compare with the result of a file generation, picture files we need to populate avatars of our users, etc. When we need a file to be used as-is without the need of parsing it, we will put it there.
*   `support` : Where we put all the supporting code for our test environment. This is the biggest one of the three and has its own sub structure.

The other subdirectories will _mostly_ mimic the structure of your `app` folder. We usually follow a structure of _stereotyped folders_ ( the rails way ) for the common code and [_topic folders_](https://belighted.com/blog/organize-rails-files-by-topic) for specific code. Thus if we have the subfolders `app/models/user.rb`, `app/api_clients/twilio_client.rb`, and `app/invoicing/invoice.rb` files, we will have the `spec/models/user_spec.rb`, `spec/api_clients/twilio_client_spec.rb` and `spec/invoicing/invoice_spec.rb`.

I said _mostly_ because there is one additional folder in `spec` which does not appear in the `app` folder : the `features` folder.

### /spec/features

This folder is where we put our [feature specs](https://paulmarin.net/wp-content/uploads/2015/12/you-dont-say.jpg).

We have tried using special tools like [Cucumber](https://cucumber.io/) for our feature specs. It turns out for us that the cost of an additional tool and an additional language is not worth the effort. Especially since, _in our usual projects_, the product owner almost never read the user stories, even less writes them; the project manager is responsible for translating the needs to the developer and the developer writes and maintains the stories. Therefore we wanted a tool making the task easy for the developer and the combination of RSpec, SitePrism and Capybara is the best we have found to enable the developers to feel at home.

This folder hosts the feature specs but what does our feature specs looks like ?

Our files (code and specs) are always structured to hoist the important parts at the top of the file and the boilerplate at the bottom. For our feature specs this means that the file has a short name matching its file name allowing us to easily jump on them in our editor, then has a longer description in the form of a user story, then the code really begins.

The code starts with the inclusion of the required shared\_contexts for setting up a coarse grained state of the app, then a background block calling some private methods for a more fine grained initial setup.

Then we have the scenarios. Each scenario has a short descriptive name allowing us to differentiate it from the other scenarios of the same feature (meaning a feature file with a single scenario can have a very simple name). The scenario starts by calling some private methods to put the application in the exact state required for that scenario. Then we have a succession of private method calls written to look like sentences. Active first person sentences are used to describe how the user interacts with the application. Passive sentences are used to describe assertions made in order to continue or fail the examples. Other active sentences are used to describe external actions happening.

This technique is very simple and gets almost all the benefits from tools like cucumber without the hassle of them. As developers we are not at all disturbed by the snake case transformation of the sentences and the 3 simple gramatical rules enable us to immediately know what kind of _step_ we are in.

After the scenarios we enter the `private` area where we can have test values in the form of `let()` calls and the definition of all the private methods we have called earlier.

Here is an example illustrating all these concepts :

We imagine a story where a new client must have its ticket payment validated before downloading its concert ticket.

    # /spec/features/fresh_client_want_to_download_
    require 'rails_helper'
    
    RSpec.feature 'a user who has bought ticket using bank transfer want to download its ticket', '
      As a User having bought concert tickets using bank transfer
      In order to be able to enter in the concert room
      I want to download my tickets
    ' do
    
      include_context 'users exist'
      include_context 'concert exist'
      include_context('a ticket has been bought using bank transfer') do
        let(:ticket_concert){ concert }
        let(:ticket_buyer){ client }
      end
    
      background do
        free_some_seats_for_the_concert
      end
    
      scenario 'I can download my tickets after an admin validation', :js  do
    
        as(client) do
          i_go_to_my_dashboard
          i_go_to_the_details_of_my_account
          my_ticket_is_not_available_until_my_payment_has_been_validated
        end
    
        as(admin) do
          i_go_to_the_admin_panel
          i_display_the_first_pending_payment
          i_validate_the_bank_transfer_payment
        end
    
        as(client) do
          i_follow_the_email_annoucing_me_my_ticket_is_available
          i_download_my_ticket
        end
    
        one_less_seat_is_available_for_the_concert
    
      end
    
      private
      ...
    end
    

As you can see, the scenario is quite easy to follow and when we read a sentence we can immediately know if it is a user action step ( `i_go_to_my_dashboard` ), an assertion step (`my_ticket_is_not_available_until_my_payment_has_been_validated`) or an external action step ( `free_some_seats_for_the_concert` ).

The question you are probably asking yourself is : "But where is the code ?". The code appears after the `private` keyword. we have a list of `let()` statement for when a value needs to be used in multiple steps but we don't really care about what it is ( `let(:street_name){ 'Boulevard Acme' }`), and a lot of very small private methods translating those steps into method calls like these :

    def i_go_to_my_dashboard
      navbar.visit_dashboard
    end
    
    def i_follow_the_email_annoucing_me_my_ticket_is_available
      last_email = mailbox_for(client.email).last
      expect(last_email.subject).to eq I18n.t("ticket_mailer.available_ticket.subject")
      click_email_link_matching(%r'my/tickets', last_email)
    end
    

Ok but where do those `as()`, `navbar`, `client`, ... methods come from ? You haven't told us everything !

Not yet, but here come the best part ...

### /spec/support

This folder contains all the supporting code for our examples, it will enable us to :

*   Setup very easily the application in a complex state thanks to shared\_contexts.
*   Extend the Rspec DSL with some useful new keywords thanks to helpers (use them with caution).
*   Override some behaviour in order to better isolate some components when we want to test them in isolation (testing a `User` record should require ActiveRecord, fair enough but not the complete Rails app juste because of Devise).
*   Share page manipulation logic between multiple scenarios thanks to SitePrism page objects.

#### /spec/support/initializers

The first support subfolder we are going to create is `/spec/support/initializers`. The purpose of this folder is to mimic `/config/initializers` in the sense that all of its files will be loaded during the _boot_ process of our app. Usually one puts RSpec configuration in `/spec/spec_helper.rb` and Rails specific RSpec configuration in `/spec/rails_helper.rb`. We do put RSpec configuration in `/spec/spec_helper.rb` but we split `/spec/spec_helper.rb` config in multiple files stored in `/spec/support/initializers` folder. This allows us to keep `/spec/rails_helper.rb` smaller, to have topic config files and to have other spec helper files loading only a subset of the initializers (typically we have an `/spec/activerecord_spec_helper` loading only what is required to test activerecord objects).

Here is what a fresh project starts with most of the time :

`capybara.rb` : setup capybara and its drivers. We mostly uses poltergeist and rack-test drivers. we configure autoscreenshot upon failure and check ENV variables or metadate for diver overrides.

    #/spec/support/initializers/capybara.rb
    
    require 'launchy'
    require 'capybara'
    require 'capybara/poltergeist'
    require 'capybara/rails'
    require 'capybara/rspec'
    require 'selenium-webdriver'
    require 'capybara-screenshot'
    require 'capybara-screenshot/rspec'
    
    Capybara.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(
          app,
          js_errors: true, # break on js error
          timeout: 180, # maximum time in second for the server to produce a response
          debug: false, # more verbose log
          window_size: [1280, 800], # not responsive, used to simulate scroll when needed
          inspector: false, # use debug breakpoint and chrome inspector
          phantomjs_options: ['--ignore-ssl-errors=yes'] ,
          # extensions: [Rails.root.join('spec', 'support', 'phantomjs_ext', 'geolocation.js').expand_path.to_s]
      )
    end
    
    
    Capybara.register_driver :chrome do |app|
      Capybara::Selenium::Driver.new(app, :browser => :chrome)
    end
    
    
    Capybara.register_driver :firefox do |app|
      Capybara::Selenium::Driver.new(app, :browser => :firefox)
    end
    
    
    Capybara.javascript_driver = ENV.fetch('DRIVER') { 'poltergeist' }.to_sym
    Capybara.asset_host = 'https://localhost:3000' # enable asset in save_and_open_page if we have a dev server running
    
    
    Capybara.configure do |config|
      config.default_selector = :css
      config.default_max_wait_time= 2
      config.match = :prefer_exact
      config.ignore_hidden_elements = true
    end
    
    [:chrome, :firefox, :poltergeist].each do |driver|
      RSpec.configure do |config|
        config.around(:each, driver) do |example|
          current_javascript_driver = Capybara.javascript_driver
          current_default_driver = Capybara.default_driver
          Capybara.javascript_driver = driver
          Capybara.default_driver = driver
          example.run
          Capybara.javascript_driver = current_javascript_driver
          Capybara.default_driver = current_default_driver
        end
      end
    end
    
    
    Capybara.save_and_open_page_path = Rails.root.join('tmp', 'save_and_open_page')
    Capybara::Screenshot.prune_strategy = { keep: 10 }
    
    Capybara::Screenshot.register_driver(:chrome) do |driver, path|
      driver.browser.save_screenshot path
    end
    

`database_cleaner.rb` : We configure database cleaner in a very simple fashion in order to either use transaction strategy during activerecord and simple feature specs , or truncation during javascripted feature specs. This file is really project dependent and this example is a simple one. Usually we add here seed management: data coming from the seed are loaded once at the beginning and excluded from the cleaning process.

    #/spec/support/initializers/database_cleaner.rb
    
    require 'database_cleaner'
    
    RSpec.configure do |config|
    
      config.before(:suite) do
        DatabaseCleaner.strategy = :transaction
        DatabaseCleaner.clean_with :truncation
      end
    
    
      config.before(:each, type: :feature) do
    
        driver_shares_db_connection_with_specs = Capybara.current_driver == :rack_test
    
        if driver_shares_db_connection_with_specs
          DatabaseCleaner.strategy = :transaction
        else
          DatabaseCleaner.strategy = :truncation
        end
      end
    
      config.before(:each) do
        DatabaseCleaner.start
      end
    
      config.append_after(:each) do
        DatabaseCleaner.clean
      end
    
    end
    

`factory_girl.rb` : We add a very small patch to factory girl allowing us to use file from the `spec/resources` folder. We use this in combination with [Carrierwave](https://github.com/carrierwaveuploader/carrierwave) uploaders.

    #/spec/support/initializers/factory_girl.rb
    require 'factory_girl'
    
    module FactoryGirl::SyntaxSugar
    
      def resources_path(*parts)
        Pathname(File.join(File.realpath(__FILE__), '..', '..', '..', 'resources', *parts)).expand_path
      end
    
      def resources_file(*parts)
        File.new resources_path(*parts)
      end
    
    end
    FactoryGirl::SyntaxRunner.include FactoryGirl::SyntaxSugar
    
    RSpec.configure do |config|
      config.include FactoryGirl::Syntax::Methods
      config.include FactoryGirl::SyntaxSugar
    
      config.before(:suite) do
        FactoryGirl.factories.clear
        FactoryGirl.sequences.clear
        FactoryGirl.find_definitions
      end
    
    end
    

`site_prism.rb` : We add a patch to site prism allowing us to locate elements based on the data attribute `data-purpose`. This allows our team to work effectively between front and back developers. The backend developer must not rely on anything else than this attribute to locate an element. The front developer can change anything on the page but those attributes. It also enables us very effectively to not rely on - translateable - texts on the page.

    #/spec/support/initializers/site_prism.rb
    require 'site_prism'
    
    SitePrism.configure do |config|
      config.use_implicit_waits = true
    end
    
    module  SitePrismExtension
    
      def purpose_element(purpose, **options)
        element purpose, %Q'[data-purpose="#{purpose}"]', **options
      end
    
      def purpose_elements(purpose, elements_name=purpose.to_s.pluralize)
        elements elements_name, %Q'[data-purpose="#{purpose}"]'
      end
    
      def purpose_section(purpose, section_class)
        section purpose, section_class, %Q'[data-purpose="#{purpose}"]'
      end
    
      def purpose_sections(purpose, section_class, elements_name=purpose.to_s.pluralize)
        sections elements_name, section_class, %Q'[data-purpose="#{purpose}"]'
      end
    end
    
    SitePrism::Page.send :extend, SitePrismExtension
    SitePrism::Section.send :extend, SitePrismExtension
    

then we can add the following line in `spec/rails_helper.rb`

    Dir[Rails.root.join('spec/support/initializers/*.rb')].each { |f| require f }
    

#### /spec/support/helpers

In an Object Oriented world, a function is something quite uncommon. Very often they are a bad idea, especially _helper_ functions. This folder will nonetheless expose some of those functions. They won't be real functions but mostly extensions to objects already injected in some contexts.

We usually use the following helpers :

`capybara_helpers.rb` : mostly acronyms because we are lazy and some method are way too long to be written when debugging. Also some component manipulation logic, in this example methods to use jquery-datetimepicker and select2 but you should change it to what you need.

    #/spec/support/helpers/capybara_helpers.rb
    
    require 'site_prism'
    require 'capybara/rails'
    require 'capybara/poltergeist'
    
    module Capybara::AliasHelper
    
      def snap
        screenshot_and_open_image
      end
    
      def saop
        save_and_open_page
      end
    
      def resources_path(*parts)
        Pathname(File.join(File.realpath(__FILE__), '..', '..', '..', 'resources', *parts)).expand_path
      end
    
    end
    
    module  Capybara::ComplexInputsHelpers
    
      def pick_date(value, element)
        element.set(value.to_s)
        if Capybara.current_driver != :rack_test && element['id'].present?
          execute_script(%Q|$('##{element['id']}').datetimepicker('hide')|)
          sleep(0.2)
        end
      end
    
      def select_from_select2(value, select_container)
        select_container.find(".select2-selection").click # display filter
        find(".select2-search__field").set(value) # type text in filter
        find("li.select2-results__option--highlighted").click # choose option
        element_does_not_exist?("li.select2-results__option--highlighted")
      end
    end
    
    RSpec.configure { |c| c.include Capybara::AliasHelper }
    RSpec.configure { |c| c.include Capybara::ComplexInputsHelpers }
    
    SitePrism::Page.send :include, Capybara::AliasHelper
    SitePrism::Page.send :include, Capybara::ComplexInputsHelpers
    SitePrism::Section.send :include, Capybara::AliasHelper
    SitePrism::Section.send :include, Capybara::ComplexInputsHelpers
    

`page_objects_helper.rb`: As explained in the previous article, we use SitePrism to write page objects. Those page objects are stateless and therefore a feature spec shouldn't care about their instantiation. We use this file to expose each page object through its own private method and use memoization to be gain a small performance optimization.

We use the Memoist gem to do the job , not because we are too lazy to do the code by ourselve but because we like the idea of separated responsibility and memoization is a performance responsibility different than the business logic it applies to. So we think using the `memoize` macro describe better our intent than doing the memoization by hand.

    #/spec/support/helpers/page_objects_helper.rb
    module PageObjectsHelper
      extend Memoist
    
      def self.page_object(helper_method, page_class)
        define_method(helper_method) do
          page_class.new
        end
        memoize helper_method
      end
    
      page_object :navbar, Spec::Pages::Navbar
      page_object :home_page, Spec::Pages::HomePage
      page_object :login_page, Spec::Pages::LoginPage
      # And so on ...
    end
    
    
    RSpec.configure { |c| c.include PageObjectsHelper, type: :feature }
    

`usual_steps_helper.rb` : the magic `as()` helper. The code might need change in your project but it's almost certain that you have scenario requiring someone to be logged in - or multiple persons. The point here is to separate everyone in its own session and leveraging the login\_page login to do the authentication.

If you have blank screenshots when using this snippet, ensure you use a version of capybara-screenshot including this fix : https://github.com/mattheworiordan/capybara-screenshot/pull/132

    #/spec/support/helpers/usual_steps_helper.rb
    
    module UsualStepsHelper
    
      def as(user, options={})
        experimental = options[:experimental] || false
        session_name = "capybara_session_for_#{user.to_param}"
        using_session(session_name) do
          visit new_user_session_path
          login_page.login user.email, user.password
          force_experimental_cookie if experimental
          yield
          navbar.logout
        end
      end
    
      def as_guest
        session_name = "capybara_session_for_guest-#{rand(1_000_000)}"
        using_session(session_name) do
          visit '/'
          yield
        end
      end
    
    end
    
    RSpec.configure { |c| c.include UsualStepsHelper, type: :feature }
    

#### /spec/support/overrides

The last folder contains the most problematic kind of code, patches. When writing tests, you typically want to assert how your code is behaving. Monkey patching your code in a test environment means you are asserting a different behaviour than the normal one, thus missing the entire point of the test.

_BUT_

In some circumstances, testing the real behaviour is not your responsibility, and you should not do it. I'm talking about when the use of a library or framework asks you to write some code in your object making it a slave of two masters : You and the library writer.

In those cases, you might want to patch your object to drop its relation to the library in order to test only the behaviour you have designed. It's a fragile thing since you're not testing the real object but it might still make sense when integrating tools from which an isolation layer is really hard and/or stupid to write.

One of those cases is Devise.

When testing a User object, or an object graph containing a User instance, We very often do not want anything Devise related. Devise is meant to be integrated directly into the User class code and in Order to remove it, we use the following patch :

    #/spec/support/overrides/devise.rb
    
    require 'active_record'
    
    module DeviseInhibitor
      def devise(*whatever)
        attr_accessor :password, :password_confirmation
      end
    end
    
    ActiveRecord::Base.singleton_class.prepend DeviseInhibitor
    

Then we require this specific file in the example file.

When using such overrides , we always require them manually so it's very explicit that the test is against a slightly drifted variation of the code.

We already have used this technique with gems like geocoder, too which has the same integration pattern as devise.

### /spec/support/shared\_contexts

This folder is simply where we put globally known shared contexts. When a shared context is meant to be used in any kind of feature spec (like "Users with different roles exists", or "A concert will happen next week") we put the file here. We use shared\_contexts as a kind of very powerful data fixtures : creating data and helper methods to access those data.

Here is an example following the previous feature spec example. including this context create the expected records and allows us to use the `let` statement to access the data easily.

    # /spec/support/shared_contexts/ticket_has_been_bought.rb
    
    RSpec.shared_context 'a ticket has been bought using bank transfer' do
    
      let(:ticket_concert){ fail "please define the concert for which this ticket has been bought" }
      let(:ticket_buyer){ fail "please define the user who has bought the ticket" }
    
    
      let(:ticket_price){ 100 }
      let(:vip_kind){ TickeType.vip } # we imagine those records are parts of the seed
    
      let!(:ticket_transaction) do
        # we imagine having a factory for this record
        create(:ticket_transaction,
          :bank_transfer,
          :pending
          issued_at: 3.days.ago
          ....
        )
      end
    
      let!(:ticket) do
        # we imagine having a factory for this record
        create(:ticket,
          :signed,
          user: ticket_buyer,
          concert: ticket_concert,
          price: ticket_price,
          transaction: ticket_transaction,
          ....
        )
      end
    
    
    end
    

### /spec/spec_helper.rb, /spec/rails_helper.rb, /spec/activerecord\_spec.rb

`/spec/spec_helper.rb` is the smallest, fastest initializer we can write for rspec. We use all the recommanded default setting, and add just 3 additional things :

*   [Collection Matchers](https://github.com/rspec/rspec-collection_matchers) : Because we like their expressivity very much, and since all our rspec related gems are `require => false` in our gemfile , we require them here.
*   Auto looading of usual rails files : Even when we do not start Rails we like being able to benefit from the autoloading of constants from files in the `app` directory.
*   Defaulting the time zone : Because we have found the hard way that problems coming from machines having different default time zones are a pain to discover.

So here is what we add to the default file :

    # /spec/spec_helper.rb
    require 'rspec/collection_matchers'
    
    require 'active_support'
    require 'active_support/core_ext'
    require 'active_support/dependencies'
    
    Dir[File.join(File.dirname(__FILE__), '..', 'app', 'models')].each { |f| ActiveSupport::Dependencies.autoload_paths << f }
    Dir[File.join(File.dirname(__FILE__), '..', 'app', '*')].each { |f| ActiveSupport::Dependencies.autoload_paths << f }
    Dir[File.join(File.dirname(__FILE__), '..', 'app', '*', 'concerns')].each { |f| ActiveSupport::Dependencies.autoload_paths << f }
    
    Time.zone_default= Time.find_zone!('UTC')
    

`/spec/rails_helper.rb` is the heaviest, initializer we can write for rspec. It boots the entire rails application and is used for feature spec. We load some rspec extensions we only have meaning for those kind of specs (i.e. webmock), and we load all the files described above (except the overrides of course).

We also set the default rails application locale, in order to be sure that the test process and the server process have the same default. So here is our file :

    # /spec/rails_helper.rb
    
    ENV['RAILS_ENV'] ||= 'test'
    
    require 'spec_helper'
    require File.expand_path('../../config/environment', __FILE__)
    require 'rspec/rails'
    # Add additional requires below this line. Rails is not loaded until this point!
    require 'webmock'
    require 'webmock/rspec'
    WebMock.disable_net_connect!(:allow_localhost => true)
    
    # Include all our custom setup
    Dir[Rails.root.join('spec/support/initializers/*.rb')].each { |f| require f }
    Dir[Rails.root.join('spec/support/pages/**/*.rb')].each { |f| require f }
    Dir[Rails.root.join('spec/support/helpers/*.rb')].each { |f| require f }
    Dir[Rails.root.join('spec/support/shared_contexts/*.rb')].each { |f| require f }
    
    ActiveRecord::Migration.maintain_test_schema!
    
    RSpec.configure do |config|
      config.use_transactional_fixtures = false
      config.infer_spec_type_from_file_location!
    end
    
    I18n.locale= :fr
    

`/spec/activerecord_spec.rb` is a custom helper for testing objects in almost isolation. We use a lot of plain old ruby objects in our apps but we do not want to completely isolate activerecord form the rest of the app only because it is tightly tied to a third party library. We accept this bound and follow the active record pattern : adding behaviour to objects representing database records. But then we need to test them of course and this doesn't mean we want to load the entire rails application with its routing, controllers, views, assets, etc.

This is why we have this third helper :

    #/spec/activerecord_spec.rb
    require 'spec_helper'
    
    require 'active_record'
    require 'factory_girl'
    require 'yaml'
    
    db_configurations = YAML::load(ERB.new(File.read("config/database.yml")).result)
    
    ActiveRecord::Base.send(:configurations=, db_configurations)
    ActiveRecord::Base.establish_connection(:test)
    
    require_relative "support/initializers/factory_girl"
    require_relative "support/initializers/database_cleaner"
    
    require_relative 'support/overrides/devise'
    

Conclusion
----------

This one is a long post but we hope you will find it interesting not only to understand the way we organize our files but also the real code we use. Those files are the result of a long path of small improvements and are in perpetual changes. There hasn't been any major change in the structure for a long time but every project we work on brings its new contraints and solutions.

See you soon for the next and last article, _The flow_, where we will explain how we go from test to code and vice versa.

Update : The next and last part is ready, you can find it **[here](https://belighted.com/blog/how-we-test-our-rails-projects-3-3)**

[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)