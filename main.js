status="";
object=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function preload(){
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        object_detector.detect(video, gotResults);
        for(i=0; i<object.length; i++){
            document.getElementById("detected").innerHTML = "Status = object detected";
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            percent = floor(object[i].confidence*100);
            text(object[i].label +" " +  percent + " %" , object[i].x+15 , object[i].y + 15)
            if(object[i].label==inputvar){
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("found").innerHTML = inputvar  + "found";
                Synth= window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(inputvar + "found");
            }
            else{
                document.getElementById("found").innerHTML = inputvar + "not found"
            }
        
    }
    }
}
function begin(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("detected").innerHTML= "Status= detecting objects";
    inputvar=document.getElementById("input").value;
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
}
function gotResults(error ,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}