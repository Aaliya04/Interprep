<AnimatePresence>
  {showSidebar && (
    <>
      {/* Overlay (background blur) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowSidebar(false)}
        className="fixed inset-0 bg-black z-10"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 h-full w-80 bg-white/10 backdrop-blur-xl text-white p-6 z-20 shadow-2xl"
      >
        <div className="flex flex-col items-center mt-10">
          <div className="w-24 h-24 bg-white rounded-full mb-4"></div>

          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm">{profile.year}</p>
          <p className="text-sm">{profile.college}</p>
          <p className="text-sm">Target: {profile.targetCompany}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            Edit Profile
          </button>

          {/* Close button */}
          <button
            onClick={() => setShowSidebar(false)}
            className="mt-6 text-sm text-gray-300 hover:text-white"
          >
            Close
          </button>
        </div>
        <button
  onClick={() => navigate("/dashboard")}
  className="text-left hover:text-blue-600"
>
  Dashboard
</button>
      </motion.div>
    </>
  )}
</AnimatePresence>