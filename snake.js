// let counter = 2;
// console.log("bonjour " + counter);
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
// ctx.fillRect(10,10,100,100)

const box=20;

let snake=[{x:10*box,y:10*box},{x:9*box,y:10*box}];
let flood = {
    x: Math.floor(Math.random()*20)*box,
    y: Math.floor(Math.random()*20)*box
}
let gameStarted=false
let gameOver=false
let direction="droite"

document.addEventListener("keydown", event => {
    console.log("keydown " + event.key)

    if(!gameStarted && event.key === " "){
        // démarre le jeux
        gameStarted=true
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillText("jeu démarré",10,50)
    }

    if(event.key === "ArrowLeft") direction="gauche"
    if(event.key === "ArrowRight") direction="droite"
    if(event.key === "ArrowDown") direction="descent"
    if(event.key === "ArrowUp") direction="monte"

    
});

/** redessine le jeux */
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillText(direction,10,50)
}

/** met a jour les donnée du serpent de la pomme et si la partie est fini */
function update(){

}


function gameloop() {
    console.log("gameloop")
    if(gameStarted){
        update()
        draw()
        if(!gameOver){
            setTimeout(gameloop,100)
        }

        console.log("game direction" + direction)

    }else{
        ctx.font="24px serif"
        ctx.fillText("press space to launch",10,50)
    }
}

gameloop();
