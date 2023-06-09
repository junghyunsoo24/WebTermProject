import PizzaInfo from "./PizzaInfo";
import UserReview from "./UserReview";
import "./Review.css";

function Review(props) {
  return (
    <div className="review">
      <PizzaInfo pizzaData={props.pizzaData} />
      <UserReview pizzaId={props.pizzaData.PizzaId} />
    </div>
  );
}

export default Review;
