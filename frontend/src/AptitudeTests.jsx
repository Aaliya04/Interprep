import { useState } from "react";




export default function AptitudeTests() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const allTests = [
    {
      title: "Logical Reasoning - Pattern Sequences",
      category: "Logical Reasoning",
      questions: 15,
      time: "20 mins"
    },
    {
      title: "Quantitative Aptitude - Arithmetic",
      category: "Quantitative Aptitude",
      questions: 20,
      time: "25 mins"
    },
    {
      title: "Mathematics - Algebra and Equations",
      category: "Mathematics",
      questions: 20,
      time: "30 mins"
    },
    {
      title: "Verbal Ability - Sentence Correction",
      category: "Verbal Ability",
      questions: 15,
      time: "20 mins"
    },
    {
      title: "Data Interpretation - Bar & Pie Charts",
      category: "Data Interpretation",
      questions: 10,
      time: "15 mins"
    },
    {
      title: "Analytical Reasoning - Puzzle Solving",
      category: "Logical Reasoning",
      questions: 12,
      time: "20 mins"
    },
    {
      title: "Number Series - Missing Term",
      category: "Quantitative Reasoning",
      questions: 15,
      time: "15 mins"
    },
    {
      title: "Reading Comprehension - Short Passages",
      category: "English Comprehension",
      questions: 3,
      time: "15 mins"
    },
    {
      title: "Probability & Permutations",
      category: "Advanced Mathematics",
      questions: 10,
      time: "20 mins"
    },
    {
      title: "Coding-Decoding - Symbol Based",
      category: "Logical Coding",
      questions: 10,
      time: "15 mins"
    }
  ];

  const categories = ["All", ...new Set(allTests.map(test => test.category))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Later: Load questions for the selected test section
  };

  const filteredTests = allTests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || test.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      {!selectedCategory && (
        <>
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Aptitude Test Sections</h2>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="🔍 Search Test by title..."
              className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTests.map((test, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {test.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Questions:</span> {test.questions}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Estimated Time:</span> {test.time}
                </p>
                <button
                  onClick={() => handleCategorySelect(test.category)}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
