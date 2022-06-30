import NavBar from "../../components/NavBar";
import plus from '../../imgs/plus.png';
import { useEffect, useState } from "react";
import axios from 'axios';
import './styles.css';

const base_API_URL = "http://localhost:5353";

function MyLists({ User, setUser}) {

    //list fixa
    const [titlesList, setTitlesList] = useState({});

    //listas com titulos
    const [lists, setLists] = useState([]);

    const [listToBeAdded, setListToBeAdded] = useState("");
    const [query, setQuery] = useState("");


    useEffect(() => {
        if(User.uid)
            getAllLists();
    }, [User]);

    useEffect(()=>{

        if(query)
            getRequestedTitles();

    }, [query]);


    function getAllLists() {

        const params = {
            uid: User.uid
        }

        axios.post(base_API_URL+"/list/getAll", params).then(response=>{
            setLists(response.data);
        });

    }

    function getRequestedTitles(){

        const method = "GET"
        const url = 'https://movies-app1.p.rapidapi.com/api/movies';
        const params = {
            query: query
        }
        const headers = {
            'X-RapidAPI-Key': '34bd30d120msh4cd613dd1b1ddf4p11c364jsn217a2947db5f',
            'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
        }

        axios.request({
            method: method,
            url: url,
            params: params,
            headers: headers
        }).then(function (response) {
            setTitlesList(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });

    }

    function addATitle(name) {
        setListToBeAdded(name);
        const Unvisible = document.querySelector(".Unvisible");
        Unvisible.style.transform = "scale(1)";
    }

    function addThisTitle(title) {
        
        if(listToBeAdded){

            const params = {
                uid: User.uid,
                name: listToBeAdded,
                title: title
            }

            axios.post(base_API_URL+"/list/addTitle", params).then(response=>{
                const Unvisible = document.querySelector(".Unvisible");
                Unvisible.style.transform = "scale(0)";
                setListToBeAdded("");
                getAllLists();
            });
        }

    }

    function createAList() {
        if(User.uid){
            const value = prompt("Enter the list name");
            addATitle(value);
        } else {
            alert("BD is offline");
        }
    }

    function searchTitles(){

        const SearchBar = document.querySelector(".SearchBar");

        if(SearchBar.value)
            setQuery(SearchBar.value);

        SearchBar.value = "";

    }

    function showTitleDetails(event) {

        const state = event.target.parentElement.parentElement.getAttribute("clicked");
        if(state==="false")
            event.target.parentElement.parentElement.setAttribute("clicked", "true");

    }

    function hideTitleDetails(event) {

        const state = event.target.parentElement.parentElement.parentElement.getAttribute("clicked");
        if(state==="true")
            event.target.parentElement.parentElement.parentElement.setAttribute("clicked", "false");

    }
    

    return(

        <div className='Lists'>
            
            <NavBar User={User} setUser={setUser}/>

            <main className='ListsMain'>

                {lists?.map(list=>{

                    return (
                        <div key={list.name} className="ListsBox">

                            <span className="ListTitle">{list.name}</span>

                            <div className="ListContainer">


                                <article className='AddTitle'>
                                    <div className='AddTitleBox'> 
                                        <span> Add a Title</span>
                                        <img alt='plus icon' src={plus} onClick={()=>addATitle(list.name)}></img>
                                    </div>
                                </article>


                                {list.titles.map(title=>{
                                    return(

                                        <article clicked="false" key={title._id} className='Title' onClick={event=>showTitleDetails(event)}>
                                            <div className="TitleBox">
                                                <div><span onClick={event=>hideTitleDetails(event)}>X</span></div>
                                                <img alt={title.title} src={title.image}></img>
                                                <p>{title.title} ({title.year})</p>
                                                <p>Rating: {title.rating}</p>
                                                <p>Description: {title.description}</p>
                                            </div>
                                        </article>

                                    )
                                })}

                            </div> 

                        </div>
                    )

                })}


                <div className="CreateAListBox"> 

                    <span> Create a List</span>
                    <img alt='plus icon' src={plus} onClick={createAList}></img>

                </div>

            </main>


            <div className="Unvisible">

                <main className='SearchTitlesMain'>

                    <div>
                        <input placeholder="Search Titles" className='SearchBar'></input>
                        <button onClick={searchTitles}>Search</button>
                    </div>


                    <div className="SearchTitlesContainer">

                        {Object.values(titlesList).length?
                            (
                                titlesList.map(title=>{

                                    return (

                                        <article key={title._id} className='Title' clicked="false">
                                            <div className="TitleBox">
                                                <span>{title.title} ({title.year})</span>
                                                <img alt={title.title} src={title.image} onClick={()=>addThisTitle(title)}></img>
                                            </div>
                                        </article>

                                    )

                                })
                            ):(
                                <p>Not found</p>
                            )
                        }

                    </div>

                </main>

            </div>

        </div>


    )
}

export default MyLists;