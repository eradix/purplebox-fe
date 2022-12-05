import React from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import unknown from "../assets/img/unknown.jpg";
import { customCakeActions, saveCustomCake } from "../store/custom-cake-slice";
import AlertModal from "../components/AlertModal";
import { useState } from "react";
import { useAuth } from "../App";
import { useNavigate } from "react-router";

const CustomizeCake = () => {
  let token = useAuth();
  const navigate = useNavigate()
  const { form, success } = useSelector((state) => state.customCake);
  const dispatch = useDispatch();

  var formData = new FormData();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(customCakeActions.setForm({ name, value }));
  };

  const getFile = async (e) => {
    e.preventDefault();
    await formData.append("image", (e.target.files[0]));
  };

  const addCart = (e) => {
    e.preventDefault();

    if(!token) navigate('/login')
    else {
      Object.keys(form).map((item) => {
        if (item !== "image") formData.append(item, form[item]);
      });
      formData.append('status', 'To-Pay')
      dispatch(saveCustomCake(formData));
      dispatch(customCakeActions.resetForm());
      dispatch(customCakeActions.setSuccess(true));
    }
  };

  return (
    <>
      {success && (
        <AlertModal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Item added to cart. The seller will update the price for this customize cake."}
          button={"Okay"}
          actions={customCakeActions}
        />
      )}


      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          {/* <img src={!preview ? unknown : preview} alt="cake" className="mb-3 md:mb-0" style={{ width: '400px', height:'500px' }} /> */}
          <div className="self-start w-full">
            <p className="font-bold text-2xl text-indigo-500 mb-3">
              Customize Cake
            </p>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                className="py-3 px-5 border w-full text-gray-500"
                value={form.quantity}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="What Message Would You Like On The Cake?"
                name="message"
                className="py-3 px-5 border w-full text-gray-500"
                value={form.message}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="my-3">
              <textarea
                name="remarks"
                id="remarks"
                cols="30"
                rows="10"
                className="border w-full py-3 px-5"
                placeholder="Remarks"
                value={form.remarks}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>

            <div className="my-3">
              <input
                type="file"
                placeholder="Upload Image"
                name="image"
                onChange={(e) => getFile(e)}
                accept="image/png, image/gif, image/jpeg"
                className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
              />
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

export default CustomizeCake;
