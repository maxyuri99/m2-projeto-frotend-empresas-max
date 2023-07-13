import { getAllCategories } from "./request.js"

export const render = (firstParameter, renderObject) => {

    if (firstParameter === 'indexCategory') {
        const mainSelect = document.querySelector('.index__select-sector')

        mainSelect.innerHTML = ''
        const optionHidden = document.createElement('option')

        optionHidden.value = ''
        optionHidden.innerText = 'Selecionar Setor'
        optionHidden.selected = true;
        optionHidden.disabled = true;
        optionHidden.hidden = true;
        mainSelect.appendChild(optionHidden)
        renderObject.forEach(categoryArray => {
            const options = createAllCategorysIndex(categoryArray)


            mainSelect.appendChild(options)
        })

    } else if (firstParameter === 'indexCompanys') {
        const mainList = document.querySelector('.index__list-companies-controller')

        mainList.innerHTML = ''

        renderObject.forEach(async (companyArray) => {
            const getCategoryById = await getAllCategories()

            getCategoryById.forEach((categoryArray) => {
                if (categoryArray.id === companyArray.category_id) {
                    const card = createCompanysIndex(companyArray, categoryArray)

                    mainList.appendChild(card)
                }
            })

        })
    } else if (firstParameter === 'userEmployees') {
        const mainList = document.querySelector('.user__list-coworkers-controller')

        mainList.innerHTML = ''

        renderObject.employees.forEach((employeesArray) => {
            const card = createEmployeesDepartment(employeesArray)

            mainList.appendChild(card)
        })
    }
}

export const createEmployeesDepartment = (nameEmployeerArray) => {
    const li = document.createElement('li')
    const nameEmployeer = document.createElement('h3')

    li.classList = 'user__list-coworkers'
    nameEmployeer.classList = 'user__list-name-user'

    nameEmployeer.innerText = nameEmployeerArray.name

    li.append(nameEmployeer)

    return li

}

export const createAllCategorysIndex = (category) => {
    const option = document.createElement('option')

    option.classList = 'option__categorys'

    option.value = category.name
    option.innerText = category.name

    return option
}

export const createCompanysIndex = (company, category) => {
    const li = document.createElement('li')
    const nameComp = document.createElement('h3')
    const nameCategory = document.createElement('div')


    li.classList = 'index__list-companies'

    nameComp.innerText = company.name
    nameCategory.innerText = category.name

    li.append(nameComp, nameCategory)

    return li
}