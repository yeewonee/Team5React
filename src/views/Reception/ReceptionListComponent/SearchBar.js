function SearchBar(props){
  return(
    <div className="input-group ml-5">
      <input  type="text" name="name" />
      <button className="btn btn-sm btn-info">검색</button>
    </div>
  )
}

export default SearchBar;