
import {
    app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData,
    getDatabase, ref, set, get, child, update
} from "../../public/modules/dbmodule.js";



let tblBody = document.getElementById("tblBody");

// 


var userData;

async function getTeacherData() {

    const dbRef = ref(getDatabase());

    get(child(dbRef, `Teacher/`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            userData = Object.entries(snapshot.val());

            tblBody.innerHTML = "";

            console.groupCollapsed("Teacher's data");
            for (const iterator of userData) {

                tblBody.innerHTML += `
                ${insertDataIntoTbl(iterator[1].User)}
                `;


                console.table(iterator[1].User);
            }
            console.groupEnd();

        } else {
            console.log("No data available");
        }

    }).catch((error) => {

        console.error(error);

    });
}

getTeacherData();


// return a user data into tbl row formatt
function insertDataIntoTbl(User) {
    return `
    <tr>
    <td>${User.uId}</td>
    <td>${User.name}</td>
    <td>${User.contactNo}</td>
    <td>${User.email}</td>
    <td>${User.dept}</td>
    <td class="tbl-action-btn">
        <a href="Add-Teacher.html?id='${User.uId}'">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                width="24px" fill="green">
                <path
                    d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
            </svg>
        </a>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                width="24px" fill="red">
                <path
                    d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg>
        </button>
    </td>
</tr>
    `;
}