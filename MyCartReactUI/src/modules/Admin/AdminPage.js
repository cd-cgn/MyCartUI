import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js'
import Card from '../../components/Card.js';

export default function AdminPage() {

  const {data: sellers, isPending: sellersIsPending, error: sellersError} = useFetch('http://localhost:3000/sellers');

  const {data: customers, isPending: customersIsPending, error: customersError} = useFetch('http://localhost:3000/customers');
  const {data: orders, isPending: ordersIsPending , error: ordersError} = useFetch('http://localhost:3000/orders');

  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products/-1');

  const [showSeller, setShowSeller] = useState(true);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleClick = (arg) => {
    setShowSeller(false); setShowCustomer(false);
    setShowOrders(false); setShowProducts(false);
    if(arg === 's') {
      setShowSeller(true);
    }
    else if(arg === 'c'){
      setShowCustomer(true);
    }
    else if(arg === 'o'){
      setShowOrders(true);
    }
    else if(arg === 'p'){
      setShowProducts(true);
    }
  }

  const handlePost = (id, action) => {

    const postCall = async () => {
      
      await fetch('sellers', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({id, action})
      });
    }
    
    postCall();
  }

  return (
    <div>
      <h2>Admin Page</h2>

      <div>
        <button onClick={() => handleClick('s')}> Seller </button>
        <button onClick={() => handleClick('c')}> Customer </button>
        <button onClick={() => handleClick('p')}> Products </button>
        <button onClick={() => handleClick('o')}> Orders </button>
      </div>

      { showSeller && <div>
        <h3>[Seller List]</h3>
        {sellersIsPending && <div>Loading</div>}
        {sellersError && <div>Error: {sellersError}</div>}
        {sellers && sellers.map((seller)=>(
          <div key={seller.id}>
            <Card>
            <p>{seller.name}</p>
            <p>{seller.email}</p>
            <p>{seller.approval}</p>
            {seller.approval === 'Pending' && <button onClick={() => handlePost(seller.id, 'Approved')}>Approve</button>}
            <button onClick={() => handlePost(seller.id, 'Delete')}>Delete</button>
            </Card>
          </div>
        ))}
      </div> }

      { showCustomer && <div>
        <h3>[Customers List]</h3>
        <h4>List of All Customers Registerd on this site</h4>
        {customersIsPending && <div>Loading</div>}
        {customersError && <div>{customersError}</div>}
        {customers && customers.map((customer)=>(
          <div key={customer.id}>
          <Card>
              <p>{customer.name}</p>
              <p>{customer.email}</p> 
          </Card>
          </div>
        ))}
        </div>}

      { showOrders && <div> <h4>List of All Orders placed on this site</h4>
        {ordersIsPending && <div>Loading</div>}
        {ordersError && <div>{ordersError}</div>}
        {orders && orders.map((order)=>(
          <div key={order.id}>
            <Card>
            <p>{order.customerId}</p>
            <p>{order.productId}</p>
            <p>{order.quantity}</p>
            </Card>
          </div>
        ))}
      </div> }


      { showProducts && <div>
        <h3>[Product Side Controls]</h3>
        {productsIsPending && <div>Loading</div>}
        {productsError && <div>{productsError}</div>}
        {products && products.map((product)=>(
          <div key={product.id}>
            <Card>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.sellerId}</p>
            </Card>
          </div>
        ))}
      </div>}

    </div>
  )
}