import './styles.css';
import googleImg from '../../imgs/google.png';
import passwordIcon from '../../imgs/password.jpg'
import usernameIcon from '../../imgs/username.jpg'
import telephoneIcon from '../../imgs/telephone.png'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';

const providers = {
    "google": new GoogleAuthProvider(),
    "facebook": new FacebookAuthProvider(),
    "phoneNumber": "",
    "email": ""
}

function Login() {

    const [provider, setProvider] = useState("email");

    const auth = getAuth();


    /*
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
    }, auth);
    */

    function emailSignIn() {

    }

    function phoneNumberSignIn() {

    }

    function socialMediaSignIn(socialMediaName) {

        signInWithPopup(auth, providers[socialMediaName]).then((result) =>{

        }).catch(alert);

    }

    return(
        <div className='Login'>
            
            {(provider==="email")?(

                <div className='Form'>

                    <span className="LoginTitle">Login MyMovieList</span>

                    <div className='FormInput'>
                        <label for='username'>
                            <img className='FormIcon' alt='username icon' src={usernameIcon}/>
                        </label>
                        <input name='username' placeholder='Enter your username'></input>
                    </div>

                    <div className='FormInput'>
                        <label for='password'>
                            <img className='FormIcon' alt='password icon' src={passwordIcon}/>
                        </label>
                        <input name='password' placeholder='Password'></input>
                    </div>

                    <div className='ForgotPassword'>
                        <span>Forgot Password?</span>
                    </div>

                    <button className='LoginButton' onClick={emailSignIn}>Login</button>

                    <div className='Providers'>
                        <img src={telephoneIcon} alt='google' onClick={()=>{setProvider("phoneNumber")}}></img>
                        <img src={googleImg} alt='google' onClick={()=>socialMediaSignIn("google")}></img>
                    </div>

                </div>

            ):(
                
                <div className='Form'>

                    <span className="LoginTitle">Login MyMovieList</span>

                    <div className='FormInput'>
                        <label for='number'>
                            <img className='FormIcon' alt='username icon' src={telephoneIcon}/>
                        </label>
                        <input name='username' type='tel' placeholder='Enter your phone number'></input>
                    </div>

                    <button className='LoginButton' onClick={()=>phoneNumberSignIn}>Enviar código</button>

                    <div className='Providers'>
                        <img src={googleImg} alt='google' onClick={()=>socialMediaSignIn("google")}></img>
                    </div>

                </div>

            )}

        </div>
    )

}

export default Login;