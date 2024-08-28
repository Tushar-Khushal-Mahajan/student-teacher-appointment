import { getAdminData } from "../../../public/modules/common-services.js";



async function getUserFromId() {

    let uid = sessionStorage.getItem("user-id");

    let User = await getAdminData(uid);

    User = Object.entries(User)[0][1];

    console.log("User = ",User);


    // document.getElementById("adminProf").src = User.profile;
    document.querySelectorAll(".NAME").forEach(e=>{
        e.innerHTML = User.name;
    });
    document.querySelector(".UID").innerText="Uid = "+User.uId;
    document.querySelector(".MOBILE").innerText = User.contactNo;
    document.querySelector(".EMAIL").innerText = User.email;

}

getUserFromId();