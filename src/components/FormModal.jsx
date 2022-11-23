import React from "react";
import { motion } from "framer-motion";
import TextBox from "./TextBox";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { userFields } from "../helper/UserField";

const FormModal = () => {
  const form = useSelector((state) => state.user.form);
  const edit = useSelector((state) => state.user.edit);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(userActions.setForm({ name, value }));
  };

  const closeModal = () => {
    dispatch(userActions.setShowModal(false));
    dispatch(userActions.setEdit(false));
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-100px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-24 flex flex-col justify-center w-6/12"
        >
          <p className="font-bold text-2xl text-gray-900 mb-3">
            {edit ? "Edit Account" : "Add Account"}
          </p>

          <div>
            {userFields.map((item, index) => (
              <div key={index} className="mb-2">
                <TextBox  
                  placeholder={item.ph}
                  icon={item.icon}
                  field={item.field}
                  value={form[item.field]}
                  handleChange={handleChange}
                />
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
                <button className="bg-indigo-500 text-white py-2 px-4 rounded">
                  Save
                </button>
              ) : (
                <button className="bg-indigo-500 text-white py-2 px-4 rounded">
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
