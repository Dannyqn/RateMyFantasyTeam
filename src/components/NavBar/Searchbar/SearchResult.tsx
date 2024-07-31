import styles from "./SearchResult.module.css";

interface SearchResultProps {
  result: any;
}

export const SearchResult: React.FC<SearchResultProps> = ({result}) => {
  const handleClick = () => {
    console.log('Click registered');
  };
  return (
    <div
      className= {styles.searchresult}
      // onClick={(e) => alert(`You selected ${result.firstname} ${result.lastname}!`)}
      // onClick={(e) => console.log(`You selected ${result.firstname} ${result.lastname}!`)}
      onClick={handleClick}
    >
      {result.espnName}
    </div>
  );
};

export default SearchResult;