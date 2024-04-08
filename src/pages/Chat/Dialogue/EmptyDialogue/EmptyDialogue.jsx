import { RiChatSmile2Fill } from "react-icons/ri";

import cl from "./EmptyDialogue.module.css";
export const EmptyDialogue = () => {
  return (
    <div className={cl.wrapper}>
      <RiChatSmile2Fill className={cl.icon} />
      <p>Send first message!</p>
    </div>
  );
};
