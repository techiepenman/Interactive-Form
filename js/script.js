const nameField = document.querySelector('#name').focus();
const otherJobField = document.querySelector('#other-job-role');
const colorSelect = document.querySelector('#color');
const jobTitle = document.querySelector('#title');
const shirtDesign = document.querySelector('#design');

otherJobField.style.display = 'none';
colorSelect.disabled = true;
jobTitle.addEventListener('change', (e) => {
    const selectedJob = e.target.value;
    if (selectedJob === 'other') {
        otherJobField.style.display = '';
    } else {
        otherJobField.style.display = 'none'
    }
    
});

shirtDesign.addEventListener('change', (e) => {
     
        colorSelect.disabled = false;
        for (let i = 1; i < colorSelect.children.length; i++) {
            let colorTheme = colorSelect[i].getAttribute('data-theme');
            let designTheme = e.target.value;
        //    console.log(colorSelect[i].getAttribute('data-theme'));
           console.log(colorTheme);
           console.log(designTheme);
           if (designTheme === colorTheme) {
               colorSelect[i].hidden = false;
           } else {
            colorSelect[i].hidden = true;
           }

        }
        
  
    // console.log(selectDesign);
});

// 