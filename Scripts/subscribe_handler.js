let fullname = document.getElementById("name");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let country = document.getElementById("country");
let agreement = document.getElementById("agreement");

let nameError = document.getElementById("e-name");
let emailError = document.getElementById("e-email");
let phoneError = document.getElementById("e-phone");
let countryError = document.getElementById("e-country");
let agreementError = document.getElementById("e-agreement");

let popup = document.getElementById("confirmation-popup");
let displayName = document.getElementById("display-name");
let scrollController = document.getElementById("scroll-control");

errorInit();
closePopup();

// Since we're not allowed to use REGEXP, I created some functions that kinda acts
// just like how REGEXP works, Not sure if this is allowed?

function emailVal(str) {
    let len = str.length;

    if(len < 9 || len > 64) {
        return false;
    }

    let i = 0;

    if(str[i] == '@') { // Check for bypasses (Must include email identifier)
        return false;
    }

    while(str[i] != '@') { // Finding @company
        i++;
        if(i > len) {
            return false;
        }
    }

    if(str[i+1] == '.') { // Check for bypasses (Must include email company)
        return false;
    }

    while(str[i] != '.') { // Finding .top-level-domain
        i++;
        if(i > len) {
            return false;
        }
    }

    if(i+3 >= len) { // Check for bypasses (Minimum top-level-domain length is 3)
        return false;
    }
    
    return true;
}

function phoneVal(str) {
    let len = str.length;

    if(len < 7 || len > 14) {
        return false;
    }

    if(str[0] == '+') { // For country code start
        for(let i=1;i<len;i++) {
            if(str[i] >= '0' || str[i] <= '9') {
                continue;
            } else if (str[i] === ' ') {
                continue;
            } else {
                return false;
            }
        }
    } else { // For non country code
        for(let i=0;i<len;i++) {
            if(str[i] >= '0' && str[i] <= '9') {
                continue;
            } else if (str[i] === ' ') {
                continue;
            } else {
                return false;
            }
        }
    }

    return true;
}

function validation() {
    errorInit();
    let valid = true;

    if(fullname.value == "") {
        // alert("Please enter your fullname!");
        showError(nameError, "*");
        valid = false;
    } else if (fullname.value.length < 4 || fullname.value.length > 64) {
        // alert("Please enter your fullname [4 - 64 characters]");
        showError(nameError, "length 4-64 characters*");
        valid = false;
    }
    
    if(email.value == "") {
        // alert("Please enter your email address!");
        showError(emailError, "*");
        valid = false;
    } else if (!emailVal(email.value)) {
        // alert("Please enter a valid email address!");
        showError(emailError, "enter a valid email*");
        valid = false;
    }
    
    if(phone.value == "") {
        // alert("Please enter your phone number!");
        showError(phoneError, "*");
        valid = false;
    } else if (!phoneVal(phone.value)) {
        // alert("Please enter a valid phone number!");
        showError(phoneError, "enter a valid number*");
        valid = false;
    }

    if(country.value == "") {
        // alert("Please select your country");
        showError(countryError, "*");
        valid = false;
    }
    
    if(agreement.checked == false) {
        // alert("Please agree to our terms and condition");
        showError(agreementError, "*");
        valid = false;
    } 

    return valid;
}

function nameEditor(str) {
    let newName = str.toLowerCase().split(' ');
    let total = newName.length;
    let finalName = "";
    for(let i=0;i<total;i++) {
        finalName += newName[i].charAt(0).toUpperCase() + newName[i].slice(1) + ' ';
    }
    return finalName.slice(0, -1);
}

function showPopup() {
    displayName.innerHTML = nameEditor(fullname.value);
    scrollController.style.overflow = "hidden";
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
    scrollController.style.overflow = "scroll";
}

function errorInit() {
    nameError.style.display = "none";
    emailError.style.display = "none";
    phoneError.style.display = "none";
    countryError.style.display = "none";
    agreementError.style.display = "none";
}

function showError(element, str) {
    element.style.display = "flex";
    element.innerHTML = str;
}

function submit() {
    if(validation()) {
        console.log("[Subscriber data recieved!]"
                + "\n Fullname      : " + nameEditor(fullname.value)
                + "\n Email Address : " + email.value.toLowerCase()
                + "\n Phone Number  : " + phone.value
                + "\n Country       : " + country.value
                + "\n");
        showPopup();
    }
}