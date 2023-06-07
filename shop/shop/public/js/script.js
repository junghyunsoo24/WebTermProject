// 페이지 로드시 전체 탭을 기본 탭으로 설정
document.getElementById("defaultTab").click();

var itemsPerPage = 2; // 한 페이지에 표시할 항목 수

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

  // 선택한 탭 콘텐츠 표시
  document.getElementById(tabName).style.display = "block";

  // 메뉴 항목 로드 및 페이징
  var menuItems;
  var itemsPerPage = 2;
  switch (tabName) {
    case "all":
      menuItems = db.getAllMenuItems();
      setupPagination(menuItems, itemsPerPage, "allMenuItems", "allPagination");
      break;
    case "craftsmanship":
      menuItems = db.getCraftsmanshipMenuItems();
      setupPagination(
        menuItems,
        itemsPerPage,
        "craftsmanshipMenuItems",
        "craftsmanshipPagination"
      );
      break;
    case "expert":
      menuItems = db.getExpertMenuItems();
      setupPagination(
        menuItems,
        itemsPerPage,
        "expertMenuItems",
        "expertPagination"
      );
      break;
    case "luxury":
      menuItems = db.getLuxuryMenuItems();
      setupPagination(
        menuItems,
        itemsPerPage,
        "luxuryMenuItems",
        "luxuryPagination"
      );
      break;
  }
  addPizzaImageEvent(); // 피자 사진에 이벤트 추가
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
  }

  // 초기 페이지 표시
  showMenuItems(menuItems, 1, itemsPerPage, menuContainer);
}

function showMenuItems(menuItems, page, itemsPerPage, menuContainer) {
  var startIndex = (page - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var currentPageItems = menuItems.slice(startIndex, endIndex);

  menuContainer.innerHTML = "";
  currentPageItems.forEach(function (item) {
    var menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    // 이미지 엘리먼트 생성
    var image = document.createElement("img");
    image.src = item.imageSrc;
    menuItem.appendChild(image);

    // 피자 이미지에 대한 컨테이너 생성
    var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    menuItem.appendChild(imageContainer);

    // 이미지를 컨테이너에 추가
    imageContainer.appendChild(image);

    // 버튼 컨테이너 생성
    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // 리뷰보기 버튼 엘리먼트 생성
    var detailsButton = document.createElement("button");
    detailsButton.innerHTML = "리뷰보기";
    buttonContainer.appendChild(detailsButton);

    // 장바구니 버튼 엘리먼트 생성
    var addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "장바구니";
    buttonContainer.appendChild(addToCartButton);

    // 버튼 컨테이너를 이미지 컨테이너에 추가
    imageContainer.appendChild(buttonContainer);

    // 메뉴 이름 엘리먼트 생성
    var menuName = document.createElement("span");
    menuName.innerHTML = item.name;
    menuItem.appendChild(menuName);

    // 가격 엘리먼트 생성
    var price = document.createElement("span");
    price.innerHTML = "L: " + item.price + "원R: " + (item.price - 4500) + "원";
    menuItem.appendChild(price);

    menuContainer.appendChild(menuItem);
  });

  addPizzaImageEvent(); // 이미지에 대한 이벤트 핸들러 추가
}

// //데이터베이스 연동
// const mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "wjdgustn!1027",
//   database: "pizza_shop",
// });
// connection.connect();

// //데이터베이스 조회
// connection.query(
//   "SELECT * FROM pizza_shop.pizza",
//   function (error, results, fields) {
//     if (error) {
//       console.log(error);
//     }

//     //조회된 내용 활용 => result의 키 값 활용
//     console.log(results);
//     results[1].pizza_shop;
//     console.log(results[1].id);
//     console.log(results[2].price);
//     console.log(results[3].name);
//     results.forEach((element) => {
//       console.log(1, element.pizza);
//     });
//   }
// );

// //데이터베이스 삽입
// connection.query(
//   `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
//   ["hello", "post.description", 1],
//   function (error, result) {
//     if (error) {
//       throw error;
//     }

//     if (error) {
//       throw error;
//     }
//     // console.log(result);
//   }
// );

// //데이터베이스 삭제
// connection.query(
//   "DELETE FROM topic WHERE id = ?",
//   [5],
//   function (error, result) {
//     if (error) {
//       throw error;
//     }
//   }
// );

// //데이터베이스 연결 종료
// connection.end();

// 가상 데이터베이스
var db = {
  getAllMenuItems: function () {
    // 전체 메뉴 항목 반환 (가상 데이터)
    return [
      {
        name: "쉬림프&핫치킨골드피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp9D88.png",
        price: 34500,
      },
      {
        name: "날개피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpE586.png",
        price: 34500,
      },
      {
        name: "어깨피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpAF7B.png",
        price: 31500,
      },
      {
        name: "꿈을피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp14B4.png",
        price: 31500,
      },
      {
        name: "팔도피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp1BF5.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 1단게",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 2단게",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 3단계",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "대세피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpB81B.png",
        price: 31500,
      },
      {
        name: "웃음꽃피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp4608.png",
        price: 29000,
      },
      {
        name: "전주불백피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp579C.jpg",
        price: 29000,
      },
      {
        name: "팔자피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp7A7B.png",
        price: 29000,
      },
    ];
  },
  getCraftsmanshipMenuItems: function () {
    // 장인피자 메뉴 항목 반환 (가상 데이터)
    return [
      {
        name: "쉬림프&핫치킨골드피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp9D88.png",
        price: 34500,
      },
      {
        name: "날개피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpE586.png",
        price: 34500,
      },
    ];
  },
  getExpertMenuItems: function () {
    // 달인피자 메뉴 항목 반환 (가상 데이터)
    return [
      {
        name: "어깨피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpAF7B.png",
        price: 31500,
      },
      {
        name: "꿈을피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp14B4.png",
        price: 31500,
      },
      {
        name: "팔도피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp1BF5.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 1단게",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 2단게",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "쏘핫피자 3단계",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpF2A6.png",
        price: 31500,
      },
      {
        name: "대세피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmpB81B.png",
        price: 31500,
      },
    ];
  },
  getLuxuryMenuItems: function () {
    // 명품피자 메뉴 항목 반환 (가상 데이터)
    return [
      {
        name: "웃음꽃피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp4608.png",
        price: 29000,
      },
      {
        name: "전주불백피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp579C.jpg",
        price: 29000,
      },
      {
        name: "팔자피자",
        imageSrc: "https://img.pizzaalvolo.co.kr/uploads/tmp7A7B.png",
        price: 29000,
      },
    ];
  },
};

// 인기순 버튼 클릭 이벤트 핸들러
document.getElementById("popularBtn").addEventListener("click", function () {
  var allMenuItems = db.getAllMenuItems();
  var popularMenuItems = sortMenuItemsByPopularity(allMenuItems);
  setupPagination(
    popularMenuItems,
    itemsPerPage,
    "allMenuItems",
    "allPagination"
  );
  addPizzaImageEvent(); // mouseover 처리 추가
});

function sortMenuItemsByPopularity(menuItems) {
  //ㄱㄴㄷ순으로 정렬
  return menuItems.sort(function (a, b) {
    return a.name.localeCompare(b.name, "ko", { sensitivity: "base" });
  });
}

// 가격높은순 버튼 클릭 이벤트 핸들러
document
  .getElementById("priceIncreaseBtn")
  .addEventListener("click", function () {
    var allMenuItems = db.getAllMenuItems();
    var sortedMenuItems = sortMenuItemsByPriceIncrease(allMenuItems);
    setupPagination(
      sortedMenuItems,
      itemsPerPage,
      "allMenuItems",
      "allPagination"
    );
    addPizzaImageEvent(); // mouseover 처리 추가
  });

function sortMenuItemsByPriceIncrease(menuItems) {
  // 가격 높은순으로 정렬
  return menuItems.sort(function (a, b) {
    if (a.price === b.price) {
      return a.name.localeCompare(b.name, "ko", { sensitivity: "base" });
    }
    return b.price - a.price;
  });
}

// 가격낮은순 버튼 클릭 이벤트 핸들러
document
  .getElementById("priceDecreaseBtn")
  .addEventListener("click", function () {
    var allMenuItems = db.getAllMenuItems();
    var sortedMenuItems = sortMenuItemsByPriceDecrease(allMenuItems);
    setupPagination(
      sortedMenuItems,
      itemsPerPage,
      "allMenuItems",
      "allPagination"
    );
    addPizzaImageEvent(); // mouseover 처리 추가
  });

function sortMenuItemsByPriceDecrease(menuItems) {
  // 가격 낮은순으로 정렬
  return menuItems.sort(function (a, b) {
    if (a.price === b.price) {
      return a.name.localeCompare(b.name, "ko", { sensitivity: "base" });
    }
    return a.price - b.price;
  });
}

// 피자 이미지를 mouseover하면 이벤트가 발생하도록 코드 추가
function addPizzaImageEvent() {
  var pizzaImages = document.getElementsByTagName("img");
  for (var i = 0; i < pizzaImages.length; i++) {
    pizzaImages[i].addEventListener("mouseover", function () {
      // 피자 이미지에 마우스 오버 이벤트 발생 시 실행될 코드 작성
      // 예를 들어, 이미지를 확대하거나 효과를 추가할 수 있습니다.
      this.style.transform = "scale(1.2)"; // 이미지 확대 효과 예시

      // 버튼 표시
      var buttons = this.parentNode.getElementsByTagName("button");
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].style.display = "block";
      }
    });

    pizzaImages[i].addEventListener("mouseout", function () {
      // 피자 이미지에 마우스 아웃 이벤트 발생 시 실행될 코드 작성
      // 예를 들어, 이미지를 원래 크기로 되돌리거나 효과를 제거할 수 있습니다.
      this.style.transform = "scale(1)"; // 이미지 확대 효과 제거 예시

      // 버튼 숨김
      var buttons = this.parentNode.getElementsByTagName("button");
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].style.display = "none";
      }
    });
  }
}
