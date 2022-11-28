import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TextBox from "./TextBox";
import { useDispatch } from "react-redux";
import { fetchUsers, saveUser, updateUser } from "../store/user-slice";
import { saveProduct } from "../store/product-slice";

const FormModal = ({ addTitle, updateTitle, fields, actions, form, edit }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(actions.setForm({ name, value }));
  };

  // useEffect(() => {
  //   dispatch(actions.resetForm())
  // }, [])

  const closeModal = () => {
    dispatch(actions.setShowModal(false));
    dispatch(actions.setEdit(false));
  };

  const save = () => {
    if (addTitle.includes("User")) dispatch(saveUser(form));
    else if (addTitle.includes("Product")) dispatch(saveProduct(form));
  };

  const update = () => {
    dispatch(updateUser(form));
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    dispatch(actions.updateRole(value));
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-100px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-12 flex flex-col justify-center w-4/12"
        >
          <p className="font-bold text-2xl text-gray-900 mb-3">
            {edit ? updateTitle : addTitle}
          </p>

          <div>
            {fields.map((item, index) => (
              <div key={index} className="mb-2">
                {!item.file && !item.dropdown && (
                  <TextBox
                    placeholder={item.ph}
                    icon={item.icon}
                    field={item.field}
                    value={form[item.field]}
                    handleChange={handleChange}
                  />
                )}
                {item.file && (
                  <input
                    type="file"
                    placeholder="Upload Image"
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  />
                )}

                {item.dropdown && (
                  <select
                    name="role"
                    value={form.field}
                    onChange={(e) => handleSelect(e)}
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  >
                    <option value="Select Status">Select {item.ph}</option>
                    {item.dropdown.map((data, id) => (
                      <>
                        <option key={id} value={data}>
                          {data}
                        </option>
                      </>
                    ))}
                  </select>
                )}

                {item.dropdown === "dropdown" && (
                  <select
                    name="cars"
                    id="cars"
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  >
                    <option defaultValue="Select Status">Select Status</option>
                    <option value="saab">To Pay</option>
                    <option value="mercedes">Pending</option>
                    <option value="audi">Completed</option>
                  </select>
                )}
              </div>
            ))}

            <div className="text-right mt-3">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              {!edit ? (
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                  onClick={save}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={update}
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormModal;
