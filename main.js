Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
});
Webcam.attach("#camera");

function take_picture(){
Webcam.snap(function(url){
document.getElementById("result").innerHTML='<img src="'+url+'" id="snapshot"/>';   
});}

console.log(ml5.version);
var model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Xge8MYS0j/model.json", modelLoaded);

function modelLoaded(){
    console.log("model is ready to use");
}

var prediction1="";
var prediction2="";

function speak(){
    var speak_api=window.speechSynthesis;

    speak1="The first emotion prediction is "+prediction1;
    speak2="and the second emotion prediction is "+prediction2;

    var say_this= new SpeechSynthesisUtterance(speak1+speak2);

    speak_api.speak(say_this);
}

function check(){
    image=document.getElementById("snapshot");
    model.classify(image,result);
}

function result(error,answer){
    if(error){
        console.error(error);
    } 
    else{
        console.log(answer);
        document.getElementById("result_emotion_name").innerHTML=answer[0].label;
        document.getElementById("result_emotion_name2").innerHTML=answer[1].label;

        if(answer[0].label=="happy"){
            document.getElementById("result_emoji").innerHTML="&#128522";
        }

        if(answer[0].label=="calm"){
            document.getElementById("result_emoji").innerHTML="&#128524";
        }

        if(answer[0].label=="sad"){
            document.getElementById("result_emoji").innerHTML="&#128532";
        }

        if(answer[0].label=="mad"){
            document.getElementById("result_emoji").innerHTML="&#128548";
        }


        if(answer[1].label=="happy"){
            document.getElementById("result_emoji2").innerHTML="&#128522";
        }

        if(answer[1].label=="calm"){
            document.getElementById("result_emoji2").innerHTML="&#128524";
        }

        if(answer[1].label=="sad"){
            document.getElementById("result_emoji2").innerHTML="&#128532";
        }

        if(answer[1].label=="mad"){
            document.getElementById("result_emoji2").innerHTML="&#128548";
        }

        prediction1=answer[0].label;
        prediction2=answer[1].label;

        speak();
    }
}