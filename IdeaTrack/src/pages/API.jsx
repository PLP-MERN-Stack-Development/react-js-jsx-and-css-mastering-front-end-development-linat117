import React, { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";

const PAGE_SIZE = 10;

export default function API() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((r) => {
        if (!r.ok) throw new Error("Network response not ok");
        return r.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((p) =>
      (p.title + p.body).toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  if (loading) return <Card>Loading posts…</Card>;
  if (error) return <Card>Error: {error}</Card>;

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex gap-2 items-center">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white transition-colors"
          />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p) => (
          <Card key={p.id}>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {p.body.slice(0, 140)}
              {p.body.length > 140 ? "..." : ""}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          ← Prev
        </button>
        <div className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg font-semibold text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700">
          Page {page} / {totalPages}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
