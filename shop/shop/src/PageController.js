import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import OrderHistory from './components/EnrollReview';
import NavigationMyPage from './components/NavigationMyPage';
import OrderHistoryReview from './components/OrderHistoryReview';
import ShowEnrollReviewResult from './components/ShowEnrollReviewResult';
import UserUpdateUserInfoPage from './components/UserUpdateUserInfoPage';

const PageController = () => {
  return (
    <div className='PageController'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/orderHistory" element={<OrderHistory/>} />
          <Route path="/navigationMyPage" element={<NavigationMyPage/>} />
          <Route path="/orderHistoryReview" element={<OrderHistoryReview/>} />

          <Route path="/showEnrollReviewResult" element={<ShowEnrollReviewResult/>} />
          <Route path="/userUpdateUserInfoPage" element={<UserUpdateUserInfoPage/>} />
          <Route path="*" element={<MainPage />} />
        </Routes>

    </div>
  );
};

export default PageController;

