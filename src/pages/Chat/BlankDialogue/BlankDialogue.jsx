import { IoChatbubblesOutline } from "react-icons/io5";

import cl from "./BlankDialogue.module.css";

export const BlankDialogue = () => {
  return (
    <div className={cl.blankWrapper}>
      <IoChatbubblesOutline className={cl.chatIcon} />
      <p>Start a chat!</p>
    </div>
  );
};
