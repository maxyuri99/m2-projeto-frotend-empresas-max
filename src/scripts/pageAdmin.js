import { openModal } from "./modal.js";
import { render } from "./render.js";
import { getAllCompanies, getAllDepartment, getAllEmployeesAdmin } from "./request.js";

const authenticationAdmin = () => {
    const token = localStorage.getItem('@empkenzie:admintoken')

    if (!token) {
        location.replace('login.html')
    }
}

export const handleItensAdmin = async (firstParameter, secondParameter) => {
    const getDepartments = await getAllDepartment()
    const getEmployees = await getAllEmployeesAdmin()
    const getCompanyes = await getAllCompanies()

    console.log('teste')

    if (firstParameter) {
        const filteredDepartments = getDepartments.filter(departmentArray => {
            if (departmentArray.company_id === firstParameter) {
                return departmentArray
            }
        })

        const filteredEmployees = getEmployees.filter(employeesArray => {
            if (employeesArray.company_id === firstParameter) {
                return employeesArray
            }
        })

        render('adminDepartment', filteredDepartments)
        render('adminEmployees', filteredEmployees)

        if (filteredDepartments.length === 0) {
            const divUneployed = document.querySelector('.div_controller-empyt-dp')
            const divListUneployed = document.querySelector('.admin__div-ul-empyt')
            const nameCompany = document.querySelector('.admin__span-name-company')

            nameCompany.innerText = secondParameter

            divUneployed.classList.remove('hidden')

            divListUneployed.classList.add('hidden')
        } else {
            const divUneployed = document.querySelector('.div_controller-empyt-dp')
            const divListUneployed = document.querySelector('.admin__div-ul-empyt')

            divUneployed.classList.add('hidden')

            divListUneployed.classList.remove('hidden')
        }

    } else {
        const divUneployed = document.querySelector('.div_controller-empyt-dp')
        const divListUneployed = document.querySelector('.admin__div-ul-empyt')

        divUneployed.classList.add('hidden')

        divListUneployed.classList.remove('hidden')

        render('adminSelectCompany', getCompanyes)
        render('adminDepartment', getDepartments)
        render('adminEmployees', getEmployees)
    }
}

const buttonCreateDepartment = async () => {
    const createDepartment = document.querySelector('.admin__button-create-department')
    const getCompanyes = await getAllCompanies()

    createDepartment.addEventListener('click', () => {
        openModal('adminCreateDepartment', getCompanyes)
    })
}

const handleItensFixed = async () => {
    const buttonLogout = document.querySelector('.admin__button-logout ')
    const optionsSelect = document.querySelector('.admin__select-companys')

    buttonLogout.addEventListener('click', () => {
        location.replace('../../index.html')
        localStorage.clear()
    })

    optionsSelect.addEventListener('change', async () => {
        if (optionsSelect.selectedOptions[0].id != '') {
            handleItensAdmin(optionsSelect.selectedOptions[0].id, optionsSelect.value)
        } else {
            handleItensAdmin()
        }
    })
}

authenticationAdmin()
buttonCreateDepartment()
handleItensFixed()
handleItensAdmin()


