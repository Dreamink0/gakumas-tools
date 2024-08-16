import { memo, useContext } from "react";
import EntityIcon from "@/components/EntityIcon";
import EntityPickerModal from "@/components/EntityPickerModal";
import ModalContext from "@/contexts/ModalContext";
import { EntityTypes } from "@/utils/entities";
import styles from "./StagePItems.module.scss";

function StagePItems({ pItemIds, replacePItemId, size }) {
  const { setModal } = useContext(ModalContext);

  return (
    <div className={styles.stagePItems}>
      {pItemIds.map((pItemId, index) => (
        <EntityIcon
          key={`${index}_${pItemId}`}
          type={EntityTypes.P_ITEM}
          id={pItemId}
          onClick={() =>
            setModal(
              <EntityPickerModal
                type={EntityTypes.P_ITEM}
                onPick={(card) => replacePItemId(index, card.id)}
                filters={{ sourceTypes: ["support"] }}
              />
            )
          }
          size={size}
        />
      ))}
    </div>
  );
}

export default memo(StagePItems);
