import { lazy } from "react";
import { Redirect } from "react-router-dom";

const LadingBillsConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/lading_bills",
      exact: true,
      component: lazy(() => import("./App")),
    },
    {
      path: "/lading_bills",
      component: () => <Redirect to="/lading_bills" />,
    },
  ],
};

export default LadingBillsConfig;
