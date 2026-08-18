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

        media: {
            type: "video",
            src: "assets/fog_web.mp4"
        },

        thumbnail: "assets/fog.png",
        link: "#"
    },


    {
        title: "Capy Café",
        genre: "Simulação de Cozinha Regional",
        description:
            "Uma simulação de cozinha regional onde Capy trabalha em um café à beira da estrada em Manaus, servindo café, x-caboquinho e outros pratos regionais.",
        technologies: ["Unity", "C#"],
        media: {
            type: "image",
            src: "assets/capy_game.png"
        },
        thumbnail: "assets/capy.png",
        link: "https://black-moth-studios.itch.io/capy-cafe"
    },

    {
        title: "Bubbled",
        genre: "Party Game",
        description: "Um projeto de party game multiplayer.",
        technologies: ["Unity", "C#"],
        media: {
            type: "video",
            src: "assets/bubbled.mp4"
        },
        thumbnail: "assets/bubbled.png",
        link: "https://black-moth-studios.itch.io/bubbled"
    },

    {
        title: "Fire Bat",
        genre: "Casual Game",
        description: "Um jogo casual como teste de mecânicas.",
        technologies: ["Unity", "C#"],

        media: {
            type: "video",
            src: "assets/fire_bat.mp4"
        },
        thumbnail: "assets/fire_bat.png",
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

    // Limpa mídia anterior
    gameImage.innerHTML = "";

    if (game.media?.type === "image") {
        const image = document.createElement("img");

        image.src = game.media.src;
        image.alt = game.title;

        image.addEventListener("error", () => {
            console.error(
                "Erro ao carregar imagem:",
                game.media.src
            );
        });

        gameImage.appendChild(image);
    }

    else if (game.media?.type === "video") {
        const video = document.createElement("video");

        video.src = game.media.src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("error", () => {
            console.error(
                "Erro ao carregar vídeo:",
                game.media.src,
                video.error
            );
        });

        gameImage.appendChild(video);

        video.play().catch((error) => {
            console.error("Erro no play:", error);
        });
    }

    else {
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


        if (game.thumbnail) {
            const image = document.createElement("img");

            image.src = game.thumbnail;
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