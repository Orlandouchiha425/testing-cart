import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../utilities/users-api";
import "./NavBar.css";
import { logout } from "../utilities/users-service";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import classes from "../components/Cart/CartButton.module.css";
import SideBar from "../components/SideBar/SideBar";
import Menu from "../components/Menu/Menu";
import NavModal from "./NavModal";
import SearchBar from "../components/SearchBar/SearchBar";
export default function NavBar({ user, setUser }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        setUserData(response);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const navigate = useNavigate();

  function handleLogOut() {
    try {
      logout();
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      navigate("/");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const renderUserNav = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
        <Menu />
        <Link to="/home">
          <h3 className="text-body gameStopnavFont">
            <strong>GameStop</strong>
          </h3>
        </Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About Me</Link>
        <form className="form-inline my-2 my-lg-0">
          {/* <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <SearchBar onSearch={handleSearch} />
        </form>
        <div className="rounded-circle">
          <p>Welcome {user.name}</p>
        </div>
        <button className={btnClasses}>
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="black"
              class="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            <NavModal />
          </Link>
        </button>
        <Button
          onClick={handleLogOut}
          variant="outlined"
          startIcon={<LogoutIcon />}
        >
          Log out
        </Button>

        <SideBar />
      </nav>
    );
  };

  const renderAdminNav = () => {
    return (
      <nav className="nav styles bg-light justify-content-around adnminnav">
        <Link to="/home">
          <h3 className="text-body gameStopnavFont">
            <strong>GameStop</strong>
          </h3>
        </Link>
        <Link className="nav-link active" to="/home">
          <i className="fa-solid fa-user account">Show Games</i>
        </Link>
        <Link className="nav-link active" to="/create">
          Create Games
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-controller"
            viewBox="0 0 16 16"
          >
            <path d="..." />
          </svg>
        </Link>
        <div>
          <Link to="/about" className="nav-link active ">
            About Me
          </Link>
        </div>

        <form className="form-inline my-2 my-lg-0">
          <SearchBar onSearch={handleSearch} />
        </form>
        <Button
          onClick={handleLogOut}
          variant="outlined"
          startIcon={<LogoutIcon />}
        >
          Log out
        </Button>
        <div className=".float-right">
          <SideBar />
        </div>
      </nav>
    );
  };

  const renderLoginNav = () => {
    return (
      <nav className="nav styles bg-light">
        <Link className="nav-link active" to="/login">
          <i className="fa-solid fa-user account">Login</i>
        </Link>
        <Link className="nav-link active" to="/signup">
          Sign Up
        </Link>
        <Link className="nav-link active" to="/adminlogin">
          Admin Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-controller"
            viewBox="0 0 16 16"
          >
            <path d="..." />
          </svg>
        </Link>
      </nav>
    );
  };

  if (!user) {
    return renderLoginNav();
  }

  if (user.role === "admin") {
    return renderAdminNav();
  } else {
    return renderUserNav();
  }
}
