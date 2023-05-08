prediction_1 = "";
prediction_2 = "";
Webcam.set({
  width:350,height:300,image_format:'png',png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
console.log('ml5 version:', ml5.version);
 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6xT6VW0W8/model.json',modelLoaded);
  function modelLoaded() { console.log('Model Loaded!'); }
  function take_snapshot(){
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    })
  }
  function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
  }
function gotResult(error,results){
  if(error){
    console.error(error);
  }else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="feliz"){
      document.getElementById("update_emoji").innerHTML="&#128512;";

    }
    if(results[0].label=="triste"){
      document.getElementById("update_emoji").innerHTML="&#128532;";

    }
    if(results[0].label=="enojado"){
      document.getElementById("update_emoji").innerHTML="&#128545;";

    }
    if(results[0].label=="llorar"){
      document.getElementById("update_emoji").innerHTML="&#128557;";

    }
    if(results[1].label=="feliz"){
      document.getElementById("update_emoji2").innerHTML="&#128512;";

    }
    if(results[1].label=="triste"){
      document.getElementById("update_emoji2").innerHTML="&#128532;";

    }
    if(results[1].label=="enojado"){
      document.getElementById("update_emoji2").innerHTML="&#128545;";

    }
    if(results[1].label=="llorar"){
      document.getElementById("update_emoji2").innerHTML="&#128557;";

    }
  }
}
function speak(){
  var sign=window.speechSynthesis;
  speak_data1=" Mi prediccion 1 es "+prediction_1;
  speak_data2=" Mi prediccion 2 es "+prediction_2;
  var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
  sign.speak(utterThis);
}
