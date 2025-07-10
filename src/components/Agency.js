// components/PlatformIntro.js
export default function PlatformIntro() {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

        {/* External image using <img> */}
        <div className="w-full max-w-4xl">
          <img
            src="https://images.pexels.com/photos/17792248/pexels-photo-17792248.jpeg"
            alt="Platform Preview"
            className="w-full h-auto object-contain rounded-xl shadow-xl"
          />
        </div>

        {/* Main Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          DIGITAL WEALTH <br /> ACADEMY
        </h2>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl italic text-gray-700 max-w-xl">
          Your one-stop shop to build a freedom based business
        </p>
      </div>
    </section>
  )
}
