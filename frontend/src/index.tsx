import React from 'react';
import ReactDOM from 'react-dom/client';
import PlaysList from './components/PlaysList';

const MyElement: React.FC = () => {
  return (
    <div>
      <h1>Main Street Playhouse</h1>
      <PlaysList />
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

