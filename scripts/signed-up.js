import {
    app, auth, createUserWithEmailAndPassword, writeUserData
    , signInWithEmailAndPassword,
    getDatabase, ref, set, get, child, update
} from "../public/modules/dbmodule.js";

import { getDept } from "../public/modules/common-services.js";

console.log(app);
//



/***
 * This Method is for Getting all the departments
 */






/**
 * This method is for load the depts. in the html <select> element
 */
function loadDeptName() {
    getDept().then((resp) => {

        let dNameSelect = document.getElementsByName("deptSelect")[0];

        dNameSelect.innerHTML = '<option value="0" selected>Select Teacher Dept.</option>';

        for (const itr of resp) {
            console.log(itr.DeptName);

            dNameSelect.innerHTML += `
                <option value='${itr.DeptName}'>${itr.DeptName}</option>
            `;
        }
    });
}

loadDeptName();


/**
 * Generate base-64 image when img selected
 */

var binary_image;

document.getElementsByName("file")[0].addEventListener("change", (e) => {
    const file = e.target.files[0]; // Access files from event target


    const reader = new FileReader();

    reader.addEventListener("load", () => {
        binary_image = reader.result;
    });

    reader.readAsDataURL(file);

});

// execute when signUp form submitted
document.getElementById("signedUpForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = document.getElementsByName("username")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let contact = document.getElementsByName("contactNo")[0].value;
    let pass = document.getElementsByName("password")[0].value;
    let conpass = document.getElementsByName("c-pass")[0].value;
    let check = document.getElementsByName("checkbox")[0].checked;
    let deptSelect = document.getElementsByName("deptSelect")[0].value;


    // console.log(binary_image);

    // check credentials
    if (userName.trim() != "" || email.trim() != "" || contact.trim() != "" || pass.trim() != "" || conpass.trim() != "" || binary_image.trim() != "" || deptSelect != 0) {
        if (!check) {
            alert("plese check terms and conditio");
        }
        else if (pass != conpass) {
            alert("password & confirm password must be same");
        }
        else {

            //create user in db
            createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {

                    const user = userCredential.user;

                    console.log(user);
                    console.log(user.email, user.uid);
                    alert("Registration Successful");

                    let User = {
                        uId: user.uid,
                        name: userName,
                        profile: binary_image,
                        contactNo: contact,
                        email: user.email,
                        dept: deptSelect,
                        role: "STUDENT"
                    }

                    writeUserData("Student", User);


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("User already exists! \ntry with another email", errorMessage);
                });
        }
    }

});

