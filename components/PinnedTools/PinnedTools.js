"use client";
import { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import Dex from "@/components/Dex";
import MemoryCalculator from "@/components/MemoryCalculator";
import MemoryEditor from "@/components/MemoryEditor";
import Memories from "@/components/Memories";
import ProduceRankCalculator from "@/components/ProduceRankCalculator";
import Simulator from "@/components/Simulator";
import WorkspaceContext from "@/contexts/WorkspaceContext";
import { TOOLS } from "@/utils/tools";
import styles from "./PinnedTools.module.scss";

export default function PinnedTools() {
  const { pinnedTools, unpin } = useContext(WorkspaceContext);

  return (
    <div className={styles.pinnedTools}>
      {pinnedTools.map((tool) => (
        <div key={tool} className={styles.container}>
          <div className={styles.header}>
            <span>{TOOLS[tool].icon}</span>
            <button onClick={() => unpin(tool)}>
              <FaXmark />
            </button>
          </div>
          <div className={styles.tool}>
            {tool == "produceRankCalculator" && <ProduceRankCalculator />}
            {tool == "dex" && <Dex />}
            {tool == "memoryCalculator" && <MemoryCalculator />}
            {tool == "memoryEditor" && <MemoryEditor />}
            {tool == "memories" && <Memories />}
            {tool == "simulator" && <Simulator />}
          </div>
        </div>
      ))}
    </div>
  );
}
