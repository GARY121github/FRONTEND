const LandingPage = () => {
  return (
    <div className="bg-slate-900">
      {/* // Navbar for the landing page */}
      <div className="fixed inset-x-0 top-4 w-full z-[1000]">
        <div className="flex justify-between max-w-7xl gap-4 mx-auto border border-[#555252] px-4 py-2 rounded-lg w-[95%] inset-x-0 backdrop-blur-md z-50">
          <div className="logo flex gap-2 items-center text-white">
            VidSphere
          </div>
          <div className="flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-2 space-x-6 text-sm items-center justify-center px-6 font-medium overflow-hidden text-white">
            <a className="relative">Home</a>
            <a>Features</a>
            <a>Carrers</a>
            <a>Blog</a>
          </div>
          <div className="sidefun text-white">
            <div>SignIn</div>
          </div>
        </div>
      </div>
      {/* // Main content for the landing page */}
      <div className="pt-32 md:pt-48 pb-10 md:pb-24 px-8 relative z-40">
        <div className="flex flex-col items-center">
          <div className="z-50">
            <h1 className="text-center text-3xl md:text-6xl mb-4 font-bold text-white">
              Explore.Engage.Expand Your World
            </h1>
            <p className="text-center font-medium text-base md:text-lg mb-8 text-white">
              Dive into Vidsphere's vast universe of captivating content, where
              every click unlocks endless exploartion and inspiration
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#FF0000] text-white px-4 py-2 rounded-md font-medium">
              Get Started
            </button>
            <button className="bg-[#FF0000] text-white px-4 py-2 rounded-md font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* main part two for landing page */}
      <div className="h-[30rem] relative overflow-hidden px-8">
        <div className="flex flex-col items-center mt-56 relative z-20">
          <h2 className="text-3xl md:text-6xl text-center font-bold text-white mb-4">
            Your Ultimate Destination
          </h2>
          <p className="text-white font-medium text-lg md:text-lg mb-8">
            Endless Video Discovery and Engagement
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
