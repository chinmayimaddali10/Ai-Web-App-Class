song = "";
leftWX = 0;
leftWY = 0;
rightWY = 0;
rightWX = 0;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(450, 450);
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
    }
    leftWX = results[0].pose.leftWrist.x;
    leftWY = results[0].pose.leftWrist.y;
    rightWY = results[0].pose.rightWrist.y;
    rightWX = results[0].pose.rightWrist.x;
    console.log(" left wrist x = " + leftWX + " left wrist y = " + leftWY + " right wrist y = " + rightWY + " right wrist x = " + rightWX);
}

function modelLoaded() {
    console.log("posenet is working");
}

function draw() {
    image(video, 25, 25, 450, 450);
}

function play() {
    song.play();
}