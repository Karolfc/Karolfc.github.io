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

const usersRef = collection(db,"post");

export const queryUser = async ({
    place,
    photopost,
    description
  }:{
    place: string;
    photopost: string;
    description: string;
  }) => {
    try {
        const q = query(usersRef, where("place", "==", place),where("photopost","==",photopost),where("description","==",description));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        querySnapshot.forEach((doc:any) => {
            console.log(doc.id,"=>",doc.data());
        });
        
        return !querySnapshot.empty;
    } catch (error) {
        return false;
    }
  }

  export const addUser = async ({
    place,
    photopost,
    description
  }:{
    place: string;
    photopost: string;
    description: string;
  }) => {
    try {
      if (place != "" && photopost != "" && description != "") {
        const docRef = await addDoc(collection(db,"post"),{
              place,
              photopost,
              description
          });
          return true;
      }else {
        alert("You must fill all the inputs")
      }
    } catch (error) {
        return false;
    }
  }


  export const listenUsers = (cb: (users:any) => void) => {
    try {
      onSnapshot(collection(db, "post"), (documentos) => {
        const users = documentos.docs.map((doc:any) => ({id: doc.id, data: doc.data()}));
        cb(users);
      });
    } catch (error) {
      
    }
  }

  export const getUsers = async () => {
    try {
      const users = [];
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        users.push({id: doc.id, data: doc.data()});
      });
      return users;

    } catch (error) {
      
    }
  }

  export const deleteUsers = async (id) => {
    try {
      await deleteDoc(doc(db, "post", id));
    } catch (error) {
      
    }
  }