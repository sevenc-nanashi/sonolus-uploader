import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// SDKを使用するためのConfig情報
const firebaseConfig = {
  apiKey: 'AIzaSyBDQgPbsQDxKK2NNs0DU2MIUFsj4HTdijo',
  authDomain: 'sonolus-uploader.firebaseapp.com',
  projectId: 'sonolus-uploader',
  storageBucket: 'sonolus-uploader.appspot.com',
  messagingSenderId: '492081702898',
  appId: '1:492081702898:web:7c8200d69a8e019280ad6b',
  measurementId: 'G-95NZR8K3P8'
}
// Appの初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const google = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()
