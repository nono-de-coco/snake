// let counter = 2;
// console.log("bonjour " + counter);
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
// ctx.fillRect(10,10,100,100)

let gamestarted=false
let direction=""

document.addEventListener("keydown", event => {
    console.log("keydown " + event.key)

    if(!gamestarted && event.key === " "){
        // démarre le jeux
        gamestarted=true
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillText("jeu démarré",10,50)
    }

    if(event.key === "ArrowLeft")
    {
        direction="gauche"
        gameloop();
    }

    if(event.key === "ArrowRight") direction="droite"
    if(event.key === "ArrowDown") direction=""
    if(event.key === "ArrowUp") direction=""

    
});


function draw(){

}



function gameloop() {
    console.log("gameloop")
    if(gamestarted){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillText(direction,10,50)

        console.log("game direction" + direction)

    }else{
        ctx.font="24px serif"
        ctx.fillText("press space to launch",10,50)
    }
}

gameloop();
