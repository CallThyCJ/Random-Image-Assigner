const imageWidth = 980;
const imageHeight = 886;
const container = document.getElementById("imageContainer");
const getImageButton = document.getElementById("getImage");

getImageButton.addEventListener("click", function() {
    container.innerHTML = "";

    const img = document.createElement("img");

    img.src = `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`

    container.appendChild(img);
})
