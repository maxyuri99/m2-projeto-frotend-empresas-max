
import { renderIndex } from "./renderIndex.js";
import { getAllCategories, getAllCompanies, getCategoryByName } from "./request.js";




const handleCategorys = async () => {
    renderIndex('indexCategory', await getAllCategories())

    const optionsSelect = document.querySelector('.index__select-sector')

    optionsSelect.addEventListener('change', async () => {
        renderIndex('indexCompanys', await getCategoryByName(optionsSelect.value))
    })
}

const handleCompanys = async () => {
    renderIndex('indexCompanys', await getAllCompanies())
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
