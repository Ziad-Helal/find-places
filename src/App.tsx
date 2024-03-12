import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home_Page, NotFound_Page } from "./pages";
import { Page_Layout } from "@/components";
import { ThemeProvider } from "@/lib";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Page_Layout />,
      children: [
        { index: true, element: <Home_Page /> },
        { path: "*", element: <NotFound_Page /> },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
