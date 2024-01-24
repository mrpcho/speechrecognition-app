const desire = document.getElementById('desire');
let inputSentence = document.getElementById("sentence");
inputSentence.addEventListener('keydown', event => {
    
    desire.textContent = `"${inputSentence.value}"`
    
});

const a = document.getElementById('counting');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ko-KR"

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

const outputDiv = document.getElementById('output');
const countingNumber = document.getElementById('counting');
let counter = 0;
let text = ''

recognition.interimResults = true;
recognition.continuous = true;

// Button Event Listenrs
startButton.addEventListener('click', () => {
    recognition.start()
    startButton.disabled = true;
    startButton.textContent = 'Recording...';
    stopButton.disabled = false;
    
})

stopButton.addEventListener('click', () => {
    recognition.stop();
    stopButton.disabled = true;
    startButton.disabled = true;
    startButton.textContext = 'Start Recording'
})

// Speech Recognition Settings
recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript
    outputDiv.textContent = result
    // console.log(event.results);
    if (event.results[event.results.length - 1][0].transcript.trimStart() === inputSentence.value) {
        counter = counter + 40000
        text = `카운터: ${counter}`
        countingNumber.textContent = text;  
    };
    if (counter >= 100000) {
        countingNumber.textContent = '축하합니다! 원하는 것을 이루셨네요!'
    }
    
};

recognition.onend = () => {
    startButton.disabled = false;
    startButton.textContent = 'Start Recording';
};