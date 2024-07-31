import {useState, useEffect } from "react"
import styles from "./Searchbar.module.css"

interface SearchBarProps {
  setResults: (results: any) => void;
  setIsFocused: (isFocused: boolean) => void;
}

const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'd65fb7a544msh905e5bed1330193p1ce14fjsn01b96df48a2a',
    'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
  }
};

export const SearchBar: React.FC<SearchBarProps> = ({ setResults, setIsFocused }) => {
  
    const [input, setInput] = useState("");
    const fetchData = (value: any) => {
      fetch(url, options)
        .then((response) => response.json())
        .then((json)=> {
          const playersData = json.body.filter((player: any) => {
              if(player.pos.toLowerCase() == "wr" || player.pos.toLowerCase() == "rb" || player.pos.toLowerCase() == "qb" || player.pos.toLowerCase() == "te"  
              && player.isFreeAgent.toLowerCase() == "false" && player.espnName.toLowerCase().includes(value)){
                return(
                  value &&
                  player &&
                  player.espnName &&
                  player.espnName.toLowerCase().includes(value)
                );
              }
          })
          setResults(playersData);
        })
    };
    const handleChange = (value: any) => {
      fetchData(value)
      setInput(value)
    }

    return (
    <div className = {styles.searchbarContainer}>
            <div className={styles.searchbar} id="searchbar">
            <input className= {styles.input} placeholder = "Type to search..." value = {input} onChange={(e) => handleChange(e.target.value)} id = "searchBar" onFocus={() => setIsFocused(true)}  onBlur={() => setIsFocused(false)}></input>
        </div>
    </div>
    );
};
export default SearchBar;