import axios, { type AxiosResponse } from "axios";
import type { NewNote, Note, NoteResponse } from "../types/note";

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
): Promise<NoteResponse> => {
  const response = await noteHubApi.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteHubApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await noteHubApi.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubApi.delete<Note>(
    `/notes/${id}`,
  );
  return response.data;
};
