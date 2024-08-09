import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const restEndpoint = "http://localhost:5000/test-db";

const callRestApi = async () => {
  const response = await fetch(restEndpoint);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return JSON.stringify(jsonResponse);
};


const MyElement: React.FC = () => {
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  }, []);

  return (
    <div>
      <h1>HEELLOOOO</h1>
      <p>{apiResponse}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <MyElement />
  </React.StrictMode>
);

