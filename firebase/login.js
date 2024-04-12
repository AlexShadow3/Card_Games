// FIREBASE AUTHENTICATION

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyBqBTp4nramEsDEPUS6h9oHH7iqCco0GBw",
    authDomain: "card-games-e2694.firebaseapp.com",
    projectId: "card-games-e2694",
    storageBucket: "card-games-e2694.appspot.com",
    messagingSenderId: "99052275800",
    appId: "1:99052275800:web:a551214fdff3d101cce22d",
    measurementId: "G-B96YZX49MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let emailInp = document.getElementById("emailInp");
let passwordInp = document.getElementById("passwordInp");
let mainForm = document.getElementById("mainForm");

let signInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, emailInp.value, passwordInp.value)
    .then((credentials) => {
        get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
            if (snapshot.exists) {
                sessionStorage.setItem("user-info", JSON.stringify({
                    pseudo: snapshot.val().pseudo,
                }))
                sessionStorage.setItem("user-cred", JSON.stringify(credentials.user));
                window.location.href = "../BlackJack/index.html";
            }
        })
    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    });
}

mainForm.addEventListener("submit", signInUser);