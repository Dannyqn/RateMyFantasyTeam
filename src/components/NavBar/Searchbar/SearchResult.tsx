import styles from "./SearchResult.module.css";

export const SearchResult = (result: any) => {
  return (
    <div
      className= {styles.searchresult}
      onClick={(e) => alert(`You selected ${result.result.firstname} ${result.result.lastname}!`)}
    >
      {result.result.firstname} {result.result.lastname}
    </div>
  );
};

export default SearchResult;