import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCQXo944ET7Di4MG8tGdaPMEJHUq1XOvfc",
    authDomain: "caprica-4265b.firebaseapp.com",
    databaseURL: "https://caprica-4265b.firebaseio.com",
    storageBucket: "caprica-4265b.appspot.com",
    messagingSenderId: "462302290446"
  };

try {
    firebase.initializeApp(config);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const db = firebase.database()
export default db
