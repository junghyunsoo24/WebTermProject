import { Link } from "react-router-dom";
import MainHeader from "../MainPage/js/MainHeader";

function NavigationMyPage() {
  return (
    <div>
      <MainHeader></MainHeader>
      <div className="nav">
        <div>
          <Link to="/mainPage">
            <h1>마이페이지</h1>
          </Link>

          <ul>
            <Link to="/orderHistory">
              <li>주문 내역</li>
            </Link>
            <li>MY CLASS</li>
            <li>비행기 스탬프</li>
            <Link to="/infoUpdate">
              <li>정보 수정</li>
            </Link>
            <li>쿠폰함</li>
            <li>회원 탈퇴</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavigationMyPage;
