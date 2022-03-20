import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories } from '../actions/categoriesAction';

const MenuItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(getCategories());
    }, [dispatch]);
    const categories = useSelector((state)=> state.categories.data);
    const isLoading = useSelector((state)=> state.categories.isLoading);
    const isError = useSelector((state)=> state.categories.isError);

  return (
      <div className='menu-section'>
        <h2>Menu Items</h2>
        <div className='menu-content'>
            {isError && (
                <p className='error-msg'>
                Error while loading categories, please try again !!
                </p>
            )}
            {isLoading ? (
                <p className='loading'>Loading...</p>
            ) : (
                categories.map((category)=> {
                    const {_id, image, cat_title} = category;
                    return (
                        <div className='menu' key={_id}>
                           <img
                           src={image.url}
                           alt={cat_title}
                           width={image.width}
                           height={image.height}
                           className='img-responsive reveal-inline-block'
                           />
                           <Link to={`/products?search=${cat_title.toLowerCase()}`} className="menu-link">
                               {cat_title}
                           </Link>
                        </div>
                    )
                })
            )}
           
        </div>
      </div>
  )
};

export default MenuItems;
