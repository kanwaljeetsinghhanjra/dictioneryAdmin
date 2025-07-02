"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dropdownData = {
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

export default function WordListScreen() {
  const navigate = useNavigate();
  const [type, setType] = useState<keyof typeof dropdownData>("subject");
  const [filter, setFilter] = useState("");
  const [words, setWords] = useState<{ word: string; meaning: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    if (!filter) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5006/${type}/?${type}=${filter}&page=1&limit=1000`
      );
      const data = await res.json();
      if (data.success && data.words) {
        setWords(data.words);
      } else {
        setWords([]);
      }
    } catch (err) {
      console.error("Failed to fetch words", err);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [type, filter]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📚 Word List Viewer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Filter Type</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as keyof typeof dropdownData);
              setFilter("");
              setWords([]);
            }}
            className="w-full px-4 py-2 rounded border border-white bg-black text-white"
          >
            <option value="subject">Subject</option>
            <option value="grade">Grade</option>
            <option value="exam">Exam</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Select {type}</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded border border-white bg-black text-white"
          >
            <option value="">-- Select Option --</option>
            {dropdownData[type].map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold capitalize">{type} Word List</h1>
        <button
          onClick={() => navigate("/add-word")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <FaPlus className="text-white" />
          Add Word
        </button>
      </div>
      {words.length > 0 && (
        <p className="text-gray-400 mb-4">
          Found {words.length} {type} words for "{filter}"
        </p>
      )}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : words.length > 0 ? (
        words.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md p-4 rounded mb-3 border-l-4 border-indigo-600"
          >
            <h2 className="text-lg font-semibold text-gray-600">{item.word}</h2>
            <p className="text-gray-700">{item.meaning}</p>
          </div>
        ))
      ) : (
        filter && <p className="text-center text-gray-400">No words found.</p>
      )}
    </div>
  );
}
