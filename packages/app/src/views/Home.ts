import m from "mithril";

export const Home: m.Component<{}> = {
  view: () => {
    return m("main", [
      m("h1", "Home"),
      m("p", "This is the weather app SaaS homepage."),
      m("a", { href: "/signup" }, "Sign up"),
      m("a", { href: "/signin" }, "Sign in"),
    ]);
  },
};
