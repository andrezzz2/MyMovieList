import Home from '../Home'
import MyLists from '../MyLists'
import Titles from '../Titles'
import { Route, Routes, BrowserRouter } from "react-router-dom";


function PagesRouter({User, setUser}) {

    return(

        <BrowserRouter>

            <Routes>
                <Route element={ <MyLists User={User} setUser={setUser}/> }  path="/MyLists"/>
                <Route element={ <Titles User={User} setUser={setUser}/> }  path="/Titles"/>
                <Route element={ <Home User={User} setUser={setUser}/> }  path="/" exact/>
            </Routes>
            
        </BrowserRouter>

    )
    
}

export default PagesRouter;