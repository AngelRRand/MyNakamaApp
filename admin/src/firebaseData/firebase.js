import firebase from 'firebase/compat/app' ;
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import firebaseConfig from './configIgnore';
 
class Firebase {
    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }
        this.db = firebase.firestore()
        this.storage = firebase.storage()
    }
}
 
 
const firebaseApp = new Firebase()
 
export default firebaseApp