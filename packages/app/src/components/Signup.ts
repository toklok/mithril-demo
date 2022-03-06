import m from "mithril";

export const SignupForm: m.Component<{}> = {
  view: () => {
    return m("form", [
      m("label.input", "first name"),
      m("input[type=text][placeholder=first name]"),
      m("label.input", "last name"),
      m("input[type=text][placeholder=last name]"),
      m("label.input", "email"),
      m("input[type=email][placeholder=email]"),
      m("label.input", "password"),
      m("input[type=password][placeholder=password]"),
      m("button", "Sign up"),
      m("a", { href: "/" }, "Cancel"),
    ]);
  },
};

export const SignInForm: m.Component<{}> = {
  view: () => {
    return m("form", [
      m("label.input", "email"),
      m("input[type=email][placeholder=email]"),
      m("label.input", "password"),
      m("input[type=password][placeholder=password]"),
      m("button", "Sign in"),
    ]);
  },
};
