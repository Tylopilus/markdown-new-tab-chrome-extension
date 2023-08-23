import React, { useState, useEffect } from "react";
import "./App.scss";
import { TextComponent } from "./components/TextComponent";
import { Menu } from "./components/Menu.tsx";
import { Context, ActiveIdProvider, useActiveId } from "./context";
import { useEntry } from "./store";

function App() {
  return (
    <ActiveIdProvider>
      <main>
        <Menu />
        <TextComponent />
      </main>
    </ActiveIdProvider>
  );
}

export default App;
