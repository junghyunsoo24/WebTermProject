import {Fragment, useState, useEffect} from "react";
import {arrayContentsToString, makeHttpRequest} from "./util";

async function selectOrderHistory(orderId) {
    return makeHttpRequest('http://127.0.0.1:3001/searchOrderHistory', {'Content-Type': 'application/json'}, { orderId : orderId });
}

function OrderHistory(props) {
    const orderId = 5;
    const orderInfo = {
        orderDate: "res.order_date",
        menu: ["res.name_kor1", "res.name_kor2", "res.name_kor3"],
        menuId: [],
        price: "res.total_price",
        address: "res.address",
        store: "가게"
    };

    let [info, setInfo] = useState(orderInfo);

    useEffect(()=>{
        selectOrderHistory(orderId).then((res)=>{
            const orderMenuNames = [];
            const menuIds = [];
            res.forEach(element => {
                orderMenuNames.push(element.name_kor);
                menuIds.push(element.pizza_id);
            });
            setInfo({...info, menu: orderMenuNames, menuId: menuIds, orderDate: res[0].order_date, price: res[0].total_price, address: res[0].address});
            props.setMenu({...props.menu, menuNames: orderMenuNames, menuIds: menuIds});
        });
    },[]);
        return (makeHtml(props, info.orderDate, info.menu, info.menuId, info.price, info.address, info.store)
    );
}

function makeHtml(props, orderDate, menuNames,menuIds, totalPrice, address, store) {
    return <Fragment>
        <div className=".post-container">
            <div className="info-container">
                <h1>주문 내용</h1>
                <div className="info-list">주문일자 : {orderDate}</div>
                <div className="info-list"
                    onClick={()=>{
                        (!props.showReviewClick)?props.handleShowReviewClick(true):props.handleShowReviewClick(false);
                    }}>주문메뉴 : { arrayContentsToString(menuNames) }</div>
                <div className="info-list">메뉴 아이디 : { arrayContentsToString(menuIds) }</div>
                <div className="info-list">결제금액 : {totalPrice}</div>
                <div className="info-list">배달지 정보 : {address}</div>
                <div className="info-list">주문 매장 : {store}</div>
                <button
                    onClick={() => {
                        (!props.click)?props.handleClick(true):props.handleClick(false);
                    }}
                >
                    후기 작성
                </button>
            </div>
        </div>
    </Fragment>
}

export default OrderHistory;
