import { getDepartmentToUser, getEmployeesProfile } from "./request.js"
import { render } from "./render.js"

const authentication = () => {
    const token = localStorage.getItem('@empkenzie:usertoken')

    if (!token) {
        location.replace('./login.html')
    }
}

const handleUser = async () =>{
    const userNameH1 = document.querySelector('.user__username-top')
    const emailP = document.querySelector('.user__email-top')
    const divList = document.querySelector('.user__div-list-container')
    const buttonLogout = document.querySelector('.button__logout ')
    const profileUser = await getEmployeesProfile()
    

    userNameH1.innerText = profileUser.name
    emailP.innerText = profileUser.email

    if (profileUser.company_id){
        const employeesDepartment = await getDepartmentToUser(profileUser.department_id)
        const nameCompany = document.querySelector('.user__name-company')
        const nameDepartment = document.querySelector('.user__name-department')

        nameCompany.innerText = employeesDepartment.company.name
        nameDepartment.innerText = employeesDepartment.name

        render('userEmployees', employeesDepartment)
        
    } else {
        const divUneployed = document.querySelector('.user__div-controller-unemployed')

        divUneployed.classList.remove('hidden')

        divList.classList.add('hidden')   
    }

    buttonLogout.addEventListener('click', () => {
        location.replace('../../index.html')
        localStorage.clear()
    })
}

authentication()
handleUser()