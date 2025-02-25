// let counter = 2;
// console.log("bonjour " + counter);
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
//ctx.fillStyle = "blue";
// ctx.fillRect(10,10,100,100)

let gamestarted=false
let direction=""

document.addEventListener("keydown", event => {
    if(!gamestarted && event.key === " "){
        // démarre le jeux
    }

    if(event.key === "ArrowLeft") direction=""
    if(event.key === "ArrowRight") direction=""
    if(event.key === "ArrowDown") direction=""
    if(event.key === "ArrowUp") direction=""

});


function draw(){

}



function gameloop() {
    if(gamestarted){

    }else{
        ctx.font="48px serif"
        ctx.fillText("press space to launch",10,50)
    }
}

gameloop();
