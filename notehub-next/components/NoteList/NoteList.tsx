import css from "./NoteList.module.css";
import Link from "next/link";
import { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.details}>
              View details
            </Link>

            <button
              type="button"
              className={css.delete}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
