import React from "react";
import TooltipLight from "./TooltipLight";
import TooltipDark from "./TooltipDark";
import { dark, light } from "../data";

export default function Tooltips() {
  const [cards, setCards] = React.useState(() => {
    const initialCards = {};
    dark.forEach((item) => {
      initialCards[item.id] = {
        title: `Archive notes`,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
      };
    });
    return initialCards;
  });
  const [blocks, setBlocks] = React.useState(() => {
    const initialBlocks = {};
    light.forEach((item) => {
      initialBlocks[item.id] = {
        title: `Archive notes`,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
      };
    });
    return initialBlocks;
  });
  

  const updateCard = (id, field, value) => {
    setCards((prevCards) => ({
      ...prevCards,
      [id]: {
        ...prevCards[id],
        [field]: value,
      },
    }));
  };
  const updateBlock = (id, field, value) => {
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      [id]: {
        ...prevBlocks[id],
        [field]: value,
      },
    }));
  };
  return (
    <div className="tooltips">
      <div className="tooltips-titles">
        <h2 className="title-one">Tooltips</h2>
        <h3 className="title-two">two styles, bold and light</h3>
      </div>
      <div className="tooltips-block">
        <div className="tooltips-item">
          <h4 className="color-title">Bold</h4>
          <TooltipDark cards={cards} updateCard={updateCard} />
        </div>
        <div className="tooltips-item">
          <h4 className="color-title">Light</h4>
          <TooltipLight blocks={blocks} updateBlock={updateBlock} />
        </div>
      </div>
    </div>
  );
}
