import { createStore } from "redux";
let brands = [
  "A. Lange & Sohne",
  "Audemars Piguet",
  "Baume & Mercier",
  "Bell & Ross",
  "Blancpain",
  "Breguet",
  "Breitling",
  "Bulgari",
  "Cartier",
  "Chanel",
  "Chopard",
  "Girard-Perregaux",
  "Glashutte Original",
  "Grand Seiko",
  "Hermes Watches",
  "Hublot",
  "IWC",
  "Jaeger LeCoultre",
  "Jaquet Droz",
  "Longines",
  "Maurice Lacroix",
  "Montblanc Watches",
  "Nomos",
  "Omega",
  "Oris",
  "Panerai",
  "Patek Philippe",
  "Piaget",
  "Raymond Weil",
  "Rolex",
  "TAG Heuer",
  "Ulysse Nardin",
  "Vacheron Constantin",
  "Zenith"
];

let reducer = (state, action) => {
  if (action.type === "render-items") {
    return { ...state, items: action.items };
  }
  if (action.type === "logged-in-username") {
    return { ...state, username: action.username, loggedIn: true };
  }
  if (action.type === "Logged-Out") {
    return { items: [], username: "", loggedIn: false };
  }
  if (action.type === "addToCart") {
    return {
      ...state,
      cart: state.cart.concat(action.item)
    };
  }
  if (action.type === "deleteFromCart") {
    const cartCopy = state.cart.slice();
    cartCopy.splice(action.idx, 1);
    return { ...state, cart: cartCopy };
  }
  if (action.type === "clearCart") {
    return { ...state, cart: [] };
  }
  return state;
};
const store = createStore(
  reducer,
  {
    items: [],
    username: "",
    loggedIn: false,
    brands,
    cart: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
