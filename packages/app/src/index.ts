import m from "mithril";

var Home = {
  view: function () {
    return "Welcome";
  },
};

var Signup = {
  view: function () {
    return "Signup";
  },
};

m.route.prefix = "";

/**
 * @type {m.Route}
 */
m.route(document.body, "/", {
  /* INDEX -------------------------------------- */

  "/": Home,

  /* SIGN UP--------------------------------------*/

  "/signup": Signup,
});
