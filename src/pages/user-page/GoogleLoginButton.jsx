import React from "react";
import { GoogleLogin } from "react-google-login";
import { userLocalStorage } from '../../utils/config';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    if (response.tokenId) {
      const userData = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        // Thêm các thông tin người dùng khác tại đây nếu cần thiết
      };
      console.log(response.profileObj.name);
      console.log(response.profileObj.email);
      // Lưu thông tin người dùng và token vào localStorage
      userLocalStorage.set(userData, response.tokenId);
    }
  };

  return (
    <div className="user__pages">
      <h2 className="user__pages-title">Đăng nhập</h2>
      <GoogleLogin
        className="user__pages-form"
        clientId="379551638538-muvdn75965jed62fl2e166iml9vanguq.apps.googleusercontent.com"
        buttonText="Đăng nhập bằng Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
