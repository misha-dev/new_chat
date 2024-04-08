import OverlayScrollbars from "overlayscrollbars";
import { useEffect } from "react";

const options = {};
export let scrollBars;
export const useScrollbar = (root, hasScroll) => {
  useEffect(() => {
    if (root.current && hasScroll) {
      scrollBars = OverlayScrollbars(root.current, options);
      scrollBars.options("overflowBehavior.x", "hidden");
      scrollBars.scroll([0, "100%"], 500);
    }

    return () => {
      if (scrollBars) {
        scrollBars.destroy();
      }
    };
  }, [root, hasScroll]);
};
