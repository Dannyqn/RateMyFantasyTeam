import React, {useState} from "react";
import styles from "./Navbar.module.css";
import SearchBar from "./Searchbar/Searchbar";
import { SearchResultsList } from "./Searchbar/SearchResultsList";
import logo from '../../assets/RateMyFantasyTeam.png';
export const Navbar = () => {
    const [results, setResults] = useState([]);
    return (
        <nav className={styles.navbar} id="navbar">
            <img className = {styles.logo} src = {logo}>
            </img>
            <SearchBar setResults = {setResults}/>
            {results && results.length > 0 && <SearchResultsList results={results} />}
            <button className={styles.loginbutton}>Log in</button>
            <button className={styles.signupbutton}>Sign Up</button>
        </nav>
    );
};

export default Navbar;