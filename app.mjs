

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDcUFmb-Ax4LDJgu21XE3na6vlrfyDNTFs",
    authDomain: "login-with-firebase-data-875e9.firebaseapp.com",
    projectId: "login-with-firebase-data-875e9",
    storageBucket: "login-with-firebase-data-875e9.appspot.com",
    messagingSenderId: "83678925982",
    appId: "1:83678925982:web:4c317523f5fe736efd978f",
    measurementId: "G-MZ9J0Y9FDP"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();



const singUp = () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log("email =>", email, "password =>", password)
    

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            window.location.href = "index3.html";
            // ...
        })
        .catch((error) => {
            alert("error try again",error.message)
            console.log(error.code);
            console.log(error.message);
            // ..
        });
}






//Sing_In function

const singIn = () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log("email =>", email, "password =>", password)

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in
            // alert("Your successfully Sing In")
            window.location.href = "../Database/vote.html";
            // ...
        })
        .catch((error) => {
            alert("error try again")
            console.log(error.code);
            console.log(error.message);
        });
        
}
  