import './styles.css';
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

const base_API_URL = "http://localhost:5353";

function NavBar({ User, setUser }) {

    function popUpProfile() {

        const profile = document.getElementById("profile");
        profile.style.transform = "scale(1)";
        
    }

    function closeProfile() {

        document.getElementById("newUsername").value = "";
        document.getElementById("newEmail").value = "";
        document.getElementById("newPhoneNumber").value = "";

        const profile = document.getElementById("profile");
        profile.style.transform = "scale(0)";

    }

    function logOut() {

        const auth = getAuth();
        
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });

    }

    function updateProfile() {

        const newUsername = document.getElementById("newUsername").value;
        const newEmail = document.getElementById("newEmail").value;
        const newPhoneNumber = document.getElementById("newPhoneNumber").value;

        const params = {
            uid: User.uid,
            name: newUsername || User.name,
            email: newEmail || User.email,
            phoneNumber: newPhoneNumber || User.phoneNumber
        }

        axios.post(base_API_URL+"/user/update", params).then(response=>{

            alert(response.data);
            updateUserInfo();
            closeProfile();
        });

    }

    function updateUserInfo() {

        axios.post(base_API_URL+"/user/getInfos", {uid: User.uid}).then(response=>{

            if(response.data)
                setUser(response.data);
            else
                console.error("Server can't catch the user infos");

        })

    }

    return(

        <div className="NavBar">

            <div className="UserContainer">
                <img alt="user icon" src={User.photoURL?User.photoURL:''} onClick={popUpProfile}></img>
                <span onClick={logOut}>LogOut</span>
            </div>

            <div className="NavContainer">

                <a className="Option" href="/">Home</a>
                <a className="Option" href="/MyLists">MyLists</a>
                <a className="Option" href="/Titles">Titles</a>

            </div>

            
            <div id="profile">

                <button id="closeProfile" onClick={closeProfile}>X</button>

                <div className='FormContainer'>
                    <span>Edit your name</span>
                    <input id="newUsername" placeholder={User.name?User.name:""}></input>
                </div>
                
                <div className='FormContainer'>
                    <span>Edit your email</span>
                    <input id="newEmail"placeholder={User.email?User.email:""}></input>
                </div>
                
                <div className='FormContainer'>
                    <span>Edit your phone number </span>
                    <input id="newPhoneNumber" placeholder={User.phoneNumber?User.phoneNumber:""}></input>
                </div>
                
                <button id="saveButton" onClick={updateProfile}>Save</button>

            </div>

        </div>

    )

}

export default NavBar;