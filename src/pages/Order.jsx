import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import FormModal from "../components/FormModal";
import { orderFields } from "../helper/OrderField";
import { fetchAllCustomCake } from "../store/custom-cake-slice";
import { getAllOrders, orderActions, updateOrder } from "../store/order-slice";

const Order = () => {
  const header = [
    "Customer Name",
    "Customer Number",
    "Product Image",
    "Product Name",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Status",
    "Actions",
  ];

  const selectRef = useRef([]);
  const buttonRef = useRef([]);

  const dispatch = useDispatch();

  const [status, setStatus] = useState("To-Pay");

  const editSaveOrder = (e, id) => {
    e.preventDefault();
    selectRef.current[id].disabled = !selectRef.current[id].disabled;
    if (selectRef.current[id].disabled) {
      buttonRef.current[id].innerText = "Edit";
      dispatch(updateOrder({ id, status }));
    }
    if (!selectRef.current[id].disabled)
      buttonRef.current[id].innerText = "Save";
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const { showModal, form, allOrders } = useSelector((state) => state.order);
  const { allCustomCakes } = useSelector((state) => state.customCake);

  useEffect(() => {
    dispatch(getAllOrders("To-Pay"));
    dispatch(fetchAllCustomCake("To-Pay"));
  }, []);

  const navigate = (e, status) => {
    setStatus(status);
    dispatch(getAllOrders(status));
    dispatch(fetchAllCustomCake(status));
    console.log(status);
  };

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

        <ul className="flex justify-between items-center px-2 text-center">
          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "To-Pay" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "To-Pay")}
          >
            To Pay
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Processing" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Processing")}
          >
            Processing
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Ready-For-Delivery" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Ready-For-Delivery")}
          >
            Delivery
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Completed" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Completed")}
          >
            Completed
          </li>
        </ul>

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
                    {allOrders?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.user.first_name} {item.user.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.user.contact_num}
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
                          {item.product.price}
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
                            onChange={(e) => handleSelect(e)}
                            className="text-gray-500 text-center border py-3 px-1 rounded-md shadow-md w-full focus:outline-none"
                          >
                            <option defaultValue={item.status}>
                              {item.status}
                            </option>
                            <option value="To Pay">To-Pay</option>
                            <option value="Processing">Processing</option>
                            <option value="Ready-For-Delivery">
                              Ready-For-Delivery
                            </option>
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

                    {allCustomCakes?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.user.first_name} {item.user.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.user.contact_num}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`}
                            className="w-24 h-24"
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-indigo-800 font-bold whitespace-nowrap">
                          Customize
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity * item.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                          <select
                            disabled={true}
                            name="status"
                            id={item.id}
                            ref={(el) => (selectRef.current[item.id] = el)}
                            onChange={(e) => handleSelect(e)}
                            className="text-gray-500 text-center border py-3 px-1 rounded-md shadow-md w-full focus:outline-none"
                          >
                            <option defaultValue={item.status}>
                              {item.status}
                            </option>
                            <option value="To Pay">To-Pay</option>
                            <option value="Processing">Processing</option>
                            <option value="Ready-For-Delivery">
                              Ready-For-Delivery
                            </option>
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
