const loginToken = localStorage.getItem("login-token");

AOS.init();

const elForm = document.querySelector(".js-admin-form");
const elInputName = elForm.querySelector(".js-product-name");
const elInputDesc = elForm.querySelector(".js-product-desc");
const elInputImg = elForm.querySelector(".js-product-img");
const elInputPrice = elForm.querySelector(".js-product-price");
const productList = document.querySelector(".js-product-list");
const templateItem = document.querySelector(".item-temp").content;

const editForm = document.querySelector(".js-change-form");
const inputName = editForm.querySelector(".js-product-name");
const inputDesc = editForm.querySelector(".js-product-desc");
const inputPrice = editForm.querySelector(".js-product-price");
const inputImg = editForm.querySelector(".js-product-img");
const frag = new DocumentFragment();

function renderItem(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = templateItem.cloneNode(true);
    temp.querySelector(".product-img").src = `http://localhost:5000/${item.product_img}`;
    temp.querySelector(".product-name").textContent = item.product_name;
    temp.querySelector(".product-desc").textContent = item.product_desc;
    temp.querySelector(".product-price").textContent = item.product_price;
    temp.querySelector(".btn-edit").dataset.id = item.id;
    temp.querySelector(".btn-del").dataset.id = item.id;
    temp.querySelector(".product-item").dataset.id = item.id;
    frag.appendChild(temp)
  });
  node.appendChild(frag)
}


async function postProduct(url, metod, nameVal, descVal, priceVal, productImg ){
  try {
    const dataForm = new FormData()
    dataForm.append("product_name", nameVal );
    dataForm.append("product_desc", descVal);
    dataForm.append("product_img", productImg);
    dataForm.append("product_price", priceVal);
    const res  = await fetch(url, {
    method: metod,
    headers:{
      Authorization : loginToken
    },
    body: dataForm,
  });
  const data = await res.json();
  console.log(data);
} catch (error) {
  console.log(error);
}
}

async function getProduct(){
  try {
    const res  = await fetch("http://localhost:5000/product", {
      method: "GET",
      headers: {
        Authorization : loginToken
      }
    })
    const data = await res.json();
    console.log(data);
    renderItem(data, productList)

  } catch (error) {
    console.log(error);
  }
}

async function delateProduct(url){
  try {
    const res  = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization : loginToken
      }
    })
    const data = await res.json();
    console.log(data);
    renderItem(data, productList)

  } catch (error) {
    console.log(error);
  }
}

getProduct();

elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const nameValue = elInputName.value.trim();
  const descValue = elInputDesc.value.trim();
  const proImg = elInputImg.files[0];
  const priceValue = elInputPrice.value.trim();
  postProduct("http://localhost:5000/product", "POST", nameValue, descValue, priceValue, proImg);
  getProduct();
  elForm.reset();
});

productList.addEventListener("click", evt => {
  if(evt.target.matches(".btn-del")){
    const deleteBtn = evt.target.dataset.id;
    console.log(deleteBtn);
    delateProduct(`http://localhost:5000/product/${deleteBtn}`);
    getProduct();
  }
  if(evt.target.matches(".btn-edit")){
    const editBtn = evt.target.dataset.id
    console.log(editBtn);
    editForm.addEventListener("submit", evt => {
      evt.preventDefault();
      const nameValue = inputName.value.trim();
      const descValue = inputDesc.value.trim();
      const proImg = inputImg.files[0];
      const priceValue = inputPrice.value.trim();
      postProduct(`http://localhost:5000/product/${editBtn}`, "PUT", nameValue, descValue, priceValue, proImg);
      getProduct()
    })
  }
})