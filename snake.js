// let counter = 2;
// console.log("bonjour " + counter);
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
// ctx.fillRect(10,10,100,100)

const box = 20; // taille d'un carré pour afficher une ponne ou un element du corp la valeur est en pixel

// evolution pour le jeux
// 1 - mettre une variable qui compte le nombre de pomme mangé
// 2 - quand on a mangé un certain nombre de pomme on augmente la vitesse du serpent


//création du corp du serpent
let snake = [{ x: 10 * box, y: 10 * box }, { x: 9 * box, y: 10 * box }];
//création de l'objet Pomme
let apple = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
}

let gameStarted = false
let gameOver = false
let direction = "droite"

document.addEventListener("keydown", event => {
    console.log("keydown " + event.key)
    if (!gameStarted && event.key === " ") {
        // démarre le jeux si on press la touche espace
        gameStarted = true
        gameOver = false
        //je reeinitialise le serpent et la pomme
        snake = [{ x: 10 * box, y: 10 * box }, { x: 9 * box, y: 10 * box }];
        //création de l'objet Pomme
        apple = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        }
        gameloop()
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        // ctx.fillText("jeu démarré",10,50)
    }

    if (event.key === "ArrowLeft" && direction !== "droite") direction = "gauche"
    if (event.key === "ArrowRight" && direction !== "gauche") direction = "droite"
    if (event.key === "ArrowDown" && direction !== "monte") direction = "descent"
    if (event.key === "ArrowUp" && direction !== "descent") direction = "monte"


});

/** redessine le jeux */
function draw() {
    //je veux effacer le tableau de jeu
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //afficher la pomme on utilise les propriété de l'objet pomme qui contient x et y pour les coordonées
    ctx.fillStyle = "red"
    ctx.fillRect(apple.x, apple.y, box, box)

    //je veux afficher le serpent
    // i++ --> i=i+1 --> i+=1
    for (let i = 0; i < snake.length; i++) {
        // afficher le corp du serpent
        ctx.fillStyle = "green"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }

    let snakeX = snake[0].x
    let snakeY = snake[0].y
    ctx.fillText(direction, 10, 50)
}

/** met a jour les donnée du serpent de la pomme et si la partie est fini */
function update() {
    let head = {
        x: snake[0].x, y: snake[0].y
    }


    /**
     *  (0,0)
     *      +--------------------------------+
     *      |                                |
     *      |         *****                  |
     *      |           ^ *                  |
     *      |           ***                  |
     *      |                                |
     *      +--------------------------------+ (width, height)
     *  1 Pas = taille de la box (20px)
     */

    // on avance sur la grille
    if (direction === "droite") head.x = head.x + box
    // on recule sur la grille
    if (direction === "gauche") head.x = head.x - box
    if (direction === "monte") head.y = head.y - box
    if (direction === "descent") head.y = head.y + box

    // On test si la tête est sur la pomme
    if (head.x === apple.x && head.y === apple.y) {
        // le serpent mange la pomme
        // je peux incrementer le score

        apple = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        }
    } else {
        // sur un tableau la fonction pop enlève la dernière valeur du tableau
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
        snake.pop()
    }

    // collision avec les bords du jeux , mais aussi les collisions avec avec le reste du serpent
    // || c'est ou logique
    // && c'est et logique

    // version longue de detection que la tête touche le corp
    let corpTouche = false
    for (let i = 0; i < snake.length; i++) {
        let corp = snake[i];
        if (head.x === corp.x && head.y === corp.y) {
            corpTouche = true
            break;
        }
    }

    if (head.x < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height ||
        head.y < 0 ||
        corpTouche
        //snake.some(corp => head.x === corp.x && head.y === corp.y)
    ) {
        // on a perdu
        gameStarted = false
        gameOver = true
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    // unshift methode d'un tableau qui  permetd'ajouter un element au debut du tableau
    snake.unshift(head)
}

function gameloop() {
    console.log("gameloop")
    if (gameStarted) {
        update()
        draw()
        setTimeout(gameloop, 100)
        console.log("game direction" + direction)
    } else {
        ctx.font = "24px serif"
        ctx.fillText("press space to launch", 10, 50)
        if (gameOver) {
            ctx.fillText("Partie perdu", 10, 20)
        }
    }
}

gameloop();
