import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { deleteListening } from "../features/listenings/listeningSlice";
import {
  FaAssistiveListeningSystems,
  FaBusinessTime,
  FaCalendarAlt,
} from "react-icons/fa";

const Listening = ({ _id, event, level, content, createdAt_formatted }) => {
  const { isLoading } = useSelector((state) => state.listenings);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="header">
        <p>
          <span className="icon">
            <FaBusinessTime />
          </span>
          <span>{event}</span>
        </p>
        <p>
          <span className="icon">
            <FaAssistiveListeningSystems />
          </span>
          <span>{level}</span>
        </p>
      </div>

      <div className="listening-info">
        <h3>Recording:</h3>
        <p>{content}</p>
      </div>
      <div className="footer">
        <p className="status">
          <span className="icon">
            <FaCalendarAlt />
          </span>
          <span>{createdAt_formatted}</span>
        </p>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => dispatch(deleteListening(_id))}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  padding: 1rem 1.5rem;
  background: var(--white);
  border-radius: 5px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.4);
  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    text-transform: capitalize;
    padding-bottom: 1rem;
    p {
      display: flex;
      align-items: center;
      padding-bottom: 0.5rem;
    }
    span {
      font-size: 1.5rem;
      font-family: var(--headingFont);
    }
    .icon {
      margin-right: 1rem;
      color: var(--primary);
    }
  }
  .listening-info {
    flex-grow: 1;

    h3 {
      font-family: var(--headingFont);
      margin: 1rem 0;
      font-weight: 400;
    }

    p {
      font-family: var(--bodyFont);
    }
  }

  .footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-delete {
      background-color: var(--primary);
      border-radius: 5px;
      border: none;
    }
    p {
      display: flex;
      align-items: center;
    }
    span {
      font-size: 1.1rem;
    }
    .icon {
      margin-right: 1rem;
      color: var(--primary);
    }
  }
`;

export default Listening;
