import { FaUser, FaLock, FaEnvelope, FaAddressBook } from "react-icons/fa";

export const userFields = [
  {
    ph: "FirstName",
    icon: <FaUser />,
    field: "firstName",
  },
  {
    ph: "MiddleName",
    icon: <FaUser />,
    field: "middleName",
  },
  {
    ph: "LastName",
    icon: <FaUser />,
    field: "lastName",
  },
  {
    ph: "Address",
    icon: <FaAddressBook />,
    field: "address",
  },
  {
    ph: "Email",
    icon: <FaEnvelope />,
    field: "email",
  },
  {
    ph: "Password",
    icon: <FaLock />,
    field: "password",
  },
];
