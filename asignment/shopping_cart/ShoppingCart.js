import { useEffect, useState, useRef } from "react";
import "./ShoppingCart.css";

let items = [
  {
    pizzaId: 0,
    kName: "쉬림프&핫치킨골드피자",
    eName: "Shrimp & Hot Chicken Gold",
    lPrice: 34500,
    rPrice: 29000,
    selected: "L",
    quantity: 1,
    image: "ShrimpHot_main.png",
  },
  {
    pizzaId: 1,
    kName: "어깨피자",
    eName: "Ukke Pizza / Super star Alvolo Pizza",
    lPrice: 31500,
    rPrice: 27000,
    selected: "R",
    quantity: 2,
    image: "Ukke_main.png",
  },
];

function priceFormatting(input) {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ShoppingCart(props) {
  const orderBtn = useRef(null);
  const [totalPrice, setTotalPrice] = useState(() => {
    let total = 0;
    items.map((item) => {
      total +=
        item.selected === "L"
          ? item.lPrice * item.quantity
          : item.rPrice * item.quantity;
    });
    return total;
  });

  function MakeShoppingItem(info) {
    const [option, setOption] = useState(info.selected);
    const [quantity, setQuantity] = useState(info.quantity);
    const shoppingItem = useRef(null);
    const minusBtn = useRef(null);
    const plusBtn = useRef(null);
    const changeBtn = useRef(null);
    let itemPrice =
      option === "L" ? info.lPrice * quantity : info.rPrice * quantity;

    function onMinusBtnClicked() {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        option === "L"
          ? setTotalPrice(totalPrice - info.lPrice)
          : setTotalPrice(totalPrice - info.rPrice);
      }
    }

    function onPlusBtnClicked() {
      if (quantity < 10) {
        setQuantity(quantity + 1);
        option === "L"
          ? setTotalPrice(totalPrice + info.lPrice)
          : setTotalPrice(totalPrice + info.rPrice);
      }
    }

    function onOptionBtnClicked() {
      if (option === "L") {
        setOption("R");
        setTotalPrice(totalPrice - itemPrice + info.rPrice * quantity);
      } else {
        setOption("L");
        setTotalPrice(totalPrice - itemPrice + info.lPrice * quantity);
      }
    }

    function onCancelBtnClicked() {
      setQuantity(0);
      setTotalPrice(totalPrice - itemPrice);
      shoppingItem.current.style = "display: none";
    }

    useEffect(() => {
      if (quantity >= 10) {
        plusBtn.current.style = "cursor: not-allowed";
      } else if (quantity <= 1) {
        minusBtn.current.style = "cursor: not-allowed";
      } else {
        plusBtn.current.style = "cursor: pointer";
        minusBtn.current.style = "cursor: pointer";
      }
    }, [quantity]);

    return (
      <div className="shopping_item" ref={shoppingItem}>
        <div className="menu">
          <img
            className="menu_img"
            src={require(`../img/${info.image}`)}
            alt="menu_image"
          ></img>
          <div className="menu_info">
            <div className="menu_name">{info.kName}</div>
            <div className="menu_option">
              <span>{option}</span>
            </div>
            <div
              className="blue_btn option_change"
              onClick={onOptionBtnClicked}
            >
              옵션변경
            </div>
          </div>
        </div>
        <div className="quantity">
          <img
            src="data:image/svg+xml;base64,PHN2ZyBpZD0iXy0iIGRhdGEtbmFtZT0iLSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2NjYzsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjMwIiBjeT0iMzAiIHI9IjMwIi8+CiAgPHJlY3QgY2xhc3M9ImNscy0yIiB4PSIxOCIgeT0iMjkiIHdpZHRoPSIyNSIgaGVpZ2h0PSIzIi8+Cjwvc3ZnPgo="
            alt="plus button"
            class="minus_btn"
            ref={minusBtn}
            onClick={onMinusBtnClicked}
          />
          <div>{quantity}</div>
          <img
            src="data:image/svg+xml;base64,PHN2ZyBpZD0iXyIgZGF0YS1uYW1lPSIrIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MiIgaGVpZ2h0PSI2MiIgdmlld0JveD0iMCAwIDYyIDYyIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICAgIHN0cm9rZTogIzQxYjZlNjsKICAgICAgICBzdHJva2Utd2lkdGg6IDJweDsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTMgewogICAgICAgIGZpbGw6ICM0MWI2ZTY7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjMxIiBjeT0iMzEiIHI9IjMwIi8+CiAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjI4LDg2N2gyNXYzSDYyOHYtM1ptMTEtMTFoM3YyNWgtM1Y4NTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjA5IC04MzcpIi8+CiAgPHJlY3QgaWQ9IuyCrOqwge2YlV8yIiBkYXRhLW5hbWU9IuyCrOqwge2YlSAyIiBjbGFzcz0iY2xzLTMiIHg9IjMwIiB5PSIzMCIgd2lkdGg9IjMiIGhlaWdodD0iMyIvPgo8L3N2Zz4K"
            alt="minus button"
            class="plus_btn"
            ref={plusBtn}
            onClick={onPlusBtnClicked}
          />
        </div>
        <div className="price">{`${priceFormatting(itemPrice)}원`}</div>
        <div className="change">
          <div className="blue_btn" ref={changeBtn}>
            변경저장
          </div>
        </div>
        <div className="cancel" onClick={onCancelBtnClicked}>
          ✕
        </div>
      </div>
    );
  }

  return (
    <div className="shopping_cart">
      <div className="shopping_cart_header">장바구니</div>
      <div className="shopping_list">
        <div className="shopping_list_header">
          <div className="menu">메뉴</div>
          <div className="quantity">수량</div>
          <div className="price">가격</div>
          <div className="change">변경</div>
          <div className="cancel">삭제</div>
        </div>
        <div className="shopping_list_body">{items.map(MakeShoppingItem)}</div>
        <div className="shopping_list_total">
          <div className="total">합계</div>
          <div className="cost">
            총 <span>{priceFormatting(totalPrice)}</span>원
          </div>
        </div>
        <div className="order blue_btn" ref={orderBtn}>
          주문하기
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
