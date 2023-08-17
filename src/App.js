import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import TasksPage from "./components/TasksPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="tasks" element={<TasksPage />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
