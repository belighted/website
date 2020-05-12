---
lang: en
slug: display-and-manipulate-pdf-files-within-your-web-interface-thanks-to-pdf-js
originalPath: https://www.belighted.com/blog/display-and-manipulate-pdf-files-within-your-web-interface-thanks-to-pdf-js
title: Display and manipulate PDF files within your web interface thanks to PDF.js
author: Stéphane A.
description: A short introduction to PDF.js which will guide you through the
  installation of this library aimed to manipulate PDF files within your web
  interface.
image: ../images/blog/pdfjs.png
date: 2015-05-18
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
The business need
-----------------

Lately one of our customer was struggling with a UX problem: their operational team used their web platform (powered by Rails) to manage a bunch of products, and they kept complaining about having to download every time the PDF file attached to each of these products only to have an overview of its content. Furthermore, they couldn't interact with the document (e.g. with things like annotations), which would provide a useful improvement to their process. After some time, our reflection lead to the idea of displaying the PDF directly within the web interface in order to meet our customer's expectations.

The implementation
------------------

Let's start with the beginning: the situation at that time was just a page providing a link to the PDF attached to a product.

We had this route

    resources :products
    

with the corresponding controller

    class ProductsController < ApplicationController
    
        def show
          product = Product.find(params[:id])
          respond_to do |format|
            format.pdf do
              send_file product.file.path
            end
            format.html do
              render :show
            end
          end
        end
    end
    

and the model (using Paperclip to store files)

    class Product < ActiveRecord::Base
    
      has_attached_file :file
      validates_attachment :file, content_type: { content_type: ["application/pdf"] }
    
    end
    

and the view which contained

    <%= link_to product_path(product, :format => :pdf) %>
    

With this as our starting point, we simply choose to use the javascript library [PDF.js](https://mozilla.github.io/pdf.js) in order to display these PDFs.

PDF.js is an open source project supported by Mozilla Labs. Its goal is to create a general-purpose, web standards-based platform for parsing and rendering PDFs.

Maybe you haven't noticed but you've already met this library if you're a Firefox user because it's exactly what they use for their embedded PDF viewer.

PDF.js is composed of three parts:

*   The first and main one is the `pdf.js` file itself, which takes care of everything related to the parsing and handling of the PDF document, and which we'll use to manipulate the PDF.
*   The second is the `pdf.worker.js` file which takes care of the document retrieval by doing a parallel request to the server.
*   And finally there is the viewer. It is specific to the Firefox browser and it uses the 2 underlying libraries. It's this piece that we'll rewrite in order to achieve our goal.

Let's start by including `pdf.js` as well as `pdf.worker.js` in our `assets/javascript/vendor` folder and require it in our `application.js` manifest.

    //= require vendor/pdf
    //= require vendor/pdf.worker
    

Then we need to modify our view in order to incorporate the PDF instead of displaying a simple link. Which gives us this:

    <div id="viewer"></div>
    
    <script>
    
      var url = '<%= product_url(product, :format => :pdf) %>';
    
      PDFJS.workerSrc = '<%= asset_path('vendor/pdf.worker.js') %>';
    
      'use strict';
    
        function renderPage(div, pdf, pageNumber, callback) {
          pdf.getPage(pageNumber).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
    
            var pageDisplayWidth = viewport.width;
            var pageDisplayHeight = viewport.height;
    
            var pageDivHolder = document.createElement('div');
            pageDivHolder.className = 'pdfpage';
            pageDivHolder.style.width = pageDisplayWidth + 'px';
            pageDivHolder.style.height = pageDisplayHeight + 'px';
            div.appendChild(pageDivHolder);
    
            // Prepare canvas using PDF page dimensions
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = pageDisplayWidth;
            canvas.height = pageDisplayHeight;
            pageDivHolder.appendChild(canvas);
    
            // Render PDF page into canvas context
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext).promise.then(callback);
          });
        }
    
        PDFJS.getDocument(url).then(function renderPdf(pdf) {
          var viewer = document.getElementById('viewer');
          var pageNumber = 1;
          renderPage(viewer, pdf, pageNumber++, function pageRenderingComplete() {
            if (pageNumber > pdf.numPages) {
              return;
            }
            // Continue rendering of the next page
            renderPage(viewer, pdf, pageNumber++, pageRenderingComplete);
          });
        });
    
    </script>
    

As you may have noticed in the previous piece of code, PDF.js heavily relies on the use of promises. The first one is simply that the PDF you want to display is fully downloaded by your browser, and as long as it's not the case, you'll have to wait for anything to be displayed.

For instance:

    var url = '<%= product_url(product, :format => :pdf) %>';
    PDFJS.getDocument(url).then(function(pdf) {
        // you can now use *pdf* here
    });
    

What we showed you here was just a first shot: for example, we display the pages one after the other. But as you can guess, this library can do a lot more and if you have some other needs or thoughts about this, you should certainly take a look at the **[example repository](https://github.com/mozilla/pdf.js/tree/master/examples)** of the github project, it's a real gold mine.

Additional resources
--------------------

You can also find a lot more than this short introduction if you dig into:

*   **[https://mozilla.github.io/pdf.js](https://mozilla.github.io/pdf.js)**
*   **[https://github.com/mozilla/pdf.js/](https://github.com/mozilla/pdf.js/)**

**[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)**