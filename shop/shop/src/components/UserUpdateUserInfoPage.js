import { Fragment, useState } from "react";
import NavigationMyPage from "./NavigationMyPage";
import UpdateUserInfo from "./UpdateUserInfo";

function UserUpdateUserInfoPage({ info }) {
  return (
    <Fragment>
      <NavigationMyPage></NavigationMyPage>
      <UpdateUserInfo info={info}></UpdateUserInfo>
    </Fragment>
  );
}

export default UserUpdateUserInfoPage;
