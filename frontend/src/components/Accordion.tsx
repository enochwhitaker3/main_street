import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="flex items-center sm:justify-between w-full mt-2 pl-0 sm:text-left justify-center"
      >
        <span className="text-lg font-semibold">{title}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="pl-0">{content}</div>}
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="bg-transparent rounded-md outline-dashed sm:w-4/6 w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
