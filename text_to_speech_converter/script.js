const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isSpeaking = true;
voices();

//to reach different voices
function voices() {
    for (let voice of synth.getVoices()) {

        //select "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";

        //to create an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

        //to insert option tag beforeend of select tag
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}


synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {

        //if available device voice name is equal to user selected voice name, then set speech voice to user selected voice
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }

    //to hear the speech
    synth.speak(utterance);
}


speechBtn.addEventListener("click", e => {
    e.preventDefault();

    //if textarea is not empty
    if (textarea.value !== "") {

        //if speech is not currently in process on speaking
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }


        //if text is too long, run this code
        if (textarea.value.length > 80) {

            //checking if speech in speaking process or not in every 100ms
            //if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                } else {
                }
            }, 500);

            //if speaking is true -> change its value to false, resume the speech, show pause speech text
            //else -> change its value to true, pause the speech, show resume the speech text
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }
        else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});