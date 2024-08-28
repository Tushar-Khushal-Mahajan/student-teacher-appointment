import {
    app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData,
    getDatabase, ref, set, get, child, update
} from "../../public/modules/dbmodule.js";



var userData;


let tblBody = document.getElementById("tblBody");

async function getStudentData() {

    const dbRef = ref(getDatabase());

    get(child(dbRef, `Student/`)).then((snapshot) => {
        if (snapshot.exists()) {

            userData = Object.entries(snapshot.val());

            tblBody.innerHTML = "";

            console.groupCollapsed("Student Data");
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

getStudentData();



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