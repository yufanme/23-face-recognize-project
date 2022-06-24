import React from "react";

const Navigation = ({ onChangeRoute, route }) => {
  return (
    <div>
      {route === "home" ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f3 link black underline pa3 pointer"
            onClick={() => {
              onChangeRoute("signin");
            }}
          >
            退出
          </p>
        </nav>
      ) : (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f3 link black underline pa3 pointer"
            onClick={() => {
              onChangeRoute("signin");
            }}
          >
            登录
          </p>
          <p
            className="f3 link black underline pa3 pointer"
            onClick={() => {
              onChangeRoute("register");
            }}
          >
            注册
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
