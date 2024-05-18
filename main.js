song = "";
leftWristX = 0;
leftWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(350, 180);

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('pose is initiallized');
}

function gotPoses(results) {
    if (results.length > 0) {
        scorerightwrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristx= " + rightWristX + "rightwristy= " + rightWristY);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristx= " + leftWristX + "leftwristy= " + leftWristY);
    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        innumberleftwristy = Number(leftWristY);
        removedecimal = floor(innumberleftwristy);
        leftWristYdivide1000 = removedecimal / 1000;
        volume = leftWristYdivide1000 * 2;
        document.getElementById("volume").innerHTML = "volume= " + volume;
        song.setVolume(volume);
    }
    if (scorerightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = 'speed: 0.5x';
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = 'speed: 1x';
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = 'speed: 1.5x';
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = 'speed: 2x';
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = 'speed:2.5x';
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
}

function stop() {
    song.pause();
}