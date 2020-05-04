---
lang: en
slug: une-maniere-innovante-de-reduire-les-spams-sur-votre-site-internet
originalPath: https://www.belighted.com/blog/une-maniere-innovante-de-reduire-les-spams-sur-votre-site-internet
title: Une manière innovante de réduire les spams sur votre site Internet
author: Philippe B.
description: Nous introduisons ici un moyen novateur de gérer le flux d'e-mails
  indésirables grâce à une nouvelle technique anti-spam en remplacement de la
  bien connue CAPTCHA.
image: ../images/blog/289348-grum-spambot-shut-down-massive-botnet-created-18-percent-of-worlds-spa.jpg
date: 1420070400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Ce que nous voulions
--------------------

Comme vous avez pu le constater, nous avons récemment lancé notre tout nouveau site web. En tant qu’agence de développement, le formulaire de contact est notre principal canal pour générer des leads. C’est pourquoi nous souhaitions qu’il soit le plus simple possible, afin que nos clients puissent nous contacter facilement.

Le problème
-----------

Le formulaire de contact a rapidement été utilisé par des spammeurs. Notre boîte de réception se remplissait d’emails indésirables et inutiles, dont la gestion nous coûtait du temps et de l’énergie.

La solution existante
---------------------

La manière la plus courante d’éviter ces emails indésirables est d’utiliser des CAPTCHAs, bien connus des internautes. Malgré tout, nous ne voulions pas obliger nos clients à remplir cette entrée supplémentaire: l’utilisateur pourrait interrompre son action en raison d’un formulaire de contact trop compliqué.

Notre solution
--------------

Après quelques recherches, nous nous sommes rendus compte qu’en tant qu’ordinateurs, les bots ne nécessitent pas plus de 5 secondes pour visiter notre site et nous envoyer une demande de contact. Notre idée consistait donc à mettre en place une minuterie, afin de bloquer toutes demandes suspectes.

Dans notre application Rails, ceci implique l’ajout du code suivant à la configuration de l’application:

    #config/application.rb
    Rails.application.config.antispam_timer = 30
    

Dans notre cas, le délai de notre antispam\_timer a été fixé à 30 secondes. Vous pouvez maintenant ajouter des informations relatives à la durée à la session utilisateur dans votre contrôleur d'application en utilisant un before\_filter, comme ceci:

    #controllers/application.rb
    class ApplicationController < ActionController::Base
       before_filter :anti_spam
    
        def anti_spam
         session['antispam_timer'] ||= Time.now
        end
    
    end
    

Au final, vous allez pouvoir utiliser cette information dans votre contrôleur de demande de contact. Voici comment nous l’avons utilisée:

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
    

En complément d’information, sachez qu’il existe une autre solution implémentée dans une gem Rails: [Honeypot CAPTCHA](https://github.com/curtis/honeypot-captcha). En pratique, un champ caché est ajouté dans votre formulaire. Celui-ci est censé rester vide puisque l’utilisateur ne le voit pas. Par contre, les bots vont le remplir. Vous pouvez ensuite facilement vérifier si la requête provient d’un réel utilisateur ou d’un bot dans votre contrôleur backend.  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)