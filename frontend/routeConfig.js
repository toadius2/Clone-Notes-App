import Welcome from "./page/welcome";
import Home from "./page/home";
import App from "./App";

export default [
  {
    path: "/",
    component: Welcome,

    childRoutes: [
      {
        path: "welcome",
        component: Welcome,
      },
      {
        path: "home",
        component: Home,
      },
    ],
  },
];
