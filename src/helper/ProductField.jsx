import {
  FaImage,
  FaUser,
  FaCoins,
  FaVrCardboard,
  FaAudioDescription,
} from "react-icons/fa";

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
    dropdown: ["Cakes", "Beverages", "Pastries"],
  },
  {
    ph: "Price (php)",
    icon: <FaCoins />,
    field: "price",
    type: "number",
  },
  {
    ph: "Description",
    icon: <FaAudioDescription />,
    field: "description",
  },
  {
    ph: "Image",
    icon: <FaImage />,
    field: "image",
    file: true,
  },
  {
    ph: "Best seller",
    icon: <FaImage />,
    field: "is_best_seller",
    options: ["No", "Yes"],
  },
];
