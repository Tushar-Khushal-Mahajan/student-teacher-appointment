import { getTeacherById } from "./services/teacher-service.js";
import { getDatabase, ref, set, get, child, update, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


// insert teacher data into teacher dashboard


// console.log("going to call a function");

async function insertTeacherData() {

    let User = await getTeacherById(sessionStorage.getItem("user-id"));

    User = (Object.assign(User).User);

    console.log("Teacher = ", User);

    // document.getElementById("adminProf").src = User.profile;
    document.querySelectorAll(".NAME").forEach(e => {
        e.innerHTML = User.name;
    });
    document.querySelector(".UID").innerText = "Uid = " + User.uId;
    document.querySelector(".MOBILE").innerText = User.contactNo;
    document.querySelector(".EMAIL").innerText = User.email;

}

insertTeacherData();

// get teacher appointments..
function getAllAptByTID(tId) {

    const dbRef = ref(getDatabase(), 'Appointments'); // Reference to the correct path in the database
    const queryRef = query(dbRef, orderByChild('tId'), equalTo(tId));

    get(queryRef).then((snapshot) => {
        if (snapshot.exists()) {

            let aptArr = Object.entries(snapshot.val()).reverse();

            let tbody = document.getElementById("TBL_BODY");

            tbody.innerHTML = '';

            aptArr.forEach(ele => {


                tbody.innerHTML += `
                        <tr>
                            <td class="title-col">
                               ${ele[0]}
                            </td>
                            <td class="title-col">
                               ${ele[1].title}
                            </td>
                            <td> ${ele[1].date} </td>
                            <td> ${ele[1].from} </td>
                            <td> ${ele[1].to} </td>
                        </tr>
                    `;

                console.log(ele);

            });
        }


    }).catch((error) => {
        console.error('Error fetching data:', error);
        reject(error);
    });
}

getAllAptByTID(sessionStorage.getItem("user-id"));