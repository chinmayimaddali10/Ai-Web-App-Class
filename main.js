song = "";
leftWX = 0;
leftWY = 0;
rightWY = 0;
rightWX = 0;
scoreLW = 0;
scoreRW = 0;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(500, 500);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes);
}

function preload() {
    song = loadSound("Imagine Dragons - Believer.mp3");
    song.setVolume(0.5);
    song.rate(1);
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("scoreRW = " + scoreRW + " scoreLW = " + scoreLW);
        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;
        rightWY = results[0].pose.rightWrist.y;
        rightWX = results[0].pose.rightWrist.x;
        console.log(" left wrist x = " + leftWX + " left wrist y = " + leftWY + " right wrist y = " + rightWY + " right wrist x = " + rightWX);
    }


}

function modelLoaded() {
    console.log("posenet is working");
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");



    if (scoreRW > 0.2) {
        circle(rightWX, rightWY, 20);

        if (rightWY > 0 && rightWY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        } else if (rightWY > 100 && rightWY <= 200) {
            document.getElementById("speed"), innerHTML = "Speed = 1";
            song.rate(1);
        } else if (rightWY > 200 && rightWY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        } else if (rightWY > 300 && rightWY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2";
            song.rate(2);
        } else if (rightWY > 400 && rightWY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }

    }

    if (scoreLW > 0.2) {
        circle(leftWX, leftWY, 20);
        numberLWY = Number(leftWY);
        removeDecimals = floor(numberLWY);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }

}

function play() {
    song.play();
}