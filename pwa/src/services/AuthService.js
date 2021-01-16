

import { login } from '../utils/auth';
import {firebaseAuth} from '../utils/firebaseUtils'

export default class AuthService {

    static Login = (email, password, callback) => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(function(data){
            login(data.user.getIdToken())
            callback(true)
        })
        .catch(function(error) {
            callback(false)
        });

    };

    static Logout = () => {
        firebaseAuth.signOut();
    }

}