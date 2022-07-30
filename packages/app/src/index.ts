import m from "mithril";

import { Home } from "./views/Home";
import { Main } from "./views/Main";
import { Payment } from "./views/Payment";
import { SignupForm } from "./components/Signup";
import { SignInForm } from "./components/Signin";
import { state, actions } from "./model/State";
/**
 * @type {m.Route}
 */
m.route.prefix = "";

export default m.route(document.body, "/", {
  /* INDEX -------------------------------------- */
  "/": {
    onmatch: () => {
      actions.isLoggedIn();
    },
    render: () => {
      if (state.isLoggedIn) {
        return [
          m(Main, { state, actions }),
          m(Home, { state }),
          m(Payment, { state }),
        ];
      }
      return [m(Home, { state })];
    },
  },
  /* SIGN UP--------------------------------------*/
  "/signup": {
    render: () => {
      return m(SignupForm, { actions });
    },
  },
  /* SIGN IN--------------------------------------*/
  "/signin": {
    render: () => {
      return m(SignInForm, { state, actions });
    },
  },
  /* SIGN OUT--------------------------------------*/
  "/signout": {
    onmatch: () => {
      localStorage.removeItem("fauna_secret");
      m.route.set("/");
    },
  },
});
