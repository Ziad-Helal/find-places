import { Outlet } from "react-router-dom";
import { Page_Layout_Header } from "./page-layout-header";
import { Content_Wraper } from "@/components";

export const Page_Layout = () => {
  return (
    <>
      <Page_Layout_Header />
      <Content_Wraper>
        <Outlet />
      </Content_Wraper>
    </>
  );
};

export * from "./page-layout-header";
