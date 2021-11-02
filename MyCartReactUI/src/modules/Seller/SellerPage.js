import useFetch from '../../hooks/useFetch.js'
import Card from '../../components/Card.js';

export default function SellerPage() {

  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products');


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
    </div>
  )
}