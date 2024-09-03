const addEmailButton = document.getElementById("submitEmail");
const addImageButton = document.getElementById("assignButton");
const emailInput = document.getElementById("userEmail");
const emailOptionsMenu = document.getElementById("emailOptions");
const userImageSection = document.getElementById("assignedImages"); 
let emailList = [];

class emailEntry {

    constructor(email) {
        this.email = email;
        this.assignedImages = [];
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
        emailList[emailObjectIndex].assignedImages.push(currentImage);
        console.log(emailList[emailObjectIndex].assignedImages);
        displayImages();
    }
});

function displayImages() {
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    emailList[emailObjectIndex].assignedImages.forEach(img => {
        userImageSection.appendChild(img);
    }); 
}


emailOptionsMenu.addEventListener("change", function() {   
    userImageSection.innerHTML = "";
    displayImages();
});