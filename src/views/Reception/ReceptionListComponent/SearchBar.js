
function SearchBar(props){
  return(
    <form>
      <label className="ml-5 ">        
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SearchBar;