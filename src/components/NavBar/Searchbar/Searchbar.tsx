import {useState } from "react"
import styles from "./Searchbar.module.css"
export const SearchBar = ({setResults}: any) => {
    const [input, setInput] = useState("");

    const fetchData = (value: any) => {
        fetch("https://jsonplaceholder.org/users")
          .then((response) => response.json())
          .then((json) => {
            const results = json.filter((user: any) => {
              return (
                value &&
                user &&
                user.firstname &&
                user.lastname &&
                user.firstname.toLowerCase().includes(value) || user.lastname.toLowerCase().includes(value)
              );
            });
            setResults(results);
          });
      };

    const handleChange = (value: any) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className={styles.searchbar} id="searchbar">
            <input className= {styles.input} placeholder = "Type to search..." value = {input} onChange={(e) => handleChange(e.target.value)}></input>
        </div>
    );
};

export default SearchBar;