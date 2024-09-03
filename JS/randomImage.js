const imageWidth = 980;
const imageHeight = 886;
const container = document.getElementById("imageContainer");
const getImageButton = document.getElementById("getImage");
let currentImage;

getImageButton.addEventListener("click", function() {
    container.innerHTML = "";

    const img = document.createElement("img");

    img.src = `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`

    currentImage = img;

    container.appendChild(img);
})
