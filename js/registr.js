const elForm = document.querySelector(".js-form");
const elUserName = elForm.querySelector(".js-username-input");
const elUserEmail = elForm.querySelector(".js-email-input");
const elUserPhone = elForm.querySelector(".js-phone-input");
const elUserPassword = elForm.querySelector(".js-password");

async function register (){
  try {
    const res = await fetch("http://localhost:5000/user/register", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      user_name: elUserName.value.trim(),
      phone:  elUserPhone.value.trim(),
      email:  elUserEmail.value.trim(),
      password:elUserPassword.value.trim()
    })
  });

  const data = await res.json();
  console.log(data.token);
  console.log(data);
  if(data.token){
    // localStorage.setItem("token", data.token);
    window.location.pathname = "/index.html";
  }
} catch (error) {
  console.log(error);
}
};

elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  register();
})