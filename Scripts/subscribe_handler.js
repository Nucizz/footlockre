let fullname = document.getElementById("name");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let country = document.getElementById("country");
let agreement = document.getElementById("agreement");
let popup = document.getElementById("confirmation-popup");
let displayName = document.getElementById("display-name");
let scrollController = document.getElementById("scroll-control");
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
    if(fullname.value == "") {
        alert("Please enter your fullname!");
        return false;
    } else if (fullname.value.length < 4 || fullname.value.length > 64) {
        alert("Please enter your fullname [4 - 64 characters]");
        return false;
    }
    
    if(email.value == "") {
        alert("Please enter your email address!");
        return false;
    } else if (!emailVal(email.value)) {
        alert("Please enter a valid email address!");
        return false;
    }
    
    if(phone.value == "") {
        alert("Please enter your phone number!");
        return false;
    } else if (!phoneVal(phone.value)) {
        alert("Please enter a valid phone number!");
        return false;
    }

    if(country.value == "") {
        alert("Please select your country");
        return false;
    }
    
    if(agreement.checked == false) {
        alert("Please agree to our terms and condition");
        return false;
    } 

    return true;
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