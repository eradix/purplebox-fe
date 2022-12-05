import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import CustomCakeModal from "../components/CustomCakeModal";
import FormModal from "../components/FormModal";
import ViewProductModal from "../components/ViewProductModal";
import { orderFields } from "../helper/OrderField";
import {
  customCakeActions,
  fetchAllCustomCake,
  getCustomCake,
} from "../store/custom-cake-slice";
import {
  getAllOrders,
  getOrder,
  orderActions,
  updateOrder,
} from "../store/order-slice";

const Order = () => {
  const header = [
    "Customer Name",
    "Customer Number",
    "Product Name",
    "Quantity",
    "Total Price",
    "Status",
    "Actions",
  ];

  const selectRef = useRef([]);
  const buttonRef = useRef([]);

  const dispatch = useDispatch();

  const [statsField, setStatsField] = useState("");

  const editSaveOrder = (e, id) => {
    e.preventDefault();
    selectRef.current[id].disabled = !selectRef.current[id].disabled;
    if (selectRef.current[id].disabled) {
      buttonRef.current[id].innerText = "Edit";
      dispatch(updateOrder({ id, statsField }));
    }
    if (!selectRef.current[id].disabled)
      buttonRef.current[id].innerText = "Save";
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setStatsField(e.target.value);
  };

  const { showModal, form, allOrders, status } = useSelector(
    (state) => state.order
  );
  const { allCustomCakes, customCake, customCakeModal } = useSelector(
    (state) => state.customCake
  );

  useEffect(() => {
    dispatch(getAllOrders(status));
    dispatch(fetchAllCustomCake(status));
  }, [status]);

  const navigate = (e, stats) => {
    dispatch(orderActions.setStatus(stats));
    dispatch(getAllOrders(stats));
    dispatch(fetchAllCustomCake(stats));
  };

  const viewOrder = (e, id) => {
    e.preventDefault();
    dispatch(getOrder(id));
    dispatch(orderActions.setShowModal(true));
  };

  const viewCustomOrder = (e, id) => {
    e.preventDefault();
    dispatch(getCustomCake(id));
    dispatch(customCakeActions.setCustomCakeModal(true));
  };

  return (
    <>
      {showModal && (
        <ViewProductModal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={status}
          message={
            "Item added to cart. The seller will update the price for this customize cake."
          }
          button={"Okay"}
          actions={orderActions}
        />
      )}

      {customCakeModal && <CustomCakeModal />}

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
                          {item.status}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={(e) => viewOrder(e, item.id)}
                            className="text-green-500 hover:text-red-700 mr-3"
                            href="#"
                            id={item.id}
                            ref={(el) => (buttonRef.current[item.id] = el)}
                          >
                            View
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

                        <td className="px-6 py-4 text-sm text-indigo-800 font-bold whitespace-nowrap">
                          Customize
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity * item.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={(e) => viewCustomOrder(e, item.id)}
                            className="text-green-500 hover:text-red-700 mr-3"
                            href="#"
                            id={item.id}
                            ref={(el) => (buttonRef.current[item.id] = el)}
                          >
                            View
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
