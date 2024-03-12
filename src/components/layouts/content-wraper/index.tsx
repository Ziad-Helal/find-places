import { FC, ReactNode } from "react";

interface Content_Wraper_Props {
  children: ReactNode;
}

export const Content_Wraper: FC<Content_Wraper_Props> = ({ children }) => {
  return <main className="grow container">{children}</main>;
};
