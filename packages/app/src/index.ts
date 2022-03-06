import m from "mithril";

import { Home } from "./views/Home";
import { SignupForm } from "./components/Signup";
import { SignInForm } from "./components/Signup";

/**
 * @type {m.Route}
 */
m.route.prefix = "";

export default m.route(document.body, "/", {
  /* INDEX -------------------------------------- */
  "/": Home,
  /* SIGN UP--------------------------------------*/
  "/signup": SignupForm,
  "/signin": SignInForm,
});
