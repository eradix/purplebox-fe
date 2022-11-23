import { FaImage, FaUser, FaDollarSign } from "react-icons/fa";

export const productFields = [
  {
    ph: "Image",
    icon: <FaImage />,
    field: "image",
    file: true
  },
  {
    ph: "Name",
    icon: <FaUser />,
    field: "name",
  },
  {
    ph: "Price",
    icon: <FaDollarSign />,
    field: "price",
  },
];
