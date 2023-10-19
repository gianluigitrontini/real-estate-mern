import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/sign-out" element={<SignOutPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
