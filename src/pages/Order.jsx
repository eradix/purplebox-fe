import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import FormModal from "../components/FormModal";
import { orderFields } from "../helper/OrderField";
import { getAllOrders, orderActions } from "../store/order-slice";

const Order = () => {
  const header = [
    "Customer Name",
    "Product Image",
    "Product Name",
    "Quantity",
    "Total Price",
    "Status",
    "Actions",
  ];

  const selectRef = useRef([]);
  const buttonRef = useRef([]);

  const dispatch = useDispatch();

  const editSaveOrder = (e, id) => {
    e.preventDefault();
    selectRef.current[id].disabled = !selectRef.current[id].disabled
    if(selectRef.current[id].disabled) buttonRef.current[id].innerText = "Edit"
    if(!selectRef.current[id].disabled) buttonRef.current[id].innerText = "Save"
  };


  useEffect(() => {
    dispatch(getAllOrders("To-Pay"));
  }, []);

  const { showModal, form, allOrders } = useSelector((state) => state.order);

  return (
    <>
      {showModal && (
        <FormModal
          updateTitle={"Update Order"}
          fields={orderFields}
          actions={orderActions}
          form={form}
          edit={true}
        />
      )}

      <div className=" md:pr-10 md:pl-5 md:w-9/12">
        <div className="flex justify-between">
          <div className="flex items-center font-bold cursor-pointer text-xl mb-3">
            <p>Order Management</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {header.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 relative">
                    {allOrders.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.user.first_name} {item.user.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/storage/${item.product.image}`}
                            className="w-24 h-24"
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.total_price}
                        </td>
                        <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                          <select
                            disabled={true}
                            name="status"
                            id={item.id}
                            ref={(el) => (selectRef.current[item.id] = el)}
                            className="text-gray-500 text-center border py-3 px-1 rounded-md shadow-md w-full focus:outline-none"
                          >
                            <option defaultValue={item.status}>
                              {item.status}
                            </option>
                            <option value="To Pay">To-Pay</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={(e) => editSaveOrder(e, item.id)}
                            className="text-green-500 hover:text-red-700 mr-3"
                            href="#"
                            id={item.id}
                            ref={(el) => (buttonRef.current[item.id] = el)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
