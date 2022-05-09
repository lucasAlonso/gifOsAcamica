let recorder;
let stream;
let blobs;
let video = document.getElementById('videoCapture');
let intervalFunctionCaller;
let indexOfProgress = 0;
const apiKey = 'XBrtyxnpwVzEstGKyX7sjMxYpQrQwCkV';
const apiKeyTenor = 'OSAV6J9IUJ8H';
let dataReturned;
uploadEnded = 'false'
async function openRecordFromCamera() {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    })
    video.srcObject = stream
    video.play();
}
async function startRecord() {
    recorder = new MRecordRTC();
    recorder.addStream(stream);
    recorder.mediaType = {
        audio: false,
        video: true,
        gif: true
    };
    recorder.mimeType = {
        audio: 'audio/wav',
        video: 'video/webm',
        gif: 'image/gif'
    };
    recorder.startRecording();
    setStartVideoControls();
}
async function stoper() {
    await recorder.stopRecording(stopCallback);
}
async function stopCallback() {
    video.src = video.srcObject = null;
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
    blobInCallback = await recorder.getBlob().video
    video.src = window.URL.createObjectURL(blobInCallback);
    playButtonSetUp();
    changeButonsOnStopRecording();
}

function startTimer() {
    let timer = document.getElementById('timer');
    timer.classList.remove('dontShow');
    timer.classList.add('timer');
    let timerUpdaterInterval = setInterval(updateTime, 100);
    return timerUpdaterInterval;
}

function updateTime() {
    timer.innerHTML = sec2time(video.currentTime);
}

function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 2);
}

function toggleCaptureWindow() {
    let crearGifWindow = document.getElementById('crearGifWindow');
    let captureVideoWindow = document.getElementById('captureVideoWindow');
    crearGifWindow.classList.toggle('dontShow');
    captureVideoWindow.classList.toggle('dontShow');
    if (video.readyState) {
        stream.stop()
    } else {
        openRecordFromCamera();
    }
}

function videoSetUp() {
    let buttonCamera = document.getElementById('cameraButton');
    let buttonListo = document.getElementById('captureButton');
    buttonCamera.addEventListener('click', startRecord);
    buttonListo.addEventListener('click', startRecord);
    makeSeekInSeekBar();
}

function playButtonSetUp() {
    let playButton = document.getElementById("play-pause");
    playButton.classList.remove('dontShow');
    let seekBar = document.getElementById('video-control--seekbar');
    seekBar.classList.remove('dontShow');
    video.addEventListener('ended', () => { playButton.innerHTML = ">" }, false);
    playButton.addEventListener("click", function() {
        if (video.paused == true) {
            video.play();
            playButton.innerHTML = "||";
            seekBarSetUp();
        } else {
            video.pause();
            playButton.innerHTML = ">";
            clearInterval(intervalFunctionCaller);
        }
    });
}

function seekBarSetUp() {
    let squares = document.getElementsByClassName('video-control--seekbar-square');
    let step = 1000 * video.duration / 20;
    intervalFunctionCaller = setInterval(changeColor, step);

    function changeColor() {
        squares[indexOfProgress].classList.add('onProgress');
        indexOfProgress++;
        if (indexOfProgress === 20) {
            clearInterval(intervalFunctionCaller);
            clearProgressBar();
            indexOfProgress = 0;
        }
    }
}

function clearProgressBar() {
    let progressSquares = document.getElementsByClassName('video-control--seekbar-square');
    for (let index = 0; index < progressSquares.length; index++) {
        progressSquares[index].classList.remove('onProgress');
    }
}

function makeSeekInSeekBar() {
    let progressSquares = document.getElementsByClassName('video-control--seekbar-square');
    for (let index = 0; index < progressSquares.length; index++) {
        progressSquares[index].addEventListener('click', seekeableBarClick);
    }
}

function seekeableBarClick() {
    video.pause();
    clearInterval(intervalFunctionCaller);
    indexOfProgress = parseInt(this.id);
    video.currentTime = indexOfProgress * video.duration / 20;
    let squares = document.getElementsByClassName('video-control--seekbar-square');
    clearProgressBar();
    for (let index = 0; index < indexOfProgress; index++) {
        squares[index].classList.add('onProgress');
    };
    video.play();
    seekBarSetUp();
}

function repeatCaption() {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false);
}
async function uploadCaller() {
    changeWindowToLoadingScreen();
    startProgressBar();
    uploadToGiphy(recorder.getBlob().gif);
}

function endUpload() {
    if (dataReturned) {
        closeUploadWindow();
        setupUploadedPage();
    } else {
        startProgressBar();
    }
}

function reloadPage() {
    location.reload();
    return false;
}

function copyGifUrlToClipboard() {
    let textDom = document.createElement('textarea');
    textToCopy = 'https://giphy.com/gifs/' + dataReturned.data.id;
    textDom.value = textToCopy;
    textDom.setAttribute('readonly', '');
    textDom.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(textDom);
    textDom.select();
    document.execCommand('copy');
    document.body.removeChild(textDom);
}

function saveAsGif() {
    invokeSaveAsDialog(recorder.getBlob().gif);
}
window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        toggleCaptureWindow();
        videoSetUp();
    } else {
        videoSetUp();
    }
}