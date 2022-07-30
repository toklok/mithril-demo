import m from "mithril";

export const Main: m.Component<{ state; actions }> = {
  view: ({ attrs: { state } }) => {
    return m("main", [
      m("h1", "Main"),
      m("p", "Here is your local weather forcast according to your lat/lng."),
    ]);
  },
};
