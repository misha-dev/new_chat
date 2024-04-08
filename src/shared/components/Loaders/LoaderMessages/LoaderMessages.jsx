import cl from "./LoaderMessages.module.css";
export const LoaderMessages = () => {
  return (
    <div className={cl.wrapperLoader}>
      <div className={cl.ldsHourglass}></div>
    </div>
  );
};
