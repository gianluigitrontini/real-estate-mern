import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-slate-300 text-slate-800">
      <div className="container flex items-center justify-between p-2">
        <Link to={"/"}>
          <div className="text-sm font-bold">LOGO</div>
        </Link>
        <form
          action=""
          className="bg-slate-100 text-slate-600 p-2 rounded-md flex items-center"
        >
          <input
            type="search"
            className="bg-transparent focus:outline-none"
            placeholder="Search anything..."
          />
          <FaSearch />
        </form>
        <nav>
          <ul className="flex items-center gap-4">
            <Link to={"/"}>
              <li className="hidden sm:inline-block hover:underline">Home</li>
            </Link>
            <Link to={"/about"}>
              <li className="hidden sm:inline-block hover:underline">About</li>
            </Link>
            <Link to={"/sign-in"}>
              <li className="hidden sm:inline-block hover:underline">
                Sign In
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
