import React, { useState, useEffect } from 'react';
import Product from './Components/Product/Product'
import Catalogo from './Components/Catalogo/Catalogo.js'
import CrudBeer from './Components/CrudBeer/CrudBeer'
import CrudCategory from './Components/CrudCategory/CrudCategory'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { getbeers } from './Redux/beer'
import { getCategory } from './Redux/category'
import Admin from './Components/Admin/Admin';
import Inicio from './Components/index/index';
import Login from './Components/User/Login'


function App() {

  const [search, setSearchApp] = useState({
    array: [],
    word: "",
  });

  const dispatch = useDispatch()
  const category = useSelector(store => store.category.categories)
  const products = useSelector(store => store.beer.beers)

  useEffect(() => { // Similar al componentDidMount
    dispatch(getbeers())
    dispatch(getCategory())
  }, [])


  return (
    <div >

      <BrowserRouter>
        <Route path='/'
          render={() => <NavBar setSearchApp={setSearchApp} />}
        />

        <Route exact path="/"
          component={Inicio}
        />
        <Route exact path="/login"
          component={Login}
        />

        <Route
          exact path="/products/search"
          render={() => <Catalogo products={search.array} search={search.word} />}
        />

        <Route exact path="/catalogo/:productoId"
          component={Product}
        />

        <Route
          exact path="/products/catalogo/:id"
          render={({ match }) => <Catalogo products={products.filter(p => p.categories.id === match.params.id)} category={match.params.id} />}
        />

        <Route exact path='/catalogo'
          component={Catalogo}

        />

        <Route
          path='/admin'
          component={Admin}
        />

      </BrowserRouter>
    </div>
  );
}

export default App;
