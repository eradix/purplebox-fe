import React from "react";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import FormModal from "../components/FormModal";
import { orderFields } from "../helper/OrderField";
import { orderActions } from "../store/order-slice";

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

  const showModal = useSelector((state) => state.order.showModal);
  const dispatch = useDispatch();

  const form = useSelector((state) => state.order.form);

  const editOrder = () => {
    dispatch(orderActions.setShowModal(true));
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
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        Charles Pitagan
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <img src={almond} className="w-24 h-24" alt="" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        Black Forest
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        2
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        1200.00
                      </td>
                      <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                        Pending
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={editOrder}
                          className="text-green-500 hover:text-red-700 mr-3"
                          href="#"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
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
