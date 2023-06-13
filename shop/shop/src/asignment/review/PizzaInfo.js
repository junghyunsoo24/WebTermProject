import { useEffect, useState, useRef } from "react";
import "./PizzaInfo.css";
import { arrayContentsToString, makeHttpRequest } from "../../components/util";
import MainHeader from "../../MainPage/js/MainHeader";

async function searchPizza(pizzaId) {
  console.log("**************", pizzaId);
  return makeHttpRequest(
    "http://localhost:3001/searchPizza",
    { "Content-Type": "application/json" },
    {
      pizzaId: pizzaId,
    }
  );
}

function PizzaInfo({ info }) {
  const slideRef = useRef(null);
  const dotContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  // function resetTimeout() {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

  function addImage(img) {
    return <img className="slider" src={img} alt="" />;
  }

  function priceFormatting(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // useEffect(() => {
  //   dotContainerRef.current.children[currentSlide].classList.add("active");
  //   timeoutRef.current = setTimeout(() => {
  //     setCurrentSlide((prevIdx) =>
  //       prevIdx === slideLength - 1 ? 0 : prevIdx + 1
  //     );
  //     let changedIdx = currentSlide === slideLength - 1 ? 0 : currentSlide + 1;
  //     dotContainerRef.current.children[currentSlide].classList.remove("active");
  //     dotContainerRef.current.children[changedIdx].classList.add("active");
  //     slideRef.current.style.transform = `translateX(-${changedIdx}00%)`;
  //   }, 4000);

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [currentSlide]);
  console.log("hello", info.pizzaIdForReview);
  const [result, setResult] = useState({});

  useEffect(() => {
    console.log("2asdqweqwrasfasf", info.pizzaIdForReview);
    searchPizza(info.pizzaIdForReview).then((req) => {
      setResult({
        pizzaId: req[0].id,
        kName: req[0].name_kor,
        eName: req[0].name_eng,
        lPrice: req[0].l_price,
        rPrice: req[0].r_price,
        image: req[0].image,
      });
    });
    console.log("asdqweqwrasfasf", result);
  }, []);

  return (
    <div className="pizza_menu">
      <div className="slide_container">
        <div className="pizza_slide" ref={() => slideRef}>
          {addImage(result.image)}
        </div>
        <div className="dot_container" ref={() => dotContainerRef}>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      <div className="pizza_info">
        <div className="pizza_name">{result.kName}</div>
        <div className="pizza_name_e">{result.eName}</div>
        <div className="pizza_price">
          <span className="blue">L</span>
          <span className="black">{result.lPrice}</span>
          <span className="blue">R</span>
          <span className="black">{result.rPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default PizzaInfo;
