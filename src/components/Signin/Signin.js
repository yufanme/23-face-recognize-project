import React from "react";
import { useState } from "react";

const Signin = ({ onChangeRoute, loadUser }) => {
  const [emailBox, setEmailBox] = useState("");
  const [passwordBox, setPasswordBox] = useState("");

  function onEmailChange(event) {
    setEmailBox(event.target.value);
  }

  function onPasswordChange(event) {
    setPasswordBox(event.target.value);
  }

  function onSubmitClick(event) {
    event.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailBox,
        password: passwordBox,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onChangeRoute("home");
        }
      });
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-40-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">登录</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                邮箱
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br2"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                密码
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br2"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
              type="submit"
              value="提交"
              onClick={onSubmitClick}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              href="#0"
              className="f6 link dim black db pointer"
              onClick={() => {
                onChangeRoute("register");
              }}
            >
              注册
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;
