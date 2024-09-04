const addEmailButton = document.getElementById("submitEmail");
const addImageButton = document.getElementById("assignButton");
const emailInput = document.getElementById("userEmail");
const emailOptionsMenu = document.getElementById("emailOptions");
const userImageSection = document.getElementById("assignedImages");
const imageContainer = document.getElementById("assignedImageContainer");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
let imageIndex = 0;
let imageLimit = 9;
let currentViewingPage = 1; 

let emailList = [];

class emailEntry {

    constructor(email) {
        this.email = email;
        this.assignedImages = [];
        this.imagesToDisplay = [];
    }
}

addEmailButton.addEventListener("click", function() {
    let emailValue = emailInput.value.trim();
    let userEmail = new emailEntry (emailValue);
    emailList.push(userEmail);
    let option = document.createElement("option");
    option.value = emailValue;
    option.textContent = emailValue;
    emailOptionsMenu.appendChild(option);
});

addImageButton.addEventListener("click", function() {
    if (emailOptionsMenu.value === "" || emailOptionsMenu.value === "disabled") {
        console.log("Insert Warning Message Here");
    } else {
        let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value); 
        emailList[emailObjectIndex].assignedImages.push(currentImage.src);
        console.log(emailList[emailObjectIndex].assignedImages);
        displayImages();
    }

});

function displayImages() {
    userImageSection.innerHTML = "";
    
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    for (let i = imageIndex; i < imageLimit && i < selectedEmail.assignedImages.length; i++) {
        let img = document.createElement('img');
        img.src = selectedEmail.assignedImages[i];
        userImageSection.appendChild(img);  
    }
        
    };

emailOptionsMenu.addEventListener("change", function() {   
    userImageSection.innerHTML = "";
    displayImages();
});

prevButton.addEventListener("click", function () {
    if (imageIndex === 0) {
        console.log("No previous page avaiable");
    } else {
        imageIndex = imageIndex - 9;
        imageLimit = imageLimit - 9;
        displayImages();
    }
});

nextButton.addEventListener("click", function () {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    if (imageLimit >= selectedEmail.assignedImages.length) {
        console.log("NO");
    } else {
        imageIndex = imageIndex + 9;
        imageLimit = imageLimit + 9;
        displayImages();
    }
}); 