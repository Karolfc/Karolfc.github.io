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

  const usersRef = collection(db,"usuarios");

  export const queryUser = async ({
    email,
    password
  }:{
    email: string;
    password: string;
  }) => {
    try {
        const q = query(usersRef, where("email", "==", email),where("password","==",password));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        querySnapshot.forEach((doc:any) => {
            console.log(doc.id,"=>",doc.data());
        });

        // if(querySnapshot.empty){
        //   return false;
        // } else {
        //   return true;
        // }
        
        return !querySnapshot.empty;
    } catch (error) {
        return false;
    }
  }

  export const addUser = async ({
    email,
    password
  }:{
    email: string;
    password: string;
  }) => {
    try {
      if (email != "" && password != "") {
        const docRef = await addDoc(collection(db,"usuarios"),{
              email,
              password
          });
          return true;
      }else {
        alert("You must fill all the inputs")
      }
    } catch (error) {
        return false;
    }
  }