
import {
    app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData,
    getDatabase, ref, set, get, child, update
} from "../../public/modules/dbmodule.js";


import { getDept } from "../../public/modules/common-services.js";



/**
 * This method is resp for add depts. in db 
 * */
document.getElementById("addDept").addEventListener("click", () => {
    let deptName = document.getElementById("d-name").value;

    // console.log(deptName);

    // only if the field is not empty
    if (deptName.trim() != "") {

        const db = getDatabase();
        set(ref(db, "Department/" + deptName), {
            DeptName: deptName
        });

        document.getElementById("d-name").value="";

        loadDeptName();
    }
});




/**
 * This method is for load the depts. in the html <select> element
 */
function loadDeptName() {
    getDept().then((resp) => {

        let dNameSelect = document.getElementById("selectDept");

        dNameSelect.innerHTML = '<option value="0" selected>Select Teacher Dept.</option>';

        for (const itr of resp) {
            // console.log(itr.DeptName);

            dNameSelect.innerHTML += `
                <option value='${itr.DeptName}'>${itr.DeptName}</option>
            `;
        }
    });
}

loadDeptName();


// handle form submission---


let binary_image;


document.getElementById("addTeacher-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let name = e.target[0].value;
    let email = e.target[1].value;
    let contactNo = e.target[2].value;
    let img = e.target[3].value;
    let dept = e.target[4].value;
    let pass = e.target[5].value;

    // handle logging
    console.groupCollapsed("Teacher Data :");
    console.table({
        name,
        email,
        contactNo,
        img,
        dept,
        role: "TEACHER",
        pass
    });
    console.groupEnd();

    // console.log(binary_image);

    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {

            const user = userCredential.user;

            // console.log(user);
            alert("Registration Successful");

            let User = {
                name,
                email,
                contactNo,
                profile: binary_image,
                dept,
                role: "TEACHER",
                pass,
                uId: user.uid
            }

            writeUserData("Teacher", User).then(() => {
                alert("data submitted");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User already exists! \ntry with another email", errorMessage);
        });



});



// Converting the image into base64 formatt
document.getElementById("teacherProf").addEventListener("change", (e) => {
    const file = e.target.files[0]; // Access files from event target


    const reader = new FileReader();

    reader.addEventListener("load", () => {
        binary_image = reader.result;
    });

    reader.readAsDataURL(file);

});

