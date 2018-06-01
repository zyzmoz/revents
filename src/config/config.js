import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDTx9N2xtLNRObV8V1Fg4c1L33d_prahe4",
  authDomain: "revents-205212.firebaseapp.com",
  databaseURL: "https://revents-205212.firebaseio.com",
  projectId: "revents-205212",
  storageBucket: "revents-205212.appspot.com",
  messagingSenderId: "379757964393"
}

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;