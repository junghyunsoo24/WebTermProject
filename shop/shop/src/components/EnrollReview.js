import {Fragment, useState, useEffect} from "react";
import {arrayContentsToString, makeHttpRequest} from "./util";

async function enrollReview(userId, pizzaId, rating, contents) {
    const review = {   
        userId: userId,
        pizzaId : pizzaId,
        rating : rating,
        contents : contents
    }
    return makeHttpRequest('http://127.0.0.1:3001/enrollReview',
                            {'Content-Type': 'application/json'},
                            review
                           );
}

function OrderHistory(props) {
    let [index, setIndex] = useState(0);
    let [starRating, setStarRating] = useState(1);
    let [review, setReview] = useState("");
    return (
        makeHtml(props, starRating, setStarRating, index, setIndex, review, setReview)
    );
  }
function makeHtml(props, starRating, setStarRating, index, setIndex, review, setReview) {
    return (<Fragment>
            <div className="enter-review">
            <button className="star-rating"
            onClick={() => {
                setStarRating((starRating - 1 >= 0)?starRating - 1: starRating);
                console.log(starRating);
            }}
            >
            -
            </button>
            {starRating}
            <button className="star-rating"
            onClick={() => {
                setStarRating((starRating + 1 <= 5) ? starRating + 1: starRating);
                console.log(starRating);
            }}
            >
            +
            </button>
            <label for="reviewLabel">메뉴명 : {(props.menu.menuNames.length > index)?props.menu.menuNames[index]:" 리뷰 등록할 메뉴 없음"} - Review :</label>
            <input type="text" id="review" name="review" onChange={(e) => setReview(e.target.value)}/>
            <button 
                onClick={() => {
                    setIndex(index + 1);
                    setStarRating(0);
                    (!props.click || props.menu.menuNames.length > index + 1)?props.handleClick(true):props.handleClick(false);
                    const userId = 7;
                    const pizzaId = 7;
                    const rating = starRating;
                    const contents = review;
                    enrollReview(userId, pizzaId, rating, contents);
                    props.setMenu({
                        ...props.menu,
                        ratings: [...props.menu.ratings, starRating],
                        reviews: [...props.menu.reviews, contents]
                      });
                    console.log(props)
            }}
            >
            등록
            </button>
        </div>
    </Fragment>);
}
  export default OrderHistory;
