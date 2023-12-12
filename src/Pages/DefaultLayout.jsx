import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header></Header>

      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default DefaultLayout;
