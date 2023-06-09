import { useEffect, useState, useRef } from "react";
import "./PizzaInfo.css";

function PizzaInfo(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const dotContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const slideLength = props.pizzaData.image.length;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function addImage(imgs, length) {
    const images = [];

    for (let i = 0; i < length; i++) {
      let img = require(`../img/${imgs[i]}`);
      images.push(<img className="slider" src={img} alt="" />);
    }

    return <>{images}</>;
  }

  function priceFormatting(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    dotContainerRef.current.children[currentSlide].classList.add("active");
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prevIdx) =>
        prevIdx === slideLength - 1 ? 0 : prevIdx + 1
      );
      let changedIdx = currentSlide === slideLength - 1 ? 0 : currentSlide + 1;
      dotContainerRef.current.children[currentSlide].classList.remove("active");
      dotContainerRef.current.children[changedIdx].classList.add("active");
      slideRef.current.style.transform = `translateX(-${changedIdx}00%)`;
    }, 4000);

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  return (
    <div className="pizza_menu">
      <div className="slide_container">
        <div className="pizza_slide" ref={slideRef}>
          {addImage(props.pizzaData.image, slideLength)}
        </div>
        <div className="dot_container" ref={dotContainerRef}>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      <div className="pizza_info">
        <div className="pizza_name">{props.pizzaData.kName}</div>
        <div className="pizza_name_e">{props.pizzaData.eName}</div>
        <div className="pizza_price">
          <span className="blue">L</span>
          <span className="black">
            {priceFormatting(props.pizzaData.lPrice)}
          </span>
          <span className="blue">R</span>
          <span className="black">
            {priceFormatting(props.pizzaData.rPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PizzaInfo;
