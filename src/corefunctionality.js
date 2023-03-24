
const fileInput = document.querySelector('input[type="file"]');//calling file input 
const audio = new Audio();
const playBtn = document.querySelector("#playbutton");//play button
const skipBtn = document.querySelector("#skipbutton");//skip button
const progressEl = document.querySelector('input[type="range"]');//progress bar
let mouseDownOnSlider = false;

let fileList = [];
let currentFileIndex = 0;


//loading data
audio.addEventListener("loadeddata", () => {
  progressEl.value = 0;
});

//time update
audio.addEventListener("timeupdate", () => {
  if (!mouseDownOnSlider) {
    progressEl.value = audio.currentTime / audio.duration * 100;
  }
});


audio.addEventListener("ended", () => {
  currentFileIndex++;
  if (currentFileIndex >= fileList.length) {
    currentFileIndex = 0;
  }
  loadAudioFile(fileList[currentFileIndex]);
  playBtn.textContent = "▶️";
});

//play and pause button functionality
playBtn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  playBtn.textContent = audio.paused ? "▶️" : "⏸️";
});

//skip button functionality
skipBtn.addEventListener("click", () => {
  currentFileIndex++;
  if (currentFileIndex >= fileList.length) {
    currentFileIndex = 0;
  }
  loadAudioFile(fileList[currentFileIndex]);
  playBtn.textContent = "▶️";
});

progressEl.addEventListener("change", () => {
  const pct = progressEl.value / 100;
  audio.currentTime = (audio.duration || 0) * pct;
});

progressEl.addEventListener("mousedown", () => {
  mouseDownOnSlider = true;
});

progressEl.addEventListener("mouseup", () => {
  mouseDownOnSlider = false;
});

fileInput.addEventListener("change", () => {
  currentFileIndex = 0;
  fileList = fileInput.files;
  if (fileList.length > 0) {
    loadAudioFile(fileList[currentFileIndex]);
  }
});

function loadAudioFile(file) {
  const url = URL.createObjectURL(file);
  audio.src = url;
  audio.load();
}

function loadAudioFile(file) {
  const url = URL.createObjectURL(file);
  audio.src = url;
  audio.load();
  document.getElementById("current-file").textContent = file.name;
}
