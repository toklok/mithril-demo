import m from "mithril";

export const SignInForm: m.Component<{ state; actions }> = {
  view: ({ attrs: { state, actions } }) => {
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
              url: "/api/signin",
              method: "POST",
              body,
            })
            .then((response: any) => {
              if (localStorage !== undefined) {
                localStorage.setItem("fauna_secret", response);
              }
              m.route.set("/");
            });
        },
      },
      [
        m("label.input", "email"),
        m("input", {
          type: "email",
          name: "email",
          placeholder: "Email",
        }),
        m("label.input", "password"),
        m("input", {
          type: "password",
          name: "password",
          placeholder: "Password",
        }),
        m("button", "Sign in"),
      ]
    );
  },
};
