import { useState } from "react";

function SearchBar(props){
  const [ searchName, setSearchName ] = useState({
    name: ""
  });

  const inputName = (e) => {
    setSearchName({
      ...searchName,
      [e.target.name] : e.target.value
    })
  }
  
  const handleButton = (event) => {
    props.setSearchValue({
      value:searchName.name
    })
  }

  return(
    <div className="input-group">
      <input  type="text" name="name" placeholder="Search...  " value={searchName.name} onChange={inputName}/>
      <button className="btn btn-sm btn-info" onClick={handleButton}>검색</button>
    </div>
  )
}

export default SearchBar;