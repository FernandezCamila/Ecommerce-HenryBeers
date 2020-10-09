import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import './CrudBeer.css'
import {useSelector, useDispatch} from 'react-redux'
import {getCategory} from '../../Redux/category'
import {getbeers} from '../../Redux/beer'

const CrudBeer = () => {

  const dispatch = useDispatch() 
  const categories = useSelector(store=> store.category.categories)
  const beers = useSelector(store => store.beer.beers)

  useEffect(()=>{
   dispatch(getCategory())
   dispatch(getbeers())
  },[])


   const [video, setVideo] = useState({
       name: "",
       description:"",
       price:0,
       stock:0,
       image:"",
       category:[]
   });
    
 const {name, description, price, stock, image, category} = video

   const UpdateBeer = async()=>{
     
    const id = handleGet(id)
    const info = {
      name: video.name,
      description: video.description ,
      price: video.price,
      stock: video.stock,
      image: video.image,
      category: video.category
    }

    console.log(id)
    const {data} = await axios.put(`http://localhost:4000/products/update/${id}`)

   }

   const handleGet =(id)=>{
    return id 
   }

   const submitBeer= async(id)=>{
    handleGet(id)
     const info = {
       name: video.name,
       description: video.description ,
       price: video.price,
       stock: video.stock,
       image: video.image,
       category: video.category
     }

     const {data} = await axios.post('http://localhost:4000/products/create', info)
     console.log(data)
   }

   const handleSubmit =(e)=>{
     e.preventDefault()
     console.log(video)
     alert('enviado')
   }

   const handleChange = e =>{
    setVideo({
      ...video,
      [e.target.name] : e.target.value
    })
  }
    return(
        <div className='formCrudProduct' >
        <form onSubmit={(e)=> handleSubmit(e)} >
          <h6>Name</h6>
          <input type='text'  value={name} onChange={handleChange} name='name' placeholder='Ingrese el nombre...'/>  
          <h6>Description</h6>
          <input type='text'  value={description} onChange={handleChange} name='description' placeholder='Ingrese una descripción...'/>  
          <h6>Price</h6>
          <input  type='number'  value={price} onChange={handleChange} name='price' /> 
          <h6>Stock</h6>
          <input type='number'  value={stock} onChange={handleChange} name='stock' />  
          <h6>Image</h6>
          <input  type='text'  value={image} onChange={handleChange} name='image'  /> <br/><br/>
          {categories.map((e)=>(
            <Fragment>
            <input type='checkbox' value={category} onChange={handleChange} name='category'/> 
            {console.log(category)}
            <span>{e.name}</span>
            </Fragment>
          ))}
          <button type='submit' onClick={()=> submitBeer()} >Add product</button> 
          <button type='submit' onClick={()=> UpdateBeer()} >Update product</button> 
        </form>

        <div>
          {beers.map(e=>(
            <button onClick={()=> handleGet(e.id)} >
              {e.name} 
            </button>
          ))}
        </div>
        </div>
    )
}

export default CrudBeer