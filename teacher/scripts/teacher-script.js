import { getTeacherById } from "./services/teacher-service.js";
import { getDatabase, ref, remove, set, get, child, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";


// get apt data from apt.form and insert into the database...
document.getElementById("createApt-form").addEventListener("submit", (e) => {

    e.preventDefault();

    let title = e.target[0].value;
    let date = e.target[1].value;
    let from = e.target[2].value;
    let to = e.target[3].value;

    console.groupCollapsed("Apt details = ");

    console.table({
        title, date, from, to
    });
    console.groupEnd();


    const dbRef = ref(getDatabase());

    let aId = new Date().getTime();

    const db = getDatabase();
    set(ref(db, 'Appointments/' + aId), {
        aId,
        title,
        date,
        from,
        to,
        tId: sessionStorage.getItem("user-id"),
        sId: ''
    });
});





/**
 * THATS LOAD THE APPOINTMENTS INTO TABLE..
 */
function loadAptByTeacherId(tId) {

    const dbRef = ref(getDatabase(), 'Appointments'); // Reference to the correct path in the database
    const queryRef = query(dbRef, orderByChild('tId'), equalTo(tId));

    get(queryRef).then((snapshot) => {
        if (snapshot.exists()) {

            let aptArr = Object.entries(snapshot.val());

            let tbody = document.getElementById("TBL_BODY");
            tbody.innerHTML = '';

            aptArr.reverse();

            aptArr.forEach(ele => {


                tbody.innerHTML += `
                        <tr>
                            <td class="title-col">
                               ${ele[1].title}
                            </td>
                            <td> ${ele[1].date} </td>
                            <td> ${ele[1].from} </td>
                            <td> ${ele[1].to} </td>
                            <td><button class="btn btn-danger DELETE" APT-ID=${ele[0]}>Delete</button></td>
                        </tr>
                    `;

                // console.log(ele);

            });

            document.querySelectorAll(".DELETE").forEach(element => {
                element.addEventListener("click", (e) => {
                    // console.log(element.getAttribute("APT-ID"), " is deleted..");
                    deleteAppointment(element.getAttribute("APT-ID"));
                });
            });
        }


    }).catch((error) => {
        console.error('Error fetching data:', error);
        reject(error);
    });
}
loadAptByTeacherId(sessionStorage.getItem("user-id"));



// DELETE APT. BY APT-ID
function deleteAppointment(aId) {
    const db = getDatabase();

    remove(ref(db, 'Appointments/' + aId))
        .then(() => {
            alert("Appointment Deleted..");
            loadAptByTeacherId(sessionStorage.getItem("user-id"));

        })
        .catch((error) => {
            console.error("error occured = ", error);
        });
}
