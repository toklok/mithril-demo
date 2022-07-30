import m from "mithril";

export const Home: m.Component<{ state }> = {
  view: ({ attrs: { state } }) => {
    return m("main", [
      m("h1", "Home"),
      m("p", "This is the weather app SaaS homepage."),
      m("div", [
        state.isLoggedIn
          ? [m(m.route.Link, { href: "/signout" }, "Sign out")]
          : [
              m(m.route.Link, { href: "/signup" }, "Signup"),
              m(m.route.Link, { href: "/signin" }, "Sign in"),
            ],
      ]),
    ]);
  },
};
