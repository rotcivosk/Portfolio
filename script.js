const areas = document.querySelectorAll('.area-link');

areas.forEach(area => {
    area.addEventListener('click', () => {
        const targetId = area.dataset.target;
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const games = [
    {
        title: "F.O.G.",
        genre: "Beat 'em Up Rítmico",
        description: "A rhythmic beat 'em up project.",
        technologies: ["Unity", "C#"],
        image: null,
        link: "#"
    },

    {
        title: "Capy Café",
        genre: "Regional Cooking Simulation",
        description:
            "A regional cooking simulation where Capy works at a roadside café in Manaus, serving coffee, x-caboquinho and other regional dishes.",
        technologies: ["Unity", "C#"],
        image: "assets/capy.png",
        link: "https://black-moth-studios.itch.io/capy-cafe"
    },

    {
        title: "Bubbled",
        genre: "Party Game",
        description: "A multiplayer party game project.",
        technologies: ["Unity", "C#"],
        image: null,
        link: "#"
    }
];


let currentGame = 0;


const gameTitle = document.getElementById("game-title");
const gameGenre = document.getElementById("game-genre");
const gameDescription = document.getElementById("game-description");
const gameTechnologies = document.getElementById("game-technologies");
const gameImage = document.getElementById("game-image");
const gameLink = document.getElementById("game-link");

const previousButton = document.getElementById("game-prev");
const nextButton = document.getElementById("game-next");


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

    // Imagem
    if (game.image) {
        gameImage.style.backgroundImage = `url('${game.image}')`;
        gameImage.style.backgroundSize = "cover";
        gameImage.style.backgroundPosition = "center";
        gameImage.style.backgroundRepeat = "no-repeat";
        gameImage.textContent = "";
    } else {
        gameImage.style.backgroundImage = "none";
        gameImage.textContent = game.title;
    }
}

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


showGame(currentGame);