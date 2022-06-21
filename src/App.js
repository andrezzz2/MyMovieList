import './App.css';
import PagesRouter from './pages/PagesRouter';
import Login from './pages/Login';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';




const base_API_URL = "http://localhost:5353";


function App() {

    const [User, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState("loading");
    const [actualPage, setActualPage] = useState(<></>);

    const auth = getAuth();
    
    onAuthStateChanged(auth, user=>{

        if (user) 
            setCurrentUser(user);
        else
            setCurrentUser(null);

    });

    //gerenciador da alteração do usuário atual
    useEffect(()=>{

        if(currentUser==="loading")
            setActualPage(<div>loading...</div>);

        else if(currentUser){
            if(currentUser)
                savingUserInDB();

        } else {

            setUser(null);

        }
        
    }, [currentUser]);


    //trocar a pagina quando meu state User troca
    useEffect(()=>{

        if(User){
            
            setActualPage(
                <div className='App'>
                    <PagesRouter User={User} setUser={setUser}/>
                </div>
            );

        } else {

            setActualPage(
                <div className='App'>
                    <Login/>
                </div>
            );

        }

    }, [User]);
    


    function savingUserInDB(){
        
        const newUser = {
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            phoneNumber: currentUser.phoneNumber
        }
        
        axios.post(base_API_URL+"/user/signUp", newUser).then(response=>{
            if(response.data){
                
                setUser(response.data);
    
            } else {
                //já existe esse usuário
                getUserInfo();
    
            }
    
        }).catch(error=>{
            //BD não está disponível mas vou deixar passar mesmo assim, já que única coisa que vai poder fazer é visualizar os títulos
            console.error(error.message);

            setActualPage(
                <div className='App'>
                    <PagesRouter User={User} setUser={setUser}/>
                </div>
            );

        });
    
    }

    function getUserInfo() {

        axios.post(base_API_URL+"/user/getInfos", {uid: currentUser.uid}).then(response=>{

            if(response.data)
                setUser(response.data);
            else
                console.error("Server can't catch the user infos");
                
        })

    }

    return <> {actualPage} </>

}



export default App;
