import React, { memo, useContext } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import EntityIcon from "@/components/EntityIcon";
import EntityPickerModal from "@/components/EntityPickerModal";
import MemoryCalculatorContext from "@/contexts/MemoryCalculatorContext";
import ModalContext from "@/contexts/ModalContext";
import { EntityTypes } from "@/utils/entities";
import styles from "./TargetSkillCards.module.scss";

function TargetSkillCards() {
  const {
    targetSkillCardIds,
    alternateSkillCardIds,
    addAlternateSkillCards,
    targetNegations,
    setNegation,
    acquiredSkillCardIds,
    replaceTargetCardId,
    replaceAlternateCardId,
  } = useContext(MemoryCalculatorContext);
  const { setModal } = useContext(ModalContext);

  return (
    <div className={styles.targetSkillCards}>
      {targetSkillCardIds.map((skillCardId, index) => (
        <div key={`${index}_${skillCardId}`} className={styles.slot}>
          <button
            className={styles.minus}
            onClick={() => setNegation(index, !targetNegations[index])}
          >
            {targetNegations[index] ? (
              <span className={styles.not}>NOT</span>
            ) : (
              <FaCircleMinus />
            )}
          </button>

          <div
            className={`${styles.orGroup} ${
              alternateSkillCardIds[index]?.length ? styles.hasMultiple : ""
            }`}
          >
            <EntityIcon
              type={EntityTypes.SKILL_CARD}
              id={skillCardId}
              onClick={() =>
                setModal(
                  <EntityPickerModal
                    type={EntityTypes.SKILL_CARD}
                    onPick={(card) => replaceTargetCardId(index, card.id)}
                    filters={[
                      {
                        label: "取得済み",
                        callback: (e) => acquiredSkillCardIds.includes(e.id),
                        default: acquiredSkillCardIds.some((id) => id),
                      },
                    ]}
                  />
                )
              }
              size="fill"
            />

            {alternateSkillCardIds[index]?.map((altSkillCardId, altIndex) => (
              <React.Fragment
                key={`${index}_${altIndex}_${skillCardId}_${altSkillCardId}`}
              >
                <span className={styles.or}>OR</span>
                <EntityIcon
                  type={EntityTypes.SKILL_CARD}
                  id={altSkillCardId}
                  onClick={() =>
                    setModal(
                      <EntityPickerModal
                        type={EntityTypes.SKILL_CARD}
                        onPick={(card) =>
                          replaceAlternateCardId(index * 10 + altIndex, card.id)
                        }
                      />
                    )
                  }
                  size="fill"
                />
              </React.Fragment>
            ))}

            {alternateSkillCardIds[index]?.length != 10 &&
              alternateSkillCardIds[index]?.[
                alternateSkillCardIds[index].length - 1
              ] != 0 && (
                <button
                  className={styles.plus}
                  onClick={() => addAlternateSkillCards(index)}
                >
                  <FaCirclePlus />
                </button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(TargetSkillCards);
