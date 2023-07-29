import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { addListening } from "../features/listenings/listeningSlice";

const AddListening = () => {
  const { isLoading } = useSelector((state) => state.listenings);
  const dispatch = useDispatch();

  const [listening, setListening] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setListening({ ...listening, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addListening(listening));
    setListening({});
  };
  return (
    <Wrapper>
      <div className="listening-container">
        <div className="header">
          <p className="title">Record Your Listening Level</p>
        </div>
        <form className="form-listening" onSubmit={handleSubmit}>
          <div className="row-event">
            <label htmlFor="event">Event:</label>
            <input
              type="text"
              id="event"
              value={listening.event ?? ""}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="row-level">
            <label htmlFor="level">Listening Level:</label>
            <select
              name="level"
              id="level"
              onChange={handleChange}
              defaultValue="internal"
            >
              <option value="internal">Internal</option>
              <option value="focused">Focused</option>
              <option value="global">Global</option>
            </select>
          </div>
          <div className="row-content">
            <label htmlFor="content">Add Details:</label>
            <textarea
              rows="8 "
              value={listening.content ?? ""}
              id="content"
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="row-button">
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .listening-container {
    margin: 0 auto;
    border-top: 5px solid var(--primary);
    max-width: 1000px;
    width: 90vw;
    background-color: var(--white);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 2rem 2.5rem;
  }
  .title {
    font-size: 1.5rem;
    font-family: var(--headingFont);
  }
  .error {
    text-align: center;
    color: var(--red);
  }
  .form-listening {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    font-size: 1.2rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  input,
  select,
  textarea {
    padding: 0.375rem 0.75rem;
    background: var(--backgroundColor);
    border-radius: 5px;
    border: 0.5px solid var(--grey);
  }
  textarea {
    outline: none;
    resize: none;
  }
  .btn-submit {
    align-self: center;
    margin-top: 0.75rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }

  @media (min-width: 992px) {
    .form-listening {
      grid-template-columns: 1fr 1fr;
    }
    .row-content {
      grid-column: 1/3;
      grid-row: 2/3;
    }
    .row-button {
      grid-column: 1/3;
    }
  }
`;

export default AddListening;
