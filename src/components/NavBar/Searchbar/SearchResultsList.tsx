import styles from "./SearchResultsList.module.css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  results: any;
  isFocused: boolean;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, isFocused }) => {
  return (
    <div className={isFocused ? styles.resultsListFocused : styles.resultsListUnfocused}>
      {results.map((result: any, id: number) => {
        return <SearchResult result = {result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;