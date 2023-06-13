import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import OrderHistoryReview from "./components/OrderHistoryReview";
import UserUpdateUserInfoPage from "./components/UserUpdateUserInfoPage";
import PizzaComponent from "./components/PizzaComponets";
import Review from "./asignment/review/Review";
import ShoppingCart from "./asignment/shopping_cart/ShoppingCart";
import Login from "./components/Login";

const PageController = () => {
  console.log("===========================", 20);
  const userInfo = {
    id: -1,
    recentOrderId: -1, // 예성님 업데이트 성률 사용
    pizzaIds: [], // 현수 업데이트 예성님 사용
  };
  const [info, setInfo] = useState(userInfo);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className="PageController">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login info={info} setInfo={setInfo} />} />
          <Route
            path="/mainPage"
            element={<MainPage info={info} setInfo={setInfo} />}
          />
          <Route
            path="/pizza"
            element={<PizzaComponent info={info} setInfo={setInfo} />}
          />

          <Route
            path="/orderHistory"
            element={<OrderHistoryReview info={info} setInfo={setInfo} />}
          />
          <Route
            path="/infoUpdate"
            element={<UserUpdateUserInfoPage info={info} setInfo={setInfo} />}
          />

          <Route
            path="/review"
            element={<Review info={info} setInfo={setInfo} />}
          />
          <Route
            path="/shoppingCart"
            element={<ShoppingCart info={info} setInfo={setInfo} />}
          />
          <Route
            path="*"
            element={<MainPage info={info} setInfo={setInfo} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageController;

/*
예성씨꺼 주소 할당 및 연결하면 됨
  <Route path="/" element={</>} />
          <Route path="/" element={</>} />
          
*/
