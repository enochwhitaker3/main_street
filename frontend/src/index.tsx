import React from 'react';
import ReactDOM from 'react-dom/client';
import TestPage from './components/test-page';

const MyElement: React.FC = () => {
  return (
    <div>
      <h1>Main Street Playhouse</h1>
      <TestPage />
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

