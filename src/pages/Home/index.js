import './styles.css';
import NavBar from '../../components/NavBar';


function Home({ User, setUser}) {

    return (

    <div className='Home'>

        <NavBar User={User} setUser={setUser}/>

        <main>

            <div className='Section'>
                <header>
                    <span>(still in development...)</span>
                </header>
                <div className='Content'>
                    
                </div>
            </div>

        </main>
        
    
    </div>
    
    )

}

export default Home;