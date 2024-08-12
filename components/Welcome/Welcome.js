import { useState } from "react";
import Button from "@/components/Button";
import MemoryImporter from "@/components/MemoryImporterModal";
import { TOOLS } from "@/utils/tools";
import styles from "./Welcome.module.scss";

export default function Welcome() {
  const [showImporter, setShowImporter] = useState(false);

  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <h2>Welcome to Gakumas Tools!</h2>
        <p>
          Calculate the exam score required to achieve produce ranks, view
          P-item and skill card information, import and search memories by
          P-items and skill cards, and more.
        </p>

        <h3>Features</h3>
        <ul>
          {TOOLS.map(({ title, icon, description, path }) => {
            return (
              <li key={path} className={styles.feature}>
                <Button ariaLabel={title} href={path}>
                  {icon}
                </Button>
                {description}
              </li>
            );
          })}
        </ul>
      </div>

      {showImporter && (
        <MemoryImporter onClose={() => setShowImporter(false)} />
      )}
    </div>
  );
}
