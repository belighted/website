---
lang: fr
slug: front-end-react-angular
originalPath: https://www.belighted.com/fr/blog/front-end-react-angular
title: "Le front-end : React vs Angular"
author: Nicolas Jacobeus
description: La conception du front-end de votre application web commence par le
  choix d'un framework. React et Angular sont les plus populaires. Découvrez-les
  !
image: ./images/Sans%20titre%20%286%29-2.png
date: 1577836800000
tags:
  - label: Product development / Continuous Development
    value: product-development-continuous-development
  - label: The Belighted Way
    value: the-belighted-way
status: published
---
![front-end-react-angular](https://www.belighted.com/hs-fs/hubfs/front-end-react-angular.png?width=1200&name=front-end-react-angular.png)

Pour créer le front-end d'une application web, les développeurs partent souvent d'un framework existant. React et Angular sont les deux frameworks front-end les **[plus populaires](https://medium.com/@TechMagic/reactjs-vs-angular5-vs-vue-js-what-to-choose-in-2018-b91e028fa91d)**. Aujourd'hui, nous allons évoquer les deux et indiquer lequel nous préférons.

Mais d'abord, revenons en arrière et éclaircissons quelques termes pour les non avertis...

**Que signifie « front-end » ?**
--------------------------------

Lorsque nous parlons de front-end, nous faisons référence aux parties d'une application que les utilisateurs voient et avec lesquelles ils interagissent. Par exemple, lorsque vous réservez un logement sur Airbnb, vous interagissez avec le front-end de l'application. Le back-end comporte des éléments que vous ne voyez pas mais qui sont nécessaires pour que l'application fonctionne, comme le serveur et les bases de données.

**Lorsque vous développez le front-end d'une application web ou mobile, votre entreprise fait appel à deux métiers : l'UI et l'UX. Ils fonctionnent en étroite collaboration, mais leur objectif est différent.**

L'UX (user experience) vise à rendre un produit facile et agréable à utiliser. Il tient compte de ce que les utilisateurs attendent d'un produit et de la façon dont ils souhaitent en faire usage. L'UI (interface utilisateur) fait référence aux aspects visuels : l'apparence et la convivialité qui rendront une application attrayante et en phase avec la marque. Pour mieux comprendre les différences entre la conception de l'UI et de l'UX, **[cliquez ici](https://careerfoundry.com/en/blog/ux-design/the-difference-between-ux-and-ui-design-a-laymans-guide/)**.

Lorsque vous planifiez le développement du front-end, vous devez choisir le framework à utiliser. Cette décision aura un **[impact sur votre capacité à offrir](https://www.sitepen.com/blog/2017/06/27/web-frameworks-user-experience-design/)** l'expérience utilisateur et l'interface que vous souhaitez.

Tournons-nous vers deux des frameworks front-end les plus populaires pour les applications web SaaS : React et Angular.

**Choisir un framework : React ou Angular ?**
---------------------------------------------

Angular est un framework conçu par Google spécifiquement pour la création d'applications monopages (des pages web qui se mettent à jour dynamiquement en fonction des actions de l'utilisateur). Il fournit tout ce dont vous avez besoin pour créer rapidement la partie utilisateur d'une application web. Il présente également d'**[autres avantages](https://blog.thinkwik.com/sturdy-faceoff-angular-reactjs/)**, mais il a une structure rigide qui atteint très rapidement ses limites.

React permet également de concevoir des applications front-end monopages. Une nouvelle application SaaS est rarement conçue comme une application monopage pour des raisons de coûts.

Chez Belighted, nous rencontrons peu de situations où il est logique de concevoir des produits entièrement sous forme d'applications monopages. Le plus souvent, une partie d'une application contient un composant monopage. Par exemple, **[lorsque nous avons développé Dokeos](/fr/clients/dokeos)**, l'utilisateur devait rester sur la même page dans certaines parties du site.

### **React n'est pas vraiment un framework, ce qui le rend plus flexible**

React n'est pas un framework complet. **[C'est une bibliothèque](https://www.reddit.com/r/javascript/comments/7xc9it/we_do_we_call_react_a_library_rather_than/)** créée par les développeurs de Facebook pour afficher des vues. Étant donné qu'il ne s'agit pas d'un framework, il offre l'avantage de la flexibilité ; les développeurs peuvent l'intégrer plus facilement dans une application **[Ruby](/fr/blog/demystifier-ruby-on-rails)**.

Philippe, développeur chez Belighted, explique : « Angular offre une solution pour tous les problèmes à résoudre lors de la conception d'une application (sécurité, routeur, autorisations, etc.), tandis que React se concentre sur un seul aspect : l'apparence (affichage des pages). React nous permet de conserver nos propres spécifications. Il nous permet aussi de déterminer sur quelles pages concentrer nos efforts pour avoir un impact maximal. »

Maxime, développeur front-end senior chez Belighted, explique les raisons pour lesquelles il préfère travailler avec React :

*   Meilleures options d'organisation des fichiers
*   Affichage beaucoup plus rapide et chargement sans incident
*   Meilleure compréhension dès la première lecture du code
*   Meilleure optimisation, améliore la compatibilité SEO
*   Facile d'ajouter React à certaines parties de la page (plus complexe pour Angular)
*   Liaison de données (data binding)
*   Grande communauté
*   Redux

**Pourquoi et quand utilisons-nous Redux avec React ?**
-------------------------------------------------------

Redux permet d'intégrer des données dans n'importe quelle section de la page web tout en gardant le code propre. Nous apprécions particulièrement cette option dans les cas où les données sont transmises via plusieurs couches de code.  

Prenons l'exemple de Twitter, qui doit afficher l'avatar de l'utilisateur à plusieurs endroits sur une page :

![twitter-user-data.png (777×564) 2018-08-13 11-47-40](https://www.belighted.com/hs-fs/hubfs/twitter-user-data.png%20(777%C3%97564)%202018-08-13%2011-47-40.png?width=1350&name=twitter-user-data.png%20(777%C3%97564)%202018-08-13%2011-47-40.png)

Michaël Albert, chef de projet chez Belighted, explique comment Redux procède :

> **« L'idée de Redux est de centraliser l'état de l'application en un seul endroit : le store. Cela signifie que si un composant (une partie de page) a besoin de données, il se tournera vers le store. Si les données sont modifiées, une action qui met à jour le store est déclenchée. Ainsi, une grande partie de la logique métier est réunie dans les actions et le store. »**
> 
> « Redux offre un autre grand avantage : lorsque des données sont modifiées dans le store, tous les composants qui en ont besoin recevront la nouvelle valeur, ce qui évite aux développeurs d'écrire beaucoup de code. L'application est ainsi plus intelligente, plus simple, plus facile à supporter... et prête à gérer des activités plus complexes. »

Redux fonctionne également très bien pour mettre en cache des données entre des vues ou si une application doit conserver de grandes quantités de données.

**Comment GraphQL rassemble le front-end et le back-end ?**
-----------------------------------------------------------

Si nous utilisons Ruby on Rails pour le back-end et React pour le front-end, nous avons besoin d'un outil pour relier les deux. L'outil en question est GraphQL, un langage qui **[facilite](https://www.reindex.io/blog/how-facebooks-graphql-will-change-backend-development/)** le mouvement des données entre le front-end et le back-end d'un site web ou d'une application.

**GraphQL est un nouveau standard d'API qui offre une alternative plus efficace, puissante et flexible à l'API RESTful.** À l'origine, il a été développé et rendu open source par Facebook. Aujourd'hui, une grande communauté d'entreprises et d'individus le soutient.

« Dans une approche API REST, chaque endpoint (URL appelée par l'application front-end) est dédié à une action spécifique et renvoie un ensemble de données spécifique », explique Michaël. « Il faut les coder spécifiquement dans le back et le front-end. **GraphQL est un langage de requête qui n'a qu'un seul endpoint. Il permet aux développeurs front-end de faire des requêtes sur les informations dont ils ont besoin dans ensemble de données mis à leur disposition.** Les développeurs back-end doivent encore travailler pour définir l'ensemble de données et les actions disponibles. Mais **GraphQL réduit considérablement la charge de travail des développeurs back-end et apporte plus d'autonomie aux développeurs front-end.** »

**Pourquoi nous pensons que React est le meilleur choix pour concevoir des applications web SaaS ?**
----------------------------------------------------------------------------------------------------

La question du choix de la technologie lors de la conception d'une application est souvent à l'origine d'une dette technique. Cela prouve que la flexibilité est vraiment importante.

Pour Philippe, **« en travaillant avec des projets assez uniques, nous devons pouvoir faire évoluer les technologies au fur et à mesure que nous découvrons les besoins. Nous ne pouvons pas prendre toutes les décisions finales dès le début. »**

Il explique :

> « ReactJS convient au développement de petites applications qui seront étendues avec plus de fonctionnalités. L'architecture de React est plus facile à faire évoluer que l'architecture MVC classique dans AngularJS. React nous permet de « parsemer » les composants là où ils sont le plus nécessaires tout en gardant une page simple pour le reste. Il accélère considérablement le temps d'itération lorsque nous avons très peu d'informations sur la réponse du marché à notre produit. Lorsque nous en saurons plus sur ce qu'est le "bon" UX/UI, nous pourrons introduire des composants plus élaborés. »

Illustrons cette affirmation par une métaphore : **Nous construisons les murs tant que nous sommes aveugles, puis nous les peignons quand nous recouvrons la vue.**

Bien qu'aucun framework ne soit toujours parfait, nous apprécions React pour de nombreuses raisons, notamment sa capacité à faire évoluer et augmenter la capacité des applications web pour les startup.

Découvrez notre prochain article de la série : **[Hybride vs Native pour votre application mobile SaaS.](/fr/blog/applications-mobiles-natives-hybrides)**

[![Nouveau call-to-action](https://no-cache.hubspot.com/cta/default/1684659/4b0783da-e328-4356-8375-9e4da3107f31.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/4b0783da-e328-4356-8375-9e4da3107f31)