import { authLogin } from "./request.js"
import { createToastify } from "./toastify.js"

const handleLogin = () => {
    const inputs = document.querySelectorAll('.login__input')
    const buttonAcess = document.querySelector('.login__button-acess')
    const buttonRegister = document.querySelectorAll('.button-register')
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
            await authLogin(loginBody)
        }
    })

    buttonRegister.forEach((button) => {
        button.addEventListener('click', () => {
            location.replace('./register.html')
        })
    })

}

const verifyInputsIncorrect = () => {
    const inputEmail = document.getElementById('loginEmail')
    const inputPassword = document.getElementById('loginPassword')

    inputEmail.addEventListener('input', () =>{
        inputEmail.classList.remove('input__error-red')
    })

    inputPassword.addEventListener('input', () =>{
        inputPassword.classList.remove('input__error-red')
    })
}

verifyInputsIncorrect()
handleLogin()
