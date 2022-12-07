const loginToken = localStorage.getItem("login-token");

if(!loginToken){
  window.location.pathname = "/login.html";
}


AOS.init();
const elInputName = document.querySelector(".js-product-name");
const elInputDesc = document.querySelector(".js-product-desc");
const elInputImg = document.querySelector(".js-product-img");
const elInputPrice = document.querySelector(".js-product-price");
const productList = document.querySelector(".js-product-list");
const templateItem = document.querySelector(".item-temp").content;
const frag = new DocumentFragment();

function renderItem(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = templateItem.cloneNode(true);
    temp.querySelector(".product-img").src = `http://localhost:5000/${item.product_img}`;
    temp.querySelector(".product-name").textContent = item.product_name;
    temp.querySelector(".product-desc").textContent = item.product_desc;
    temp.querySelector(".product-price").textContent = item.product_price;
    temp.querySelector(".btn-add").dataset.id = item.id;
    temp.querySelector(".product-item").dataset.id = item.id;
    frag.appendChild(temp)
  });
  node.appendChild(frag)
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

getProduct()