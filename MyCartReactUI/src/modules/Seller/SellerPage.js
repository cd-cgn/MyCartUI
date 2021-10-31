import useFetch from '../../hooks/useFetch.js'

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
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


// List all added producs (by logged in seller)
// add new Product
// remove a added Product