import { Link } from "react-router-dom";
import img from "../assets/listen_error.jpg";
import { styled } from "styled-components";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <img src={img} alt="not found" />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to="/dashboard">back home</Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey);
  }
  a {
    color: var(--primary);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
export default Error;
