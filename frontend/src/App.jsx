import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={HomePage}></Route>
        <Route path="/about" element={AboutPage}></Route>
        <Route path="/profile" element={ProfilePage}></Route>
        <Route path="/sign-in" element={SignInPage}></Route>
        <Route path="/sign-out" element={SignOutPage}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
