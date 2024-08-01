import { useState, useEffect } from "react";
import styles from "./Searchbar.module.css";

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
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the input to reduce the number of API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300); // Debounce delay adjusted to 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  // Fetch data when the debounced input changes
  useEffect(() => {
    if (debouncedInput) {
      fetchData(debouncedInput);
    } else {
      setResults([]);
    }
  }, [debouncedInput]);

  const fetchData = async (query: string) => {
    if (cache[query]) {
      setResults(cache[query]);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${url}?query=${query}`, options);
      const json = await response.json();

      const playersData = json.body.filter((player: any) => 
        ["wr", "rb", "qb", "te"].includes(player.pos.toLowerCase()) &&
        player.isFreeAgent.toLowerCase() === "false" &&
        player.espnName.toLowerCase().includes(query)
      );

      setCache(prevCache => ({ ...prevCache, [query]: playersData }));
      setResults(playersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]); // Handle error by clearing results or showing a message
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className={styles.searchbarContainer}>
      <div className={styles.searchbar} id="searchbar">
        <input
          className={styles.input}
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          id="searchBar"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}
      </div>
    </div>
  );
};

export default SearchBar;