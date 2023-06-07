import OrderHistory from './OrderHistory';
import EnrollReview from './EnrollReview';
import ShowEnrollReviewResult from './ShowEnrollReviewResult';
import NavigationMyPage from './NavigationMyPage';
import {Fragment, useState} from "react";

function OrderHistoryReview() {
    let [enrollClick, setEnrollClick] = useState(false);
    let [reviewEnroll, setReviewEnroll] = useState(false);
    let [menu, setMenu] = useState({
        menuNames:[],
        menuIds:[],
        ratings: [],
        reviews: []        
    })
    return (
        <Fragment>
            <NavigationMyPage></NavigationMyPage>
            {orderHistory(enrollClick, setEnrollClick, reviewEnroll, setReviewEnroll, menu, setMenu)}
            {enrollReview(enrollClick, setEnrollClick, menu, setMenu)}
            {showReview(reviewEnroll, menu, setMenu)}
        </Fragment>      
    );
  }
  function orderHistory(enrollClick, setEnrollClick, reviewEnroll, setReviewEnroll, menu, setMenu) {
    return (
        <OrderHistory 
        menu={menu}
        setMenu={setMenu}
        click={enrollClick} 
        handleClick={setEnrollClick} 
        showReviewClick={reviewEnroll} 
        handleShowReviewClick={setReviewEnroll}
        />
        );
    }

  function enrollReview(enrollClick, setEnrollClick, menu, setMenu) {
    return(
        <Fragment>
                {(enrollClick)?
                    <EnrollReview click={enrollClick} handleClick={setEnrollClick} menu={menu} setMenu={setMenu}/>
                    :<Fragment/>}
        </Fragment>
    );
}

function showReview(reviewEnroll, menu, setMenu) {
    return(
        (reviewEnroll)?
            <ShowEnrollReviewResult menu={menu} setMenu={setMenu}/>
            :<Fragment/>
    );
}
  
  export default OrderHistoryReview;
