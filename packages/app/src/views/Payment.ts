import m from "mithril";

export const Payment: m.Component<{ state }> = {
  view: ({ attrs: { state } }) => {
    return m("main", [
      state.paymentRcvd
        ? [
            m("h1", "Thanks for the payment!"),
            m("p", "Thanks for supporting the weather"),
          ]
        : [
            m("h1", "Sign up to receive payments in your inbox"),
            m("p", "A great way to wake up in the morning"),
            m(
              "button",
              {
                onclick: () => {
                  console.log("click");
                },
              },
              "Pay"
            ),
          ],
    ]);
  },
};
