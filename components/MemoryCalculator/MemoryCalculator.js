"use client";
import React, { memo, useContext, useMemo, useState } from "react";
import EntityIcon from "@/components/EntityIcon";
import IconSelect from "@/components/IconSelect";
import MemoryCalculatorResult from "@/components/MemoryCalculatorResult";
import TargetSkillCards from "@/components/TargetSkillCards";
import MemoryCalculatorContext from "@/contexts/MemoryCalculatorContext";
import ModalContext from "@/contexts/ModalContext";
import WorkspaceContext from "@/contexts/WorkspaceContext";
import { EntityTypes } from "@/utils/entities";
import {
  COST_RANGES_BY_RANK,
  generatePossibleMemories,
} from "@/utils/skillCardLottery";
import styles from "./MemoryCalculator.module.scss";
import EntityPickerModal from "../EntityPickerModal";

const RANKS = ["B", "B+", "A", "A+", "S"];

// Generates all combinations of target cards
function generateCombinations(slots) {
  if (slots.length === 0) return [[]];
  const restCombos = generateCombinations(slots.slice(1));
  return slots[0].reduce(
    (acc, cur) => acc.concat(restCombos.map((c) => c.concat(cur))),
    []
  );
}

function MemoryCalculator() {
  const {
    targetSkillCardIds,
    alternateSkillCardIds,
    targetNegations,
    acquiredSkillCardIds,
    replaceAcquiredCardId,
  } = useContext(MemoryCalculatorContext);
  const { setModal } = useContext(ModalContext);
  const { idolId } = useContext(WorkspaceContext);
  const [rank, setRank] = useState("A");

  const costRange = COST_RANGES_BY_RANK[rank];

  const possibleMemories = useMemo(
    () => generatePossibleMemories(acquiredSkillCardIds, rank),
    [acquiredSkillCardIds, rank]
  );
  const {
    onTargetMemories,
    offTargetMemories,
    onTargetProbability,
    offTargetProbability,
  } = useMemo(
    () =>
      possibleMemories.reduce(
        (acc, cur) => {
          // Cards for each slot
          const slots = targetSkillCardIds
            .map((id, idx) =>
              [id].concat(alternateSkillCardIds[idx] || []).filter((mid) => mid)
            )
            .filter((slot) => slot.length);

          const positiveSlots = slots.filter((_, i) => !targetNegations[i]);
          const negativeSlots = slots.filter((_, i) => targetNegations[i]);
          const excludedSkillCardIds = [].concat(...negativeSlots);

          // Combos excluding those with duplicate cards
          const matchingCombinations = generateCombinations(
            positiveSlots
          ).filter((combo) => new Set(combo).size == combo.length);

          // Classify on/off-target
          const memoryIsOnTarget =
            matchingCombinations.some((combo) =>
              combo.every((id) => cur.skillCardIds.includes(id))
            ) &&
            !cur.skillCardIds.some((id) => excludedSkillCardIds.includes(id));

          if (memoryIsOnTarget) {
            acc.onTargetMemories.push(cur);
            acc.onTargetProbability += cur.probability;
          } else {
            acc.offTargetMemories.push(cur);
            acc.offTargetProbability += cur.probability;
          }

          return acc;
        },
        {
          onTargetMemories: [],
          offTargetMemories: [],
          onTargetProbability: 0,
          offTargetProbability: 0,
        }
      ),
    [
      possibleMemories,
      targetSkillCardIds,
      alternateSkillCardIds,
      targetNegations,
    ]
  );

  return (
    <div className={styles.memoryCalculator}>
      <b>
        Probabilities shown are estimates. The real skill card selection
        algorithm is not known.
      </b>

      <label>Target skill cards</label>
      <TargetSkillCards />

      <label>Acquired skill cards</label>
      <div className={styles.skillCards}>
        {acquiredSkillCardIds.map((skillCardId, index) => (
          <EntityIcon
            key={`${index}_${skillCardId}`}
            type={EntityTypes.SKILL_CARD}
            id={skillCardId}
            onClick={() =>
              setModal(
                <EntityPickerModal
                  type={EntityTypes.SKILL_CARD}
                  onPick={(card) => replaceAcquiredCardId(index, card.id)}
                />
              )
            }
          />
        ))}
      </div>

      <label>Produce rank</label>
      <div className={styles.rankSelect}>
        <IconSelect
          options={RANKS.map((r) => ({
            id: r,
            iconSrc: `/ranks/${r}.png`,
            alt: r,
          }))}
          selected={rank}
          onChange={setRank}
        />
      </div>

      <label>Cost range</label>
      <div>
        {costRange.min} ~ {costRange.max}
      </div>

      <label>
        On-target memories ({(onTargetProbability * 100).toFixed(2)}%)
      </label>
      {onTargetMemories.map(({ skillCardIds, probability }) => (
        <MemoryCalculatorResult
          key={skillCardIds}
          skillCardIds={skillCardIds}
          probability={probability}
          idolId={idolId}
        />
      ))}

      <label>
        Off-target memories ({(offTargetProbability * 100).toFixed(2)}%)
      </label>
      {offTargetMemories.map(({ skillCardIds, probability }) => (
        <MemoryCalculatorResult
          key={skillCardIds}
          skillCardIds={skillCardIds}
          probability={probability}
          idolId={idolId}
        />
      ))}
    </div>
  );
}

export default memo(MemoryCalculator);
