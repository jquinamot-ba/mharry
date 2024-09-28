const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const scratchCardCover = document.querySelector(".scratch-card-cover");
const scratchCard = document.querySelector(".img_wrapper .scratch-card");
const laineContent = document.querySelector(".laine-content");
const scratchCardCanvasRender = document.querySelector(
  ".scratch-card-canvas-render"
);
const scratchCardCoverContainer = document.querySelector(
  ".scratch-card-cover-container"
);
const scratchCardText = document.querySelector(".scratch-card-text");
const scratchCardImage = document.querySelector(".scratch-card-image");
const tenor = document.querySelector(".tenor-gif-embed");

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let isPointerDown = false;
let positionX;
let positionY;
let clearDetectionTimeout = null;

const devicePixelRatio = window.devicePixelRatio || 1;

const canvasWidth = canvas.offsetWidth * devicePixelRatio;
const canvasHeight = canvas.offsetHeight * devicePixelRatio;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

context.scale(devicePixelRatio, devicePixelRatio);

if (isSafari) {
  canvas.classList.add("hidden");
}

// typeJs();

canvas.addEventListener("pointerdown", (e) => {
  scratchCardCover.classList.remove("shine");
  ({ x: positionX, y: positionY } = getPosition(e));
  clearTimeout(clearDetectionTimeout);

  canvas.addEventListener("pointermove", plot);

  window.addEventListener(
    "pointerup",
    (e) => {
      canvas.removeEventListener("pointermove", plot);
      clearDetectionTimeout = setTimeout(() => {
        checkBlackFillPercentage();
      }, 500);
    },
    { once: true }
  );
});

const checkBlackFillPercentage = () => {
  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const pixelData = imageData.data;

  let blackPixelCount = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i];
    const green = pixelData[i + 1];
    const blue = pixelData[i + 2];
    const alpha = pixelData[i + 3];

    if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
      blackPixelCount++;
    }
  }

  const blackFillPercentage =
    (blackPixelCount * 100) / (canvasWidth * canvasHeight);

  if (blackFillPercentage >= 45) {
    scratchCardCoverContainer.classList.add("clear");
    scratchCard.classList.add("cleared");
    laineContent.classList.add("scratched");
    typeJs();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: {
        y:
          (scratchCardText.getBoundingClientRect().bottom + 60) /
          window.innerHeight,
      },
    });
    scratchCardText.textContent = "🎉";
    scratchCardImage.classList.add("animate");
    scratchCardCoverContainer.addEventListener(
      "transitionend",
      () => {
        scratchCardCoverContainer.classList.add("hidden");
      },
      { once: true }
    );
  }
};

const getPosition = ({ clientX, clientY }) => {
  const { left, top } = canvas.getBoundingClientRect();
  return {
    x: clientX - left,
    y: clientY - top,
  };
};

const plotLine = (context, x1, y1, x2, y2) => {
  var diffX = Math.abs(x2 - x1);
  var diffY = Math.abs(y2 - y1);
  var dist = Math.sqrt(diffX * diffX + diffY * diffY);
  var step = dist / 50;
  var i = 0;
  var t;
  var x;
  var y;

  while (i < dist) {
    t = Math.min(1, i / dist);

    x = x1 + (x2 - x1) * t;
    y = y1 + (y2 - y1) * t;

    context.beginPath();
    context.arc(x, y, 16, 0, Math.PI * 2);
    context.fill();

    i += step;
  }
};

const setImageFromCanvas = () => {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    previousUrl = scratchCardCanvasRender.src;
    scratchCardCanvasRender.src = url;
    if (!previousUrl) {
      scratchCardCanvasRender.classList.remove("hidden");
    } else {
      URL.revokeObjectURL(previousUrl);
    }
    previousUrl = url;
  });
};

let setImageTimeout = null;

const plot = (e) => {
  const { x, y } = getPosition(e);
  plotLine(context, positionX, positionY, x, y);
  positionX = x;
  positionY = y;
  if (isSafari) {
    clearTimeout(setImageTimeout);

    setImageTimeout = setTimeout(() => {
      setImageFromCanvas();
    }, 5);
  }
};

function typeJs() {
  // type js plugin
  var typeJsText = document.querySelector(".typeJsText");
  var textArray = typeJsText.dataset.typetext.split("");
  var counter = -1;
  var arraySet = [
    "BWHAHAHAHAAH",
    "NA SCAM KA NA BADET 😂",
    "DE JK LANG",
    "'Hiiii'",
    "I know you're too busy and frustrated with all the bs",
    "But I believe in you, Laine!",
    "Ikaw ang badet na may power na makapag turn ng negative to positive",
    "You're SOAPER AMAZING, Remember it's okay to have tough/bad days. After all of this, you'll come out stronger and more resilient",
    "Just take a deep breath!",
    "Bangon, and gews naman agad!",
    "ANYWAYS, HAPPY BIRTHDAY BADET! :)",
    "IM ALWAYS HERE LANG VIRTUALLY BWHAHAAHAHAHHAAHAH YOUR AI COMPANION?",
  ];
  var counterSet = 0;

  typeJsText.innerHTML = "";

  function typeJsBlock() {
    if (counter < typeJsText.dataset.typetext.length) {
      counter++;
      typeJsText.innerHTML += typeJsText.dataset.typetext.charAt(counter);
      textArray = typeJsText.dataset.typetext.split("");
    } else {
      textArray.pop();
      typeJsText.innerHTML = textArray.join("");
      if (textArray.length == 0) {
        counterSet += 1;
        counter = -1;
        typeJsText.dataset.typetext = arraySet[counterSet - 1];
      }
    }
    if (counterSet - 1 === arraySet.length) {
      clearInterval(intervalId);
      setTimeout(function () {
        tenor.classList.add("fade-in-image");
        document.querySelector(".self-d-wrapper").classList.add("show");
        document
          .querySelector(".typeJsWrapper .container h1")
          .classList.add("fade-out-text");
        selfDestruct();
      }, 2000);
    }
  }

  const intervalId = setInterval(() => {
    typeJsBlock();
  }, 150);
}

function selfDestruct() {
  var counterElement = document.getElementById("counter");

  // Count down the counter until 0
  function decreaseCounter() {
    // Convert counter text to a number
    var counter = Number(counterElement.textContent);
    counterElement.textContent = counter - 1;
    if (counter === 0) {
      localStorage.setItem("end", true);
      document.querySelector(".content-wrapper").classList.add("end");

      document.querySelector(".endo").classList.add("show");
    }
  }

  // Call the decreaseCounter function every second (1000 milliseconds)
  setInterval(decreaseCounter, 1000);
}
