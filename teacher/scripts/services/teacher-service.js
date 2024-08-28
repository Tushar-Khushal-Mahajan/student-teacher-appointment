import {
    app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData,
    getDatabase, ref, set, get, child, update
} from "../../../public/modules/dbmodule.js";


async function getTeacherById(tId) {

    return new Promise((resolve) => {

        const dbRef = ref(getDatabase());

        get(child(dbRef, `Teacher/${tId}`)).then((snapshot) => {
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


export { getTeacherById }