function showCategories() {
  const container = document.querySelector('.categories');

  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = data[i].name;
    elem.setAttribute('data-category', i);
    elem.addEventListener('click', showProducts);
    container.appendChild(elem);
  }
}

// handler of click on categories
function showProducts(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const products = data[categoryIndex].products;
  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = products[i].name;
    elem.setAttribute('data-product', i);
    elem.setAttribute('data-category', categoryIndex);
    elem.addEventListener('click', showDetails);
    container.appendChild(elem);
  }

}

function showDetails(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const container = document.querySelector('.details');
  container.innerHTML = '';
  const elemPrice = document.createElement('div');
  const elemDescr = document.createElement('div');
  const buttonFinish = document.createElement('button');
  elemPrice.textContent = data[categoryIndex].products[productIndex].price;
  elemDescr.textContent = data[categoryIndex].products[productIndex].description;
  container.appendChild(elemPrice);
  container.appendChild(elemDescr);
  container.appendChild(buttonFinish);
  buttonFinish.textContent = 'Buy';
  buttonFinish.setAttribute("id", "button")
  buttonFinish.addEventListener('click', showForm);
  buttonFinish.setAttribute('data-category', categoryIndex);
  buttonFinish.setAttribute('data-product', productIndex);

}

// function showConfirm(event) {
//   const container = document.querySelector('.products');
//   const containerDetail = document.querySelector('.details');
//   alert("Congratulations!!!");
//   container.innerHTML = '';
//   containerDetail.innerHTML = '';
// }

function showForm(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  let container = document.querySelector('.container');
  let finishForm = document.getElementById('userForm');
  const button = document.getElementById('btn');
  // container.className = "hidden"; если надо что б продукты исчезли 
  finishForm.className = "view";
  button.addEventListener('click', collectInfo);
  button.setAttribute('data-category', categoryIndex);
  button.setAttribute('data-product', productIndex);
}

function collectInfo(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const getInfo = document.forms[0].elements;
  const userInfo = {
    name: data[categoryIndex].products[productIndex].name,
    price: data[categoryIndex].products[productIndex].price,
    description: data[categoryIndex].products[productIndex].description,
    fullName: getInfo.fullName.value,
    city: getInfo.City.value,
    department: getInfo.department.value,
    payment: getInfo.payment.value,
    count: getInfo.count.value,
    addInfo: getInfo.addInfo.value,
  }

  checkInfo(userInfo);
}

function checkInfo(userInfo) {
  let finishForm = document.getElementById('userForm');
  const container = document.querySelector('.container');
  const result = document.getElementById('result');
  let isError = false;
  const count = document.querySelector('[type = "number"]');
  const fullName = document.querySelector('[name="fullName"]');
  const department = document.querySelector('[name="department"]');
  const errorFullName = document.createElement('span');
  errorFullName.textContent = 'Change your FullName!';
  const errorCount = document.createElement('span');
  errorCount.textContent = 'Change your Quantity products!';
  const errorDepartment = document.createElement('span');
  errorDepartment.textContent = 'Change your department!';
  defaultValue();

  if (!isNumberValid(userInfo.count)) {
    isError = true;
    document.forms[0].elements.count.setAttribute('class', 'invalid');
    count.after(errorCount);
  }
  if (!isString(userInfo.fullName)) {
    isError = true;
    document.forms[0].elements.fullName.setAttribute('class', 'invalid');
    fullName.after(errorFullName);
  }
  if (!isString(userInfo.department)) {
    isError = true;
    document.forms[0].elements.department.setAttribute('class', 'invalid');

    department.after(errorDepartment);

  }
  if (isError) {
    return;
  }
  for (key in userInfo) {
    let showFinishInfo = document.createElement('div');
    showFinishInfo.innerHTML += `<p> ${key} : ${userInfo[key]}</p>`;
    result.appendChild(showFinishInfo);
  }
  finishForm.className = "hidden";
  container.className = "hidden";
}



function isNumberValid(value) {
  if (value > 0) {
    return true;
  }
  return false;
}
function isString(value) {
  if (value === null || isNaN(value)) {
    return true;
  }
  return false;
}

showCategories();



function defaultValue() {
  const count = document.getElementById('count');
  const department = document.getElementById('department');
  const fullName = document.getElementById('fullName');

  if (count.firstElementChild.classList.contains('invalid')) {
    count.firstElementChild.classList.remove('invalid');
    count.lastElementChild.remove();
  }

  if (fullName.firstElementChild.classList.contains('invalid')) {
    fullName.firstElementChild.classList.remove('invalid');
    fullName.lastElementChild.remove();
  }
  if (department.firstElementChild.classList.contains('invalid')) {
    department.firstElementChild.classList.remove('invalid');
    department.lastElementChild.remove();
  }

}
