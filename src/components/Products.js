import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllProducts } from '../actions/productsAction';
import { getToppings } from '../actions/toppingsAction';
import { getQueryStringValue } from '../utils/functions';
import Layout from './Layout';
import ToppingsModal from './ToppingsModal';
import Product from './Product';
import { addToCartAction, changeProductCountAction } from '../actions/cartActions';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
const [category, setCategory] = useState('');
const [selectedFilter, setSelectedFilter] = useState(false);
const [filteredResults, setFilteredResults] = useState([]); 
const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState({});
const [modalTitle, setModalTitle] = useState('');
const [checkedState, setCheckedState] = useState([]);
const [selectedToppingsCount, setSelectedToppingsCount] = useState(0);
const [totalOrderPrice, setTotalOrderPrice] = useState(0);
const [productQuantity, setProductQuantity] = useState(1);
const [cartProducts, setCartProducts] = useState([]);
const dispatch = useDispatch();
const url = document.location.search;
const products = useSelector((state) => state.products.data);
const toppings = useSelector((state)=> state.toppings.data);
const cartData = useSelector((state)=> state.cart.data);
const emptyArrayRef = useRef([]);

useEffect(() => {
  window.scrollTo(0,0);
}, []);

useEffect(() => {
  const category =  getQueryStringValue(url, 'search');
  setCategory(category);
  dispatch(getAllProducts(category));
}, []);

useEffect(() => {
  setFilteredResults(products)
}, [products]);

useEffect(()=>{
  dispatch(getToppings);
}, []);

useEffect(()=>{
   emptyArrayRef.current = new Array(toppings.length).fill(false);
   setCheckedState(emptyArrayRef.current);
}, [])

useEffect(()=>{
  setCartProducts(cartData);
}, []);

useEffect(()=>{
  if(selectedProduct.price>=0 && selectedToppingsCount>0){
    setTotalOrderPrice(selectedProduct.price + selectedProduct.productPrice);
  }else if (selectedProduct.price >=0){
    setTotalOrderPrice(selectedProduct.price);
  }
}, [selectedProduct.price, selectedToppingsCount]);

const toggleModal = (id, title, image, price) =>{
    if(id){
      setSelectedProduct({
        id,
        title,
        image,
        price,
        productPrice: price
      })
      setModalTitle(title)
    }
    setShowModal(!showModal)
}

const resetState = () => {
  setSelectedProduct({});
  setProductQuantity(1);
}

const addProduct = (id, title, image, price) => {
  if(id){
    setSelectedProduct({
      id,
      title,
      image,
      price,
      productPrice: price
    })
  }
  // const {id, title, image} = selectedProduct;
  
   let  cart = [
      ...cartProducts,
      {
        id,
        title,
        image,
        quantity: productQuantity,
        price,
        category
      }
   ]
  

  setCartProducts(cart);
  resetState();
  dispatch(addToCartAction(cart));
  toast.success('Product added to cart successfully');
  console.log(cartData);
}

const handleQuantityChange = (operation) => {
  if(operation === 'increment'){
    setProductQuantity(productQuantity + 1)
  }else if(operation === 'decrement'){
    setProductQuantity(productQuantity>1 ? productQuantity-1 : 1)
  }
}

const changeProductCount = (id, operation)=>{
  let isIncrement;
  if(operation === 'increment'){
    isIncrement = true;
    dispatch(changeProductCountAction(id, isIncrement))
  }else{
    isIncrement = false;
    dispatch(changeProductCountAction(id, isIncrement))
  }
}

const handleToppingsSelection = (position) => {
   const updatedCheckedState = checkedState.map((item,index)=> 
      position === index ? !item : item
    ) 
    setCheckedState(updatedCheckedState);   
    setSelectedToppingsCount(
      updatedCheckedState.filter((value)=> value===true).length
    );

    const totalPrice = updatedCheckedState.reduce((sum, currentState, index) =>{
        if(currentState === true){
          return sum + toppings[index].price;
        }
        return sum;
    },
    0)

    setSelectedProduct({
      ...selectedProduct,
      price: totalPrice
    })
}

const handleFilterChange = () => {
   const isVeg = !selectedFilter;
   setSelectedFilter(isVeg);
  const result = isVeg ? (products.filter((product)=> product.is_veg === true)) : products;
  setFilteredResults(result);
}

const isFailed = useSelector((state)=> state.products.isError);
const isLoading = useSelector((state)=> state.products.isLoading);
  
return (
      <Layout cartCount={cartData.length}>
        {document.location.search ? (
          <div className='products'>
            <div className='main-title'>{category}</div>
            {category !== 'biryani' && (
                <div className='filters'>
                  <input
                  type='checkbox'
                  id='filter'
                  className='custom-checkbox'
                  name='filter'
                  value='veg-only'
                  checked= {selectedFilter}
                  onChange= {handleFilterChange}
                  />
                  <label htmlFor='filter'>Veg only</label>
                </div>
                )}
               {category === 'biryani' && (
                <div className='filters'>
                  <label htmlFor='filter'>No Veg item available for this food category</label>
                </div>
              )}
            {isFailed && (
              <p className='error-msg'>
                Error while loading products, please try again!!
              </p>
            )}
            {isLoading ? (
              <p className='loading'>
                Loading...
              </p>
            ) : (
              filteredResults.map((product) => (
                <Product 
                id={product._id}
                key={product._id}
                title={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                rating={product.rating}
                image={product.image?.url}
                isVeg={product.is_veg}
                category={category}
                changeProductCount={changeProductCount}
                toggleModal={toggleModal}
                addProduct={addProduct}
                cart={cartData}
                />
              ))
            )}
          </div>
        ) : (
          <Redirect to='/'/>
        )}
        <ToppingsModal
        showModal={showModal}
        toggleModal={toggleModal}
        modalTitle={modalTitle}
        toppings={toppings}
        checkedState={checkedState}
        productQuantity={productQuantity}
        selectedToppingsCount={selectedToppingsCount}
        totalOrderPrice={totalOrderPrice}
        handleQuantityChange={handleQuantityChange}
        handleToppingsSelection={handleToppingsSelection}
        addProduct={addProduct}
        />
      </Layout>
  );
};

export default Products;