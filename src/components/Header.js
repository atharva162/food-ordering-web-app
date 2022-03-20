import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const Header = ({showCart = false, cartCount=0}) => {
const displayStyle = {display: `${showCart? 'block' : 'none'}`} 
const history = useHistory();  
const handleRedirect = () => {
  history.push('/cart');
} 
  return(
     <nav>
         <header className='navigaton-bar'>
          <div className='home-link'>
            <Link to='/'>
              <h1>Food Market</h1>
            </Link>
          </div>
          <div className='cart-icon' style={displayStyle} onClick={handleRedirect}>
          <FiShoppingCart size="30" color='green' className='cart-logo'/>
          <span className='cart-count'>{cartCount}</span>
          </div>
          <div className='menu-link' style={displayStyle}>
          <Link to="/menu">Available Menus</Link>
          </div>
         </header>
     </nav>
  ); 
};


export default Header;
