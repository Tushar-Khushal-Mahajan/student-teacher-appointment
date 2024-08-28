import { getDatabase, ref, set, get, child, update } from "./dbmodule.js";
import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData } from "./dbmodule.js";


// returns the department data 
let deptData = [];

async function getDept() {
    deptData = [];
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, `Department`));
        if (snapshot.exists()) {
            const promises = [];
            snapshot.forEach((childsnapShot) => {
                promises.push(childsnapShot.val());
            });
            deptData = await Promise.all(promises);
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
    return deptData;
}


// return the user by userID
function getAdminData(uId) {

    const dbRef = ref(getDatabase());

    return new Promise((resolve) => {
        get(child(dbRef, `Admin/${uId}`)).then((snapshot) => {
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

export { getDept, getAdminData }