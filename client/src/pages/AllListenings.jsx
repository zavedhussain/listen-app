import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllListenings } from "../features/listenings/listeningSlice";
import { styled } from "styled-components";
import Loading from "../components/Loading";
import Listening from "../components/Listening";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

const AllListenings = () => {
  const { isLoading, totalListenings, allListenings, page, level, sort } =
    useSelector((state) => state.listenings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListenings());
  }, [page, level, sort]);

  if (isLoading) {
    return <Loading />;
  }
  if (totalListenings === 0) {
    return (
      <Wrapper>
        <h1>No jobs to display...</h1>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Searchbar />
      <h1>
        {totalListenings} Record{totalListenings > 1 ? "s" : ""} found
      </h1>
      <div className="listenings">
        {allListenings.map((item) => {
          return <Listening key={item._id} {...item} />;
        })}
      </div>
      <Pagination />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
  .listenings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
`;

export default AllListenings;
