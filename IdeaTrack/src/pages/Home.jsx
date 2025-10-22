import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="grid gap-6">
      <Card className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-white mb-3">
          Welcome to IdeaTrack
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          A beautiful notes & task manager built with React and Tailwind CSS.
        </p>
        <div className="mt-6">
          <Link to="/notes">
            <Button>📝 Open Notes</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
