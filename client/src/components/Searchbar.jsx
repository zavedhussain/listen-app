import { useDispatch, useSelector } from "react-redux";
import {
  handleFilters,
  resetFilters,
} from "../features/listenings/listeningSlice";
import { styled } from "styled-components";

const Searchbar = () => {
  const { levelOptions, sortOptions, isLoading, sort, level } = useSelector(
    (state) => state.listenings
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(handleFilters({ id, value }));
  };
  return (
    <Wrapper>
      <form className="form-search">
        <div className="row-level">
          <label htmlFor="level">Listening Level:</label>
          <select
            name="level"
            id="level"
            onChange={handleChange}
            defaultValue={level}
          >
            {levelOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row-sort">
          <label htmlFor="sort">Sort By:</label>
          <select
            name="sort"
            id="sort"
            onChange={handleChange}
            defaultValue={sort}
          >
            {sortOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="button"
          className="btn btn-submit"
          disabled={isLoading}
          onClick={() => dispatch(resetFilters())}
        >
          Reset Filters
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem auto;
  max-width: 1000px;
  width: 90vw;
  background-color: var(--white);
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 2rem 2.5rem;

  .form-search {
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

  select {
    padding: 0.375rem 0.75rem;
    background: var(--backgroundColor);
    border-radius: 5px;
    border: 0.5px solid var(--grey);
  }
  .btn-submit {
    align-self: end;
    padding: 0.375rem 0.75rem;
    background-color: var(--primary);
    border-radius: 5px;
    border: none;
  }

  @media (min-width: 992px) {
    .form-search {
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
    }
  }
`;

export default Searchbar;
