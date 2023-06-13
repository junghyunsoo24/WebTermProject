import "./UserReview.css";
import { arrayContentsToString, makeHttpRequest } from "../../components/util";
import { useEffect, useState } from "react";

async function searchReview(pizzaId) {
  console.log("??????", pizzaId);
  return makeHttpRequest(
    "http://127.0.0.1:3001/searchReview",
    { "Content-Type": "application/json" },
    { pizzaId: pizzaId }
  );
}

function RatingStar(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) stars += "⭐";
  return stars;
}

function MakeReviewItem(info) {
  console.log("rating: " + info.rating);
  console.log("rating: " + info.contents);
  console.log("rating: " + info.userId);
  return (
    <div className="review_card">
      <div className="rating">{RatingStar(info.rating)}</div>
      <div className="contents">{info.contents}</div>
      <div className="writer">{info.userId}</div>
    </div>
  );
}

function UserReview({ pizzaId }) {
  console.log("...............", pizzaId);
  const [reviews, setReviews] = useState([]);
  const review = [];
  useEffect(() => {
    console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");
    // console.log("1111111111111");

    searchReview(pizzaId).then((req) => {
      console.log("1111111111111", req);
      req.forEach((element) => {
        console.log(element.user_id);
        console.log(element.description);
        console.log(element.rating);
        review.push({
          userId: element.user_id,
          contents: element.description,
          rating: element.rating,
        });
      });
      setReviews(review);
    });
  }, []);

  return (
    <div className="review_container">
      <div className="review_header">
        <div className="rating">별점</div>
        <div className="contents">리뷰</div>
        <div className="writer">작성자</div>
      </div>
      <div className="review_body">{reviews.map(MakeReviewItem)}</div>
    </div>
  );
}

export default UserReview;
