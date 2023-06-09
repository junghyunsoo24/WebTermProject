import "./UserReview.css";

let reviews = [
  { userId: "tmpId1", contents: "너무 맛있어요.", rating: 5 },
  { userId: "tmpId2", contents: "별로에요.", rating: 1 },
  { userId: "tmpId3", contents: "그냥 그래요.", rating: 3 },
  { userId: "tmpId4", contents: "토핑이 많네요. 좋아요.", rating: 4 },
];

function RatingStar(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) stars += "⭐";
  return stars;
}

function MakeReviewItem(info) {
  return (
    <div className="review_card">
      <div className="rating">{RatingStar(info.rating)}</div>
      <div className="contents">{info.contents}</div>
      <div className="writer">{info.userId}</div>
    </div>
  );
}

function UserReview(props) {
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
