import React from "react";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import { DotLoader } from "react-spinners";

const Account = () => {
  const header = [
    "Account #",
    "Firstname",
    "Middlename",
    "Lastname",
    "Email",
    "Address",
    "Edit",
    "Delete",
  ];
  const { data, isPending, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/api/admin/users?offSet=0&pageSize=8`
  );

  return (
    <>
      <div className="md:w-4/5 md:mt-24 md:pr-10 md:pl-5">
        <div className="ml-2">
          <h1 className="font-bold text-xl mb-3">Manage Accounts</h1>
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
                      <td>
                        <div
                          className={`bg-gray-200 absolute w-full h-full flex justify-center items-center transition-all duration-1000 ${
                            isPending ? "" : "opacity-0"
                          }`}
                        >
                          <DotLoader
                            color={"#000000"}
                            loading={isPending}
                            size={40}
                          />
                        </div>
                      </td>
                    </tr>
                    {data ? (
                      <>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {item.accountNumber ? item.accountNumber : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.firstName ? item.firstName : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.middleName ? item.middleName : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.lastName ? item.lastName : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.email ? item.email : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {item.address ? item.address : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700 "
                                href="#"
                              >
                                Edit
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                              <a
                                className="text-red-500 hover:text-red-700"
                                href="#"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>
                            <div className="text-center py-4">
                              <p className="text-gray-500">No Accounts Found</p>
                            </div>
                          </td>
                        </tr>
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

export default Account;
