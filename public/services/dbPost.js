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
import { getFirestore, collection, doc, query, where, getDocs, addDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
const usersRef = collection(db, "post");
export const queryUser = ({ place, photopost, description }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = query(usersRef, where("place", "==", place), where("photopost", "==", photopost), where("description", "==", description));
        const querySnapshot = yield getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
        return !querySnapshot.empty;
    }
    catch (error) {
        return false;
    }
});
export const addUser = ({ place, photopost, description }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (place != "" && photopost != "" && description != "") {
            const docRef = yield addDoc(collection(db, "post"), {
                place,
                photopost,
                description
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
export const listenUsers = (cb) => {
    try {
        onSnapshot(collection(db, "post"), (documentos) => {
            const users = documentos.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            cb(users);
        });
    }
    catch (error) {
    }
};
export const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = [];
        const q = query(usersRef);
        const querySnapshot = yield getDocs(q);
        querySnapshot.forEach(doc => {
            users.push({ id: doc.id, data: doc.data() });
        });
        return users;
    }
    catch (error) {
    }
});
export const deleteUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteDoc(doc(db, "post", id));
    }
    catch (error) {
    }
});
