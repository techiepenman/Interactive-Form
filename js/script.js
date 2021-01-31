const nameField = document.querySelector('#name').focus();
const otherJobField = document.querySelector('#other-job-role');
otherJobField.style.display = 'none';

const jobTitle = document.querySelector('#title');

jobTitle.addEventListener('change', (e) => {
    const selectedJob = e.target.value;
    if (selectedJob === 'other') {
        otherJobField.style.display = '';
    } else {
        otherJobField.style.display = 'none'
    }
    
});
// console.log(jobTitle);