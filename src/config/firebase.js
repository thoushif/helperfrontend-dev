import firebase from "firebase/app";
// import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "@firebase/firestore";
import axios from "axios";

export const configurations = () => {
  console.log("NODE_ENV", process.env.NODE_ENV);
  const firebaseConfig = {
    apiKey: "AIzaSyDmN1_v47TLXhjyNPHLJbAQYh5yuceicY0",
    authDomain: "helphelper-2021.firebaseapp.com",
    projectId: "helphelper-2021",
    storageBucket: "helphelper-2021.appspot.com",
    messagingSenderId: "536892303959",
    appId: "1:536892303959:web:7b599f0a2c7ca7d4b35112",
    measurementId: "G-BF59R4Y1G5"
  };

  if (process.env.NODE_ENV === "development") {
    return firebaseConfig;
  } else if (process.env.NODE_ENV === "production") {
    return firebaseConfig;
  }
};

const firebaseConfig = configurations();

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
const db = firebase.firestore();
const baseUrl = process.env.SERVER_API_URL;
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account"
});
export const signInWithGoogle = () =>
  auth
    .signInWithPopup(provider)
    .then((result) => {
      checkIfUserExists(result);
    })
    .catch(function (error) {
      console.log("error, error", error);
    });

export { db };

const checkIfUserExists = async (result) => {
  const apiUrl = `${baseUrl}/helpers/${result.user.uid}`;
  await axios
    .get(apiUrl)
    .then((response) => response.data)
    .then((data) => {
      console.log("data of user--------------->", data.data.helper);
      if (!data.data.helper) {
        console.log("user not present  with us....loading new data");
        let dataToPost = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          phoneNumber: result.user.phoneNumber
        };
        const apiUrlMain = `${baseUrl}/helpers/`;
        fetch(apiUrlMain, {
          method: "POST",
          body: JSON.stringify(dataToPost),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.json())
          .then((response) => console.log("Success:", JSON.stringify(response)))
          .catch((error) => console.error("Error:", error));
      } else {
        console.log("user  present  with us....just updating");
        const apiUrlMain = `${baseUrl}/helpers/${result.user.uid}`;
        let dataToPost = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          phoneNumber: result.user.phoneNumber
        };
        fetch(apiUrlMain, {
          method: "PATCH",
          body: JSON.stringify(dataToPost),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.json())
          .then((response) => console.log("Success:", JSON.stringify(response)))
          .catch((error) => console.error("Error:", error));
      }
    })
    .catch((err) => console.log(err));
};
