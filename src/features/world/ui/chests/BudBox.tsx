import { useActor } from "@xstate/react";
import { SUNNYSIDE } from "assets/sunnyside";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { OuterPanel, Panel } from "components/ui/Panel";
import { Context } from "features/game/GameProvider";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Revealed } from "features/game/components/Revealed";

import React, { useContext, useState } from "react";

import budIcon from "assets/icons/bud.png";
import chestIcon from "assets/icons/gift.png";

import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { ChestRevealing } from "./ChestRevealing";
import { getKeys } from "features/game/types/craftables";
import { Bud, TypeTrait } from "features/game/types/buds";
import { secondsTillReset } from "features/helios/components/hayseedHank/HayseedHankV2";
import { getDayOfYear, secondsToString } from "lib/utils/time";
import { hasFeatureAccess } from "lib/flags";

interface Props {
  onClose: () => void;
}

const BUD_DAYS: Record<TypeTrait, number> = {
  // Monday
  Plaza: 1,
  Woodlands: 2,
  Cave: 2,
  Sea: 3,
  Castle: 4,
  Port: 4,
  Retreat: 5,
  Saphiro: 6,
  // Sunday
  Snow: 0,
  Beach: 0,
};

const ICONS: Record<TypeTrait, string> = {
  Plaza: budIcon,
  Woodlands: budIcon,
  Cave: budIcon,
  Sea: budIcon,
  Castle: budIcon,
  Port: budIcon,
  Retreat: budIcon,
  Saphiro: budIcon,
  Snow: budIcon,
  Beach: budIcon,
};

export const BudBox: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const { t } = useAppTranslation();

  // Just a prolonged UI state to show the shuffle of items animation
  const [isPicking, setIsPicking] = useState(false);

  const [isRevealing, setIsRevealing] = useState(false);

  const hasAccess = hasFeatureAccess(gameState.context.state, "BUD_BOX");

  if (!hasAccess) {
    return (
      <CloseButtonPanel onClose={onClose}>
        <div className="p-2">
          <Label type="danger">{t("coming.soon")}</Label>
        </div>
      </CloseButtonPanel>
    );
  }

  const open = async () => {
    setIsPicking(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    gameService.send("REVEAL", {
      event: {
        type: "budBox.opened",
        createdAt: new Date(),
      },
    });
    setIsRevealing(true);
    setIsPicking(false);
  };

  if (isPicking || (gameState.matches("revealing") && isRevealing)) {
    return (
      <Panel>
        <ChestRevealing type={"Bud Box"} />
      </Panel>
    );
  }

  if (gameState.matches("revealed") && isRevealing) {
    return (
      <Panel>
        <Revealed
          onAcknowledged={() => {
            setIsRevealing(false);
          }}
        />
      </Panel>
    );
  }

  const buds = getKeys(gameState.context.state.buds ?? {});

  const utcDayOfWeek = new Date().getUTCDay();

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push((utcDayOfWeek + i) % 7);
  }

  const playerBudTypes = buds.map((id) => {
    const bud = gameState.context.state.buds?.[id] as Bud;
    return bud.type;
  });

  const secondsLeftToday = secondsTillReset();

  let hasOpened = false;
  const openedAt = gameState.context.state.pumpkinPlaza.budBox?.openedAt ?? 0;

  if (openedAt) {
    hasOpened = getDayOfYear(new Date()) === getDayOfYear(new Date(openedAt));
  }

  return (
    <CloseButtonPanel onClose={onClose}>
      <div className="p-2">
        <div className="flex flex-wrap mr-12">
          <Label
            icon={chestIcon}
            type="default"
            className="mb-2 mr-3 capitalize"
          >
            {t("budBox.title")}
          </Label>
        </div>
        <p className="text-xs mb-2">{t("budBox.description")}</p>
        {days.map((dayIndex, index) => {
          const buds = getKeys(BUD_DAYS).filter(
            (bud) => BUD_DAYS[bud] === dayIndex
          );

          const hasBud = buds.some((type) => playerBudTypes.includes(type));
          return (
            <OuterPanel
              key={dayIndex}
              className="flex justify-between relative mb-1"
            >
              <div className="flex justify-between relative mb-1">
                {/* {buds.map((type, index) => (
                  <img
                    src={budIcon}
                    className={classNames("h-8 img-highlight", {
                      "-ml-2": index > 0,
                    })}
                  />
                ))} */}
                {buds.map((type) => (
                  <div key={type}>
                    <Label
                      type={
                        playerBudTypes.includes(type) ? "success" : "default"
                      }
                      className="mr-1"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              {index === 0 && !hasOpened && (
                <Button
                  onClick={open}
                  disabled={!hasBud}
                  className="w-16 h-8 text-xs mt-4"
                >
                  {t("budBox.open")}
                </Button>
              )}
              {index === 0 && hasOpened && (
                <Label
                  icon={SUNNYSIDE.icons.confirm}
                  type="success"
                  className="absolute -top-2 -right-2"
                >
                  {t("budBox.opened")}
                </Label>
              )}
              {index === 0 && !hasOpened && (
                <Label
                  icon={SUNNYSIDE.icons.stopwatch}
                  type="info"
                  className="absolute -top-2 -right-2"
                >
                  {`Today - ${secondsToString(secondsLeftToday, {
                    length: "short",
                  })} left`}
                </Label>
              )}
              {index > 0 && (
                <Label type="default" className="absolute -top-2 -right-2">
                  {
                    new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                </Label>
              )}
            </OuterPanel>
          );
        })}
      </div>
    </CloseButtonPanel>
  );
};
