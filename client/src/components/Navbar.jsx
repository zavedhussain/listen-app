import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser, toggleSidebar } from "../features/user/userSlice.js";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/dashboard">
            <img src={logo} alt="Listen" className="logo" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaBars />
          </button>
        </div>

        <div className="nav-links">
          <ul className="links">
            <Link to="/dashboard">
              <li>Home</li>
            </Link>
            <Link to="/dashboard/add-listening">
              <li>Record New</li>
            </Link>
          </ul>
          <p className="btn" onClick={() => dispatch(logoutUser())}>
            Logout
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);
  color: var(--white);
  .nav-center {
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      width: 100px;
      color: var(--white);
    }
    .nav-toggle {
      background: transparent;
      border-color: transparent;
      font-size: 1.75rem;
      color: var(--primary);
      cursor: pointer;
    }
  }
  .nav-links {
    display: none;
    gap: 1rem;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      align-items: center;
      .links {
        display: flex;
      }
      p {
        display: flex;
        align-items: center;
      }
      li {
        margin: 0 0.5rem;
      }
      a {
        font-size: 1.2rem;
        color: var(--white);
        text-transform: capitalize;
        padding: 0.5rem;
      }
      .btn {
        background-color: var(--primary);
        padding: 0.5rem 1rem;
        border-radius: 2px;
        border: none;
      }
    }
  }
`;

export default Navbar;
