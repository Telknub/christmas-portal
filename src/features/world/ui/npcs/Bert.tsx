import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { NPC_WEARABLES } from "lib/npcs";
import React, { useContext, useState } from "react";
import { DeliveryPanelContent } from "../deliveries/DeliveryPanelContent";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { useRandomItem } from "lib/utils/hooks/useRandomItem";
import { defaultDialogue, npcDialogues } from "../deliveries/dialogues";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { ITEM_DETAILS } from "features/game/types/images";
import { getImageUrl } from "features/goblins/tailor/TabContent";
import { BumpkinItem, ITEM_IDS } from "features/game/types/bumpkin";
import { InventoryItemName } from "features/game/types/game";
import bg from "assets/ui/brown_background.png";
import { Label } from "components/ui/Label";
import { Button } from "components/ui/Button";
import { secondsToString } from "lib/utils/time";
import { getSeasonalTicket } from "features/game/types/seasons";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { translate } from "lib/i18n/translate";

interface Props {
  onClose: () => void;
}

const obsessionDialogues = (itemName: string) => [
  `${translate("obsessionDialogue.line1.part1")} ${itemName}${translate(
    "obsessionDialogue.line1.part2"
  )} ${getSeasonalTicket()}${translate("obsessionDialogue.line1.part3")}`,
  `${translate("obsessionDialogue.line2.part1")} ${itemName}${translate(
    "obsessionDialogue.line2.part2"
  )} ${getSeasonalTicket()}${translate("obsessionDialogue.line2.part3")}`,
  `${translate("obsessionDialogue.line3.part1")} ${itemName}${translate(
    "obsessionDialogue.line3.part2"
  )} ${getSeasonalTicket()}${translate("obsessionDialogue.line3.part3")}`,
  `${translate("obsessionDialogue.line4.part1")} ${itemName}${translate(
    "obsessionDialogue.line4.part2"
  )} ${getSeasonalTicket()}${translate("obsessionDialogue.line4.part3")}`,
  `${translate("obsessionDialogue.line5.part1")} ${itemName}${translate(
    "obsessionDialogue.line5.part2"
  )} ${getSeasonalTicket()}${translate("obsessionDialogue.line5.part3")}`,
];

export const Bert: React.FC<Props> = ({ onClose }) => {
  const { t } = useAppTranslation();
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const game = gameState.context.state;
  const [tab, setTab] = useState(0);
  const [confirmAction, setConfirmAction] = useState(false);
  const dialogue = npcDialogues.bert || defaultDialogue;
  const intro = useRandomItem(dialogue.intro);

  const currentObsession = game.bertObsession;
  const obsessionCompletedAt = game.npcs?.bert?.questCompletedAt;

  const obsessionDialogue = useRandomItem(
    obsessionDialogues(currentObsession?.name as string)
  );

  const obsessionName = game.bertObsession?.name;
  const reward = game.bertObsession?.reward ?? 0;

  let isObsessionCollectible = game.bertObsession?.type === "collectible";
  if (ITEM_DETAILS[obsessionName as InventoryItemName] === undefined) {
    isObsessionCollectible = false;
  }

  const image = isObsessionCollectible
    ? ITEM_DETAILS[obsessionName as InventoryItemName].image
    : getImageUrl(ITEM_IDS[obsessionName as BumpkinItem]);

  const hasItem = isObsessionCollectible
    ? game.inventory[obsessionName as InventoryItemName]?.greaterThan(0)
    : game.wardrobe[obsessionName as BumpkinItem];

  const canCompleteObsession = () => {
    if (!hasItem) return false;
    if (!currentObsession) return false;

    if (!obsessionCompletedAt) return true;

    return obsessionCompletedAt < currentObsession.startDate;
  };

  const completeObsession = () => {
    if (!currentObsession) {
      return null;
    }

    if (
      obsessionCompletedAt &&
      obsessionCompletedAt >= currentObsession.startDate &&
      obsessionCompletedAt <= currentObsession.endDate
    ) {
      return <Label type="info">{t("alr.completed")}</Label>;
    }

    return (
      <>
        <Button
          disabled={!canCompleteObsession()}
          onClick={() => gameService.send("bertObsession.completed")}
        >
          {`Claim ${reward} ${getSeasonalTicket()}${reward > 0 ? "s" : ""}`}
        </Button>
        <span className="text-xs">
          {t("bert.day")} {getSeasonalTicket()}.
        </span>
      </>
    );
  };

  const endDate = !currentObsession ? 0 : currentObsession.endDate;
  const resetSeconds = Math.round((endDate - new Date().getTime()) / 1000);

  const handleConfirm = (tab: number) => {
    setConfirmAction(true);
    setTab(tab);
  };

  if (!confirmAction) {
    return (
      <SpeakingModal
        onClose={onClose}
        bumpkinParts={NPC_WEARABLES.bert}
        message={[
          {
            text: intro,
            actions: [
              {
                text: t("delivery"),
                cb: () => handleConfirm(0),
              },
              {
                text: "Obsessions",
                cb: () => handleConfirm(1),
              },
            ],
          },
        ]}
      />
    );
  }

  return (
    <CloseButtonPanel
      onClose={onClose}
      bumpkinParts={NPC_WEARABLES.bert}
      tabs={[
        { icon: SUNNYSIDE.icons.expression_chat, name: "Delivery" },
        { icon: SUNNYSIDE.icons.wardrobe, name: "Obsession" },
      ]}
      setCurrentTab={setTab}
      currentTab={tab}
    >
      {tab === 0 && (
        <DeliveryPanelContent npc="bert" skipIntro onClose={onClose} />
      )}
      {tab === 1 && (
        <div className="w-full flex flex-col items-center">
          {!currentObsession && (
            <p className="text-center text-sm mb-3">No Obsessions</p>
          )}
          {currentObsession && (
            <div className="w-full flex flex-col items-center mx-auto">
              <p className="text-center text-sm mb-3">{obsessionDialogue}</p>

              <div className="relative mb-2">
                <img src={bg} className="w-48 object-contain rounded-md" />
                <div className="absolute inset-0">
                  <img
                    src={image}
                    className="absolute w-1/2 z-20 object-cover mb-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              <Label type="warning" className="my-1 mx-auto">
                <div className="flex items-center">
                  <img src={SUNNYSIDE.icons.stopwatch} className="h-5 mr-1" />
                  <span>
                    {"Reset in "}
                    {secondsToString(resetSeconds, {
                      length: "medium",
                      removeTrailingZeros: true,
                    })}
                  </span>
                </div>
              </Label>
            </div>
          )}

          {completeObsession()}
        </div>
      )}
    </CloseButtonPanel>
  );
};
