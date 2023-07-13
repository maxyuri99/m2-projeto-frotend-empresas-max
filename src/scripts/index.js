import { render } from "./render.js";
import { getAllCategories, getAllCompanies, getCategoryByName } from "./request.js";

const handleCategorys = async () => {
    render('indexCategory', await getAllCategories())

    const optionsSelect = document.querySelector('.index__select-sector')

    optionsSelect.addEventListener('change', async () => {
        render('indexCompanys', await getCategoryByName(optionsSelect.value))
    })
}

const handleCompanys = async () => {
    render('indexCompanys', await getAllCompanies())

}

const buttonsHeader = () => {
    const buttonLogin = document.querySelector('.index__button-login')
    const buttonRegister = document.querySelector('.index__button-register')

    buttonLogin.addEventListener('click', () => {
        location.replace('./src/pages/login.html')
    })

    buttonRegister.addEventListener('click', () => {
        location.replace('./src/pages/register.html')
    })
}

buttonsHeader()
handleCompanys()
handleCategorys()

// localStorage.setItem('@empkenzie:admintoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkyNTIxNzUsImV4cCI6MTcyMDc4ODE3NSwic3ViIjoiMzhmYTQ4ZTUtZWMyMi00ODJlLThkMjItNTM0ODRmNDhlNmQ0In0.qz6G5nrYFi8YL9lDbRpshR7JU2IH1mAoi-Qeu7dzc0w')

// localStorage.setItem('@empkenzie:usertoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkyNTUxNjksImV4cCI6MTcyMDc5MTE2OSwic3ViIjoiYzVkZmU1MzMtYzk0MS00MzgxLTk4Y2QtYjViMWNjZTRmZTViIn0.KkpgwZvh_UkBEnYWtz5UJY4qFhkP-jnL775vRkcPwA0')
//
// //  console.log(await(authLogin({"email":"admin@mail.com", "password" :"123456"})))
// //  console.log(await(registerEmployees({"name" :"Max Yuri TEXTE","email":"maxyuritexte@mail.com", "password" :"123456"})))
//
//
//  console.log(await(getAllEmployeesAdmin()))
//  console.log(await(getOutOfWorkEmp()))
// //  console.log(await(updateEmployee('767aae9f-f671-427e-858a-cd546dc2644e',{"name" :"Max Yuri DOIdão","email":"maxyuridoidão@mail.com"})))

// // console.log(await(deleteEmployee('767aae9f-f671-427e-858a-cd546dc2644e')))

// // console.log(await(updateHireEmployee('c5dfe533-c941-4381-98cd-b5b1cce4fe5b',{"department_id" :"f682cfed-a663-4a3c-9279-eceddb1ea76a"})))

// // console.log(await(dismissEmployee('c5dfe533-c941-4381-98cd-b5b1cce4fe5b')))

// //  console.log(await(registerDepartment({"name" :"ChatGPT","description":"Departamento responsável por pegar codigos de graça!", "company_id" :"81eeb485-d2a2-4670-9633-36097f2d9602"})))

// console.log(await(getAllDepartment()))

// console.log(await(getDepartmentByCompany('0ebf37f2-8a4a-4e78-94e2-bc49a954e207')))

// // console.log(await(updateDepartment('ad527eda-7361-42fa-b22e-65fb40c982d9',{
// //     "description": "Departamento responsável por pegar codigos de graça! 2",
// //     "name": "ChatGPT-OpenIA"
// //   })))

// // console.log(await(deleteDepartment('ad527eda-7361-42fa-b22e-65fb40c982d9')))

// console.log(await(getEmployeesProfile()))

// console.log(await(getCompaniesToUser('15b8eaf6-8694-49a6-b293-eb3ee9235ccd')))

// console.log(await(getDepartmentToUser('f682cfed-a663-4a3c-9279-eceddb1ea76a')))
