import React, { useEffect, useState } from "react";
import "../App.css";
import { makeHttpRequest } from "./util";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MainHeader from "../MainPage/js/MainHeader";
async function practice() {
  return makeHttpRequest(
    "http://127.0.0.1:3001/practice",
    { "Content-Type": "application/json" },
    {}
  );
}

function PizzaComponent({ info, setInfo }) {
  let [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    practice().then((res) => {
      setPizzas(res);
    });
  }, []);

  useEffect(() => {
    document.getElementById("defaultTab").click();
  }, []);

  const itemsPerPage = 2;

  function openTab(evt, tabName) {
    // 탭 콘텐츠를 숨김
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // 활성 탭 버튼 스타일 변경
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";

    //선택한 탭 콘텐츠 표시
    document.getElementById(tabName).style.display = "block";

    // 메뉴 항목 로드 및 페이징
    var menuItems;
    switch (tabName) {
      case "all":
        menuItems = pizzas;
        setupPagination(
          menuItems,
          itemsPerPage,
          "allMenuItems",
          "allPagination"
        );
        break;
      case "craftsmanship":
        menuItems = pizzas.slice(0, 2);
        setupPagination(
          menuItems,
          itemsPerPage,
          "craftsmanshipMenuItems",
          "craftsmanshipPagination"
        );
        // removeSortingButton(); // '모두' 탭이 아닌 경우 정렬 버튼 제거

        break;
      case "expert":
        menuItems = pizzas.slice(2, 5);
        setupPagination(
          menuItems,
          itemsPerPage,
          "expertMenuItems",
          "expertPagination"
        );
        // removeSortingButton(); // '모두' 탭이 아닌 경우 정렬 버튼 제거
        break;
      case "luxury":
        menuItems = pizzas.slice(5, 8);
        setupPagination(
          menuItems,
          itemsPerPage,
          "luxuryMenuItems",
          "luxuryPagination"
        );
        // removeSortingButton(); // '모두' 탭이 아닌 경우 정렬 버튼 제거
        break;
    }
    addPizzaImageEvent();
  }

  function setupPagination(
    menuItems,
    itemsPerPage,
    menuContainerId,
    paginationContainerId
  ) {
    var menuContainer = document.getElementById(menuContainerId);
    var paginationContainer = document.getElementById(paginationContainerId);
  
    // 페이지 수 계산
    var totalPages = Math.ceil(menuItems.length / itemsPerPage);
  
    // 페이지 번호 버튼 생성
    paginationContainer.innerHTML = "";
    for (var i = 1; i <= totalPages; i++) {
      var button = document.createElement("button");
      button.innerHTML = i;
      button.addEventListener("click", function () {
        showMenuItems(menuItems, this.innerHTML, itemsPerPage, menuContainer);
      });
      paginationContainer.appendChild(button);

       // 버튼 스타일 조정
    button.style.padding = "10px 20px";  // 버튼 내부 여백 설정
    button.style.margin = "0 5px";       // 버튼 간격 설정
    button.style.border = "1px solid #ccc";  // 버튼 테두리 스타일 설정
    button.style.borderRadius = "5px";    // 버튼 테두리 둥글기 설정
    button.style.backgroundColor = "white";  // 버튼 배경색 설정
    button.style.color = "black";           // 버튼 글자색 설정
    button.style.cursor = "pointer";        // 버튼 커서 설정
    }
  
    // 컨테이너 가운데 정렬
    paginationContainer.style.display = "flex";
    paginationContainer.style.justifyContent = "center";
  
    // 초기 페이지 표시
    showMenuItems(menuItems, 1, itemsPerPage, menuContainer);
  }
  

  function showMenuItems(menuItems, page, itemsPerPage, menuContainer) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var currentPageItems = menuItems.slice(startIndex, endIndex);

    // 메뉴 컨테이너 내용 비우기
    menuContainer.innerHTML = "";

    // 현재 페이지 항목 표시
    for (let i = 0; i < currentPageItems.length; i++) {
      let menuItem = currentPageItems[i];

      let menuItemDiv = document.createElement("div");
      // menuItemDiv.className = "menu-item-image";

      let menuItemImage = document.createElement("img");
      menuItemImage.src = menuItem.image;
      menuItemImage.className = "menu-item-image";
      menuItemImage.id = menuItem.id; // 이미지에 id 값 추가
      menuItemDiv.appendChild(menuItemImage);

      let menuItemEngName = document.createElement("eng_name");
      menuItemEngName.innerHTML = menuItem.name_eng;
      menuItemEngName.className = "<br>" + "menu-item-name";
      menuItemDiv.appendChild(menuItemEngName);

      let menuItemKorName = document.createElement("kor_name");
      menuItemKorName.innerHTML = "<br>" + menuItem.name_kor + "<br>";
      menuItemKorName.className = "menu-item-name";
      menuItemDiv.appendChild(menuItemKorName);

      let menuItemPrice = document.createElement("price");
      menuItemPrice.innerHTML =
        "L: " + menuItem.l_price + "원 R: " + menuItem.r_price + "원";
      menuItemPrice.className = "menu-item-price";
      menuItemDiv.appendChild(menuItemPrice);

      let menuitemDate = document.createElement("date");
      //menuitemDate.innerHTML = " ("+menuItem.register_date+")<br>";
      menuitemDate.className = "menu-item-date";
      menuItemDiv.appendChild(menuitemDate);

      menuContainer.appendChild(menuItemDiv);
    }

    addPizzaImageEvent();
    addSortingButton(); // '모두' 탭을 클릭했을 때 정렬 버튼 추가
    // addIncreaseSortingButton();
    // addDecreaseSortingButton();
    // addIDSortingButton();
  }

  function addPizzaImageEvent() {
    var pizzaImages = document.getElementsByClassName("menu-item-image");

    for (var i = 0; i < pizzaImages.length; i++) {
      var pizzaImage = pizzaImages[i];

      // 이미지에 마우스 오버 이벤트 추가
      pizzaImage.addEventListener("mouseover", function () {
        this.style.transform = "scale(1.1)"; // 이미지 확대

        var pizzaId = this.id; // 이미지의 id 값 가져오기

        // 리뷰보기 버튼 생성
        var reviewButton = document.createElement("button");
        reviewButton.innerHTML = "리뷰보기 ";
        reviewButton.className = "review-button";
        reviewButton.style.position = "absolute";
        reviewButton.style.top = "60px";
        reviewButton.style.left = "100px";
        reviewButton.style.zIndex = "1";
        this.parentNode.style.position = "relative";
        this.parentNode.appendChild(reviewButton);

        // 리뷰보기 버튼 클릭 이벤트
        reviewButton.addEventListener("click", function () {
          setInfo({ ...info, pizzaIdForReview: pizzaId });
          navigate("/review"); // 리뷰 페이지로 이동
        });

        // 장바구니 버튼 생성
        var detailButton = document.createElement("button");
        detailButton.innerHTML = "장바구니 ";
        detailButton.className = "review-button";
        detailButton.style.position = "absolute";
        detailButton.style.top = "100px";
        detailButton.style.left = "100px";
        detailButton.style.zIndex = "1";
        this.parentNode.style.position = "relative";
        this.parentNode.appendChild(detailButton);

        var pizza = pizzas.find((item) => item.id === parseInt(pizzaId));
        var pizza = pizzas.find((item) => item.id === parseInt(pizzaId));
        pizza.size = "L";
        pizza.count = 1;

        var {
          id,
          name_eng,
          name_kor,
          l_price,
          r_price,
          register_date,
          image,
          size,
          count,
        } = pizza;
        console.log(pizza);

        //var queryString = `?pizzaId=${id}&name_eng=${name_eng}&name_kor=${name_kor}&l_price=${l_price}&r_price=${r_price}&register_date=${register_date}&image=${image}`;
        //console.log(queryString);
        // 장바구니 버튼 클릭 이벤트
        // 장바구니 버튼 클릭 이벤트
        detailButton.addEventListener("click", function () {
          //window.location.href = "/shoppingCart?pizzaId=" + pizzaId;
          navigate("/shoppingCart");

          setInfo((prevState) => ({
            ...prevState,
            pizzaIds: [...prevState.pizzaIds, pizza],
          }));
        });
      });

      // 이미지에서 마우스가 벗어났을 때 이벤트 추가
      pizzaImage.addEventListener("mouseout", function () {
        this.style.transform = "scale(1)"; // 이미지 축소
      });
    }
  }

  function addSortingButton() {
    var sortingSelect = document.createElement("select");
    sortingSelect.id = "sortingSelect";
    sortingSelect.style.position = "absolute";
    sortingSelect.style.top = "200px";
    sortingSelect.style.left = "1730px"; // 오른쪽으로 10px 이동
    sortingSelect.style.width = "180px";
  
    var option1 = document.createElement("option");
    option1.value = "popularity";  // 인기순으로 변경
    option1.text = "인기순";       // 인기순으로 변경
    sortingSelect.add(option1);
  
    var option2 = document.createElement("option");
    option2.value = "register_date";
    option2.text = "신제품순";
    sortingSelect.add(option2);
  
    var option3 = document.createElement("option");
    option3.value = "price_high";
    option3.text = "가격높은순";
    sortingSelect.add(option3);
  
    var option4 = document.createElement("option");
    option4.value = "price_low";
    option4.text = "가격낮은순";
    sortingSelect.add(option4);
  
    var option5 = document.createElement("option");
    option5.value = "original_order";
    option5.text = "원래대로";
    sortingSelect.add(option5);
  
    sortingSelect.addEventListener("change", function () {
      var selectedValue = this.value;
      var menuContainer = document.getElementById("allMenuItems");
      var paginationContainer = document.getElementById("allPagination");
  
      switch (selectedValue) {
        case "register_date":
          pizzas.sort(function (a, b) {
            return new Date(b.register_date) - new Date(a.register_date);
          });
          break;
        case "price_high":
          pizzas.sort(function (a, b) {
            if (b.l_price === a.l_price) {
              return a.name_kor.localeCompare(b.name_kor);
            }
            return b.l_price - a.l_price;
          });
          break;
        case "price_low":
          pizzas.sort(function (a, b) {
            if (b.l_price === a.l_price) {
              return a.name_kor.localeCompare(b.name_kor);
            }
            return a.l_price - b.l_price;
          });
          break;
        case "original_order":
          pizzas.sort(function (a, b) {
            return a.id - b.id;
          });
          break;
        default:
          break;
      }
  
      var menuItems = pizzas;
  
      setupPagination(menuItems, itemsPerPage, "allMenuItems", "allPagination");
      showMenuItems(menuItems, 1, itemsPerPage, menuContainer);
    });
  
    document.getElementById("allMenuItems").appendChild(sortingSelect);
  }
  
  
  return (
    <div>
      <div className="App">
        <MainHeader></MainHeader>
        <div className="tab">
          <button
            className="tablinks"
            id="defaultTab"
            onClick={(e) => openTab(e, "all")}
          >
            모두
          </button>
          <button
            className="tablinks"
            onClick={(e) => openTab(e, "craftsmanship")}
          >
            장인피자
          </button>
          <button className="tablinks" onClick={(e) => openTab(e, "expert")}>
            달인피자
          </button>
          <button className="tablinks" onClick={(e) => openTab(e, "luxury")}>
            명품피자
          </button>
        </div>

        <div id="all" className="tabcontent">
          <div id="allMenuItems"></div>
          <div id="allPagination"></div>
        </div>

        <div id="craftsmanship" className="tabcontent">
          <div id="craftsmanshipMenuItems"></div>
          <div id="craftsmanshipPagination"></div>
        </div>

        <div id="expert" className="tabcontent">
          <div id="expertMenuItems"></div>
          <div id="expertPagination"></div>
        </div>

        <div id="luxury" className="tabcontent">
          <div id="luxuryMenuItems"></div>
          <div id="luxuryPagination"></div>
        </div>
      </div>
    </div>
  );
}
export default PizzaComponent;
