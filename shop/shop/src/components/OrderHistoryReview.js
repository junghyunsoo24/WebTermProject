import OrderHistory from "./OrderHistory";
import EnrollReview from "./EnrollReview";
import ShowEnrollReviewResult from "./ShowEnrollReviewResult";
import NavigationMyPage from "./NavigationMyPage";
import { Fragment, useState } from "react";

function OrderHistoryReview({ info }) {
  console.log("info------------", info);
  let [enrollClick, setEnrollClick] = useState(false);
  let [reviewEnroll, setReviewEnroll] = useState(false);
  let [menu, setMenu] = useState({
    menuNames: [],
    menuIds: [],
    ratings: [],
    reviews: [],
  });
  return (
    <Fragment>
      <NavigationMyPage></NavigationMyPage>
      {orderHistory(
        enrollClick,
        setEnrollClick,
        reviewEnroll,
        setReviewEnroll,
        menu,
        setMenu,
        info
      )}
      {enrollReview(enrollClick, setEnrollClick, menu, setMenu, info)}
      {showReview(reviewEnroll, menu, setMenu)}
    </Fragment>
  );
}
function orderHistory(
  enrollClick,
  setEnrollClick,
  reviewEnroll,
  setReviewEnroll,
  menu,
  setMenu,
  info
) {
  console.log("hello", info);
  return (
    <OrderHistory
      menu={menu}
      setMenu={setMenu}
      click={enrollClick}
      handleClick={setEnrollClick}
      showReviewClick={reviewEnroll}
      handleShowReviewClick={setReviewEnroll}
      orderedId={info.orderedId}
      userId={info.id}
    />
  );
}

function enrollReview(enrollClick, setEnrollClick, menu, setMenu, info) {
  return (
    <Fragment>
      {enrollClick ? (
        <EnrollReview
          click={enrollClick}
          handleClick={setEnrollClick}
          menu={menu}
          setMenu={setMenu}
          userId={info.userId}
          pizzas={info.pizzaIds}
        />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}

function showReview(reviewEnroll, menu, setMenu) {
  return reviewEnroll ? (
    <ShowEnrollReviewResult menu={menu} setMenu={setMenu} />
  ) : (
    <Fragment />
  );
}

export default OrderHistoryReview;
