/* Validation and Feedback Constants*/
const comments = document.querySelector("#comments");
const warningMsg = document.querySelector("#info-area");
const WARNING_COUNT = 25;
const errorArea = document.querySelector("#error-area");

/* Error History */
const form = document.querySelector("#contact-form");
const nameEle = document.querySelector("#name");
const emailEle = document.querySelector("#email");
const fields = [nameEle, emailEle, comments];
//Lables and Errors
const form_errors = [];

//key value pairs of labels
const labels = {name: "Name", email: "Email", comments: "Comments" };


/* Character Count Validation:
    Display the number eof characters remaining in the comment field
    Use Max Length as Limit
    Update the count as users type, paste, or delete text.
    
    Choose a warning theshold and change the message and style when the remaining
    count reaches said trheshold
    
    At limit display  a clear message. Reaching the limit is not an error. 
    Oreserve Max Length attribute to prevent further entry.*/

function checkValidLength() {
    const remaining = comments.maxLength - comments.value.length; /* Remaining Characters */
    warningMsg.classList.toggle("warning", remaining <= WARNING_COUNT);  /* Warning is toggled when the remaining charactesr are <= 25 */
    //claslist.toggle("warning", condition)
    if(remaining === 0) {
        warningMsg.textContent = "Character Limit Reached.";
    } 
    else if(remaining <= WARNING_COUNT){
        warningMsg.textContent = `⚠ ${remaining} characters left.`;
    }
    else {
        warningMsg.textContent = `${remaining}/${comments.maxLength} characters remaining.`;
    }
}

/* When not typing */
warningMsg.hidden = false; //reveals warning message
errorArea.hidden = false;
comments.addEventListener("input", checkValidLength); //everytime input is changed this function is run
checkValidLength(); //runs on page load

//Every entry must identify the field and desrcirbe the errors
function errorMessage(field) {
    const fv = field.validity;
    const label = labels[field.id]; //looks up the name of the field using the ifeld id

    if(fv.valueMissing){ //user doesnt fill out
        return `${label} is a required field. Please fill it in.`;
    }
    if(fv.typeMismatch){ //user does not use proper email syntax
        return `${label} must look like email@example.com.`;
    }
    if(fv.tooShort){ //user does not use enough charactesr
        return `${label} should be ${field.minLength} characters or longer.`;
    }
    return ""; //all good! yay
}

//clear cutstom messages using setCustomValdity("")

function clearCheck(field){
    field.setCustomValidity("");
    field.setCustomValidity(errorMessage(field));
}

//show text errors
function showErrors() {
    errorArea.replaceChildren();
    for (const field of fields) {
        const hasError = field.validity.customError;
        if (hasError) {
            const p = document.createElement("p");
            p.textContent = `${field.validationMessage}`;
            errorArea.append(p);
        }
        field.setAttribute("aria-describedby", hasError ? 
            `${field.id}-hint error-area` : `${field.id}-hint`
        );
    }
}

//usuer edits a field and leaves it, we check it with this
form.addEventListener("change", function (event) {
    clearCheck(event.target);
    showErrors();
});

//Update or remove error
form.addEventListener("input", function (event) {
    if (event.target.validity.customError) {
        clearCheck(event.target);
        showErrors();
    }
});

//Submit buutton is clicked reveal errors after clicked
form.querySelector('button[type="submit"]').addEventListener("click", function() {
    for (const field of fields) {
        clearCheck(field);
    }
    showErrors();
});

//When a user submits an invalid form and higlights every bad or incorrect field, keeps unresolved errors avaiable until corrects
form.addEventListener("invalid", function(event) {
    form_errors.push({ field: event.target.id, error: event.target.validationMessage});

}, true);

//only shows when given a valid form
form.addEventListener("submit", function () {
    const hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "form-errors";
    hidden.value = JSON.stringify(form_errors);
    form.append(hidden);
});
