const form = document.querySelector("form");
const password = document.getElementById("password");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    if(password.value === "123"){
        window.location.href = "/proyecto-7/pagina-2/index.html";
    }else{
        password.setCustomValidity("Contraseña incorrecta");
        password.reportValidity();
    }

});

password.addEventListener("input", function(){
    password.setCustomValidity("");
});