export interface IState {
  isLoggedIn: boolean;
  secret: string;
  paymentRcvd: boolean;
  weather: object;
}

export interface IActions {
  isLoggedIn: () => boolean;
  payments: (value: boolean) => void;
  secret: (value: string) => void;
  weather: (value: string) => void;
}
