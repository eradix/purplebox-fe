import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../components/FormModal";
import { userActions } from "../store/user-slice";
import { userFields } from "../helper/UserField";
import useFetch from "../hooks/useFetch";

const User = () => {
  const header = ["Name", "Address", "Email", "Actions"];

  const showModal = useSelector((state) => state.user.showModal);
  const dispatch = useDispatch();

  const form = useSelector((state) => state.user.form);
  const edit = useSelector((state) => state.user.edit);

  const editUser = () => {
    dispatch(userActions.setEdit(true));
    dispatch(userActions.setShowModal(true));
  };

  const { data, isPending, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/users`
  );

  return (
    <>
      {showModal && (
        <FormModal
          addTitle={"Add Account"}
          updateTitle={"Update Account"}
          fields={userFields}
          actions={userActions}
          form={form}
          edit={edit}
        />
      )}

      <div className=" md:pr-10 md:pl-5 md:w-9/12 mt-3 md:mt-0">
        <div className="flex justify-between">
          <div className="flex items-center font-bold cursor-pointer text-xl mb-3">
            <p>Users Management</p>
          </div>
          <button
            onClick={() => dispatch(userActions.setShowModal(true))}
            className="py-2 px-4 bg-indigo-500 text-white rounded"
          >
            Add User
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
                    {data && (
                      <>
                        {data.data.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {item.first_name + " " + item.last_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.address}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.email}
                            </td>

                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                              <button
                                onClick={() => editUser()}
                                className="text-green-500 hover:text-red-700 mr-3"
                                href="#"
                              >
                                Edit
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                href="#"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
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

export default User;
