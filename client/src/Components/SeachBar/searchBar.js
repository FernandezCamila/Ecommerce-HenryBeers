import React, {useState} from 'react'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'


const SearchBar = ({setSearchApp}) =>{
    const [search, setSearch] = useState()

    const handleChange=(e)=>{
     e.target.value.toLowerCase()   
     setSearch(e.target.value)
    }




    return(
        <form onSubmit={(e)=>handleSubmit(e)}  >
          <div>
              <input name='search' type='text' onChange={(e)=>handleChange(e)} />
              <button type='submit' onClick={(e)=>handleSubmit(e)} ><SearchIcon/></button>
          </div>
        </form>
    )
}


export default SearchBar
