var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
//Al profesor le salen los mismos errores
const firebaseConfig = {
    apiKey: "AIzaSyAWN_ONdbCGmLLqFQqUjNk54dYTCRbPHg0",
    authDomain: "dca-test-data-1.firebaseapp.com",
    projectId: "dca-test-data-1",
    storageBucket: "dca-test-data-1.appspot.com",
    messagingSenderId: "844489308497",
    appId: "1:844489308497:web:1cf6533d814122f33d3b70",
    measurementId: "G-RXPJB7392C"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, "usuarios");
export const queryUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = yield getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
        // if(querySnapshot.empty){
        //   return false;
        // } else {
        //   return true;
        // }
        return !querySnapshot.empty;
    }
    catch (error) {
        return false;
    }
});
export const addUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email != "" && password != "") {
            const docRef = yield addDoc(collection(db, "usuarios"), {
                email,
                password
            });
            return true;
        }
        else {
            alert("You must fill all the inputs");
        }
    }
    catch (error) {
        return false;
    }
});
