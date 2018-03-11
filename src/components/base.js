import Rebase from "re-base";
import firebase from "firebase";
import credentials from "../firebaseCredentials";

const firebaseApp = firebase.initializeApp(credentials);

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
