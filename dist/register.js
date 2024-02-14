import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { auth, isArtist, firestore } from "./firebase-config.js";

// if isArtist: profile(publish, no playlist)
// if !isArtist: profile(no publish, playlist)
isArtist();

const Register = async (auth, email, password) => {
  let isChecked;
  let info;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    isChecked = true;
  } catch (error) {
    isChecked = false;
    info = error.code;
  }
  return {
    info, 
    isChecked,
  };
};

const RegisterPage = () => {
    document.getElementById("btn-register").onclick = async () => {
        let email = document.getElementById('email-register').value;
        let password = document.getElementById('password-register').value;
        let username = document.getElementById('username-register').value;
        let isArtist = localStorage.getItem("isArtist");
        // let user = userCredential.user;

        const isSuccess = await Register(auth, email, password);
        // Inheritance of OOP: isChecked is a local variable of Register
        // After assigning Register to isSuccess -> isSuccess can use isChecked
        if (isSuccess.isChecked) {
            // Compile acc info
            const data = {
              dateRegistration: Date.now(),
              // userID: user.uid,
              email,
              username,
              isArtist,
            };
            // Upload acc info to Firestore
            const colRef = collection(firestore, "accounts");
            addDoc(colRef, data)
              .then(() => {
                // Kiểm tra Firestore
                onSnapshot(colRef, (snapshot) => {
                  const output = [];
                  snapshot.docs.forEach((doc) => {
                      output.push({...doc.data()});
                  });
                  console.log(output);
                });

                alert("Register successful");
                localStorage.setItem("email", email);
                window.location.href = "home.html";
              })
              .catch((error) => {
                alert("Error uploading data to Firestore:", error);
              })  
        } else {
            alert("Register fail");
        }
    };
};

RegisterPage();

// Click Register----------------------------
// upload to Firestore "accounts" Collection: mail, name, userID, isArtist
// register

// Click Login-------------------------------
// check isArtist: from Firestore "accounts" Collection (with "mail" == mailLogin), fetch "isArtist" and assign to const isArtist 
// localStorage.setItem("isArtist", isArtist)

// Lib/profile display-----------------------

// check isArtist: from Firestore Collection "accounts" (with "mail" == mailLogin), fetch "isArtist" and assign to const isArtist 
// if another user isArtist = true: display "Published tracks", "btnPublish"
// if another user isArtist = false: display "Saved tracks", "btnSaveTrack"

// check userID: from Firestore Collection "accounts" (with "mail" == mailLogin), fetch "userID" and assign to const currentUserID 
// fetch clicked "userID" and assign to const anotherUserID 
// if anotherUserID !== currentUserID: display "btnFollow"

// fetch tracks from "songs"
// display 10 latest tracks with userid==currentUserID (order(time, dsc))