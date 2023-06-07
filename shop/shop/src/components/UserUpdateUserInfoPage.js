import {Fragment, useState} from "react";
import NavigationMyPage from './NavigationMyPage';
import UpdateUserInfo from './UpdateUserInfo';

function UserUpdateUserInfoPage(){
    return (
        <Fragment>
            <NavigationMyPage></NavigationMyPage>
            <UpdateUserInfo></UpdateUserInfo>
        </Fragment>  
    );
}

export default UserUpdateUserInfoPage;
