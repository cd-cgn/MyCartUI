//import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js'

export default function AdminPage() {


  const {data: sellers, isPending: sellersIsPending, error: sellersError} = useFetch('http://localhost:3000/sellers');

  const {data: customers, isPending: customersIsPending, error: customersError} = useFetch('http://localhost:3000/customers');
  const {data: orders, isPending: ordersIsPending , error: ordersError} = useFetch('http://localhost:3000/orders');

  const {data: products, isPending: productsIsPending, error: productsError} = useFetch('http://localhost:3000/products');


  return (
    <div>
      <h2>Admin Page</h2>

      <div>
        <h3>[Seller Side Controls]</h3>
        {sellersIsPending && <div>Loading</div>}
        {sellersError && <div>{sellersError}</div>}
        {sellers && sellers.map((seller)=>(
          <div key={seller.id}>
            <p>{`${seller.first_name} ${seller.last_name}`}</p>
            <p>{seller.email}</p>
            <p>{seller.isCertified}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>[Customer Side Controls]</h3>
        <h4>List of All Customers Registerd on this site</h4>
        {customersIsPending && <div>Loading</div>}
        {customersError && <div>{customersError}</div>}
        {customers && customers.map((customer)=>(
          <div key={customer.id}>
            <p>{`${customer.first_name} ${customer.last_name}`}</p>
          </div>
        ))}

        <h4>List of All Orders placed on this site</h4>
        {ordersIsPending && <div>Loading</div>}
        {ordersError && <div>{ordersError}</div>}
        {orders && orders.map((order)=>(
          <div key={order.id}>
            <p>{order.customerId}</p>
            <p>{order.productId}</p>
            <p>{order.quantity}</p>
          </div>
        ))}
      </div>


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

// - Admin UX : 
// Login
// [Seller Side Contros] : List/Add/Remove Sellers
// [Customer Side Controls] : List All Customers / List All Orders
// [Product Catalogue] : List All Products
//Logout