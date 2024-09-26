const addEmailButton = document.getElementById("submitEmail");
const smallAddEmailButton = document.getElementById("smallSubmitEmail");
const addImageButton = document.getElementById("assignButton");
let emailOptionsMenu = document.getElementById("emailOptions");
const userImageSection = document.getElementById("assignedImages");
const imageContainer = document.getElementById("assignedImageContainer");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const currentPage = document.getElementById("currentPage");
const totalPages = document.getElementById("totalPages");
const initalPages = 1

let emailList = [];

class emailEntry {

    constructor(email) {
        this.email = email;
        this.assignedImages = [];
        this.imagesToDisplay = [];
        this.imageIndex = 0;
        this.imageLimit = 9;
        this.currentViewingPage = 1;
        this.currentTotalPages = 1;
    }
}

//email pages numbers
window.onload = () => {
    currentPage.innerText = initalPages.toString();
    totalPages.innerText = initalPages.toString();
    generateRandomImage();
}

//Add email to email selection
function addEmailToMenu(event) {
    let warning;
    let dupWarning;
    let emailInput;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // check if email button has been clicked on small device breakpoint

    if (event.target.id === "submitEmail") {
        emailInput = document.getElementById("userEmail");
        warning = document.querySelector("#emailWarning");
        dupWarning = document.getElementById("dupEmailWarning");
        emailOptionsMenu = document.getElementById("emailOptions");
    } else if (event.target.id === "smallSubmitEmail") {
        emailInput = document.getElementById("smallUserEmail");
        warning = document.querySelector("#smallEmailWarning");
        dupWarning = document.getElementById("smallDupEmailWarning");
        emailOptionsMenu = document.getElementById("smallEmailOptions");
        // console.log(emailInput);
    }
    
    // add email to the menu

    const emailValue = emailInput.value.trim(); 

    for (let i = 0; i < emailList.length; i++) {
        if (emailValue === emailList[i].email) {
            dupWarning.style.display = "block";  
            return console.log ("email is already entered");
        }
    }

    if (emailRegex.test(emailValue)) {
        let userEmail = new emailEntry (emailValue);
        emailList.push(userEmail);
        let topOfPage = document.querySelector("#emailImageSection");
        let option = document.createElement("option");
        option.value = emailValue;
        option.textContent = emailValue;
        emailOptionsMenu.appendChild(option);
        emailOptionsMenu.value = emailValue;
        changeUserImageCollection();
        warning.style.display = "none";
        dupWarning.style.display = "none";
        emailInput.value = "";
        topOfPage.firstElementChild.scrollIntoView({ behavior: 'smooth' });
    }else{
        warning.style.display = "block";
        
        console.log("enter a valid email");
    }
}

addEmailButton.addEventListener("click", addEmailToMenu);
smallAddEmailButton.addEventListener("click", addEmailToMenu);


//Add image to user's collection
addImageButton.addEventListener("click", function() {
    const warning = document.getElementById("imageWarning"); 
    const noEmailWarning = document.getElementById("noEmailWarning");
    
    if (emailOptionsMenu.value === "" || emailOptionsMenu.value === "disabled") {
        noEmailWarning.style.display = "block";
        // console.log("Insert Warning Message Here");
        
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
    for (let i = selectedEmail.imageIndex; i < selectedEmail.imageLimit && i < selectedEmail.assignedImages.length; i++) {
        let img = document.createElement('img');
        img.src = selectedEmail.assignedImages[i];
        userImageSection.appendChild(img);  
    }
        
    };

//Detect if email has changed and display new email's images 
function changeUserImageCollection () {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    userImageSection.innerHTML = "";
    displayImages();
    currentPage.innerText = selectedEmail.currentViewingPage.toString();
    currentTotalPages = emailList[emailObjectIndex].assignedImages.length / 9;
    if (currentTotalPages === 0) {
        totalPages.innerText = initalPages;
    } else {
        totalPages.innerText = Math.ceil(currentTotalPages).toString();
    } 
}

emailOptionsMenu.addEventListener("change", function() {
    if (emailOptionsMenu.selectedIndex === 0) {
        userImageSection.innerHTML = "";
        currentPage.innerText = initalPages;
        totalPages.innerText = initalPages;
    } else {
        changeUserImageCollection();
    }   
});

//Show previous images in the array
prevButton.addEventListener("click", function () {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    if (emailOptionsMenu.selectedIndex === 0 || selectedEmail.imageIndex === 0) {
        console.log("No previous page avaiable");
    } else {
        selectedEmail.imageIndex = selectedEmail.imageIndex - 9;
        selectedEmail.imageLimit = selectedEmail.imageLimit - 9;
        displayImages();
        selectedEmail.currentViewingPage--;
        currentPage.innerText = selectedEmail.currentViewingPage.toString();
    }
});

//Show next images in the array
nextButton.addEventListener("click", function () {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];
    if (emailOptionsMenu.selectedIndex === 0 || selectedEmail.imageLimit >= selectedEmail.assignedImages.length) {
        console.log("NO");
    } else {
        selectedEmail.imageIndex = selectedEmail.imageIndex + 9;
        selectedEmail.imageLimit = selectedEmail.imageLimit + 9;
        displayImages();
        selectedEmail.currentViewingPage++;
        currentPage.innerText = selectedEmail.currentViewingPage.toString();
    }
}); 