function SearchBar(props){
  return(
    <div className="input-group">
      <input  type="text" name="name" placeholder="Search...  "/>
      <button className="btn btn-sm btn-info">검색</button>
    </div>
  )
}

export default SearchBar;