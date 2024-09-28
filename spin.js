const spinner = document.querySelector(".spinner");
const spinnerBody = document.querySelector(".spinner__body");
const startBtn = document.querySelector(".spinner__start-button");
const input = document.querySelector(".spinner__input");
let plate = document.querySelector(".spinner__plate");
let items = [...document.getElementsByClassName("spinner__item")];
const lainContent = document.querySelector(".laine-content");
const bodyContent = document.querySelector("body");
const whoContainer = document.querySelector(".whoa-wrapper");

// input.addEventListener("change", (e) => {
//   if (input.value === "" || +input.value < 1) {
//     input.value = 1;
//   }
//   if (+input.value > input.max) {
//     input.value = input.max;
//   }
// });
if (localStorage.getItem("end")) {
  document.querySelector(".content-wrapper").classList.add("end");
  document.querySelector(".endo").classList.add("show");
}
animateUpAndDown();

startBtn.addEventListener("click", function () {
  localStorage.setItem("clicked", true);
  randomizeItems();

  setTimeout(function () {
    createVideo();
    showWhoa();
  }, 5000);

  setTimeout(function () {
    bodyContent.classList.add("drastic-bg");
    spinner.classList.add("slide-up");
    lainContent.classList.add("slide-down-to-up");
    hideWhoa();
    document.querySelector(".disclaimer").remove();
  }, 9000);

  if (!plate.classList.contains("spinner__plate--spin")) {
    plate.classList.add("spinner__plate--spin");
    spinnerBody.classList.add("spinner__plate--spin-spin");
  } else {
    const currPlate = plate;
    const newPlate = plate.cloneNode(true);
    currPlate.parentNode.replaceChild(newPlate, currPlate);
    plate = newPlate;
    items = [...document.getElementsByClassName("spinner__item")];
  }
});

function randomizeItems() {
  items[0].textContent = items[3].textContent;
}

function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function createVideo() {
  // Create the video element
  const videoElement = document.createElement("video");
  const appendParent = document.querySelector(".spinner__body");
  videoElement.setAttribute("autoplay", "autoplay");
  videoElement.setAttribute("loop", "");
  videoElement.setAttribute("class", "myVideo");
  videoElement.setAttribute("id", "myVideo");

  // Create the source element
  const sourceElement = document.createElement("source");
  sourceElement.setAttribute("src", "./assets/woah.mp4");
  sourceElement.setAttribute("type", "video/mp4");

  // Append the source to the video
  videoElement.appendChild(sourceElement);

  // Optional: Add fallback text for unsupported browsers
  videoElement.innerHTML += "Your browser does not support HTML5 video.";

  // Append the video element to the desired container, e.g., body
  appendParent.appendChild(videoElement);

  setTimeout(function () {
    videoElement.remove();
  }, 5000);
}

function animateUpAndDown() {
  if (localStorage.getItem("clicked")) {
    bodyContent.classList.add("drastic-bg");
    spinner.classList.add("slide-up");
    lainContent.classList.add("slide-down-to-up");
  }
}

function showWhoa() {
  whoContainer.classList.add("show");
  bodyContent.classList.add("finished");
}

function hideWhoa() {
  whoContainer.classList.remove("show");
  bodyContent.classList.remove("finished");
}
