import { IState, IActions } from "../interfaces/Main.interface";

const State = (): IState => ({
  isLoggedIn: false,
  secret: "",
  paymentRcvd: false,
  weather: {},
});

const Actions = (state: IState): IActions => ({
  isLoggedIn: (): boolean => {
    if (localStorage.getItem("fauna_secret") !== null) {
      return (state.isLoggedIn = true);
    }
    return (state.isLoggedIn = false);
  },
  payments: (value: boolean) => {
    return (state.paymentRcvd = value);
  },
  secret: (value: string) => {
    return (state.secret = value);
  },
  weather: (value: string) => {
    return (state.weather = {
      latitude: "1234",
    });
  },
});

const state = State();
const actions = Actions(state);

export { state, actions };
