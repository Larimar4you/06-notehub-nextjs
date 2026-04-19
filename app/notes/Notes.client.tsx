"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, ""),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={css.container}>
      <ul>
        {data.notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
