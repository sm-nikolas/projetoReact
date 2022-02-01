import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAjt_2e4TulwGizy7XaaXgaeDQzqtpAgQg",
  authDomain: "formulario-react-e-frameworks.firebaseapp.com",
  databaseURL: "https://formulario-react-e-frameworks-default-rtdb.firebaseio.com",
  projectId: "formulario-react-e-frameworks",
  storageBucket: "formulario-react-e-frameworks.appspot.com",
  messagingSenderId: "652983988452",
  appId: "1:652983988452:web:f648000ebda6ef44f17cf1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app.database().ref();