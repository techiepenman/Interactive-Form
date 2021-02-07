const nameField = document.querySelector('#name');
const otherJobField = document.querySelector('#other-job-role');
const colorSelect = document.querySelector('#color');
const jobTitle = document.querySelector('#title');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
const paymentOptions = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const submitBtn = document.querySelector('button');
const activity = activities.querySelectorAll('input');

nameField.focus();
otherJobField.style.display = 'none';
colorSelect.disabled = true;

// Makes other job input field visible upon selection of 'Other' in job role menu
jobTitle.addEventListener('change', (e) => {
    const selectedJob = e.target.value;
    if (selectedJob === 'other') {
        otherJobField.style.display = '';
    } else {
        otherJobField.style.display = 'none'
    }

});

// Activate colors in color drop down based on the selected design from design drop down
shirtDesign.addEventListener('change', (e) => {
    e.preventDefault();
    colorSelect.disabled = false;
    for (let i = 1; i < colorSelect.children.length; i++) {
        let colorTheme = colorSelect[i].getAttribute('data-theme');
        let designTheme = e.target.value;

        if (designTheme === colorTheme) {
            colorSelect[i].hidden = false;
            colorSelect[i].selected = true;
        } else {
            colorSelect[i].hidden = true;
            colorSelect[i].selected = false;
        }

    }

});

// Activity selection and pricing. Add to or deduct from the total cost by 
//select or remove of an activity
let printTotal = document.querySelector('#activities-cost');
let total = 0;
activities.addEventListener('change', (e) => {

    if (e.target.checked) {
        let activityCost = e.target.getAttribute('data-cost');
        let costNumeric = parseInt(activityCost);
        total += costNumeric;

    } else if (!e.target.checked) {
        let activityCost = e.target.getAttribute('data-cost');
        let costNumeric = parseInt(activityCost);
        total -= costNumeric;
    }

    printTotal.innerHTML = `Total: $${total}`;
});

// Add focus indicator to the activities check boxes so pressing tab key
//will move the focus to make the activity more obvious 
for (let i = 0; i < activity.length; i++) {
    activity[i].addEventListener('focus', e => {
        activity[i].parentElement.classList.add('focus');
    });
    activity[i].addEventListener('blur', e => {
        activity[i].parentElement.classList.remove('focus');
    });
};

// Payment section. Set the credit card as default in payment options
payPal.hidden = true;
bitCoin.hidden = true;
// First child of the paymentOptions is credit card
paymentOptions.children[1].setAttribute('selected', 'selected');

// Update UI to show the correct payment info 
//corresponding to the selected payment option
paymentOptions.addEventListener('change', (e) => {
    let selectedPayment = e.target.value;
    switch (selectedPayment) {
        case 'paypal':
            payPal.hidden = false;
            creditCard.hidden = true;
            bitCoin.hidden = true;
            break;
        case 'bitcoin':
            bitCoin.hidden = false;
            payPal.hidden = true;
            creditCard.hidden = true;
            break;
        case 'credit-card':
            creditCard.hidden = false;
            bitCoin.hidden = true;
            payPal.hidden = true;
            break;
        default:
            console.log('The option is not exist');

    }

});

// Helper functions will be used to check the pattern 
//of the user input in required fields
const nameValidator = (name) => {
    const checkName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    return checkName;
};

const emailValidator = (userEmail) => {
    const checkEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail.value);
    return checkEmail;
};
const creditValidator = (card) => {
    const checkCredit = /^\d{13,16}$/i.test(card.value);
    return checkCredit;
};

const zipValidator = (zipCode) => {
    const checkZip = /^\d{5}$/i.test(zipCode.value);
    return checkZip;
};

const cvvValidator = (cvvNum) => {
    const cvvCheck = /^\d{3}$/i.test(cvvNum.value);
    return cvvCheck;
};

// Helper functions for handling input error messages by
//add or removal of designated classes
function error(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

function noError(element) {
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

// Handle submit   
submitBtn.addEventListener('click', (e) => {

    if (!nameValidator(nameField)) {
        e.preventDefault();
        error(nameField);
    } else {
        noError(nameField);
    }
    if (!emailValidator(email)) {
        e.preventDefault();
        error(email);
    } else {
        noError(email);
    }

    if (total === 0) {
        e.preventDefault();
        error(activities.firstElementChild);
    } else {
        noError(activities.firstElementChild);
    };


    //Only validate credit card credentials if selected payment method 
    //is credit card
    if (paymentOptions.value === 'credit-card') {
        if (!creditValidator(cardNumber)) {
            e.preventDefault();
            error(cardNumber);
        } else {
            noError(cardNumber);
        }
        if (!zipValidator(zip)) {
            e.preventDefault();
            error(zip);
        } else {
            noError(zip);
        }
        if (!cvvValidator(cvv)) {
            e.preventDefault();
            error(cvv);
        } else {
            noError(cvv);
        }


    }
});