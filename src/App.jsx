import { RouterProvider } from "react-router-dom";
import router from "./routers/main-router";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
