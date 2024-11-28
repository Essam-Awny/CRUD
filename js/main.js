var productNameInput = document.getElementById('productNameInput')
var productPriceInput = document.getElementById('productPriceInput')
var productCategoryInput = document.getElementById('productCategoryInput')
var productDescriptionInput = document.getElementById('productDescriptionInput')
var deleteBtn = document.getElementById('deleteBtn')
var updateBtn = document.getElementById('updateBtn')
var addBtn = document.getElementById('addBtn')
var searchInput = document.getElementById('search')
var updateIndex = 0
// -------------------------------------------------CRUD STEPS-------------------------------------
// 1) Create
// function add إضافة منتج

// 2) Read عرض المنتج
// Function Display + loop 

//3) Update تعديل علي منتج
// مرحلة رفع الداتا ثم مرحلة التعديل واخفاء واظهار الزر
//ولكن متعدل عليها add هي ال 
// using splice

// 4) Delete حذف منتج
// using Splice

// 5) Search بحث عن اسم منتج
// متعدل عليه display هي ال 

//6) Local Storage after add product and any changes

// -------------------------------------------------------Create _ Add product-------------------------------
var productList = []

if(localStorage.getItem('productList') != null){
var productList= JSON.parse(localStorage.getItem('productList'))
display()
}

function addProduct(){
    if(validateName() && validatePrice()){
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            description:productDescriptionInput.value
        }
        productList.push(product)
        localStorage.setItem('productList' , JSON.stringify(productList))
        clearInput()
        display()
    }else{
        alert('Enter valid Name')
    }
    
}

// --------------------------------------------------Clear input automatic-----------------------------

function clearInput(){
    productNameInput.value = ''
    productPriceInput.value = ''
    productCategoryInput.value = ''
    productDescriptionInput.value = ''
}
// -------------------------------------------------Read - display product ---------------------------------------------
function display(){
    var carton = ''
    for(var i =0   ; i<productList.length   ; i++   ){
        carton+=`  <tr>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].category}</td>
                    <td>${productList[i].description}</td>
                    <td>
                        <button id='deleteBtn' onclick='deleteProduct(${i})' class="btn btn-danger">Delete</button>
                        <button id='updateBtn' onclick='setItem(${i})' class="btn btn-warning">Update</button>
                    </td>
                </tr>`

    }
    document.getElementById('tBody').innerHTML = carton
}
// -------------------------------------------------Delete product----------------------------------------------------
function deleteProduct(index){
    productList.splice(index ,1)
    localStorage.setItem('productList' , JSON.stringify(productList))
    display()
}
// ------------------------------------------------Update Product----------------------------------------------------

function setItem(i){
    productNameInput.value = productList[i].name
    productPriceInput.value = productList[i].price
    productCategoryInput.value = productList[i].category
    productDescriptionInput.value = productList[i].description

    addBtn.classList.add('d-none')
    updateBtn.classList.replace('d-none' , 'd-block')
}

function Update(){

    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value
    }
    productList.splice(updateIndex , 1 , product)
    localStorage.setItem('productList' , JSON.stringify(productList))
    clearInput()
    display()

    addBtn.classList.remove('d-none')
    updateBtn.classList.replace('d-block' , 'd-none')

}

// -------------------------------------------------Real time Search-----------------------------------------------------
function search(){
    var term = searchInput.value
    console.log(term);
    
    var cartona = ''
    for(var i =0;  i<productList.length; i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona+=`  <tr>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td>
                <button id='deleteBtn' onclick='deleteProduct(${i})' class="btn btn-danger">Delete</button>
                <button id='updateBtn' onclick='setItem(${i})' class="btn btn-warning">Update</button>
            </td>
        </tr>`
        }
        document.getElementById('tBody').innerHTML = cartona
    }
}


// --------------------------------------------------Validation------------------------------------------

function validateName(){
    var nameRegex = /^[A-Z][a-z]{3,7}$/
    return nameRegex.test(productNameInput.value)
}

function validatePrice(){
    var priceRegex = /^[0-9]{3,5}$/
    return priceRegex.test(productPriceInput.value)
}

