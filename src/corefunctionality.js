
const fileInput = document.querySelector('input[type="file"]');
const audio = new Audio();
const playBtn = document.querySelector("#playbutton");
const progressEl = document.querySelector('input[type="range"]');
let mouseDownOnSlider = false;

audio.addEventListener("loadeddata", () => {
  progressEl.value = 0;
});

audio.addEventListener("timeupdate", () => {
  if (!mouseDownOnSlider) {
    progressEl.value = audio.currentTime / audio.duration * 100;
  }
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶️";
});

playBtn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  playBtn.textContent = audio.paused ? "▶️" : "⏸️";
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
  const file = fileInput.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.load();
  }
});

/*const fileURLToPath = document.querySelector('input[type="file"]');
const audio = new Audio(fileURLToPath);
const playBtn = document.querySelector("#playbutton");
const progressEl = document.querySelector('input[type="range"]');
let mouseDownOnSlider = false;

audio.addEventListener("loadeddata", () => {
progressEl.value = 0;
});
audio.addEventListener("timeupdate", () => {
if (!mouseDownOnSlider) {
progressEl.value = audio.currentTime / audio.duration * 100;
}
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶️";
});

playBtn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  playBtn.textContent = audio.paused ? "▶️" : "⏸️";
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
});*/