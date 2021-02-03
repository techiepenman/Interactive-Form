const nameField = document.querySelector('#name').focus();
const otherJobField = document.querySelector('#other-job-role');
const colorSelect = document.querySelector('#color');
const jobTitle = document.querySelector('#title');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
const paymentOptions = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');

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

// Activity selection and pricing
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

// Payment section
payPal.hidden = true;
bitCoin.hidden = true;
// Set the credit card payment option as default in payment options
paymentOptions.children[1].setAttribute('selected', 'selected');

// Update UI to show the correct payment info 
//corresponding to the selected payment option
paymentOptions.addEventListener('change', (e) => {
    let selectedPayment = e.target.value;
    switch (selectedPayment) {
        case 'paypal' :
            payPal.hidden = false;    
            creditCard.hidden = true;
            bitCoin.hidden = true;
            break;
        case 'bitcoin' :
            bitCoin.hidden = false;
            payPal.hidden = true;
            creditCard.hidden = true;
            break;
        case 'credit-card' :
            creditCard.hidden = false;
            bitCoin.hidden = true;
            payPal.hidden = true;  
            break;
            default:
                console.log('The option is not exist');
    
        }

    console.log(selectedPayment);
})


