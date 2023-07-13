import { registerEmployees } from "./request.js"
import { createToastify } from "./toastify.js"

const handleLogin = () => {
    const inputs = document.querySelectorAll('.register__input')
    const buttonAcess = document.querySelector('.register__button-register')
    const buttonLogin = document.querySelectorAll('.button-login')
    const buttonHome = document.querySelector('.register')
    const spinner = document.querySelector('.spinner')
    let loginBody = {}
    let count = 0

    buttonAcess.addEventListener('click', async () => {

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
                input.classList.add('input__error-red');
            }
            loginBody[input.name] = input.value.trim()
        })

        if (count !== 0) {
            count = 0

            return createToastify('Campo faltando', 'var(--alert100)')
        } else {
            spinner.classList.remove('hidden')

            await registerEmployees(loginBody)
        }
    })

    buttonLogin.forEach((button) => {
        button.addEventListener('click', () => {
            location.replace('./login.html')
        })
    })

    buttonHome.addEventListener('click', () => {
        location.replace('../../index.html')
    })

}

const verifyInputsIncorrect = () => {
    const inputEmail = document.getElementById('registerEmail')
    const inputPassword = document.getElementById('registerPassword')
    const inputName = document.getElementById('registerName')

    inputName.addEventListener('input', () =>{
        inputName.classList.remove('input__error-red')
    })

    inputEmail.addEventListener('input', () =>{
        inputEmail.classList.remove('input__error-red')
    })

    inputPassword.addEventListener('input', () =>{
        inputPassword.classList.remove('input__error-red')
    })
}

verifyInputsIncorrect()
handleLogin()
