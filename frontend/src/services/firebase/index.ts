import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import { firebaseConfig } from '../../config/firebase';

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const signInWithFirebaseUsingPopup =
  async (): Promise<firebase.auth.UserCredential> => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebaseApp.auth().signInWithPopup(googleProvider);
  };
