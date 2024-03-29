import m, { route } from "mithril";

export const SignupForm: m.Component<{ actions }> = {
  view: ({ attrs: { actions } }) => {
    return m(
      "form",
      {
        onsubmit: (event) => {
          event.preventDefault();

          const form = new FormData(event.target);

          const body = Object.create(null);

          const data = form.forEach((value, input) => {
            body[input] = value;
          });

          return m
            .request({
              url: "/api/signup",
              method: "POST",
              body,
            })
            .then((response: any) => {
              if (localStorage !== undefined) {
                localStorage.setItem("fauna_secret", response);
              }
              actions.isLoggedIn(true);
              m.route.set("/");
            });
        },
      },
      [
        m("label.input", "first name"),
        m("input", {
          type: "text",
          name: "first_name",
          placeholder: "First Name",
        }),
        m("label.input", "last name"),
        m("input", {
          type: "text",
          name: "last_name",
          placeholder: "Last Name",
        }),
        m("label.input", "email"),
        m("input", {
          type: "email",
          name: "email",
          placeholder: "Email Address",
        }),
        m("label.input", "password"),
        m("input", {
          type: "password",
          name: "password",
          placeholder: "Password",
        }),
        m("button", "Sign up"),
        m("a", { href: "/" }, "Cancel"),
      ]
    );
  },
};
