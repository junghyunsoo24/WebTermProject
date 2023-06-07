import {Fragment, useState} from "react";

function ShowEnrollReviewResult(props) {
      const viewReviews = () => {
        let result = [];
        for (let i = 0; i < props.menu.menuNames.length; i++){
          result.push(<div>메뉴명  {props.menu.menuNames[i]}  별점: {props.menu.ratings[i]}  내용: {props.menu.reviews[i]}</div>);
        }
        return result;
      }
    return (
        <div className="review-result">
        <h3>리뷰</h3>
        <div className="info-list">{viewReviews()}</div>
        </div>
    );
  }
  
  export default ShowEnrollReviewResult;
