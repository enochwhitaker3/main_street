import React from "react";
import ReactDOM from "react-dom/client";
import PlaysTest from "./components/plays-test";
import SponsorsTest from "./components/sponsors-test";
import ShowtimeTest from "./components/showtimes-test";
import CastMemberTest from "./components/cast-test";

const MyElement: React.FC = () => {
  return (
    <div>
      <h1>Main Street Playhouse</h1>
      <PlaysTest />
      <SponsorsTest />
      <ShowtimeTest />
      <CastMemberTest />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyElement />
  </React.StrictMode>
);
