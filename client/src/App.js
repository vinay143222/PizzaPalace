import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {   BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Style.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingScreen from './components/ShippingScreen';
import SignupScreen from './components/SignupScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';
import OrderScreen from './components/OrderScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen';
import ProfileScreen from './components/ProfileScreen';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Categoryitem from './components/Categoryitem';
import Protectedroute from './components/Protectedroute';
import Dashboardscreen from './components/Dashboardscreen';
import OrderListScreen from './components/OrderListScreen';
import UserListScreen from './components/UserListScreen';
import ProductListScreen from './components/ProductListScreen';
import ProductEditScreen from './components/ProductEditScreen';
import UserEditScreen from './components/UserEditScreen';


function App() {
const {state,dispatch:ctxDispatch}=useContext(Store);
const {cart,userInfo}=state;
console.log(userInfo);
 const signoutHandler=()=>{
   ctxDispatch({type:'USER_SIGNOUT'});
   localStorage.removeItem('userInfo');
   localStorage.removeItem('shippingAddress');
   localStorage.removeItem('cartItems');
   localStorage.removeItem('paymentMethod');
   window.location.href="/signin";
 }
const [sidebarIsOpen,setSidebarIsOpen]=useState(false);
const [categories,setCategories]=useState([]);
useEffect(() => {
const fetchCategpry=async()=>{
   try {
       const {data}= await axios.get('/api/products/categories');
       
       setCategories(data);
   } catch (error) {
      toast.error(error);
   }
}
fetchCategpry();
},[])


   return (
      <BrowserRouter>
      <div className={ sidebarIsOpen ?
        ' d-flex flex-column site-container active-cont '
              : ' d-flex flex-column site-container  '}>
         <ToastContainer position="bottom-center" limit={1}/>
         <header className="App-header">
            <Navbar bg="white" variant="white" expand="lg">
            <Container>
               <Button variant="light" onClick={()=>setSidebarIsOpen(!sidebarIsOpen)}>
                <i className="fas fa-bars"></i>
               </Button>
               <LinkContainer to="/">
                  <Navbar.Brand>PIZZA PALACE</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls="basic-navbar-nav"><i className="fas fa-bars"></i></Navbar.Toggle>
               <Navbar.Collapse id="basic-navbar-nav">
                 
               <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link" style={{color:'black'}}>
                  Cart
                  {cart.cartItems.length>0&&(<Badge pill bg="danger">{cart.cartItems.reduce((a,c)=>a + c.quantity,0)}</Badge>)}
                </Link>
                {userInfo ?(
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown"   >
                     <LinkContainer to="/profile">
                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                     </LinkContainer>
                     <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>My Order</NavDropdown.Item>
                     </LinkContainer>
                     <NavDropdown.Divider/>
                     <Link className="dropdown-list" to="#signout" onClick={signoutHandler}>Logout</Link>
                  </NavDropdown>
                ):(
                  <Link to="/signin" className="nav-link" style={{color:'black'}}>
                  
               SignIn</Link>
                )}
                 {userInfo&&userInfo.isAdmin&&(
            <NavDropdown title="Admin" id="admin-nav-dropdown">
             <LinkContainer to="/admin/dashboard">
               <NavDropdown.Item>Dashboard</NavDropdown.Item>
             </LinkContainer>
               <LinkContainer to="/admin/productlist">
               <NavDropdown.Item>Pizza</NavDropdown.Item>
             </LinkContainer>
             <LinkContainer to="/admin/orders">
               <NavDropdown.Item>Orders</NavDropdown.Item>
             </LinkContainer>
               <LinkContainer to="/admin/users">
               <NavDropdown.Item>Users</NavDropdown.Item>
             </LinkContainer>
            </NavDropdown>
          )}
               </Nav>
              </Navbar.Collapse>
            </Container>
            </Navbar>
            
         </header>
      <div className={ sidebarIsOpen ?'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'}>
         <Nav className="flex-column text-white w-100 p-2" >
            <Nav.Item>
               <strong style={{color:'black'}}>categories</strong>
            </Nav.Item>
           
            {categories.map((category)=>{
               return <Nav.Item key={category}>
              <LinkContainer  to={`/search/${category}`} onClick={()=>setSidebarIsOpen(false)} style={{color:'black'}}>
               <Nav.Link >{category}</Nav.Link>
              </LinkContainer>
               </Nav.Item>
            })}
         
         </Nav>
      </div>
         <main>
            <Container>
            <Routes>
               <Route path="/cart" element={<CartScreen/>}></Route>
               <Route path="/product/:id" element={<ProductScreen/>}></Route>
               <Route path="/" element={<HomeScreen/>}></Route>
               <Route path="/signin" element={<SigninScreen/>}></Route>
               <Route path="/shipping" element={<ShippingScreen/>}></Route>
               <Route path="/signup" element={<SignupScreen/>}></Route>
               <Route path="/profile" element={<ProfileScreen/>}></Route>
               <Route path="/payment" element={<PaymentScreen/>}></Route>
               <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
               <Route path="/order/:id" element={<OrderScreen/>}></Route>
               <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
               <Route path="/search/:category" element={<Categoryitem/>}></Route>
               <Route path="/admin/dashboard" element={<Dashboardscreen/>}></Route>
                <Route
                path="/admin/orders"
                element={
               
                    <OrderListScreen/>
                  
                }
              ></Route>
               <Route
                path="/admin/users"
                element={
                  
                    <UserListScreen/>
                  
                }
              ></Route>
                 <Route
                path="/admin/productlist"
                element={
               
                    <ProductListScreen />
                  
                }
              ></Route>
               <Route
                path="/admin/product/:id"
                element={
                  
                    <ProductEditScreen/>
               
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                 
                    <UserEditScreen />
                 
                }
              ></Route>
            </Routes>
           </Container>
         </main>
         <footer>
            <div className="text-center">All rights reserved</div>
         </footer>
      </div>
      </BrowserRouter>
   )
}

export default App;
