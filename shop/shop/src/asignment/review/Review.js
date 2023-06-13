import PizzaInfo from "./PizzaInfo";
import UserReview from "./UserReview";
import "./Review.css";
import { arrayContentsToString, makeHttpRequest } from "../../components/util";
import { useEffect, useState, useRef } from "react";
import React from "react";
import MainHeader from "../../MainPage/js/MainHeader";

async function searchPizza(pizzaId) {
  console.log("**************", pizzaId);
  return makeHttpRequest(
    "http://127.0.0.1:3001/searchPizza",
    { "Content-Type": "application/json" },
    {
      pizzaId: pizzaId,
    }
  );
}

function Review({ info, setInfo }) {
  // console.log("hello", info.pizzaIdForReview);
  // const [result, setResult] = useState();
  // const [count, setCount] = useState(0);
  // if (count == 0) {
  //   setCount(count + 1);
  //   console.log(2, "********************");
  // }

  // useEffect(() => {
  //   console.log("100,********************");
  //   searchPizza(info.pizzaIdForReview).then((req) => {
  //     console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;");
  //     setResult({
  //       pizzaId: req[0].id,
  //       kName: req[0].name_kor,
  //       eName: req[0].name_eng,
  //       lPrice: req[0].l_price,
  //       rPrice: req[0].r_price,
  //       image: req[0].image,
  //     });
  //   });
  //   console.log("asdqweqwrasfasf", result);
  // }, []);

  return (
    <div className="review">
      <MainHeader></MainHeader>
      <PizzaInfo info={info} />
      {/* <PizzaInfo pizzaData={result} /> */}
      <UserReview pizzaId={info.pizzaIdForReview} />
    </div>
  );
}

export default Review;
