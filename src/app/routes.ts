import { createBrowserRouter } from "react-router";
import Root from "./Root";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ProcessPage from "../pages/ProcessPage";
import FaqsPage from "../pages/FaqsPage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "process", Component: ProcessPage },
      { path: "faqs", Component: FaqsPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
