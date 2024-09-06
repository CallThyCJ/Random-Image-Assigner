const addEmailButton = document.getElementById("submitEmail");
const addImageButton = document.getElementById("assignButton");
const emailInput = document.getElementById("userEmail");
const emailOptionsMenu = document.getElementById("emailOptions");
const userImageSection = document.getElementById("assignedImages");
const imageContainer = document.getElementById("assignedImageContainer");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const currentPage = document.getElementById("currentPage");
const totalPages = document.getElementById("totalPages");
let imageIndex = 0;
let imageLimit = 9;
let currentViewingPage = 1;
let currentTotalPages = 1; 

let emailList = [];

class emailEntry {

    constructor(email) {
        this.email = email;
        this.assignedImages = [];
        this.imagesToDisplay = [];
    }
}

//email pages numbers
window.onload = () => {
    currentPage.innerText = currentViewingPage.toString();
    totalPages.innerText = currentTotalPages.toString();
}

//Add email to email selection
addEmailButton.addEventListener("click", function() {
    let emailValue = emailInput.value.trim();
    const warning = document.querySelector("#emailWarning");
    const dupWarning = document.getElementById("dupEmailWarning");
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    for (let i = 0; i < emailList.length; i++) {
        if (emailValue === emailList[i].email) {
            dupWarning.style.display = "block";  
            return console.log ("email is already entered");
        }
    }

    if (emailRegex.test(emailValue)) {
        let userEmail = new emailEntry (emailValue);
        emailList.push(userEmail);
        let option = document.createElement("option");
        option.value = emailValue;
        option.textContent = emailValue;
        emailOptionsMenu.appendChild(option);
        emailOptionsMenu.value = emailValue;
        warning.style.display = "none";
        dupWarning.style.display = "none";
    }else{
        warning.style.display = "block";
        
        console.log("enter a valid email");
    }
});

//Add image to user's collection
addImageButton.addEventListener("click", function() {
    const warning = document.getElementById("imageWarning"); 
    const noEmailWarning = document.getElementById("noEmailWarning");
    
    if (emailOptionsMenu.value === "" || emailOptionsMenu.value === "disabled") {
        noEmailWarning.style.display = "block";
        console.log("Insert Warning Message Here");
        
    } else {
        noEmailWarning.style.display = "none";

        let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
        
        const imgExists = emailList[emailObjectIndex].assignedImages.some(img => img === currentImage.src);

//generate total page number
        if (emailList[emailObjectIndex].assignedImages.length > 9) {
            currentTotalPages = emailList[emailObjectIndex].assignedImages.length / 9;
            totalPages.innerText = Math.ceil(currentTotalPages).toString();
        }

//Check to see if image is already in the email collection
        if (!imgExists) {
            emailList[emailObjectIndex].assignedImages.push(currentImage.src);
            console.log(emailList[emailObjectIndex].assignedImages);
            displayImages();
            warning.style.display = "none";
        } else {
            warning.style.display = "block";
            console.log("image already in collection");
        }
        
    }

});

//Append user images to image container
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

//Detect if email has changed and display new email's images    
emailOptionsMenu.addEventListener("change", function() {   
    userImageSection.innerHTML = "";
    displayImages();
});

//Show previous images in the array
prevButton.addEventListener("click", function () {
    if (imageIndex === 0) {
        console.log("No previous page avaiable");
    } else {
        imageIndex = imageIndex - 9;
        imageLimit = imageLimit - 9;
        displayImages();
        currentViewingPage--;
        currentPage.innerText = currentViewingPage.toString();
    }
});

//Show next images in the array
nextButton.addEventListener("click", function () {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    if (imageLimit >= selectedEmail.assignedImages.length) {
        console.log("NO");
    } else {
        imageIndex = imageIndex + 9;
        imageLimit = imageLimit + 9;
        displayImages();
        currentViewingPage++;
        currentPage.innerText = currentViewingPage.toString();
    }
}); 