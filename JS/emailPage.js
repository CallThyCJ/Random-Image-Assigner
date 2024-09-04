const addEmailButton = document.getElementById("submitEmail");
const addImageButton = document.getElementById("assignButton");
const emailInput = document.getElementById("userEmail");
const emailOptionsMenu = document.getElementById("emailOptions");
const userImageSection = document.getElementById("assignedImages");
const imageContainer = document.getElementById("assignedImageContainer");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
let currentViewingPage = 1; 

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
    userImageSection.innerHTML = "";
    
    let currentPageIndex = 1;
    let emailObjectIndex = emailList.findIndex(emailObj => emailObj.email === emailOptionsMenu.value);
    let selectedEmail = emailList[emailObjectIndex];

    selectedEmail[`page${currentPageIndex}`] = [];

    selectedEmail.assignedImages.forEach(img => {
        userImageSection.appendChild(img);

        // Detect if image is out of container
        const containerRect = userImageSection.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        if (imgRect.right > containerRect.right || imgRect.bottom > containerRect.bottom) {
            userImageSection.removeChild(img);
            currentPageIndex++;
            selectedEmail[`page${currentPageIndex}`] = [];

            selectedEmail[`page${currentPageIndex}`].push(img);
        } else {
            selectedEmail[`page${currentPageIndex}`].push(img);
        }
    });
    currentViewingPage = 1;
    displayPage(selectedEmail, currentViewingPage); 
}

function displayPage(emailEntry, pageNumber) {
    userImageSection.innerHTML = "";

    if (!emailEntry[`page${pageNumber}`]) return;

    emailEntry[`page${pageNumber}`].forEach(img => {
        userImageSection.appendChild(img);    
});
}


emailOptionsMenu.addEventListener("change", function() {   
    userImageSection.innerHTML = "";
    displayImages();
});

prevButton.addEventListener("click", function () {
    if (currentViewingPage > 1) {
        currentViewingPage--;
        displayPage(emailList.find(emailObj => emailObj.email === emailOptionsMenu.value), currentViewingPage);
    }
});

nextButton.addEventListener("click", function () {
    let selectedEmailEntry = emailList.find(emailObj => emailObj.email === emailOptionsMenu.value);
    if (selectedEmailEntry[`page${currentViewingPage + 1}`]) {
        currentViewingPage++;
        displayPage(selectedEmailEntry, currentViewingPage);
    }
}); 