import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RapperContent } from "../../../../App";

const Product = ({ product }) => {
  const { handleClick, setToltip } = useContext(RapperContent);
  const { setOpen, setQuickviewProduct,  added_products } =
    useContext(RapperContent);

  const setEverything = (e) => {
    handleClick(e);
    setToltip(true);
  };

  const quickviewall = (e) => {
    setQuickviewProduct(e);
    setOpen(true);
  };

  const checkQuantity = (stock) => {
    if (added_products?.filter((item) => item.id === product._id)?.length > 0) {
      if (
        stock >
        added_products?.filter((item) => item.id === product._id)?.[0]?.quantity
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <div>
      <div key={product._id} className="group relative">
        <div className="w-full image relative min-h-80 border aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
          <img
            src={product?.images?.[0]?.url}
            alt={product?.images?.[0]?.url}
            className="w-full h-full object-center object-cover"
          />
          <div className="add_to_cart absolute">
            <div className="add-wish">
              <div className="quick_view">
                <div className="wish_text">See Quick View</div>
                <svg
                  onClick={() => quickviewall(product)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
            {product.stock > 0 && checkQuantity(product?.stock) ? (
              <div
                onClick={() => setEverything(product)}
                className="add-bag flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 carticon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p>Add To Cart</p>
              </div>
            ) : (
              <div className="Out_Stock">Out Of Stock</div>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <p className="mr-2 text-ash">{product?.category}</p>

              <Link
                to={`/product/${product?._id}`}
                className="text-lg name font-bold text-blk-txt transition delay-200 ease-linear hover:text-primary-txt"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name?.slice(0, 15)}
              </Link>
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">{product.smell}</p> */}
          </div>
          <p className="text-lg font-bold text-primary-txt">£{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
