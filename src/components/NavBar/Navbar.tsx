import {useState} from "react";
import styles from "./Navbar.module.css";
import SearchBar from "./Searchbar/Searchbar";
import { SearchResultsList } from "./Searchbar/SearchResultsList";
import logo from '../../assets/RateMyFantasyTeam.png';
export const Navbar = () => {
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <nav className={styles.navbar} id="navbar">
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.searchbarcontainer}>
          <SearchBar setResults={setResults} setIsFocused={setIsFocused} />
          {results && results.length > 0 &&<SearchResultsList results={results} isFocused={isFocused} />}
        </div>
        <button className={styles.loginbutton} onClick={(e) => alert(`You've logged in`)}>Log in</button>
        <button className={styles.signupbutton} onClick={(e) => alert(`You've signed up`)}>Sign Up</button>
      </nav>
    );
};

export default Navbar;