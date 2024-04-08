import { Outlet } from "react-router-dom";

import cl from "./Layout.module.css";
import { Menu } from "./Menu/Menu";

export const Layout = () => {
  return (
    <>
      <Menu />
      <div className={cl.mainContent}>
        <Outlet />
      </div>

      <footer></footer>
    </>
  );
};
