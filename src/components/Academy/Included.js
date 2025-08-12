import React from "react";

export const Included = () => {
  return (
    <section className="max-w-4xl mx-auto text-center px-6">
      <h2 className="md:text-6xl text-3xl font-semibold mb-4">
        What&apos;s Included
      </h2>
      <ul className="list-disc list-inside text-gray-700 text-left max-w-xl mx-auto space-y-5">
        <li className="list-none">
          <div className="bg-green-800 list-none p-4 shadow-sm relative">
            <p className="text-white text-center text-xl">
              Self-paced video modules
            </p>
            <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
          </div>
        </li>

        <li className="list-none">
          <div className="bg-green-800 list-none p-4 shadow-sm relative">
            <p className="text-white text-center text-xl">
              Bi-weekly live coaching
            </p>
            <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
          </div>
        </li>

        <li className="list-none">
          <div className="bg-green-800 list-none p-4 shadow-sm relative">
            <p className="text-white text-center text-xl">
              Private community support
            </p>
            <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
          </div>
        </li>

        <li className="list-none">
          <div className="bg-green-800 list-none p-4 shadow-sm relative">
            <p className="text-white text-center text-xl">
              Real-world assignment + final project
            </p>
            <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
          </div>
        </li>

        <li className="list-none">
          <div className="bg-green-800 list-none p-4 shadow-sm relative">
            <p className="text-white text-center text-xl">
              Tools, templates, and roadmaps
            </p>
            <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
          </div>
        </li>
      </ul>
    </section>
  );
};
