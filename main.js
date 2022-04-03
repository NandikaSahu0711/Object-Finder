status = "";
objects= [];

function preload(){}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
	video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 500, 400);
    if (status !=""){
        objectDetectr.detect(video, gotResults);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("object").innerHTML = "Objects detected are : " + objects.length;

            fill("#EE82EE");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].height);
            noFill();
            stroke("#EE82EE");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);{
        }
        console.log(results);
    }
}