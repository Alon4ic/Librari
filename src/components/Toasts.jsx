import React from "react";
import Toast from "./Toast";
import { styles } from "../data";

export default function Toasts() {
    const [cards, setCards] = React.useState(() => {
      const initialCards = {};

      Object.keys(styles).forEach((key) => {
        initialCards[key] = {
          text: styles[key].text,
        };
      });
      return initialCards;
    });

    const updateCard = (variant, field, value) => {
      setCards((prevCards) => ({
        ...prevCards,
        [variant]: {
          ...prevCards[variant],
          [field]: value,
        },
      }));
    };
  return (
    <div className="toasts">
      <h2 className="tosts-title">Toast Popups</h2>
      <div className="toasts-block">
        <Toast cards={cards} updateCard={updateCard} />
      </div>
    </div>
  );
}
