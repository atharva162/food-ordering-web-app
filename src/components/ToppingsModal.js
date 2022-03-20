import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getFormattedPrice, getFormattedTopping } from '../utils/functions';


const ToppingsModal = ({
    showModal,
    toggleModal,
    modalTitle,
    toppings,
    checkedState,
    productQuantity,
    selectedToppingsCount,
    totalOrderPrice,
    handleQuantityChange,
    handleToppingsSelection,
    addProduct
}) => {
  return(
       <Modal show={showModal} onHide={toggleModal} className='toppings-modal'>
           <Modal.Header closeButton>
               <Modal.Title>{modalTitle}</Modal.Title>
           </Modal.Header>
           <Modal.Body className='toppings-body'>
               <h6>Select quantity</h6>
               {/* {toppings.map((topping, index)=>(
                   <ul key={index}>
                       <li>
                           <div className='toppings-list-item'>
                               <div className='left-section'>
                                   <input
                                   type='checkbox'
                                   id={`custom-checkbox-${index}`}
                                   className='custom-checkbox'
                                   name={topping.name}
                                   value={topping.name}
                                   checked={checkedState[index]}
                                   onChange={handleToppingsSelection(index)}
                                   />{' '}
                                  <label htmlFor={`custom-checkbox-${index}`}>
                                      {getFormattedTopping(topping.name)}
                                  </label>
                               </div>
                               <div className='right-section'>{getFormattedPrice(topping.price)}</div>
                           </div>
                       </li>
                   </ul>
               ))} */}
               {(
                   <React.Fragment>
                       <hr/>
                       <div>
                           Order Total: {getFormattedPrice(totalOrderPrice)}
                       </div>
                   </React.Fragment>
               )}
           </Modal.Body>
           <Modal.Footer>
               <div className='toppings-modal-footer'>
                  <div className='quantity'>
                      <span className='minus-sign' onClick={() => handleQuantityChange('decrement')}>
                      &#8722;
                      </span>
                      <span className='product-qty'>
                          {productQuantity}
                      </span>
                      <span className='plus-sign' onClick={()=> handleQuantityChange('increment')}>
                      &#43; 
                      </span>
                  </div>
                  <Button variant='warning' onClick={addProduct}>
                      Add to Cart
                  </Button>
               </div>
           </Modal.Footer>
       </Modal>
  )
};

export default ToppingsModal;
