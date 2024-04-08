import cl from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={cl.loaderWrapper}>
      <div className={cl.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
