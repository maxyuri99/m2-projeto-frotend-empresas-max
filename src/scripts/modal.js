import { createButtonContract, createButtonCreateDP, createButtonDeleteDP, createButtonDeleteEmpl, createButtonEditDP, createButtonEditEmpl, createCompanysSelect, createEmployeesOutOfWork, createModalViewEmployes } from "./render.js"
import { getAllEmployeesAdmin, getOutOfWorkEmp } from "./request.js"

export const openModal = async (firstParameter, renderObject, renderObjectSecond) => {

    if (firstParameter === 'modalDepartmentView') {
        const { id, name, description } = renderObject
        const modalController = document.querySelector('.modal-view-department__controller')
        const buttonDivContract = document.querySelector('.modal__view-button-separe')
        const nameDepartment = document.querySelector('.modal__name-department')
        const descriptionDepartment = document.querySelector('.modal__view-department-description-department')
        const companyDepartment = document.querySelector('.modal__view-department-name-companie')
        const getEmployesOutOfWork = await getOutOfWorkEmp()
        const getAllEmployees = await getAllEmployeesAdmin()

        nameDepartment.innerText = name
        descriptionDepartment.innerText = description
        companyDepartment.innerText = renderObjectSecond


        const filteredArray = getAllEmployees.filter(obj => obj.department_id === id)

        createSelectItens(getEmployesOutOfWork)
        createUserListModal(filteredArray, renderObjectSecond)


        buttonDivContract.innerHTML = ''

        const buttonContract = createButtonContract(renderObject, renderObjectSecond)

        buttonDivContract.append(buttonContract)

        modalController.showModal()
        closeModal('modal-view-department__controller', '.modal-view-department-close__button')

    } else if (firstParameter === 'adminCreateDepartment') {
        const mainModal = document.querySelector('.modal-create-department__controller')
        const mainSelect = document.querySelector('.modal__create-department-select-company')
        const inputName = document.querySelector('.modal__create-department-name')
        const inputDesc = document.querySelector('.modal__create-department-description')

        inputName.value = ''
        inputDesc.value = ''

        const buttonDivCreate = document.querySelector('.modal__button-div-create')

        const createSelectItens = (arrayCompany) => {

            mainSelect.innerHTML = ''
            const optionHidden = document.createElement('option')

            optionHidden.value = ''
            optionHidden.innerText = 'Selecionar Empresa'
            optionHidden.selected = true;
            optionHidden.disabled = true;
            optionHidden.hidden = true;
            mainSelect.appendChild(optionHidden)

            arrayCompany.forEach(companyArray => {
                const options = createCompanysSelect(companyArray)
                mainSelect.appendChild(options)
            })
        }

        createSelectItens(renderObject)

        buttonDivCreate.innerHTML = ''

        const buttonContract = createButtonCreateDP()

        buttonDivCreate.append(buttonContract)

        mainModal.showModal()
        closeModal('modal-create-department__controller', '.modal-create-department-close__button')
    } else if (firstParameter === 'adminEditDepartment') {
        const mainModal = document.querySelector('.modal-edit-department__controller')
        const mainText = document.querySelector('.modal__edit-department-description')
        const buttonDivSave = document.querySelector('.modal__button-div-department-edit')

        mainText.value = ''
        mainText.value = renderObject.description

        buttonDivSave.innerHTML = ''

        const buttonSave = createButtonEditDP(renderObject)

        buttonDivSave.appendChild(buttonSave)

        mainModal.showModal()
        closeModal('modal-edit-department__controller', '.modal-edit-department-close__button')
    } else if (firstParameter === 'adminDeleteDepartment') {
        const mainModal = document.querySelector('.modal-remove-department__controller')
        const nameDepartment = document.querySelector('.modal__remove-department-name')
        const buttonDivDeleve = document.querySelector('.modal__button-div-department-remove')

        nameDepartment.innerText = ''
        nameDepartment.innerText = renderObject.name

        buttonDivDeleve.innerHTML = ''

        const buttonDelete = createButtonDeleteDP(renderObject.id)

        buttonDivDeleve.appendChild(buttonDelete)


        mainModal.showModal()
        closeModal('modal-remove-department__controller', '.modal-remove-department-close__button')
    } else if (firstParameter === 'adminEditEmployee') {
        const mainModal = document.querySelector('.modal-edit-user__controller')
        const inputName = document.querySelector('.modal__edit-user-name')
        const inputEmail = document.querySelector('.modal__edit-user-email')
        const buttonDivSave = document.querySelector('.modal__button-div-user-save')

        inputName.value = ''
        inputName.value = renderObject.name

        inputEmail.value = ''
        inputEmail.value = renderObject.email

        inputName.classList.remove('input__error-red')
        inputEmail.classList.remove('input__error-red')

        buttonDivSave.innerHTML = ''

        const buttonSave = createButtonEditEmpl(renderObject.id)

        buttonDivSave.appendChild(buttonSave)

        mainModal.showModal()
        closeModal('modal-edit-user__controller', '.modal-edit-user-close__button')
    } else if (firstParameter === 'adminDeleteEmployee') {
        const mainModal = document.querySelector('.modal-remove-user__controller')
        const nameEmployee = document.querySelector('.modal__remove-user-name')
        const buttonDivRemove = document.querySelector('.modal__button-div-user-remove')

        nameEmployee.innerText = ''
        nameEmployee.innerText = renderObject.name

        buttonDivRemove.innerHTML = ''

        const buttonRemove = createButtonDeleteEmpl(renderObject.id)

        buttonDivRemove.appendChild(buttonRemove)

        mainModal.showModal()
        closeModal('modal-remove-user__controller', '.modal-remove-user-close__button')
    }
}

export const createUserListModal = (arrayEmployees, renderObjectSecond) => {
    const mainList = document.querySelector('.modal__view-department-list-user-controller')
    mainList.innerHTML = ''

    arrayEmployees.forEach((employeesArray) => {
        const card = createModalViewEmployes(employeesArray, renderObjectSecond)

        mainList.appendChild(card)
    })
}

export const createSelectItens = (arrayEmployees) => {
    const mainSelect = document.querySelector('.modal__view-department-select-user')

    mainSelect.innerHTML = ''
    const optionHidden = document.createElement('option')

    optionHidden.value = ''
    optionHidden.innerText = 'Selecionar Setor'
    optionHidden.selected = true;
    optionHidden.disabled = true;
    optionHidden.hidden = true;
    mainSelect.appendChild(optionHidden)

    arrayEmployees.forEach(employeesArray => {
        const options = createEmployeesOutOfWork(employeesArray)
        mainSelect.appendChild(options)
    })
}

export const closeModal = (typeModal, buttonX) => {

    const modalPostController = document.querySelector(`.${typeModal}`)
    const buttonPostX = document.querySelector(buttonX)
    const body = document.querySelector('body')
    const closeButton = () => {
        modalPostController.close()
    }

    body.addEventListener('click', (event) => {
        if (event.target.classList.contains(typeModal)) {
            const modal = document.querySelector(`.${typeModal}`)
            modal.close()
        }
    })

    buttonPostX.addEventListener('click', closeButton)
}