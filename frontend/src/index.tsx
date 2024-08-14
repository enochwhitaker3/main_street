import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

const MyElement: React.FC = () => {
  return (
    <div>
      <App />
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
