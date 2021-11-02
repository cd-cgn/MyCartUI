import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js'
import Card from '../../components/Card.js';

export default function CustomerPage() {

  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products');
  const {data: cart, isPending: cartIsPending, error: cartError} = useFetch('http://localhost:3000/carts');
  const {data: orders, isPending: ordersIsPending, error: ordersError} = useFetch('http://localhost:3000/orders');


  const [showShopping, setShowShopping] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleClick = (arg) => {
    if(arg === 's') {
      setShowShopping(true); setShowCart(false);
      setShowOrders(false);
    }
    else if(arg === 'c'){
      setShowShopping(false); setShowCart(true);
      setShowOrders(false);
    }
    else if(arg === 'o'){
      setShowShopping(false); setShowCart(false);
      setShowOrders(true);
    }
  }

  return (
    <div>
      <h2>Customer Page</h2>

      <div>
        <button onClick={() => handleClick('s')}> Shopping </button>
        <button onClick={() => handleClick('c')}> My Cart </button>
        <button onClick={() => handleClick('o')}> My Orders </button>
      </div>

      { showShopping && <div>
        <h3>[Products List]</h3>
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
      </div>}

      { showCart && <div>
        <h3>[Products List]</h3>
        {cartIsPending && <div>Loading</div>}
        {cartError && <div>{cartError}</div>}
        {cart && cart.map((product)=>(
          <div key={product.id}>
            <Card>
            <p>{product.customerId}</p>
            <p>{product.productId}</p>
            <p>{product.quantity}</p>
            </Card>
          </div>
        ))}
      </div>}

      { showOrders && <div>
        <h3>[Products List]</h3>
        {ordersIsPending && <div>Loading</div>}
        {ordersError && <div>{ordersError}</div>}
        {orders && orders.map((product)=>(
          <div key={product.id}>
            <Card>
            <p>{product.customerId}</p>
            <p>{product.productId}</p>
            <p>{product.quantity}</p>
            </Card>
          </div>
        ))}
      </div>}

      
    </div>
  )
}
