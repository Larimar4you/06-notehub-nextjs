"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery],
    queryFn: () => fetchNotes(currentPage, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string): void => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} type="button" onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
