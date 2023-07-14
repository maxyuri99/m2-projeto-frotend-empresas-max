import { createSelectItens, createUserListModal, openModal } from "./modal.js"
import { handleItensAdmin } from "./pageAdmin.js"
import { deleteDepartment, deleteEmployee, dismissEmployee, getAllCompanies, getAllEmployeesAdmin, getOutOfWorkEmp, hireEmployee, registerDepartment, updateDepartment, updateEmployee } from "./request.js"

export const render = async (firstParameter, renderObject) => {

    if (firstParameter === 'adminDepartment') {
        const mainList = document.querySelector('.admin__list-department-controller')

        mainList.innerHTML = ''

        renderObject.forEach(async (departmentArray) => {
            const getCompanyById = await getAllCompanies()

            getCompanyById.forEach((companyArray) => {
                if (companyArray.id === departmentArray.company_id) {
                    const card = createDepartmentsAdmin(departmentArray, companyArray.name)

                    mainList.appendChild(card)
                }
            })
        })
    } else if (firstParameter === 'adminEmployees') {
        const mainList = document.querySelector('.admin__list-user-controller')

        mainList.innerHTML = ''

        renderObject.forEach(async (userArray) => {
            const getCompanyById = await getAllCompanies()

            getCompanyById.forEach((companyArray) => {
                if (companyArray.id === userArray.company_id) {
                    const card = createEmployesAdmin(userArray, companyArray.name)

                    mainList.appendChild(card)
                }
            })
        })

    } else if (firstParameter === 'adminSelectCompany') {
        const mainSelect = document.querySelector('.admin__select-companys')

        mainSelect.innerHTML = ''
        const optionHidden = document.createElement('option')

        optionHidden.value = ''
        optionHidden.innerText = 'Selecionar Empresa'
        optionHidden.selected = true
        optionHidden.id = ''
        // optionHidden.disabled = true
        // optionHidden.hidden = true
        mainSelect.appendChild(optionHidden)
        renderObject.forEach(categoryArray => {
            const options = createCompanysSelect(categoryArray)

            mainSelect.appendChild(options)
        })

    }
}

export const createDepartmentsAdmin = (arrayBody, companyName) => {
    const li = document.createElement('li')
    li.classList = 'admin__list-department'

    const divList = document.createElement('div')
    divList.classList = 'admin__names-department-list'

    const nameDepartment = document.createElement('h3')
    nameDepartment.innerText = arrayBody.name

    const descDepartment = document.createElement('p')
    descDepartment.innerText = arrayBody.description

    const nameCompany = document.createElement('p')
    nameCompany.innerText = companyName

    const divIcon = document.createElement('div')
    divIcon.classList = 'admin__icon-department-list'

    const iconEye = document.createElement('i')
    iconEye.classList = 'fas fa-eye modal__icon-eye-department'
    iconEye.id = arrayBody.id

    iconEye.addEventListener('click', () => {
        openModal('modalDepartmentView', arrayBody, companyName)
    })

    const iconPencil = document.createElement('i')
    iconPencil.classList = 'fas fa-pencil-alt modal__icon-pencil-department'
    iconPencil.id = arrayBody.id

    iconPencil.addEventListener('click', () => {
        openModal('adminEditDepartment', arrayBody)
    })

    const iconTrash = document.createElement('i')
    iconTrash.classList = 'fas fa-trash-alt modal__icon-trash-department'
    iconTrash.id = arrayBody.id

    iconTrash.addEventListener('click', () => {
        openModal('adminDeleteDepartment', arrayBody)
    })

    li.append(divList, divIcon)
    divList.append(nameDepartment, descDepartment, nameCompany)
    divIcon.append(iconEye, iconPencil, iconTrash)

    return li
}

export const createEmployesAdmin = (arrayBody, companyName) => {
    const li = document.createElement('li')
    li.classList = 'admin__list-user'

    const divList = document.createElement('div')
    divList.classList = 'admin__names-user-list'

    const nameUser = document.createElement('h3')
    nameUser.innerText = arrayBody.name
    nameUser.classList = 'admin__list-name-user'

    const nameCompany = document.createElement('p')
    nameCompany.innerText = companyName
    nameUser.classList = 'admin__list-name-company'

    const divIcon = document.createElement('div')
    divIcon.classList = 'admin__icon-user-list'

    const iconPencil = document.createElement('i')
    iconPencil.classList = 'fas fa-pencil-alt'
    iconPencil.id = arrayBody.id

    iconPencil.addEventListener('click', () => {
        openModal('adminEditEmployee', arrayBody)
    })

    const iconTrash = document.createElement('i')
    iconTrash.classList = 'fas fa-trash-alt '
    iconTrash.id = arrayBody.id

    iconTrash.addEventListener('click', () => {
        openModal('adminDeleteEmployee', arrayBody)
    })


    li.append(divList, divIcon)
    divList.append(nameUser, nameCompany)
    divIcon.append(iconPencil, iconTrash)

    return li
}

export const createModalViewEmployes = ({ id, name, department_id }, companyName) => {
    const li = document.createElement('li')
    li.classList = 'modal__view-department-list-user'

    const divList = document.createElement('div')
    divList.classList = 'modal__view-user-description-div'

    const nameUser = document.createElement('h3')
    nameUser.innerText = name
    nameUser.classList = 'modal__view-department-user-name'

    const nameCompany = document.createElement('p')
    nameCompany.innerText = companyName
    nameCompany.classList = 'modal__view-department-user-company-name'

    const button = document.createElement('button')
    button.classList = 'modal__view-department-button-dismiss'
    button.type = 'button'
    button.id = id
    button.innerText = 'Desligar'

    button.addEventListener('click', async () => {
        await dismissEmployee(id)
        const getEmployesOutOfWork = await getOutOfWorkEmp()
        const getEmployes = await getAllEmployeesAdmin()

        const filteredArray = getEmployes.filter(obj => {
            return obj.department_id === department_id
        })

        createSelectItens(getEmployesOutOfWork)
        createUserListModal(filteredArray, companyName)
    })

    li.append(divList, button)
    divList.append(nameUser, nameCompany)

    return li
}

export const createEmployeesOutOfWork = ({ id, name }) => {
    const option = document.createElement('option')

    option.classList = 'option__user-outofwork'

    option.id = id
    option.value = name
    option.innerText = name

    return option
}

export const createCompanysSelect = ({ id, name }) => {
    const option = document.createElement('option')

    option.classList = 'option__company'

    option.id = id
    option.value = name
    option.innerText = name

    return option
}

export const createButtonContract = ({ id }, companyName) => {
    const button = document.createElement('button')
    const mainSelect = document.querySelector('.modal__view-department-select-user')

    button.classList = 'modal__view-department-button-contract button__green'

    button.innerText = 'Contratar'

    button.addEventListener('click', async () => {
        const departmentId = {}
        departmentId['department_id'] = id

        await hireEmployee(mainSelect.selectedOptions[0].id, departmentId)
        const getEmployesOutOfWork = await getOutOfWorkEmp()
        const getEmployes = await getAllEmployeesAdmin()

        const filteredArray = getEmployes.filter(obj => obj.department_id === id);

        createSelectItens(getEmployesOutOfWork)
        createUserListModal(filteredArray, companyName)
    })

    return button
}

export const createButtonCreateDP = () => {
    const button = document.createElement('button')
    const mainModal = document.querySelector('.modal-create-department__controller')
    const mainSelect = document.querySelector('.modal__create-department-select-company')
    const inputName = document.querySelector('.modal__create-department-name')
    const inputDesc = document.querySelector('.modal__create-department-description')
    let registerBody = {}

    button.classList = 'modal__create-department-button-contract button__green'

    button.type = 'button'
    button.innerText = 'Criar'

    button.addEventListener('click', async () => {
        if (inputName.value.trim() === '') {
            inputName.classList.add('input__error-red')
        } else if (inputDesc.value.trim() === '') {
            inputName.classList.remove('input__error-red')
            inputDesc.classList.add('input__error-red')
        } else if (!mainSelect.selectedOptions[0].id) {
            inputName.classList.remove('input__error-red')
            inputDesc.classList.remove('input__error-red')
            mainSelect.classList.add('input__error-red')
        } else {
            inputName.classList.remove('input__error-red')
            inputDesc.classList.remove('input__error-red')
            mainSelect.classList.remove('input__error-red')
            registerBody[inputName.name] = inputName.value
            registerBody[inputDesc.name] = inputDesc.value
            registerBody['company_id'] = mainSelect.selectedOptions[0].id

            await registerDepartment(registerBody)
            mainModal.close()
            handleItensAdmin()
        }
    })

    return button
}

export const createButtonEditDP = ({ id, name }) => {
    const button = document.createElement('button')
    const mainModal = document.querySelector('.modal-edit-department__controller')
    const textDescription = document.querySelector('.modal__edit-department-description')
    let registerBody = {}

    button.classList = 'modal__edit-department-button-contract button__green'

    button.type = 'button'
    button.innerText = 'Salvar'

    button.addEventListener('click', async () => {
        if (textDescription.value.trim() === '') {
            textDescription.classList.add('input__error-red')
        } else {
            textDescription.classList.remove('input__error-red')

            registerBody[textDescription.name] = textDescription.value
            registerBody['name'] = name

            await updateDepartment(id, registerBody)

            mainModal.close()
            handleItensAdmin()
        }
    })

    return button
}

export const createButtonDeleteDP = (idDepartment) => {
    const button = document.createElement('button')
    const mainModal = document.querySelector('.modal-remove-department__controller')

    button.classList = 'modal__remove-department-button button__red'

    button.type = 'button'
    button.innerText = 'Remover'

    button.addEventListener('click', async () => {
        await deleteDepartment(idDepartment)
        mainModal.close()
        handleItensAdmin()
    })

    return button
}

export const createButtonEditEmpl = (idEmployee) => {
    const button = document.createElement('button')
    const mainModal = document.querySelector('.modal-edit-user__controller')
    const inputName = document.querySelector('.modal__edit-user-name')
    const inputEmail = document.querySelector('.modal__edit-user-email')
    let registerBody = {}

    button.classList = 'modal__edit-user-button-save button__green'

    button.type = 'button'
    button.innerText = 'Criar'

    button.addEventListener('click', async () => {

        if (inputName.value.trim() === '') {
            inputName.classList.add('input__error-red')
        } else if (inputEmail.value.trim() === '') {
            inputName.classList.remove('input__error-red')
            inputEmail.classList.add('input__error-red')
        } else {
            inputName.classList.remove('input__error-red')
            inputEmail.classList.remove('input__error-red')
            registerBody[inputName.name] = inputName.value
            registerBody[inputEmail.name] = inputEmail.value

            await updateEmployee(idEmployee, registerBody)
            mainModal.close()
            handleItensAdmin()
        }
    })

    return button
}

export const createButtonDeleteEmpl = (idEmployee) => {
    const button = document.createElement('button')
    const mainModal = document.querySelector('.modal-remove-user__controller')

    button.classList = 'modal__remove-user-button button__red'

    button.type = 'button'
    button.innerText = 'Remover'

    button.addEventListener('click', async () => {
        await deleteEmployee(idEmployee)
        mainModal.close()
        handleItensAdmin()
    })

    return button
}




