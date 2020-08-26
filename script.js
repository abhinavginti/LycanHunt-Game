bgaudio = new Audio('music.mp3');
gameoveraud = new Audio('gameover.mp3');
var audiocheck=true;

document.onkeydown = function (e) {
    console.log("KEy code is: ", e.keyCode)
    if(e.keyCode==13 && audiocheck)
    {
        bgaudio.play();
        var pressenter=document.getElementById('pressenter');
        pressenter.style.display="none";
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        var lycan = document.querySelector('.lycan');
        lycan.classList.add('animateLycan');
        setTimeout(() => {
            lycan.classList.remove('animateLycan');
        }, 800);

    }
    if (e.keyCode == 37 || e.keyCode == 65) {
        var lycan = document.querySelector('.lycan');
        var lycanX = parseInt(window.getComputedStyle(lycan, null).getPropertyValue('left'));
        lycan.style.left = (lycanX - 150) + "px";
    }
    if (e.keyCode == 39 || e.keyCode == 68) {
        var lycan = document.querySelector('.lycan');
        var lycanX = parseInt(window.getComputedStyle(lycan, null).getPropertyValue('left'));
        lycan.style.left = lycanX + 150 + "px";
    }

}

let cross = true;
let score = 0;
setInterval(() => {
    var lycan = document.querySelector('.lycan');
    var dino = document.querySelector('.dino');
    var dinoani = document.querySelector('.dinoani')
    var intro = document.querySelector('.intro');
    var gameover = document.querySelector('.gameover');

    let lx = parseInt(window.getComputedStyle(lycan, null).getPropertyValue('left'));
    let ly = parseInt(window.getComputedStyle(lycan, null).getPropertyValue('bottom'));
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    var axisX = Math.abs(lx - dx);
    var axisY = Math.abs(ly - dy);

    //console.log(axisX,axisY)
    if (axisX < 127 && axisY < 150) {
        cross = false;
        audiocheck=false;
        gameoveraud.play();
        setTimeout(() => {
            bgaudio.pause();
            gameoveraud.pause();
        }, 1000);
        intro.style.display = "none";
        gameover.style.display = "block";
        dino.classList.remove('dinoani');

    }
    else if (axisX < 300 && cross) {
        score++;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            var dinoanim = parseFloat(window.getComputedStyle(dinoani, null).getPropertyValue('animation-duration'));
            var newani = dinoanim - 0.1;
            dino.style.animationDuration = newani + 's';

        }, 500);
    }


}, 10);

function updatescore(score) {
    if (cross) {
        var scorecount = document.querySelector('.points');
        scorecount.innerHTML = score;
    }
}
