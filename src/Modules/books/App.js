import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDeepCompareEffect } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import { clearStore, GetBills } from "./store/slice";
import LadingBillsContent from "./components/Content";
import LadingBillsHead from "./components/Head";
import reducer from "./store";

const LadingBillsApp = () => {
  const dispatch = useDispatch();
  const pageLayout = useRef();

  useDeepCompareEffect(() => {
    dispatch(clearStore());
    dispatch(GetBills());
  }, [dispatch]);

  return (
    <React.Fragment>
      <FusePageSimple
        classes={{
          contentWrapper: "p-16 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "sm:h-80 sm:min-h-80",
          wrapper: "min-h-0",
        }}
        header={<LadingBillsHead pageLayout={pageLayout} />}
        content={<LadingBillsContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </React.Fragment>
  );
};
export default withReducer("LadingBills", reducer)(LadingBillsApp);
