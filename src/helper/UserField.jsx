import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaAddressBook,
  FaAdjust,
} from "react-icons/fa";

export const userFields = [
  {
    ph: "FirstName",
    icon: <FaUser />,
    field: "first_name",
  },
  {
    ph: "MiddleName",
    icon: <FaUser />,
    field: "middle_name",
  },
  {
    ph: "LastName",
    icon: <FaUser />,
    field: "last_name",
  },
  {
    ph: "Address",
    icon: <FaAddressBook />,
    field: "address",
  },
  {
    ph: "Role",
    icon: <FaAdjust />,
    field: "role",
    dropdown: "role-dropdown"
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
