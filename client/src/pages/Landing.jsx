import { styled } from "styled-components";
import main from "../assets/listen_landing.jpg";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Listen" className="logo" />
      </nav>
      <div className="hero">
        <div className="info">
          <h1>
            <span>Listening Level</span> Recording App
          </h1>
          <p>
            Record your listening level and keep track of your progress. After a
            meeting or before going to sleep, note down your level of listening
            as well the record the details of your emotions.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="listen" className="img main-img" />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  nav {
    height: 5rem;
    display: flex;
    align-items: center;
    background-color: var(--secondary);
  }
  .logo {
    width: 100px;
    margin-left: 2rem;
  }
  .hero {
    margin: 0 auto;
    max-width: var(--max-width);
    width: 90vw;
    flex: 1;
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    font-size: 2rem;
    font-family: var(--headingFont);
    color: var(--white);
    span {
      color: var(--primary);
    }
  }
  p {
    color: var(--grey);
  }
  .main-img {
    display: none;
  }
  .btn-hero {
    margin-top: 2rem;
    display: inline-block;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }
  @media (min-width: 992px) {
    .hero {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;

export default Landing;
