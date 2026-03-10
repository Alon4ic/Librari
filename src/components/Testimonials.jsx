import React from "react";
import Testimonial from "./Testimonial";
import TestimonialWithoutPhoto from "./TestimonialWithoutPhoto";

export default function Testimonials() {
  const [card1, setCard1] = React.useState({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. ",
    name: "May Andersons",
    position: "Workcation, CTO",
    avatar: "../../images/avatar.jpg",
    alt: "Enter your avatar",
  });

  const [card2, setCard2] = React.useState({
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    name: "May Andersons",
    position: "Workcation, CTO",
    logo: "../../images/logo.svg",
    alt: "Enter your logo",
  });
  return (
    <div>
      <h2 className="banner-title">Testimonials</h2>
      <h3 className="multi-title">with pic</h3>
      <div className="testimonials-block">
        <Testimonial data={card1} setData={setCard1} />
      </div>
      <h3 className="multi-title">no pic</h3>
      <div className="testimonials-block">
        <TestimonialWithoutPhoto data={card2} setData={setCard2} />
      </div>
    </div>
  );
}
