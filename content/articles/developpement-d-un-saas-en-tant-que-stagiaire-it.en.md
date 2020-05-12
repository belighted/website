---
lang: en
slug: developpement-d-un-saas-en-tant-que-stagiaire-it
originalPath: https://www.belighted.com/blog/developpement-d-un-saas-en-tant-que-stagiaire-it
title: Développement d'un SaaS en tant que stagiaire IT
author: Samuel M.
description: "Développement d'un SaaS avec un widget Javascript tiers : ce que
  j'ai appris et découvert durant ma première semaine de stage."
image: ../images/blog/blog%20tech%20standard%20image.png
date: 2016-02-16
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

Je m’appelle Samuel Monroe, j’ai 23 ans et je suis étudiant à l’EPHEC Louvain-la-Neuve.

Comme je suis actuellement en dernière année de bachelier en IT, j’ai dû trouver une entreprise qui accepte de m’accueillir pour un stage de 15 semaines.

J’ai donc postulé chez Belighted, qui proposait un stage au sein d’une jeune équipe de développeurs web passionnés et motivés, travaillant sur des projets variés et intéressants. Il m’a semblé que ce serait le meilleur endroit pour acquérir une expérience professionnelle intéressante et des compétences en programmation mais aussi pour apprécier réellement ces 15 semaines.

C’est ici que commence mon histoire avec Belighted.

Mon bagage
----------

L’EPHEC se focalise plus sur les réseaux que sur le développement ; de plus, j’ai commencé relativement tard à apprendre mon premier langage de programmation.

Cependant, j’ai pu apprendre le Pascal, le Java, le C et le PHP durant mes études. Je voulais découvrir d’autres langages et frameworks pour réaliser certains projets, ce qui m’a conduit à **Ruby on Rails** et aux bases de **Javascript**.

Le projet SaaS
--------------

L’objectif de **Pravatar** est de fournir aux applications web une manière simple et efficace de gérer les avatars de leurs utilisateurs, en permettant à chaque utilisateur d’avoir un avatar différent et privé sur chaque application incluant Pravatar, avec une simple ligne de Javascript.

Cette solution pourrait également éviter à l’équipe de Belighted de devoir mettre en place un service de stockage spécifique, uniquement pour la gestion des avatars, pour chaque application qu’elle crée, en déléguant cela au service Pravatar.

Le back-end tournerait sur une app **Rails**, fournissant une API et une manière de gérer les comptes. La partie front-end serait composée d’un widget Javascript, qui pourrait être inclus dans une app cliente via un `<script>` tag qui irait rechercher ce widget fournit par l’app Rails.

Ma première semaine
-------------------

### Côté back-end

#### Premières étapes

J’ai passé mon premier jour à configurer mon environnement **Rails** et à me familiariser avec Ie testing **RSpec**. Philippe m’a demandé d’installer _ActiveAdmin_ et de m’exercer un peu à son utilisation, en écrivant quelques tests dans le style User-Story.

#### Les bases du service Pravatar

Comme je le décrirai plus tard, le côté client dépendra d’un script (inclus dans l’app cliente), qui interagira avec l’API de l’application. Mes premiers objectifs pour le back-end ont donc été de trouver une manière de fournir le script, construire une API basique et écrire un test à son sujet.

#### Fournir le script

Mon principal problème a été de m’assurer que le script serait toujours disponible par son nom en production, comme `https://app.io/assets/script.js`, et d’éviter un digest sur le nom de document, produit par l’étape de précompilation de l’asset pipeline.

Cela aurait pu être un problème agaçant, mais j’ai trouvé une gem me permettant d’autoriser à des assets d’être précompilés et accessibles avec et sans ce digest. Il s’agit de la gem `non-stupid-digest-assets`.

#### Construire l’API

Kathleen m’a parlé de la gem **api-versions** pour gérer une API ; ensuite, j’ai créé un contrôleur appelé `profile_widgets_controller`, héritant du `profile_controller`.

Ce contrôleur unique dans l’API fournit uniquement l’url de l’_avatar_ à partir d’un _profile\_id_ reçu.

#### Test de l’API

Le test est assez simple ; il crée un compte et un profil fictifs et émet une requête avec un ID valide. Ensuite, il vérifie que la réponse a un status **200** et des données valides.

### Côté front-end

#### Choix de la technologie

Mon objectif a d’abord été de définir quelle technologie utiliser afin de développer le **widget tiers** qui sera inclus dans l’app cliente. Cette solution d’inclusion fait émerger les besoins suivants :

*   le widget devrait être simple à installer
*   comme il serait écrit dans un framework _Javascript_, l’ensemble du package ne devrait pas interférer avec la configuration cliente.

Comme les technologies de WebComponents disponibles actuellement semblent propices aux conflits de version, la solution que j’ai choisie après quelques discussions avec Simon et Maxime a été de regrouper mon code Javascript avec sa version de jQuery complète en utilisant **Browserify**.

#### Le Widget

Pour l’instant, le widget est assez simple mais il atteint complètement le premier but, à savoir afficher les pravatars en :

*   `parcourant le DOM en vue d’une div ayant un data-type spécifique`
*   adressant une requête à l’API en utilisant une valeur clé
*   ajoutant un tag `img` au div en utilisant la réponse de l’API.

Comme le processus devait être lancé par l’événement ready, il a été encapsulé dans un event listener `$('document').ready` _(ce qui allait me causer quelques soucis plus tard)_.

Finalement, Philippe m’a demandé de le réécrire en **Coffeescript**. Je n’avais jamais écrit la moindre ligne en Coffee avant mais je me suis rapidement mis dedans.

#### Le Testing

Ce fut la partie la plus **ardue** de ma première semaine.

J’ai configuré mon environnement de test avec Karma et Jasmine _(Jasmine pour garder la syntax BDD de RSpec)._ Je devais également inclure `jasmine-jquery`, `mock-ajax` et `jQuery` à Karma.

Mes problèmes principaux furent :

*   de comprendre comment fonctionne Karma
*   d’admettre que je ne pourrais pas tester le script sans stubber mon API
*   de trouver une solution pour tester et contrôler quelque chose qui attendait l’événement ready du DOM, sans savoir exactement quand cet événement se produirait.

Voici comment j’ai obtenu un test qui fonctionne (jusqu’à présent), avec l’aide précieuse de Michaël et Philippe :

1.  Dans une section `beforeEach`, **j’ai ajouté** la div pravatar dans le DOM et **j’ai stubbé** l’API pour intercepter les appels et fournir une réponse spécifique à chacun de ces appels.
2.  Comme le code était inclus dans le listener `$('document').ready`, j’ai dû trouver une manière d’appeler ce code quand je le voulais. J’ai réalisé cela en créant un objet `window` et en lui donnant un méthode unique appelée `init()`.

Ensuite, le listener `$('document').ready` va déclencher la méthode `window.object.init()`. _(Maintenant que je l’écris, ça semble beaucoup plus simple…)_

Conclusion
----------

Cette première semaine en tant que stagiaire a été vraiment intéressante ; Philippe m’a donné de nombreux conseils et m’a appris beaucoup de choses utiles.

Parvenir à avoir des tests Javascript qui tournent après m’être longtemps débattu m’a procuré une certaine satisfaction et même si je suis sûr que je rencontrerai à nouveau des difficultés, je suis réellement motivé par l’envie de réaliser du bon travail.

J’aime aller travailler chaque jour chez Belighted, et c’est exactement ce que j’attendais de mon stage.  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)