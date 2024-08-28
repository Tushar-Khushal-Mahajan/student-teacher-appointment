import { } from "../../../public/modules/dbmodule.js";
import { getTeacherById } from "../../teacher/scripts/services/teacher-service.js";

import { getDatabase, ref, set, get, child, update, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



// load user_profile into sidebar
document.querySelector(".user_profile").src = sessionStorage.getItem("user_profile");


/**
 * this function get all the appointments..
 */
async function getApts() {

    return new Promise((resolve) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Appointments`)).then(async (snapshot) => {
            if (snapshot.exists()) {

                console.log(snapshot.val());

                resolve(Object.entries(snapshot.val()));
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    });
}
let aptData = await getApts();

console.log(aptData);
loadDataIntoTbl(aptData);

function loadDataIntoTbl(aptData) {
    let tblBody = document.getElementById("TBL_BODY");
    tblBody.innerHTML = '';

    aptData.map(async (record) => {


        let teacher = Object.entries(await getTeacherById(record[1].tId));
        // console.log("teacher  = ", teacher);

        let teacherName = teacher[0][1].name;
        let teacherDept = teacher[0][1].dept;

        tblBody.innerHTML += `
            <tr>
                <td>${teacherName}</td>
                <td>${teacherDept}</td>
                <td>${record[1].title}</td>
                <td>${record[1].date}</td>
                <td>${record[1].from}</td>
                <td>${record[1].to}</td>
                <td  class="tbl-action-btns">
                    <button class="BOOK_APT" aptId="${record[1].aId}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="#0000ff">
                            <path
                                d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z" />
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".BOOK_APT").forEach(element => {
        console.log(element);
        element.addEventListener("click", confirmApt(element.getAttribute("aptId")))
    });
}


function confirmApt(aId) {
    alert("apt booked " + aId);
}