import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react'
import app from './firebase'

export default function Login() {
    useEffect(() => {
        const auth = getAuth(app)
        const uiConfig = {
            signInSuccessUrl: '/account',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            tosUrl: '/tos',
            privacyPolicyUrl: function () {
                window.location.assign('/privacy')
            },
        }
        const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(auth)
        ui.start('#firebaseui-auth-container', uiConfig)
    }, [])

    return (
        <>
            <h2>Login</h2>
            <div id="firebaseui-auth-container"></div>
        </>
    )
}
