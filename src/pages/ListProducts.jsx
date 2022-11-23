import React from "react";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import FormModal from "../components/FormModal";
import { productFields } from "../helper/ProductField";
import { productActions } from "../store/product-slice";

const ListProducts = () => {
  const header = ["Image", "Name", "Price", "Actions"];

  const showModal = useSelector((state) => state.product.showModal);
  const dispatch = useDispatch();

  const form = useSelector((state) => state.product.form);
  const edit = useSelector((state) => state.product.edit);

  const editProduct = () => {
    dispatch(productActions.setEdit(true));
    dispatch(productActions.setShowModal(true));
  };

  return (
    <>
      {showModal && (
        <FormModal
          addTitle={"Add Product"}
          updateTitle={"Update Product"}
          fields={productFields}
          actions={productActions}
          form={form}
          edit={edit}
        />
      )}

      <div className=" md:pr-10 md:pl-5 md:w-9/12">
        <div className="flex justify-between">
          <div className="flex items-center font-bold cursor-pointer text-xl mb-3">
            <p>Product Management</p>
          </div>
          <button
            onClick={() => dispatch(productActions.setShowModal(true))}
            className="py-2 px-4 bg-indigo-500 text-white rounded"
          >
            Add Product
          </button>
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <img src={almond} className="w-24 h-24" alt="" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        Black Forest
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        1200.00
                      </td>

                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={editProduct}
                          className="text-green-500 hover:text-red-700 mr-3"
                          href="#"
                        >
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700" href="#">
                          Delete
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

export default ListProducts;
