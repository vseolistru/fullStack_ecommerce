import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useContext} from "react";
import {Store} from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";


function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signOutHandler = () => {
        ctxDispatch({type: 'USER_LOGOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    }

  return (
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
            <ToastContainer position="bottom-center" limit={1}/>
          <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>New Store</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id = "basic-navbar-nav">
                            <Nav className = "me-auto w-100 justify-content-end">
                                <Link to = "/cart" className="nav-link">
                                    Cart
                                    {cart.cartItems.length >0 && (
                                        <Badge pill bg="danger">
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </Badge>
                                    )}
                                </Link>
                                {userInfo
                                    ? (<NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/orderhistory'>
                                            <NavDropdown.Item>Order history</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider/>
                                        <Link className="dropdown-item" to="#signout" onClick={signOutHandler}>
                                            Sign out
                                        </Link>
                                    </NavDropdown>)
                                    :(<Link className='nav-link' to='/signin'>Sign in</Link>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
          </header>
            <main>
                <Container>
                <Routes>
                   <Route path="/product/:slug" element={<ProductScreen/>}/>
                   <Route path="/cart" element={<CartScreen/>}/>
                   <Route path="/signin" element={<SigninScreen/>}/>
                   <Route path="/shipping" element={<ShippingAddressScreen/>}/>
                   <Route path="/signup" element={<SignUpScreen/>}/>
                   <Route path="/payment" element={<PaymentMethodScreen/>}/>
                   <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
                   <Route path="/order/:id" element={<OrderScreen/>}/>
                   <Route path="/orderhistory" element={<OrderHistoryScreen/>}/>
                    <Route path="/profile" element={<ProfileScreen/>}/>

                   <Route path="/" element={<HomeScreen/>}/>

                </Routes>
                </Container>
            </main>
            <footer>
                <div className="text-center">All right reserved</div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
