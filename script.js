/* =========================
   NAVEGAÇÃO ENTRE SEÇÕES
   ========================= */

const areaLinks = document.querySelectorAll(".area-link");

areaLinks.forEach((areaLink) => {
    areaLink.addEventListener("click", () => {
        const targetId = areaLink.dataset.target;
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});


/* =========================
   DADOS DOS JOGOS
   ========================= */

const games = [
    {
        title: "F.O.G.",
        genre: "Beat 'em Up Rítmico",
        description: "Um projeto rítmico de beat 'em up.",
        technologies: ["Unity", "C#"],
        image: null,
        link: "#"
    },

    {
        title: "Capy Café",
        genre: "Simulação de Cozinha Regional",
        description:
            "Uma simulação de cozinha regional onde Capy trabalha em um café à beira da estrada em Manaus, servindo café, x-caboquinho e outros pratos regionais.",
        technologies: ["Unity", "C#"],
        image: "assets/capy.png",
        link: "https://black-moth-studios.itch.io/capy-cafe"
    },

    {
        title: "Bubbled",
        genre: "Party Game",
        description: "Um projeto de party game multiplayer.",
        technologies: ["Unity", "C#"],
        image: null,
        link: "#"
    }
];


/* =========================
   ESTADO DO CARROSSEL
   ========================= */

let currentGame = 0;


/* =========================
   ELEMENTOS DO HTML
   ========================= */

const gameTitle = document.getElementById("game-title");
const gameGenre = document.getElementById("game-genre");
const gameDescription = document.getElementById("game-description");
const gameTechnologies = document.getElementById("game-technologies");
const gameImage = document.getElementById("game-image");
const gameLink = document.getElementById("game-link");

const previousButton = document.getElementById("game-prev");
const nextButton = document.getElementById("game-next");

const gameThumbnails = document.getElementById("game-thumbnails");


/* =========================
   EXIBIR JOGO
   ========================= */

function showGame(index) {
    const game = games[index];

    // Informações principais
    gameTitle.textContent = game.title;
    gameGenre.textContent = game.genre;
    gameDescription.textContent = game.description;
    gameLink.href = game.link;


    // Tecnologias
    gameTechnologies.innerHTML = "";

    game.technologies.forEach((technology) => {
        const span = document.createElement("span");

        span.textContent = technology;

        gameTechnologies.appendChild(span);
    });


    // Imagem
    if (game.image) {
        gameImage.style.backgroundImage = `url("${game.image}")`;
        gameImage.textContent = "";
    } else {
        gameImage.style.backgroundImage = "none";
        gameImage.textContent = game.title;
    }


    // Miniatura selecionada
    const thumbnails = document.querySelectorAll(".game-thumbnail");

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
        thumbnail.classList.toggle(
            "active",
            thumbnailIndex === index
        );
    });
}


/* =========================
   CRIAR MINIATURAS
   ========================= */

function createGameThumbnails() {
    gameThumbnails.innerHTML = "";

    games.forEach((game, index) => {
        const button = document.createElement("button");

        button.classList.add("game-thumbnail");
        button.type = "button";
        button.setAttribute("aria-label", `Selecionar ${game.title}`);


        if (game.image) {
            const image = document.createElement("img");

            image.src = game.image;
            image.alt = game.title;

            button.appendChild(image);
        } else {
            const title = document.createElement("span");

            title.textContent = game.title;

            button.appendChild(title);
        }


        button.addEventListener("click", (event) => {
            event.stopPropagation();

            currentGame = index;

            showGame(currentGame);
        });


        gameThumbnails.appendChild(button);
    });
}


/* =========================
   CONTROLES DO CARROSSEL
   ========================= */

previousButton.addEventListener("click", (event) => {
    event.stopPropagation();

    currentGame--;

    if (currentGame < 0) {
        currentGame = games.length - 1;
    }

    showGame(currentGame);
});


nextButton.addEventListener("click", (event) => {
    event.stopPropagation();

    currentGame++;

    if (currentGame >= games.length) {
        currentGame = 0;
    }

    showGame(currentGame);
});


gameLink.addEventListener("click", (event) => {
    event.stopPropagation();
});


/* =========================
   INICIALIZAÇÃO
   ========================= */

createGameThumbnails();
showGame(currentGame);