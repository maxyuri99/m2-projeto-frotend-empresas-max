import { api } from './axios.js';
import { createToastify } from './toastify.js'

export const getAllCategories = async () => {
    const url = '/categories/readAll'

    const allCategories = await api
        .get(url)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return allCategories
}

export const authLogin = async (bodyRequest) => {
    const url = '/auth/login'

    const authUserLogin = await api
        .post(url, bodyRequest)
        .then((res) => {
            const spinner = document.querySelector('.spinner')
            createToastify('Login feito com sucesso', 'var(--sucess100)')
            if (res.data.isAdm){
                
                localStorage.setItem('@empkenzie:admintoken', res.data.authToken)
                spinner.classList.remove('hidden__spinner')
                return location.replace('../pages/admin.html')
            } else {
                localStorage.setItem('@empkenzie:usertoken', res.data.authToken)
                spinner.classList.remove('hidden__spinner')
                return location.replace('../pages/user.html')
            }            
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
            return err.response.data.message
        })

    return authUserLogin
}

export const registerEmployees = async (bodyRequest) => {
    const url = '/employees/create'

    const regEmployees = await api
        .post(url, bodyRequest)
        .then((res) => {
            createToastify('Usuário criado, você será redirecionado para pagina de login', 'var(--sucess100)')

            setTimeout(() => {
                return location.replace('./login.html')
            }, 2000)

        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return regEmployees
}

export const getAllCompanies = async () => {
    const url = '/companies/readAll'

    const allCompanies = await api
        .get(url)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return allCompanies
}

export const getCategoryByName = async (nameCategory) => {
    const url = `/companies/readByCategory/${nameCategory}`

    const CategoryByName = await api
        .get(url)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return CategoryByName
}

export const getAllEmployeesAdmin = async () => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = '/employees/readAll'

    const authUserLogin = await api
        .get(url, { headers })
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return authUserLogin
}

export const getOutOfWorkEmp = async () => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = '/employees/outOfWork'

    const authUserLogin = await api
        .get(url, { headers })
        .then((res) => {
            //  createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return authUserLogin
}

export const updateEmployee = async (idEmployee, bodyRequest) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/employees/updateEmployee/${idEmployee}`

    const employeeUp = await api
        .patch(url, bodyRequest, { headers })
        .then((res) => {
            createToastify('Dados atualizados com sucesso!', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return employeeUp
}

export const deleteEmployee = async (idEmployee) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/employees/deleteEmployee/${idEmployee}`

    const employeeUp = await api
        .delete(url, { headers })
        .then((res) => {
            return createToastify(res.data.message, 'var(--sucess100)')
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return employeeUp
}

// Apenas contratar, não atualiza
export const hireEmployee = async (idEmployee, bodyRequest) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/employees/hireEmployee/${idEmployee}`

    const employeeHire = await api
        .patch(url, bodyRequest, { headers })
        .then((res) => {
            createToastify(res.data.message, 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return employeeHire
}

// Com problema
export const dismissEmployee = async (idEmployee) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/employees/dismissEmployee/${idEmployee}`

    const employeeDismiss = await api
        .patch(url, { headers })
        .then((res) => {
            createToastify(res.data.message, 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            console.log(err)
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return employeeDismiss
}

export const registerDepartment = async (bodyRequest) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/departments/create`

    const regDepartment = await api
        .post(url, bodyRequest, { headers })
        .then((res) => {
            createToastify('Departamento criado com sucesso', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return regDepartment
}

export const getAllDepartment = async () => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = '/departments/readAll'

    const AllDepartment = await api
        .get(url, { headers })
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return AllDepartment
}

export const getDepartmentByCompany = async (idCompany) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `/departments/readByCompany/${idCompany}`

    const DepartmentByCompany = await api
        .get(url, { headers })
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return DepartmentByCompany
}

export const updateDepartment = async (idDepartment, bodyRequest) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/departments/update/${idDepartment}`

    const department = await api
        .patch(url, bodyRequest, { headers })
        .then((res) => {
            createToastify(res.data.message, 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            console.log(err)
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return department
}

export const deleteDepartment = async (idDepartment) => {
    const token = localStorage.getItem('@empkenzie:admintoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/departments/delete/${idDepartment}`

    const deleteDep = await api
        .delete(url, { headers })
        .then((res) => {
            return createToastify(res.data.message, 'var(--sucess100)')
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return deleteDep
}

export const getEmployeesProfile = async () => {
    const token = localStorage.getItem('@empkenzie:usertoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/employees/profile`

    const EmployeesProfile = await api
        .get(url, {headers})
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return EmployeesProfile
}

export const getCompaniesToUser = async (idCompany) => {
    const token = localStorage.getItem('@empkenzie:usertoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/companies/readById/${idCompany}`

    const CompaniesToUser = await api
        .get(url, {headers})
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return CompaniesToUser
}

export const getDepartmentToUser = async (idDepartment) => {
    const token = localStorage.getItem('@empkenzie:usertoken')
    const headers = { 'Authorization': `Bearer ${token}` }
    const url = `/departments/readById/${idDepartment}`

    const DepartmentToUser = await api
        .get(url, {headers})
        .then((res) => {
            // createToastify('Autorizado', 'var(--sucess100)')
            return res.data
        })
        .catch((err) => {
            createToastify(err.response.data.message, 'var(--alert100)')
        })

    return DepartmentToUser
}






