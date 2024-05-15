import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
const [data, setData] = useState([])
const[ searchValue, setSearchValue] = useState("")

useEffect (()=> {
  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products")
      setData(response.data)
      console.log(data)
    } catch (error){
      console.log(error)
    }
  }
  fetchProduct()
}, [])

const searchProduct = (event) => {
setSearchValue(event.target.value)

console.log(searchValue)
  setData(data.filter((product)=> (
    product.title.includes(searchValue)
  )))
}

const resetValue = () => {
  setSearchValue('')
  window.location.reload()
}

const sortPrice = () => {
  const sortedProduct = [...data].sort((a, b) => b.price - a.price);
  setData(sortedProduct);
}
  return (
    <div className="App">
      <h1>Data</h1>
      <div className='button-group'>
      <input type="text" value={searchValue} onChange={searchProduct} placeholder='Mohon perhatikan huruf kapital..'/>
      <button onClick={resetValue}>Reset</button>
      <button onClick={sortPrice}>Sort Price high-Low</button>
      </div>
      <div className='product-list'>
      {
        data.map((product)=>(
          <div className='product-item'>
            <li>{product.id}</li>
            <li>{product.title}</li>
            <li>{product.price}</li>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;
