import React, {useState} from "react";

const SearchContext = React.createContext();

function SearchProvider (props) {
  const [searchText, setSearchText] = useState('')

  return (
    <SearchContext.Provider value={{
      searchText, 
      setSearchText
    }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchProvider }