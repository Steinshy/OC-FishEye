
Accessibility tooling and assistive technology
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling#Screenreaders


Avant de commencer, il est essentiel de prendre connaissance des éléments mis à disposition, notamment la maquette et la base de code mise en place.

 

Une fois cette étape réalisée, vous aurez :

    une compréhension des maquettes
    une compréhension des livrables attendus
    une connaissance du fonctionnement / du découpage des pages HTML / JS et CSS.

 

Recommandations : 

    Affichez les 2 pages HTML fournies dans votre navigateur.
    Faites des console.log dans les différentes parties du JavaScript pour vous assurer que vous comprenez ce que le code fait.
    Modifiez une propriété CSS dans style.css pour vérifier que tout est bien connecté.

 

Points de vigilance : 

    Attention à vous assurer que vous comprenez bien tout le code présent. N'hésitez pas à le modifier pour vous l'approprier.


    Maintenant que vous maîtrisez la base de code présente, vous allez devoir importer les vraies données de votre application. 

 

Une fois cette étape réalisée, vous aurez :

    Votre application qui récupère les données provenant du fichier JSON.

 

Recommandations :

    Vous aurez votre fichier JSON dans datas. Vous devrez également mettre les images associées dans assets.

Dans scripts/pages/index.js vous allez :

1- Ajouter fetch dans la fonction getPhotographers pour récupérer vos datas, et faire un console.log de ces datas

2- Retourner les datas

3- Modifier `scripts/templates/photographer.js` pour récupérer les données nécessaires (id, tagline, city, etc.)

    Ici, vous pouvez utiliser l'API native de JavaScript Fetch afin de récupérer des données.

 

Ressources : 
https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911151-envoyez-une-requete-depuis-le-navigateur
    Le chapitre “Envoyez une requête depuis le navigateur” du cours “Créez des pages web dynamiques avec JavaScript” vous indiquera comment utiliser “fetch” pour faire vos appels API.



Maintenant que vous avez réussi à récupérer les données dans votre page d'accueil, vous allez pouvoir aller plus loin en intégrant votre page d'accueil. 

 

Une fois cette étape réalisée, vous aurez :

    La page avec la liste des cards des photographes
    L'accessibilité de la page index.html

 

Recommandations : 

C'est le moment de créer le HTML, le CSS et le JS associés à la page d'accueil. 
https://www.lalutineduweb.fr/alternatives-textuelles-attributs-aria/
https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout

    Pour ce qui est du JS, vous trouverez un template qui a été fait pour les cartes des photographes dans scripts/factories/photographer.js. Vous devrez étendre ce template afin de générer tous les éléments nécessaires, et retourner les éléments du DOM associés.
    Les éléments du DOM ainsi que le HTML et CSS devront être écrits afin d'assurer l'accessibilité : vous devrez surtout être vigilant sur les déclarations alt et aria-label.
    Le début d'intégration CSS qui a été fait utilise flexbox et CSS grid, n'hésitez pas à jeter un œil à leur documentation.
    Pour le moment, pas la peine de vous embêter à créer les liens, vous le ferez à l'étape suivante.

 

 Vous avez la base de votre page d'accueil. L'idée de cette étape est de permettre la navigation vers la page détaillée du photographe en créant les liens, et en gérant le chargement des données correspondant à la page sur laquelle vous vous trouvez.

 

Une fois cette étape réalisée, vous aurez :

    Votre page d'accueil finalisée
    Le rapport AChecker de votre page
    Le chargement des données correspondant à la page détaillée

 

Recommandations : 
https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6965660-allez-plus-loin-avec-l-accessibilite
Ici,  vous devrez construire un système permettant de passer du lien cliqué au chargement de la page. Pour cela, vous vous appuierez sur l'id du photographe sur lequel l'utilisateur a cliqué et vous le passerez en paramètre de l'url affichée. 

    Vous pouvez commencer par faire un console.log des données correspondant au photographe sélectionné depuis l'URL.
    Vous afficherez ensuite le contenu de la page à la prochaine étape.
    Attention à l'accessibilité de vos liens (aria-label, gérer le focus, etc.)
    Maintenant que vous avez finalisé votre page d'accueil, vous pouvez réaliser un rapport d'accessibilité avec un validateur d'accessibilité ou une checklist, et corriger votre code en fonction


Le moment est venu de créer le contenu HTML et CSS de votre page photographe !

 

Une fois cette étape réalisée, vous aurez :

    Le contenu HTML et CSS de la page photographe

 

Recommandations : 

    Vous devrez réutiliser la fonction photographer Template que vous aviez étendu à l'étape 3 pour afficher le contenu de votre page, ainsi que votre fonction permettant d'utiliser fetch.
    Vous afficherez également les réalisations des photographes, en créant une factory pour Media. 
    N'oubliez pas le petit encart qui affiche le tarif journalier du ou de la photographe affiché.
    Vous vous occuperez du nombre de likes, de la LightBox et du ContactForm dans une étape ultérieure.

 

Points de vigilance : 
https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6964639-guidez-vos-utilisateurs-sur-les-contenus-multimedia
https://www.youtube.com/watch?v=9cjK1bcLTO8
https://www.dofactory.com/javascript/design-patterns/factory-method
    Dans la factory Media, vous devrez gérer les différents cas où le média est une image ou une vidéo.

 

Développez une modale de contact qui s’affiche correctement en cliquant sur “Contactez-moi”.

 

Une fois cette étape réalisée, vous aurez :

    Une modale qui s'affiche lorsque l'on clique sur "Contactez-moi".

 

Recommandations : 

    La base de la modale est déjà présente dans la codebase. Vous devrez y ajouter la gestion du formulaire ainsi que le style manquant.
    ​​Pas d’API complexe avec laquelle interagir ici pour envoyer le contenu de votre formulaire. Un simple console.log des données entrées par l'utilisateur suffira à montrer que vous maîtrisez votre sujet.

 

Points de vigilance :

    Attention : dans la codebase actuelle, rien n'a été fait pour gérer l'accessibilité de votre modale. Vous devrez gérer le focus sur toute la page, le role, l'aria-label, etc.

 https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6965649-rendez-vos-modales-et-carrousels-accessibles


 Vous allez pouvoir réutiliser la base de votre modale afin de créer la Lightbox.

 

Une fois cette étape réalisée, vous aurez :

    La LightBox qui s'affiche lorsque vous cliquez sur une photographie, et dans laquelle vous pouvez faire défiler les autres photographies. La LightBox se ferme au clic sur le bouton de fermeture.

 

Recommandations : 

    Vous devrez gérer les images et les vidéos affichées.
    Attention à bien gérer l'ouverture de la Lightbox, le défilement et la fermeture avec le clic souris, mais aussi avec le clavier. Pour cela, vous devrez utiliser des EventListeners et bien déclencher les actions correspondantes.

 

Points de vigilance : 
https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6965649-rendez-vos-modales-et-carrousels-accessibles

    Comme pour les autres étapes, n'oubliez pas de bien déclarer les aria-label et le rôle de votre LightBox.
Ressources : 

Vous pouvez réutiliser la ressource précédente ici pour construire votre Lightbox.


Au tour des likes. Dans cette étape vous allez incrémenter les likes sur les photos, et lister les likes de toutes les photographies pour l'encart en bas de page qui représente tous les likes d'un photographe.

 

Une fois cette étape réalisée, vous aurez :

    Les photos et vidéos de la galerie pourront être likées.
    L'encart en bas de page affiche maintenant le nombre total de likes

 

Recommandations : 

    Vous pouvez gérer le nombre de likes total depuis votre photographer Template.
    Ici, il n'y a pas besoin de sauvegarder vos likes : si vous rafraîchissez la page, les likes ne doivent pas être sauvegardés.

 

Points de vigilance : 

L’utilisateur ne doit pouvoir liker chaque photo qu’une seule fois, attention à votre implémentation.


Vous allez maintenant implémenter le système de tri pour les photographies sur la page détaillée du photographe.

 

Une fois cette étape réalisée, vous aurez :

    La page photographe finale intégrant la fonctionnalité de tri
    Rapport d'accessibilité de la page photographe

 

Recommandations : 

    Vous pouvez utiliser la méthode sort pour faire votre tri.
    Une fois votre page photographe finalisée, vous pouvez également réaliser un rapport d'accessibilité avec un validateur d'accessibilité ou une checklist, et corriger votre code en fonction.

 

Points de vigilance : 

    Attention à bien gérer l'accessibilité en permettant de sélectionner les éléments au clavier dans le menu déroulant.

 

Ressources :  

    Dans le chapitre “Manipulez les listes en JavaScript” du cours “Créez des pages web dynamiques avec JavaScript” vous verrez comment utiliser la méthode “sort” pour trier des tableaux.
https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript#/id/r-7911112


Pour terminer ce projet, vous devrez faire tourner un linter sur votre code. 

 

Une fois cette étape réalisée, vous aurez :

    La base de code terminée et vérifiée avec un linter de code

 

Recommandations : 

    Vous devrez mettre en place votre linter de code (ESLint, JSLint, etc.)
    Vous êtes autorisé à faire taire certains avertissements

 

Ressources : 

    Le chapitre “Vérifiez que votre code respecte les conventions de codage” du cours “Créez des pages web dynamiques avec JavaScript” vous aidera à prendre en main ESLint.
https://openclassrooms.com/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911268-verifiez-que-votre-code-respecte-les-conventions-de-codage