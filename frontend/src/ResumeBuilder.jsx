// File: src/pages/ResumeBuilder.jsx
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

export default function ResumeBuilder() {
  const [theme, setTheme] = useState("light");
  const [template, setTemplate] = useState("style1");
  const [layout, setLayout] = useState("classic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
    sections: [
      { title: "Education", content: "" },
      { title: "Experience", content: "" }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSectionChange = (index, key, value) => {
    const updated = [...formData.sections];
    updated[index][key] = value;
    setFormData({ ...formData, sections: updated });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "New Section", content: "" }]
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formData.sections);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setFormData({ ...formData, sections: items });
  };

  const downloadPDF = () => {
    const resume = document.getElementById("resume-preview");
    html2canvas(resume).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("resume.pdf");
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange("profilePic", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const bg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const text = theme === "dark" ? "text-white" : "text-black";
  const inputStyle = `${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`;

  return (
    <div className={`min-h-screen p-6 ${bg} ${text}`}>
      <div className="flex justify-between mb-4 flex-wrap items-start gap-4">
        <div className="flex gap-4 flex-wrap">
          {["style1", "style2"].map((style) => (
            <div
              key={style}
              onClick={() => setTemplate(style)}
              className={`cursor-pointer border rounded p-2 transition hover:shadow-md ${template === style ? "ring-2 ring-blue-500" : ""}`}
            >
              <img
                src={`/template-previews/${style}.png`}
                alt={style}
                className="w-24 h-32 object-cover rounded mb-1"
              />
              <p className="text-center text-sm font-semibold">{style.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <div className="ml-auto space-x-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <button
            onClick={() => setLayout(layout === "classic" ? "modern" : "classic")}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          >
            Switch to {layout === "classic" ? "Modern" : "Classic"} Layout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <input
            className={`w-full border px-4 py-2 rounded ${inputStyle}`}
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            className={`w-full border px-4 py-2 rounded ${inputStyle}`}
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            className={`w-full border px-4 py-2 rounded ${inputStyle}`}
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {formData.sections.map((section, i) => (
                    <Draggable key={i} draggableId={`section-${i}`} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4 p-2 border rounded"
                        >
                          <input
                            className={`w-full border px-4 py-2 rounded mb-2 ${inputStyle}`}
                            placeholder="Section Title"
                            value={section.title}
                            onChange={(e) => handleSectionChange(i, "title", e.target.value)}
                          />
                          <textarea
                            className={`w-full border px-4 py-2 rounded ${inputStyle}`}
                            placeholder="Content"
                            rows="4"
                            value={section.content}
                            onChange={(e) => handleSectionChange(i, "content", e.target.value)}
                          ></textarea>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            onClick={addSection}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Section
          </button>
        </div>

        <div
          id="resume-preview"
          className={`p-6 border rounded shadow ${template === "style2" ? "bg-blue-100" : "bg-white"} text-black ${layout === "modern" ? "grid grid-cols-3 gap-4" : ""}`}
        >
          {layout === "modern" ? (
            <>
              <div className="col-span-1">
                {formData.profilePic && (
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                )}
                <h1 className="text-xl font-bold">{formData.name}</h1>
                <p>{formData.email} | {formData.phone}</p>
              </div>
              <div className="col-span-2">
                {formData.sections.map((sec, idx) => (
                  <div key={idx} className="mt-4">
                    <h2 className="text-lg font-semibold">{sec.title}</h2>
                    <p>{sec.content}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {formData.profilePic && (
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
              )}
              <h1 className="text-2xl font-bold">{formData.name}</h1>
              <p>{formData.email} | {formData.phone}</p>
              {formData.sections.map((sec, idx) => (
                <div key={idx} className="mt-4">
                  <h2 className="text-lg font-semibold">{sec.title}</h2>
                  <p>{sec.content}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center mt-6">
        <button
          onClick={downloadPDF}
          className="px-5 py-2 rounded bg-green-600 text-white"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}