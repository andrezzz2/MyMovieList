import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MyLists from './pages/MyLists';
import Titles from './pages/Titles';



const base_API_URL = "http://localhost:5353";


function App() {

    const [User, setUser] = useState({loading: true});
    const [currentUser, setCurrentUser] = useState(null);
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

        if(currentUser){

            savingUserInDB();

        } else {

            setUser({needToLogin: true});

        }
        
    }, [currentUser]);


    //trocar a pagina quando meu state User troca
    useEffect(()=>{

        if(User.loading){
            setActualPage(
                <div className='App'>
                    <p>Loading...</p>
                </div>
            );

        } else if(User.needToLogin){

            setActualPage(
                <div className='App'>
                    <Login/>
                </div>
            );

        } else {

            setActualPage(
                <div className='App'>
                    <HashRouter basename='/'>

                        <Routes>
                            <Route element={ <Home User={User} setUser={setUser}/> }  path="/"/>
                            <Route element={ <MyLists User={User} setUser={setUser}/> }  path="/MyLists"/>
                            <Route element={ <Titles User={User} setUser={setUser}/> }  path="/Titles"/>
                        </Routes>
                    
                    </HashRouter>
                </div>
            );
        }

    }, [User]);
    


    function savingUserInDB(){

        setUser({loading: true});

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

            setUser({});

        });
    
    }

    function getUserInfo() {

        axios.post(base_API_URL+"/user/getInfos", {uid: currentUser.uid}).then(response=>{

            if(response.data)
                setUser(response.data);
            else
                alert("Server can't catch the user infos, try it later");
                
        })

    }

    return <> {actualPage} </>

}



export default App;
