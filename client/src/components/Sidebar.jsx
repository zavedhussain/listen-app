import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { logoutUser, toggleSidebar } from "../features/user/userSlice";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}>
        <div className="sidebar-header">
          <Link to="/dashboard">
            <img src={logo} alt="Listen" className="logo" />
          </Link>
          <button
            type="button"
            className="close-btn"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="nav-links">
          <ul className="links">
            <Link
              to="/dashboard"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/dashboard/add-listening"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <li>Record New</li>
            </Link>
          </ul>
          <p onClick={() => dispatch(logoutUser())} className="btn">
            Logout
          </p>
        </div>
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary);
    color: var(--white);
    transition: var(--transition);
    //animate towards left
    transform: translate(-100%);
    z-index: -1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      width: 100px;
      color: var(--white);
    }
    .close-btn {
      background: transparent;
      border-color: transparent;
      font-size: 1.75rem;
      color: var(--primary);
      cursor: pointer;
    }
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    flex: 1;
    .links {
      flex: 1;
    }
    p {
      display: flex;
      align-items: center;
    }
    li {
      margin: 0 0.5rem;
    }
    a {
      color: var(--white);
      font-size: 2rem;
      text-transform: capitalize;
      padding: 0.5rem;
    }
    .btn {
      flex-grow: 0;
      font-size: 2rem;
      margin: 5rem auto;
      background-color: var(--primary);
      padding: 1rem 2rem;
      border-radius: 2px;
      border: none;
    }
  }

  .show-sidebar {
    //animate towards right
    transform: translate(0);
    z-index: 999;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
