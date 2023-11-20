import React from "react";

const LoadingSkeleton = () => {
  const fakeArray = Array.from({ length: 8 }, () => null);

  return (
    <>
      <nav className="w-full flex items-center justify-between rounded-md  mb-10 px-5 animate-pulse">
        <div className="flex items-center gap-x-4">
          <span className="h-[40px] min-w-[200px] flex items-center justify-start rounded-md text-2xl  font-bold text-neutral-50 tracking-wider blur-[4px]">
            Carregando ..
          </span>
        </div>
        <div className="flex items-center gap-x-5"></div>
      </nav>

      <section className="flex flex-col md:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {fakeArray.map(num => (
          <div key={num} className="h-[150px] w-full rounded-md flex flex-col items-start gap-y-2 bg-gradient-to-b from-neutral-300/40 to-neutral-500/80 animate-pulse p-5">
            <span className="min-h-[40px] w-full rounded-lg bg-dark_bg/60 mb-2 flex items-center justify-center text-sm font-semibold tracking-widest"></span>
            <div className="h-[20px] w-full rounded-lg bg-dark_bg/60" />
            <div className="h-[20px] w-full rounded-lg bg-dark_bg/60" />
          </div>
        ))}

      </section>
    </>
  );
};

export default LoadingSkeleton;