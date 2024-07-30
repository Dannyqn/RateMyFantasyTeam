import styles from "./SearchResultsList.module.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = (results: any) => {
  return (
    <div className = {styles.resultslist}>
      {results.results.map((result: any, id: number) => {
        return <SearchResult result = {result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;