import { PropsWithChildren } from "react";
import MainAppBar from "../components/appBar";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="App">
      <MainAppBar title="Flight Search" />
      <main>{children}</main>
    </div>
  );
}
