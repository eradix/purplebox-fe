import { FaImage, FaUser, FaDollarSign, FaVrCardboard } from "react-icons/fa";

export const productFields = [
  {
    ph: "Name",
    icon: <FaUser />,
    field: "name",
  },
  {
    ph: "Type",
    icon: <FaVrCardboard />,
    field: "type",
    dropdown: ["Cakes", "Drinks", "Pastries"],
  },
  {
    ph: "Price",
    icon: <FaDollarSign />,
    field: "price",
  },
  {
    ph: "Image",
    icon: <FaImage />,
    field: "image",
    file: true,
  },
];
