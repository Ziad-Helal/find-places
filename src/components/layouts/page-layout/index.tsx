import { Outlet } from "react-router-dom";
import { Page_Layout_Footer } from "./page-layout-footer";
import { Page_Layout_Header } from "./page-layout-header";
import { Content_Wraper } from "@/components";

export const Page_Layout = () => {
  return (
    <>
      <Page_Layout_Header />
      <Content_Wraper>
        <Outlet />
      </Content_Wraper>
      <Page_Layout_Footer />
    </>
  );
};
export * from "./page-layout-header";
export * from "./page-layout-footer";
