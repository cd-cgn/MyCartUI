import useFetch from '../../hooks/useFetch.js'
import Card from '../../components/Card.js';
import { useState } from 'react/cjs/react.development';

export default function SellerPage() {
  const sellerId = '6187b22213103b912497d3a7';
  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products/' + sellerId);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  
  const handlePost = (e) => {
    e.preventDefault();

    const postCall = async () => {
      await fetch('products', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
          {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            sellerId: sellerId
          })
      });
    }
    
    if(productName && productPrice && productQuantity)
      postCall();
  }


  return (
    <div>
      <h2>Seller Page : Add/Remove Products</h2>

      <div>
        <h3>[Product Side Controls]</h3>
        {productsIsPending && <div>Loading</div>}
        {productsError && <div>{productsError}</div>}
        {products && products.map((product)=>(
          <div key={product.id}>
            <Card>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            </Card>
          </div>
        ))}
      </div>
      

      <button style={{"margin":"20px"}} onClick={() => setIsFormOpen(!isFormOpen)}>Add Product</button>
      {isFormOpen && <form style={{"margin":"20px"}}>
        <label>Product Name 
          <input type="text" onChange={(e) => setProductName(e.target.value)}></input>
        </label>
        <label>Product Price
          <input type="text" onChange={(e) => setProductPrice(e.target.value)}></input>
        </label>
        <label>productQuantity
          <input type="text" onChange={(e) => setProductQuantity(e.target.value)}></input>
        </label>
        <button onClick={handlePost}>Add</button>
        </form>
      }

    </div>
  )
}