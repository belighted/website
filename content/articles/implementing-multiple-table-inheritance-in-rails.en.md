---
lang: en
slug: implementing-multiple-table-inheritance-in-rails
originalPath: https://www.belighted.com/blog/implementing-multiple-table-inheritance-in-rails
title: Implementing multiple table inheritance in Rails
author: Dominique L.
description: Rails’ way of representing model inheritance in the database is
  called single table inheritance, but this technique is only appropriate in
  specific cases. Here we propose a simple implementation of an alternative
  representation called multiple table inheritance.
image: ../images/blog/What-is-Object-Relational-Mapping-.jpg
date: 2016-01-08
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Implementing multiple table inheritance in Rails
------------------------------------------------

Rails’ default —and actually only— way of representing model inheritance at the database level is called single table inheritance (STI for short). With this technique, the entire model hierarchy is stored in a single table, containing a column for every attribute that a model in the hierarchy possesses, plus an additional column to specify the actual type of the model. For example, let’s say we have the following models:

    class Product < ActiveRecord::Base
      # Attributes: reference, price, title
      validates :reference, presence: true, uniqueness: true
      validates :title, presence: true
      validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    end
    
    class Book < Product
      # Attributes: writer, number_of_pages
      validates :writer, presence: true
      validates :number_of_pages, presence: true, numericality: { only_integer: true, greater_than: 0 }
    
      scope :for_writer, ->(writer) { where(writer: writer) }
    end
    
    class Movie < Product
      # Attributes: studio, director, format
      validates :studio, :director, presence: true
      validates :format, presence: true, inclusion: { in: [ "DVD", "Blu-ray" ] }
    end
    

  
In the database we have a single table, `products`:

id

type

reference

price

title

writer

number\_of\_pages

studio

director

format

1

Book

B-0001

9.99

The Color of Magic

Terry Pratchett

288

_NULL_

_NULL_

_NULL_

2

Movie

M-0001

8.67

The Thing

_NULL_

_NULL_

Universal Pictures

John Carpenter

DVD

3

Book

B-0002

6.00

American Gods

Neil Gaiman

624

_NULL_

_NULL_

_NULL_

4

Movie

M-0002

15.95

Commando

_NULL_

_NULL_

20th Century Fox

Mark L. Lester

Blu-ray

The first thing you see is that for every row, a bunch of columns are empty. This is the major drawback of single table inheritance, and it prevents us to put a NOT NULL constraint on the columns that are not shared between models, even if these attributes are mandatory for the relevant model (and yes, you should definitely put NOT NULL constraints as well as FOREIGN KEY constraints in the database, but this is for another blog post). Furthermore, you can feel that mixing attributes that have nothing to do with each other and only make sense for a subset of rows is somewhat wrong, and the more we'll have models that inherit from `Product`, the more it will become apparent. Actually, STI is appropriate only when all the models in the hierarchy share the exact same set of attributes (i.e. all the attributes are defined on the parent model) and only differ in their behavior at the application level.

What we'd like to have instead is a table for each model, and a link between a child row and a parent row. This way of representing model inheritance is called (you guessed it) multiple table inheritance.

### Existing implementations

There is a gem called [multiple\_table\_inheritance](https://github.com/mhuggins/multiple_table_inheritance) to achieve this but, in addition to the fact that it has not been maintained for the past 3 years, it has in my opinion a major problem: since it does not use class inheritance at all between models, you are forced to override `is_a?` in the "child" models in order to work around Rails' type checking in case of an association to the parent model (without that, inserting a `Book` instance in a `has_many :products` association would result in a `ActiveRecord::AssociationTypeMismatch` exception being raised). Fooling around with such a fundamental method can lead to unpredictable behavior and is best avoided.

### Our proposed implementation of MTI in Rails

So, how can we have an MTI-like structure in the database but without straying too far away from ActiveRecord's well-known realm? The trick is actually quite simple: we continue to use the built-in STI mechanism, but we move the attributes of each child model to a companion ActiveRecord object linked to this model, and we delegate all the attribute accessors to this companion object in order to make it completely transparent for the outside world. The code looks like this:

    class Product < ActiveRecord::Base
      # Attributes: reference, price, title
      validates :reference, presence: true, uniqueness: true
      validates :title, presence: true
      validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    end
    
    class Book < Product
      has_one :companion, class_name: "BookCompanion", inverse_of: :book, dependent: :destroy, autosave: true
    
      delegate :writer, :number_of_pages, :writer=, :number_of_pages=, to: :lazily_built_companion
    
      validates :writer, presence: true
      validates :number_of_pages, presence: true, numericality: { only_integer: true, greater_than: 0 }
    
      scope :for_writer, ->(writer) { joins(:companion).merge(BookCompanion.for_writer(writer)) }
    
      private
      def lazily_built_companion
        companion || build_companion
      end
    end
    
    class BookCompanion < ActiveRecord::Base
      # Attributes: writer, number_of_pages
    
      belongs_to :book, inverse_of: :companion
    
      validates :book, presence: true
    
      scope :for_writer, ->(writer) { where(writer: writer) }
    end
    
    class Movie < Product
      has_one :companion, class_name: "MovieCompanion", inverse_of: :movie, dependent: :destroy, autosave: true
    
      delegate :studio, :director, :format, :studio=, :director=, :format=, to: :lazily_built_companion
    
      validates :studio, :director, presence: true
      validates :format, presence: true, inclusion: { in: [ "DVD", "Blu-ray" ] }
    
      private
      def lazily_built_companion
        companion || build_companion
      end
    end
    
    class MovieCompanion < ActiveRecord::Base
      # Attributes: studio, director, format
    
      belongs_to :movie, inverse_of: :companion
    
      validates :movie, presence: true
    end
    

  
In the database we now have three tables, `products`, `book_companions` and `movie_companions`, respectively:

id

type

reference

price

title

1

Book

B-0001

9.99

The Color of Magic

2

Movie

M-0001

8.67

The Thing

3

Book

B-0002

6.00

American Gods

4

Movie

M-0002

15.95

Commando

id

book\_id

writer

number\_of\_pages

1

1

Terry Pratchett

288

2

3

Neil Gaiman

624

id

movie\_id

studio

director

format

1

2

Universal Pictures

John Carpenter

DVD

2

4

20th Century Fox

Mark L. Lester

Blu-ray

No more mixed attributes, no more empty columns. Yeah!

And in the console, you can check that it works really smoothly:

    irb(main):001:0> Book.create!(reference: "B-0001", price: 9.99, title: "The Color of Magic", number_of_pages: 288)
    ActiveRecord::RecordInvalid: Validation failed: Writer can't be blank
    irb(main):002:0> Book.create!(reference: "B-0001", price: 9.99, title: "The Color of Magic", writer: "Terry Pratchett", number_of_pages: 288)
    => #<Book id: 1, type: "Book", reference: "B-0001", price: #<BigDecimal:7fb35cbe3680,'0.999E1',18(36)>, title: "The Color of Magic", created_at: "2015-12-30 12:47:41", updated_at: "2015-12-30 12:47:41">
    irb(main):003:0> Movie.create!(reference: "M-0001", price: 8.67, title: "The Thing", studio: "Universal Pictures", director: "John Carpenter", format: "DVD")
    => #<Movie id: 2, type: "Movie", reference: "M-0001", price: #<BigDecimal:7fb35e262258,'0.867E1',18(36)>, title: "The Thing", created_at: "2015-12-30 12:47:52", updated_at: "2015-12-30 12:47:52">
    irb(main):004:0> Product.find(1).class.name
    => "Book"
    irb(main):005:0> Product.find(1).number_of_pages
    => 288
    irb(main):006:0> Product.find(2).class.name
    => "Movie"
    irb(main):007:0> Product.find(2).director
    => "John Carpenter"
    irb(main):008:0> Book.for_writer("Terry Pratchett").count
    => 1
    

  
As you can see, from the external code point of view, it is as if these companion objects didn't exist at all.

Some notes on the above implementation
--------------------------------------

*   As Rails validations use the attribute readers (rather than the instance variables), we can keep them in the main class. In addition to simplify the implementation (we don't have to deal with validation errors coming from the companion object), this totally makes sense because the companion object is a mere technicality and not a real business object. After all, what we want to ensure is that a Book has a writer, wherever this writer attribute is actually stored.
*   The delegation is not done directly to the `companion` association, but to the `lazily_built_companion` method instead. This is to ensure that we always have a companion instance, even when working with a new object.
*   It is important not to forget the `autosave: true` option in the `has_one :companion` association definition, or else the companion object will only be saved at creation but not on subsequent updates.
*   As you can see in the `Book` class, you can use the `merge` method of `ActiveRecord::Relation` to elegantly define scopes that use the attributes defined on the companion class.
*   To be complete, we should also override the `changed_attributes` method (and possibly some others) from the `ActiveSupport::Dirty` module in the child classes, something along the lines of:
    
        def changed_attributes
          super.merge(lazily_built_companion.changed_attributes)
        end
        
    
*   I'm pretty sure that with a bit of meta-programming, all this can quite easily be extracted in a module to remove all the boilerplate from the classes and DRYify the code. This exercise will be left to the reader ;-)
    

  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)