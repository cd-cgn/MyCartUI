import './App.css';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom'

//Import Pages
import Home from './modules/Home';
import AdminPage from './modules/Admin/AdminPage';
import SellerPage from './modules/Seller/SellerPage';
import CustomerPage from './modules/Customer/CustomerPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>MyCart</h1>
          <NavLink exact to="/" >Home</NavLink>
          <NavLink to="/customer" >Customer</NavLink>
          <NavLink to="/seller" >Seller</NavLink>
          <NavLink to="/admin" >Admin</NavLink>
        </nav>

        <Switch>
          
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/admin">
            <AdminPage />
          </Route>

          <Route path="/seller">
            <SellerPage />
          </Route>

          <Route path="/customer">
            <CustomerPage />
          </Route>

          <Route path="*">
            <Home />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;




// - Seller UX : 
// Login / SignUP -> Add/Remove Products -> Logout

// - Customer UX : 
// Login / SignUP -> 
// Products Page Add -> Cart Page Add/Remove/Order -> Order Page Cancel/Delivered 
// -> Logout