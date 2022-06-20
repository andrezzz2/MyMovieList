import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import './styles.css';
import axios from 'axios';

const limitPerPage = 24;

function Titles({ User, setUser}) {

    const [titlesList, setTitlesList] = useState([]);

    const [query, setQuery] = useState("");
    const [classifyBy, setClassifyBy] = useState("");
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");

    const [page, setPage] = useState("1");

    useEffect(()=>{
        getAllTitlesByParams();
    }, []);

    useEffect(()=>{
        getAllTitlesByParams();
    }, [query, classifyBy, type, genre, page]);

    function getAllTitlesByParams() {

        const method = "GET"
        const url = 'https://movies-app1.p.rapidapi.com/api/movies';
        const params = {
            page: page,
            limit: limitPerPage,
            sort: classifyBy,
            type: type,
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

    
    function searchTitles(){
        const SearchBar = document.querySelector(".SearchBar");
        setQuery(SearchBar.value);
    }

    function selectClassifier() {
        const Classifier = document.getElementById("classifier");
        setClassifyBy(Classifier.value);
    }
    
    function selectType() {
        const Type = document.getElementById("type");
        setType(Type.value);
    }

    function selectGenre() {
        const Genre = document.getElementById("genre");
        setGenre(Genre.value);
    }

    function changePage(number) {
        setPage(String(number));
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


        <div className='Titles'>
            
            <NavBar User={User} setUser={setUser}/>

            <main className='TitlesMain'>

                <header className='TitlesHeader'>
                    <input placeholder="Search Titles" className='SearchBar' onChange={searchTitles}></input>
                    <select id="classifier" onChange={selectClassifier}>
                        <option value="">none</option>
                        <option value="year">year</option>
                        <option value="title">name</option>
                        <option value="rating">rating</option>
                    </select>
                    <select id="type" onChange={selectType}>
                        <option value="">none</option>
                        <option value="movie">movie</option>
                        <option value="serie">serie</option>
                    </select>
                    <select id="genre" onChange={selectGenre}>
                        <option value="">none</option>
                        <option value="accion">accion</option>
                        <option value="crimen">crimen</option>
                        <option value="animacion">animacion</option>
                        <option value="aventura">aventura</option>
                        <option value="ciencia-ficcion">ciencia-ficcion</option>
                        <option value="comedia">comedia</option>
                        <option value="documental">documental</option>
                        <option value="drama">drama</option>
                        <option value="fantasia">fantasia</option>
                        <option value="foreign">foreign</option>
                        <option value="guerra">guerra</option>
                        <option value="historia">historia</option>
                        <option value="pelicula-de-la-television">pelicula-de-la-television</option>
                        <option value="romance">romance</option>
                        <option value="suspende">suspende</option>
                        <option value="terror">terror</option>
                        <option value="western">western</option>
                        <option value="misterio">ascendent</option>
                    </select>
                    
                </header>
                
            
            
                <div className="TitlesContainer">

                    {titlesList?.map(title=>{

                        return (

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

                <footer>
                    <span className='Page' onClick={()=>{changePage(1)}}>1</span>
                    <span className='Page' onClick={()=>{changePage(2)}}>2</span>
                    <span className='Page' onClick={()=>{changePage(3)}}>3</span>
                    <span className='Page' onClick={()=>{changePage(4)}}>4</span>
                    <span className='Page' onClick={()=>{changePage(5)}}>5</span>
                    <span className='Page'>...</span>
                    <span className='Page' onClick={()=>{changePage(305)}}>305</span>
                </footer>

            </main>

        </div>

    )
}

export default Titles;