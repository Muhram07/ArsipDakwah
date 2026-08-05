/* ===========================
   LOGIN ADMIN
=========================== */

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const pinInput = document.getElementById("pin");
const loginBtn = document.getElementById("loginBtn");
const statusText = document.getElementById("status");
const logoutBtn = document.getElementById("logout");

/* ===========================
   CEK LOGIN
=========================== */

if(localStorage.getItem("adminLogin")=="true"){

    loginPage.style.display="none";
    dashboard.style.display="block";

}

/* ===========================
   LOGIN
=========================== */

loginBtn.onclick=function(){

    if(pinInput.value===ADMIN_CONFIG.PIN){

        localStorage.setItem("adminLogin","true");

        loginPage.style.display="none";
        dashboard.style.display="block";

    }else{

        statusText.innerHTML="❌ PIN Salah";

        pinInput.value="";

    }

};

/* ===========================
   LOGOUT
=========================== */

logoutBtn.onclick=function(){

    localStorage.removeItem("adminLogin");

    location.reload();

};
