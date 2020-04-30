---
lang: en
slug: comment-nous-testons-nos-projets-rails-1-3
originalPath: https://www.belighted.com/blog/comment-nous-testons-nos-projets-rails-1-3
title: Comment nous testons nos projets Rails (1/3)
author: Philippe V.
description: "Le premier d'une série de 3 articles sur la manière dont nous
  écrivons des tests automatiques pour nos projets rails. Cet article traite des
  outils que nous utilisons. "
image: null
date: 1451606400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
Introduction
------------

Cette série de blogposts expliquera comment nous écrivons des tests automatiques pour nos projets Rails. Elle sera divisée en 3 parties, qui aborderont les sujets suivants :

*   1ère partie : Les outils. Cette partie présentera les outils tiers que nous utilisons et les avantages que nous en retirons (quels en sont les intérêts pour nous)
*   2ème partie : La structure. Cette partie se centrera sur la structure des fichiers que nous utilisons pour organiser les tests et le code qui s’y rapporte
*   3ème partie : Le flux. Dans cette partie, nous expliquerons quelles sortes de tests nous écrivons, quand nous les écrivons et comment nous passons du test au code et vice versa.

Disposer de tests automatiques est une **idée** que tout le monde trouve toujours géniale mais dont la concrétisation est souvent difficile. Les tests prennent du temps à écrire, ont tendance à être un obstacle quand le code doit être modifié et nécessitent leur propre maintenance. Quand un projet grandit, la suite de tests grandit également, de même que le temps nécessaire pour l’exécuter, ce qui **donne l’impression** que la suite a moins de valeur.

Nous espérons que partager avec vous certaines de nos pratiques en matière de tests vous fera considérer les tests plus comme un _atout_ que comme une _charge_.

1ère partie : les outils
------------------------

### [RSpec](https://rspec.info/)

Avant tout, nous avons besoin d’un framework de test. Ruby va de pair avec Minitest, qui a connu de grandes améliorations ces dernières années, mais comme nous sommes satisfaits de RSpec, nous nous n’avons aucune raison de le remplacer tant qu’il fonctionne bien.

La plus grande force de RSpec est également sa plus grande faiblesse: son DSL (Domain Specific Language - langagé dédié). Quand vous le lisez ou l’écrivez pour la première fois, vous n’avez pas l’impression d’écrire du Ruby. Vous ne voyez pas directement où se trouvent vos modules, classes, définitions et appels de méthodes, ce qui rend difficile la transposition de certaines de vos techniques de codage. De l’autre côté, presque tous les concepts dont avez besoin ont déjà été extraits dans des composants facilement utilisables et le peu que vous pourriez devoir rajouter peut être inséré de manière facile et clairement documentée.

RSpec est un framework de test là où Minitest est une bibliothèque de test.

Ce que permet RSpec : l’écriture de spécifications, l’exécution de spécifications, la création de doubles de test, la vérification des assertions, la création de nouvelles assertions, la création de contextes d’exemple…

En interne, RSpec est divisé en plusieurs sous-projets, dont il est possible de ne piocher qu’une partie ; cependant, nous prenons toujours le pack complet, qui inclut RSpec Core, RSpec Expectations, RSpec Mocks, RSpec Rails.

### [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner)

Si vous écrivez des spécifications dans une application Rails, vous finirez probablement par écrire des données dans une base de données.

Évidemment, ce n’est pas toujours le cas et ce ne devrait pas l’être quand vous écrivez des spécifications en isolation par exemple ; par contre lorsque vous vérifiez un objet ActiveRecord ou que vous écrivez un test d’intégration, vous aurez probablement à conserver des données.

RSpec propose déjà d’isoler chaque exemple dans une transaction, ce qui est une très bonne stratégie ; cependant cela ne suffit pas une fois que vous commencez à écrire les spécifications d’une fonctionnalité qui utilise un navigateur réel.

Dans ces cas, vous avez besoin de deux processus partageant les données à travers la base de données, ce qui implique que vous ne pouvez pas utiliser une transaction.

DatabaseCleaner est un tout petit outil qui vous permet de choisir la stratégie que vous voulez en fonction du test ; vous pouvez donc utiliser une stratégie de transaction pour presque tous vos tests et une stratégie de troncature pour les spécifications de fonctionnalités.

Si vous devez gérer des bases de données ou magasins de données multiples, cet outil vous offre une configuration centrale pour gérer leur nettoyage entre spécifications.

### [Capybara](https://github.com/jnicklas/capybara) et [Poltergeist](https://github.com/teampoltergeist/poltergeist)

Capybara est un set d’outils qui permet de manipuler une page html comme le ferait un utilisateur. Il fonctionne avec des drivers multiples (un driver est une manière de conserver une page, envoyer une requête et recevoir des réponses), mais nous en utiliserons seulement deux : le driver par défaut **RackTest**, qui est comme un faux navigateur en mémoire sans support pour CSS ou Javascript, et **Poltergeist**, un driver qui délègue à un processus [PhantomJS](https://phantomjs.org/).

Capybara est un outil qui nous permet d’écrire des scénarios qui font appel à des abstractions comme “cliquer sur ce bouton” ou “visiter cette url”, au lieu de “envoyer une requête PUT avec cette charge utile FormData” ou “envoyer une requête GET avec ces en-têtes”. L’objectif est de pouvoir décrire avec beaucoup plus de précision l’intention de l’utilisateur, ce qui est le but d’une histoire utilisateur.

### [SitePrism](https://github.com/natritmeyer/site_prism)

SitePrism est à nouveau une toute petite librairie formidable, car elle atteint son but à la perfection. Cette librairie existe en supplément à Capybara et son objectif est de vous permettre d’écrire des **objets représentant une page**. Un objet de ce genre permet de manipuler facilement une page depuis une spécification de fonctionnalité sans devoir connaître les caractéristiques de cette page. Elle vous permet aussi de mettre cette connaissance dans une classe Ruby et d’utiliser les objets de page dans chaque spécification de fonctionnalité qui exploite cette page.

Imaginez combien d’histoires utilisateur doivent parcourir la page de login, puis imaginez que votre page de login ait changé un tout petit peu et nécessite un clic supplémentaire, ou que la classe CSS que vous utilisez pour cibler le champ login ait changé. Vous ne voudriez pas éditer toutes vos histoires et vous n’auriez pas à le faire ! Vos histoires n’ont pas changé, la page si ! Avec l’aide d’un objet de page, les scénarios capturent le comportement de l’utilisateur et les objets de page le traduisent en manipulation de page.

### [Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot)

Cet outil est plutôt la cerise sur le gâteau mais j’en suis venu à beaucoup l’apprécier. Cette gem fera automatiquement une capture d’écran de chaque spécification de fonctionnalité qui a échoué, au moment où l’échec se produit. Si le driver de spécification était RackTest, la capture d’écran prendra la forme d’une page html, si vous étiez en train d’utiliser Poltergeist, vous aurez à la fois un fichier html et une image png.

C’est tout ce que ça fait.

Et c’est incroyablement utile quand vous venez de réexécuter une suite de 40 spécifications de fonctionnalité et que vous vous attendez à ce qu’elles passent (parce que si vous travaillez sur votre fonctionnalité et que vous ne vous attendez pas à ce que vos spécifications passent, alors vous ne devriez probablement pas en exécuter 40 ensemble) et que 2 sur les 40 échouent. Quand cela se produit, il est vraiment agréable de ne pas devoir exécuter à nouveau celles qui ont échoué pour comprendre ce qui s’est passé mais d’avoir déjà le message d’erreur et les captures d’écran disponibles.

Si vous n’aimez pas la fonction de capture d’écran automatique, sachez que cette gem est aussi très utile pour sa capacité à faire et afficher une capture d’écran à un instant donné lorsque vous utilisez un débogueur.

### [Factory Girl](https://github.com/thoughtbot/factory_girl)

Lorsque l’on écrit des spécifications, il y en a toujours qui requièrent des données.

Parfois, ces données ont une structure assez simple : une chaîne de caractères, un dictionnaire, un message… Parfois nous avons besoin d’un graphe de données très complexe : une facture à laquelle est rattaché un utilisateur qui a un plan premium, un fil de discussion avec 4 messages et 10 commentaires ayant chacun des auteurs différents…

Quand nous sommes confrontés à la seconde situation, nous devons souvent fournir des détails pour construire des structures de données valides mais la plupart de ces détails ne sont pas pertinents pour le test.

C’est là que Factory Girl peut être utilisé. Le but de cet outil est d’aider à construire des graphes complexes d’objets valides en spécifiant seulement ce qui est utile pour le test actuel et en laissant l’outil **remplir** les autres détails avec ce qui est nécessaire pour rendre ces objets valides.

Cet outil aide à réduire de manière drastique le bruit dans votre test afin d’améliorer le ratio signal / bruit.

Il est si facile à utiliser que vous pourriez en abuser en demandant un graphe complexe alors que votre spécification pourrait être faite avec un objet simple. Le but de Factory Girl n’est pas d’être la seule manière de générer des données pour votre test mais d’avoir une manière simple et discrète de construire des graphes complexes. Et il le fait de manière très efficace.  
  
[![New Call-to-action](/content/images/legacy/UPTtKvQU_5rjKfQJ1Qjwk.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)