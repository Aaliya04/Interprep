// TemplateGallery.jsx
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "atlantic-blue",
    name: "Atlantic Blue",
    description: "Multi-column with sidebar left",
    image: "/template-previews/atlantic-blue.png"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Serif font · Black & White",
    image: "/template-previews/executive.png"
  },
  {
    id: "blue-steel",
    name: "Blue Steel",
    description: "Minimalistic · Classic",
    image: "/template-previews/blue-steel.png"
  },
  {
    id: "rosewood",
    name: "Rosewood",
    description: "Two-column layout",
    image: "/template-previews/rosewood.png"
  },
  // Add more as needed
];

export default function TemplateGallery() {
  const navigate = useNavigate();

  const handleTemplateSelect = (id) => {
    navigate(`/resume-builder?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* New Blank */}
        <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-white hover:shadow" onClick={() => handleTemplateSelect("blank")}>
          <div className="text-4xl">＋</div>
          <p className="mt-2 font-semibold">New Blank</p>
        </div>

        {/* Import Resume */}
        <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-white hover:shadow" onClick={() => alert("Import functionality coming soon!")}>
          <div className="text-2xl">📄</div>
          <p className="mt-2 font-semibold">Import Resume</p>
        </div>

        {/* Template Cards */}
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg bg-white cursor-pointer transition"
            onClick={() => handleTemplateSelect(tpl.id)}
          >
            <img
              src={tpl.image}
              alt={tpl.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{tpl.name}</h2>
              <p className="text-sm text-gray-600">{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
