export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto p-0 w-full">
        {/* Desktop/Large Screen Hero */}
        <div className="hidden lg:flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="max-w-3xl text-center lg:text-left">
            <h1 className="sm:text-7xl font-extrabold text-gray-900 leading-tight">
              <span className="text-4xl">Learn the Skills to Build</span> <br />
              Digital <span className="text-green-900 text-8xl">Wealth & Freedom</span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Join thousands of others taking control of their future. No fluff. Just results.
            </p>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-1/2 h-full">
            <div className="overflow-hidden">
              <img
                src="/images/sandra-reading-bible.jpg"
                alt="Digital Skills"
                className="object-cover w-full h-200"
              />
            </div>
          </div>
        </div>

     
       {/* Mobile Hero */}
<div className="relative flex flex-col items-center justify-center text-center gap-6 lg:hidden min-h-screen w-full">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center w-full h-full"
    style={{
      backgroundImage:
        "url(/images/sandra-reading-bible.jpg)",
      opacity: 0.3,
    }}
  ></div>

  {/* Content */}
  <div className="relative z-10 px-4">
    <h1 className="text-2xl font-extrabold text-black leading-tight">
      Learn the Skills<br/> to Build <br />
      <span className="text-green-900 text-6xl">Wealth & Freedom</span>
    </h1>
    <p className="text-lg text-gray-700 mt-4">
      Join thousands of others taking control of their future.
    </p>
  </div>
</div>

      </div>
    </section>
  );
}
