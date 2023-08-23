import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useActiveId } from "../context";
import {
  addEntry,
  deleteEntryById,
  Entry,
  getEntries,
  useEntries,
} from "../store";
import "./Menu.scss";

interface Object {
  id: number;
  headline: string;
  content: string;
  dragging?: boolean;
}
export const Menu: React.FC = () => {
  const [activeId] = useActiveId();
  const obj = useEntries();

  return (
    <div className="side">
      <MenuEntry title="New Page" initial={true} id={-1} activeId={activeId} />
      {obj &&
        obj.map((o: Object) => {
          return (
            <MenuEntry
              key={o.id}
              id={o.id}
              title={o.headline}
              initial={false}
              activeId={activeId}
            />
          );
        })}
    </div>
  );
};

interface Props {
  title?: string;
  onClick?: () => void;
  initial?: boolean;
  id: number;
  activeId: number;
}
export const MenuEntry: React.FC<Props> = ({
  title,
  initial,
  id,
  activeId,
}): JSX.Element => {
  const [, setActiveId] = useActiveId();

  const createNewPage = () => {
    const _id = getEntries()[getEntries().length - 1]?.id + 1;
    const entry: Entry = {
      id: _id || 0,
      content: "",
      headline: "Untitled",
    };
    addEntry(entry);
    setActiveId(entry.id);
  };

  function getIndexOfEntryById(id: number): number {
    const entries = getEntries();
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  return (
    <div
      onClick={initial ? createNewPage : undefined}
      style={{ cursor: "pointer" }}
    >
      <div className="flexContainer">
        {activeId === id ? <div className="activated" /> : null}
        <div
          className="headline"
          onClick={() => {
            setActiveId(id ?? 0);
          }}
        >
          {title}
        </div>
        {id >= 0 ? (
          <div
            className="icon"
            onClick={() => {
              const entries = getEntries();
              if (activeId === id) {
                const indexInEntries = getIndexOfEntryById(id);
                if (indexInEntries > 0) {
                  setActiveId(entries[indexInEntries - 1].id);
                } else {
                  setActiveId(entries[1].id);
                }
              }
              deleteEntryById(id);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </div>
        ) : null}
        {initial ? (
          <div className="icon">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </div>
        ) : null}
      </div>
    </div>
  );
};
