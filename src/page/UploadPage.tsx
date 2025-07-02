"use client";

import { useState } from "react";

export default function UploadPage() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const dropdownData: Record<string, { label: string; value: string }[]> = {
    subject: [
      { label: "English Literature", value: "english-literature" },
      { label: "Geography", value: "geography" },
      { label: "History", value: "history" },
      { label: "Chemistry", value: "chemistry" },
      { label: "Biology", value: "biology" },
      { label: "Physics", value: "physics" },
      { label: "Mathematics", value: "mathematics" },
      { label: "Psychology", value: "psychology" },
      { label: "Sociology", value: "sociology" },
      { label: "Political Science", value: "political-science" },
    ],
    grade: [
      { label: "Grade 1", value: "grade-1" },
      { label: "Grade 2", value: "grade-2" },
      { label: "Grade 3", value: "grade-3" },
      { label: "Grade 4", value: "grade-4" },
      { label: "Grade 5", value: "grade-5" },
      { label: "Grade 6", value: "grade-6" },
      { label: "Grade 7", value: "grade-7" },
      { label: "Grade 8", value: "grade-8" },
      { label: "Grade 9", value: "grade-9" },
      { label: "Grade 10", value: "grade-10" },
      { label: "Grade 11", value: "grade-11" },
      { label: "Grade 12", value: "grade-12" },
    ],
    exam: [
      { label: "PCAT", value: "pcat" },
      { label: "ACT", value: "act" },
      { label: "SAT", value: "sat" },
      { label: "PSAT", value: "psat" },
      { label: "MCAT", value: "mcat" },
      { label: "CPA", value: "cpa" },
      { label: "GED", value: "ged" },
      { label: "TOEFL", value: "toefl" },
      { label: "AP", value: "ap" },
      { label: "NMSQT", value: "nmsqt" },
      { label: "BAR", value: "bar" },
      { label: "USMLE", value: "usmle" },
      { label: "LSAT", value: "lsat" },
      { label: "DAT", value: "dat" },
      { label: "GMAT", value: "gmat" },
      { label: "NCLEX", value: "nclex" },
      { label: "NCLEX PN", value: "nclex-pn" },
      { label: "GRE", value: "gre" },
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || (type !== "words" && !value) || !file) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(type, value || "words");

    try {
      const res = await fetch(`http://localhost:5006/${type}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) alert("✅ File uploaded successfully");
      else alert(data.error || "❌ Upload failed");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black text-white shadow-xl rounded-lg mt-6 border border-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📁 Upload Word File
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setValue("");
            }}
            className="w-full border border-white bg-black text-white px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
            required
          >
            <option value="">-- Select Type --</option>
            <option value="subject">Subject</option>
            <option value="exam">Exam</option>
            <option value="grade">Grade</option>
            {/* <option value="words">Words</option> */}
          </select>
        </div>

        {type !== "words" && type in dropdownData && (
          <div>
            <label className="block mb-1 font-medium">Select Value</label>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-white bg-black text-white px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
              required
            >
              <option value="">-- Select Option --</option>
              {dropdownData[type].map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Upload File</label>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-white bg-black text-white px-4 py-2 rounded focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
