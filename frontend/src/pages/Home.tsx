import React from "react";
import '../fonts.css';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-gray-900" style={{ fontFamily: 'Madrid' }}>Welcome to My App</h1>
        <p className="text-lg text-gray-600 mt-2 " style={{ fontFamily: 'Madrid' }}>
          This is a simple homepage styled with Tailwind CSS and a custom font.
        </p>
      </header>
      <main className="flex flex-col items-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default Home;