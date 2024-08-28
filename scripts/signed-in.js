import { app, auth, signInWithEmailAndPassword, getDatabase, ref, set, get, child, update } from "../public/modules/dbmodule.js";

console.log(app);



// execute when signIn form submitted
document.getElementById("signedInForm").addEventListener("submit", (e) => {
    e.preventDefault();


    let email = document.getElementsByName("email")[0].value;
    let password = document.getElementsByName("password")[0].value;

    if (email.trim() == "" || password.trim() == "") {
        alert("plz enter valid details");
    }
    else {

        try {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;

                    alert("user signed In");
                    console.log("login user = ", user.uid);

                    sessionStorage.setItem("user-id", user.uid);

                    redirectUserByUserId(user.uid);

                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    alert("User not found");
                });

        }
        catch (err) {
            console.log("err occrs");
            alert("eror");
        }
    }

});


function redirectUserByUserId(userId) {

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Student/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());

            window.location.replace("./student/student-home.html");
        }
    }).catch((error) => {
        console.error(error);
    });

    // --

    get(child(dbRef, `Teacher/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());


            let userRole = snapshot.val().role;

            window.location.replace("./teacher/teacher-dashboard.html");
        }
    }).catch((error) => {
        console.error(error);
    });

    // ---

    get(child(dbRef, `Admin/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());


            let userRole = snapshot.val().role;

            window.location.replace("./admin/admin-dashboard.html");
        }
    }).catch((error) => {
        console.error(error);
    });
}
