import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}