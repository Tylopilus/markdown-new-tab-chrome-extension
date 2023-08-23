import { useEffect, useState } from "react";
import { useActiveId } from "./context";

export type Entry = {
  id: number;
  content: string;
  headline: string;
};
function createInitialEntries():void {
  const entry = {
    id: 0,
    content: "",
    headline: "Insert text here"
  }
  const obj: Entry[] = [entry];
  localStorage.setItem("sheets", JSON.stringify(obj));
}

export function getEntryById(id: number): Entry | undefined {
  const entries = localStorage.getItem('sheets');
  if(!entries) createInitialEntries();
  const parsedEntries: Entry[] = JSON.parse(localStorage.getItem("sheets") ?? "[]");
  if (parsedEntries === null) return undefined;
  const returnVal = parsedEntries.find((entry: Entry) => entry.id === id);
  return returnVal;
}

const customEvent = new CustomEvent("storage");
export function addEntry(entry: Entry): void {
  const parsedEntries: Entry[] = JSON.parse(localStorage.getItem("sheets") ?? "[]");
  const index = parsedEntries.findIndex((e) => e.id === entry.id);
  if (index > -1) {
    parsedEntries[index] = entry;
  } else {
    parsedEntries.push(entry);
  }
  localStorage.setItem("sheets", JSON.stringify(parsedEntries));
  window.dispatchEvent(customEvent);
}

export function deleteEntryById(id: number): void {
  const obj: Entry[] = JSON.parse(localStorage.getItem("sheets") ?? "[]");
  const index = obj.findIndex((e) => e.id === id);
  if (index > -1) {
    obj.splice(index, 1);
  }
  localStorage.setItem("sheets", JSON.stringify(obj));
  window.dispatchEvent(customEvent);
}

export function useEntry(): Entry | undefined {
  const [_id] = useActiveId();

  return getEntryById(_id);
}

export function getEntries(): Entry[] {
  const entries = localStorage.getItem('sheets');
  if(!entries) createInitialEntries();
  const obj: Entry[] = JSON.parse(localStorage.getItem("sheets") ?? "[]");
  return obj;
}

export function useEntries(): Entry[] {
  const [entries, setEntries] = useState<Entry[]>(getEntries());

  useEffect(() => {
    const listener = () => {
      setEntries(getEntries());
    };
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, []);

  return entries;
}
