import Review from "./review/Review";
import ShoppingCart from "./shopping_cart/ShoppingCart";

function AsignmentMain() {
  let shrimpHot = {
    pizzaId: 0,
    kName: "쉬림프&핫치킨골드피자",
    eName: "Shrimp & Hot Chicken Gold",
    lPrice: 34500,
    rPrice: 29000,
    image: ["ShrimpHot1.png", "ShrimpHot2.jpg", "ShrimpHot3.jpg"],
  };

  let Ukke = {
    pizzaId: 1,
    kName: "어깨피자",
    eName: "Ukke Pizza / Super star Alvolo Pizza",
    lPrice: 31500,
    rPrice: 27000,
    image: ["Ukke1.png", "Ukke2.jpg", "Ukke3.jpg"],
  };

  return (
    // <Review pizzaData={shrimpHot} />
    <ShoppingCart userId={""} />
  );
}

export default AsignmentMain;
