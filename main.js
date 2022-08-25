prediction1=""
prediction2=""


Webcam.attach("camera")
Webcam.set({
    height: 350,
    width: 250,
    image_format: "png",
    png_quality: 90
})

function capture() {
    Webcam.snap(function (dataUrl) {
        document.getElementById("result").innerHTML = "<img src='" + dataUrl + "' id='dataSnapshot'></img>"
    })

}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lDqR9RVNY/model.json", modelLoaded)
function modelLoaded() {
    console.log("the model worked!")
}

function speak() {
    var synth = window.speechSynthesis;
   var speech1=""
    if (prediction1=="peace"){
      var speech1="Chill and be at peace "
    }
    else if(prediction1=="ok"){
        var speech1="I say you're doing more than Okay! "
    }
    else{
        var speech1="That's awsome and I give it a thumbs up! "
    }
   
    var speechData = speech1;
    var utterThis = new SpeechSynthesisUtterance(speechData)
    synth.speak(utterThis)
}
function identifyImage() {
    img = document.getElementById("dataSnapshot")
    classifier.classify(img, gotResult)
}


function gotResult(error, result) {
    if (error) {
 console.log(error)
    }
    else {
        console.log(result)
        console.log(result[0].label)
        console.log(result[1].label)
        prediction1 = result[0].label
        prediction2 = result[1].label
        document.getElementById("name1").innerHTML = prediction1
        document.getElementById("name2").innerHTML = prediction2
        if (prediction1 == "peace") {
            document.getElementById("guesture1").innerHTML = "&#9996;"
        }
        else if (prediction1 == "ok") {
            document.getElementById("guesture1").innerHTML = "&#128076;"
        }
        else {
            document.getElementById("guesture1").innerHTML = "&#128077;"
        }
        speak();
    }

}
