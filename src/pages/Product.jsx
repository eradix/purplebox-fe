import React from "react";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Modal from "../components/AlertModal";
import { addToCart, getUserCart, orderActions, updateOrderIfExist } from "../store/order-slice";
import { getProduct } from "../store/product-slice";

const Product = () => {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { form, success, usersCart } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getProduct(product_id));
    const value = product_id;
    const name = "product_id";
    dispatch(orderActions.setForm({ name, value }));
    dispatch(getUserCart());
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(orderActions.setForm({ name, value }));
  };

  const addCart = async (e) => {
    e.preventDefault();
    const isExist = await usersCart.find(
      (item) => item.product_id === parseInt(product_id)
    );
    if(!isExist) dispatch(addToCart(form))
    else  dispatch(updateOrderIfExist(form))
  };

  return (
    <>
      {success && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Added Cart Successful"}
        />
      )}

      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          <img
            src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`}
            alt="cake"
            className="mb-3 md:mb-0"
          />
          <div className="self-start w-full">
            <p className="font-bold text-2xl text-indigo-500 mb-3">
              {product.name}
            </p>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={form.quantity}
                className="py-3 px-5 border w-full placeholder-black"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {product.type === "Cakes" && (
              <div className="my-3">
                <input
                  type="text"
                  placeholder="What Message Would You Like On The Cake?"
                  name="message"
                  value={form.message}
                  onChange={(e) => handleChange(e)}
                  className="py-3 px-5 border w-full placeholder-black"
                />
              </div>
            )}

            <div className="my-3">
              <p className="text-gray-500">{product.description}</p>
            </div>
            <div>
              <button
                onClick={(e) => addCart(e)}
                className="py-3 px-5 bg-indigo-500 text-white w-full "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
