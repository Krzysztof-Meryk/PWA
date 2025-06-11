const userName = document.querySelector('input#username');
const email = document.querySelector('input#Email');
const password1 = document.querySelector('input#password');
const password2 = document.querySelector('input#password2');
const terms = document.querySelector('input#accept');
const resetButton = document.querySelector('button.reset');
const submitButton = document.querySelector('button.submit');


const showOrHideErrorMessage = (input, text) => {
    const box = input.parentElement;
    const errorMsg = box.querySelector('p.error_massage');
    errorMsg.textContent = text;


}



const checkInputsLenght = (input, minLenght) => {
    if (input.value.length < minLenght) {  
        showOrHideErrorMessage(input, `Pole ${input.previousElementSibling.textContent.toLowerCase().replace(":", "")} powinno zawierać minimum ${minLenght} znaki`)
    } else {
        showOrHideErrorMessage(input, '');
    }
}


const checkPasswordsValue = () => {

    if (password1.value !== password2.value) {  
        showOrHideErrorMessage(password2, "Hasla są różne");
    } else {
        showOrHideErrorMessage(password2, '');
    }
}

const checkTerms = () => {

    if (!terms.checked) {  
        showOrHideErrorMessage(terms, "Zaakceptuj regulamin");
    } else {
        showOrHideErrorMessage(terms, '');
    }
}


const checkEmail = () => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!(re.test(email.value))) {
         showOrHideErrorMessage (email, "Adres mail jest nieprawidłowy");
    }else{
        showOrHideErrorMessage (email, "")
    } 

}


resetButton.addEventListener('click', () => {
    const allErrormessages = [...document.querySelectorAll('p.error_massage')];
    allErrormessages.forEach(error => {

        error.textContent = "";

    })



})




submitButton.addEventListener('click', (e) => {
 e.preventDefault();
    checkEmail();
    checkTerms();
    checkInputsLenght(userName, 3);
    checkInputsLenght(password1, 4);
    checkPasswordsValue();
})