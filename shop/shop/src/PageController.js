import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import OrderHistoryReview from './components/OrderHistoryReview';
import UserUpdateUserInfoPage from './components/UserUpdateUserInfoPage';
import PizzaComponent from './components/PizzaComponets';

const PageController = () => {
  return (
    <div className='PageController'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pizza" element={<PizzaComponent />} />
          <Route path="/orderHistoryReview" element={<OrderHistoryReview/>} />
          <Route path="/userUpdateUserInfoPage" element={<UserUpdateUserInfoPage/>} />
          
          
          <Route path="*" element={<MainPage />} />
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
