import cl from "./LoaderUsers.module.css";

export const LoaderUsers = () => {
  return (
    <div className={cl.loaderWrapper}>
      <div className={cl.ldsCircle}>
        <div></div>
      </div>
    </div>
  );
};
