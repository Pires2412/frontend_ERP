let dataSource = 'http://localhost:8080/products/listProducts'
let table = document.querySelector('table')
let tableBody = table.querySelector('tbody')
let searchInput = document.querySelector('.quicksearch__input')
let clearQuicksearch = document.querySelector('.quicksearch__clean')
let cleanButton = document.querySelector('#clearForm')

function setDataOnForm(object) {
    document.getElementsByName('id')[0].value = object.id
    document.getElementsByName('nameProduct')[0].value = object.nameProduct
    document.getElementsByName('description')[0].value = object.description
    document.getElementsByName('quantityInStock')[0].value = object.quantityInStock
    document.getElementsByName('purchasePrice')[0].value = object.purchasePrice
    document.getElementsByName('sellingPrice')[0].value = object.sellingPrice
    document.getElementsByName('supplier')[0].value = object.supplier
    document.getElementsByName('category')[0].value = object.category
    document.getElementsByName('subcategory')[0].value = object.subcategory
}

function clearFormulary() {
    const form = document.querySelector('.form__addOrUpdate')
    form.reset()
}

cleanButton.addEventListener('click', ()=>clearFormulary())


async function editItem(element) {
    let trow = element.parentElement.parentElement.parentElement
    let tdId = trow.querySelectorAll('td')[0]
    let stringId = tdId.textContent

    let url = `http://localhost:8080/products/${stringId}`

    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error("Falha de requisição")

        const data = await response.json()

        setDataOnForm(data)

        console.log(data)


    } catch (xcpt) {
        console.log(xcpt.Error)
    }
}

function createEditButton() {
        let editButton = document.createElement('div');
        editButton.classList.add('edit__container')
        let editIcon = document.createElement('img')
        editIcon.classList.add('edit__icon')
        editIcon.src = '/static/resources/images/edit_icon.svg'
        editButton.appendChild(editIcon)

        return editButton;
    }

    function createDeleteButton() {
        let deleteButton = document.createElement('div')
        deleteButton.classList.add('delete__container')
        let deleteIcon = document.createElement('img')
        deleteIcon.classList.add('delete__icon')
        deleteIcon.src = '/static/resources/images/delete_icon.svg'
        deleteButton.appendChild(deleteIcon)

        return deleteButton;
    }

function addElementsOnTable(listOfObjects, tableBody) {

    tableBody.innerHTML = ""

    listOfObjects.forEach(obj => {

        let tableRow = document.createElement('tr')

        let idField = document.createElement('td')
        idField.textContent = obj.id

        let nameField = document.createElement('td')
        nameField.textContent = obj.nameProduct

        let quantityField = document.createElement('td')
        quantityField.textContent = obj.quantityInStock

        let purchasePriceField = document.createElement('td')
        purchasePriceField.textContent = obj.purchasePrice

        let sellingPriceField = document.createElement('td')
        sellingPriceField.textContent = obj.sellingPrice

        let supplierField = document.createElement('td')
        supplierField.textContent = obj.supplier

        let categoryField = document.createElement('td')
        categoryField.textContent = obj.category

        let actionField = document.createElement('td')
        let actionContainer = document.createElement('div')
        actionContainer.classList.add('action__container')

        let editButton = createEditButton()
        editButton.addEventListener('click', () => {editItem(editButton)})
        actionContainer.appendChild(editButton)
        
        let deleteButton = createDeleteButton()
        actionContainer.appendChild(deleteButton)

        actionField.appendChild(actionContainer)

        tableRow.appendChild(idField)
        tableRow.appendChild(nameField)
        tableRow.appendChild(quantityField)
        tableRow.appendChild(purchasePriceField)
        tableRow.appendChild(sellingPriceField)
        tableRow.appendChild(supplierField)
        tableRow.appendChild(categoryField)
        tableRow.appendChild(actionField)

        tableBody.appendChild(tableRow)
    })
}

async function writinTable(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error("Falha de requisição")

        const produtos = await response.json()

        console.log(produtos)

        addElementsOnTable(produtos, tableBody)

    } catch (erro) {
        console.error("Erro ao carregar", erro)
    }
}

document.addEventListener("DOMContentLoaded", () => writinTable(dataSource))

let debouncerTimer;

searchInput.addEventListener('input', () => {
    clearTimeout(debouncerTimer)

    debouncerTimer = setTimeout(() => {
        const termo = searchInput.value
        const newUrl = `http://localhost:8080/products/searchProductWithContain?search=${termo}`

        writinTable(newUrl)
    }, 300)
})

cleanButton.addEventListener('click', () => {

    searchInput.value = ""
    writinTable(dataSource)
})

function clearQuicksearchEvent() {
    let inputQuicksearch = document.querySelector('.quicksearch__input')
    inputQuicksearch.value = ""
    writinTable(dataSource)
}
clearQuicksearch.addEventListener('click', () => clearQuicksearchEvent())