import { useEffect, useState } from "react";

export default function ProfileModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    college: "",
    year: "",
    targetCompany: "",
  });
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      const data = JSON.parse(saved);
      setForm(data);
      setProfilePic(data.profilePic || "");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify({ ...form, profilePic }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 rounded-xl border"
        />
        <input
          type="text"
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="College"
          className="w-full mb-3 px-4 py-2 rounded-xl border"
        />
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-xl border"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
        <input
          type="text"
          name="targetCompany"
          value={form.targetCompany}
          onChange={handleChange}
          placeholder="Target Company"
          className="w-full mb-3 px-4 py-2 rounded-xl border"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProfilePic(URL.createObjectURL(e.target.files[0]))
          }
          className="mb-3"
        />
        {profilePic && (
          <img
            src={profilePic}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
