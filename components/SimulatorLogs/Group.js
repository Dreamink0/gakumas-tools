import { memo } from "react";
import { useTranslations } from "next-intl";
import Image from "@/components/Image";
import { PItems, SkillCards } from "@/utils/data";
import Logs from "./Logs";
import styles from "./SimulatorLogs.module.scss";

function Group({ entity, childLogs, idolId }) {
  const t = useTranslations("stage");

  let resolvedEntity = null;
  if (entity.type == "skillCard" || entity.type == "skillCardEffect") {
    resolvedEntity = SkillCards.getById(entity.id);
  } else if (entity.type == "pItem") {
    resolvedEntity = PItems.getById(entity.id);
  }

  return (
    <div className={styles.group}>
      <div className={styles.entity}>
        {entity.type == "default" && (
          <>
            {t("effect")}「{entity.id}」
          </>
        )}
        {entity.type == "stage" && t("stageEffect")}
        {entity.type == "skillCard" && (
          <>
            <Image
              src={resolvedEntity.getIcon(idolId)}
              width={24}
              height={24}
              alt=""
            />
            {t("skillCard")}「{resolvedEntity.name}」
          </>
        )}
        {entity.type == "skillCardEffect" && (
          <>
            <div className={styles.effect}>
              <Image
                src={resolvedEntity.getIcon(idolId)}
                width={24}
                height={24}
                alt=""
              />
            </div>
            {t("effect")}「{resolvedEntity.name}」
          </>
        )}
        {entity.type == "pItem" && (
          <>
            <Image
              src={resolvedEntity.getIcon()}
              width={24}
              height={24}
              alt=""
            />
            {t("pItem")}「{resolvedEntity.name}」
          </>
        )}
      </div>
      <div className={styles.childLogs}>
        <Logs logs={childLogs} idolId={idolId} />
      </div>
    </div>
  );
}

export default memo(Group);
