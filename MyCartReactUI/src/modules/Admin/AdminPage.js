import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js'
import Card from '../../components/Card.js';

export default function AdminPage() {


  const {data: sellers, isPending: sellersIsPending, error: sellersError} = useFetch('http://localhost:3000/sellers');

  const {data: customers, isPending: customersIsPending, error: customersError} = useFetch('http://localhost:3000/customers');
  const {data: orders, isPending: ordersIsPending , error: ordersError} = useFetch('http://localhost:3000/orders');

  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products');

  const [showSeller, setShowSeller] = useState(true);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleClick = (arg) => {
    if(arg === 's') {
      setShowSeller(true); setShowCustomer(false);
      setShowOrders(false); setShowProducts(false);
    }
    else if(arg === 'c'){
      setShowSeller(false); setShowCustomer(true);
      setShowOrders(false); setShowProducts(false);
    }
    else if(arg === 'o'){
      setShowSeller(false); setShowCustomer(false);
      setShowOrders(true); setShowProducts(false);
    }
    else if(arg === 'p'){
      setShowSeller(false); setShowCustomer(false);
      setShowOrders(false); setShowProducts(true);
    }
  }

  return (
    <div>
      <h2>Admin Page</h2>

      <div>
        <button onClick={() => handleClick('s')}> Seller </button>
        <button onClick={() => handleClick('c')}> Customer </button>
        <button onClick={() => handleClick('o')}> Orders </button>
        <button onClick={() => handleClick('p')}> Products </button>
      </div>

      { showSeller && <div>
        <h3>[Seller List]</h3>
        {sellersIsPending && <div>Loading</div>}
        {sellersError && <div>{sellersError}</div>}
        {sellers && sellers.map((seller)=>(
          <div key={seller.id}>
            <Card>
            <p>{`${seller.first_name} ${seller.last_name}`}</p>
            <p>{seller.email}</p>
            <p>{seller.isCertified}</p>
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
              <p>{`${customer.first_name} ${customer.last_name}`}</p> 
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
            </Card>
          </div>
        ))}
      </div>}

    </div>
  )
}