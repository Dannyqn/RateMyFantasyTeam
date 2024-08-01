import React from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from "./SearchResultsList.module.css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  results: any[];
  isFocused: boolean;
  maxResultsToShow?: number; // Optional prop to control the number of displayed results
}

const ITEM_SIZE = 120; // Adjust item size based on your SearchResult component's height
const DEFAULT_MAX_RESULTS = 10; // Default number of results to show if not specified
const SEARCH_BAR_WIDTH = 500; // Match this with the search bar's max-width

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, isFocused, maxResultsToShow = DEFAULT_MAX_RESULTS }) => {
  // Limit the results based on the maxResultsToShow prop
  const limitedResults = results.slice(0, maxResultsToShow);

  const rowRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const result = limitedResults[index];
    return (
      <div style={style} key={index}>
        <SearchResult result={result} />
      </div>
    );
  };

  return (
    <div
      className={isFocused ? styles.resultsListFocused : styles.resultsListUnfocused}
      onMouseDown={(e) => e.preventDefault()} // Prevent blur on mousedown
    >
      <List
        height={400} // Adjust based on the height of your container
        itemCount={limitedResults.length}
        itemSize={ITEM_SIZE}
        width={SEARCH_BAR_WIDTH} // Match this width with the search bar's max-width
      >
        {rowRenderer}
      </List>
    </div>
  );
};

export default SearchResultsList;
