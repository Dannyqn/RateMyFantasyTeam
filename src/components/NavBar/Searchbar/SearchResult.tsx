import styles from "./SearchResult.module.css";

interface SearchResultProps {
  result: any;
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const handleClick = () => {
    alert(`You have selected: ${result.espnName}`);
  };

  return (
    <div
      className={styles.searchresult}
      onClick={handleClick}
    >
      {result.espnName}
      <img 
        src={result.espnHeadshot} 
        alt={`${result.espnName}`} 
        className={styles.playerImage} 
      />
    </div>
  );
};

export default SearchResult;