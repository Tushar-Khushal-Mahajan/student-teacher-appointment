import { } from "../../../public/modules/dbmodule.js";

import { getDatabase, ref, set, get, child, update, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



async function getStudentById(sId) {

    return new Promise((resolve) => {


        const dbRef = ref(getDatabase());
        get(child(dbRef, `Student/${sId}`)).then(async (snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    });
}


async function insertStudentData() {

    let User = await getStudentById(sessionStorage.getItem("user-id"));

    User = (Object.assign(User).User);

    console.log("Student = ", User);

    document.querySelectorAll(".adminProf").forEach(element => {
        element.src = User.profile.trim() || "";

        sessionStorage.setItem("user_profile", User.profile);
    });
    document.querySelectorAll(".NAME").forEach(e => {
        e.innerHTML = User.name;
    });
    document.querySelector(".UID").innerText = "Uid = " + User.uId;
    document.querySelector(".MOBILE").innerText = User.contactNo;
    document.querySelector(".EMAIL").innerText = User.email;

}

insertStudentData();