# Netflix
Je suis Louis Biard et je suis en 2ème année de fomation du BUT Informatique de Limoges

Netflix peut être un bon exemple de projet car eux aussi utilisent une interface graphique adapté aux utilisateurs, tout-en gérant de gros flus de données.

Les trois couches sont la partie client, la partie serveur web et serveur de données. La première c'est celle qui est affiché pour l'utilisateur et avec laquelle il intéragit. La partie serveur web, c'est elle qui fais le lien entre l'interface et les données. La partie serveur de données, elle s'occupe de stocker et gérer les différentes données.

Affichage de la page d'acceuil:
    Je met le logo au centre en haut, je met une barre de navigation facile en haut, je met des propositions de films ensuite

<head>
    <title>Netflic</title>
</head>
<body>

    <header>
        <div>
            <img src="logo.png" alt"Logo">
        </div>

        <nav>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Films</a></li>
                <li><a href="#">Séries</a></li>
                <li><a href="#">Ma Liste</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Propositions de films</h2>

            <article>
                <img src="film1.jpg" alt="Affiche Film 1">
                <h3>Titre du Film 1</h3>
            </article>

            <article>
                <img src="film2.jpg" alt="Affiche Film 2">
                <h3>Titre du Film 2</h3>
            </article>

            <article>
                <img src="film3.jpg" alt="Affiche Film 3">
                <h3>Titre du Film 3</h3>
            </article>
        </section>
    </main>

</body>

Endpoints du front:
    GET /movies/recommendations : Pour récupérer la liste des films et faire des propositions celon ce que regarde l'utilisateur
    GET /movies/popular : Pour récupérer les films populaires
    GET /config/navigation : Pour savoir quels liens afficher dans la barre du haut