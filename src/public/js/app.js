const socket = io();

const camera = document.querySelector("#camera");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    camera.srcObject = myStream;
  } catch (error) {
    console.log(error);
  }
}

getMedia();

function handleMuteBtnClick() {
  myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCameraBtnClick() {
  myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  if (!cameraOff) {
    cameraBtn.innerText = "Turn camera Off";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn camera On";
    cameraOff = false;
  }
}

muteBtn.addEventListener("click", handleMuteBtnClick);
cameraBtn.addEventListener("click", handleCameraBtnClick);
