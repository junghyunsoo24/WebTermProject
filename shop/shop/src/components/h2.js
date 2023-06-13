import PizzaInfo from "./PizzaInfo";
import UserReview from "./UserReview";
import "./Review.css";

let Ukke = {
  pizzaId: 1,
  kName: "어깨피자",
  eName: "Ukke Pizza / Super star Alvolo Pizza",
  lPrice: 31500,
  rPrice: 27000,
  image: ["Ukke1.png", "Ukke2.jpg", "Ukke3.jpg"],
};

function Review({ info }) {
  console.log(":::::::::::::", info);
  return (
    <div className="review">
      <PizzaInfo pizzaData={Ukke} />
      <UserReview pizzaId={info.pizzaIdForReview} />
    </div>
  );
}

export default Review;
