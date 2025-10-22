import React, { useState, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "../components/Card";
import Button from "../components/Button";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("nv-notes", []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [search, setSearch] = useState("");

  function addNote(e) {
    e?.preventDefault();
    if (!title.trim() && !content.trim()) return;
    const newNote = {
      id: generateId(),
      title: title || "Untitled",
      content,
      completed: false,
      createdAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  function toggleComplete(id) {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  }

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (filter === "active" && n.completed) return false;
      if (filter === "completed" && !n.completed) return false;
      if (
        search &&
        !`${n.title} ${n.content}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [notes, filter, search]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <form onSubmit={addNote} className="space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white transition-colors"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white transition-colors resize-none"
              rows={4}
            />
            <div className="flex gap-2">
              <Button type="submit">Add Note</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        <Card>
          <div className="flex flex-col gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white transition-colors"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-blue-600 text-white dark:bg-gray-700 dark:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "active"
                    ? "bg-blue-600 text-white dark:bg-gray-700 dark:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "completed"
                    ? "bg-blue-600 text-white dark:bg-gray-700 dark:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Completed
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Notes: {notes.length} · Showing: {filtered.length}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <Card className="text-center">No notes to show</Card>
        ) : (
          filtered.map((note) => (
            <Card key={note.id} className="flex flex-col justify-between">
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`font-semibold ${
                      note.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {note.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleComplete(note.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
                    >
                      {note.completed ? "↺ Undo" : "✓ Done"}
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm">{note.content}</p>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
