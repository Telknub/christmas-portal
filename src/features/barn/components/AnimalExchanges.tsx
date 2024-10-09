import { useSelector } from "@xstate/react";
import { SUNNYSIDE } from "assets/sunnyside";
import confetti from "canvas-confetti";
import { Button } from "components/ui/Button";
import { HudContainer } from "components/ui/HudContainer";
import { Label } from "components/ui/Label";
import { ButtonPanel, InnerPanel, Panel } from "components/ui/Panel";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { getAnimalLevel } from "features/game/events/landExpansion/sellAnimal";
import { Context } from "features/game/GameProvider";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { secondsTillWeekReset, weekResetsAt } from "features/game/lib/factions";
import { MachineState } from "features/game/lib/gameMachine";
import { AnimalType } from "features/game/types/animals";
import { getKeys } from "features/game/types/decorations";
import { Animal, ExchangeDeal } from "features/game/types/game";
import { ITEM_DETAILS } from "features/game/types/images";
import { getSeasonalTicket } from "features/game/types/seasons";
import { TimerDisplay } from "features/retreat/components/auctioneer/AuctionDetails";
import { useCountdown } from "lib/utils/hooks/useCountdown";
import React, { useContext } from "react";

const _exchange = (state: MachineState) => state.context.state.exchange;

interface Props {
  type: AnimalType;
  onExchanging: (deal: ExchangeDeal) => void;
}

export const AnimalExchange: React.FC<Props> = ({ type, onExchanging }) => {
  const { gameService } = useContext(Context);
  const exchange = useSelector(gameService, _exchange);

  const deals = exchange.deals.filter((deal) => deal.name === type);

  const expiresAt = useCountdown(weekResetsAt());

  console.log({ expiresAt, reset: secondsTillWeekReset() });

  return (
    <CloseButtonPanel>
      <div className="p-2">
        <Label className="mb-2" type="info" icon={SUNNYSIDE.icons.stopwatch}>
          <TimerDisplay time={expiresAt} />
        </Label>

        <p className="text-xs mb-2">
          Howdy Bumpkin, this week we are looking for the following animals.
          Wanna trade?
        </p>
        <div className="flex flex-wrap">
          {deals.length === 0 && (
            <p className="text-sm">There are no deals available right now.</p>
          )}
          {deals.map((deal) => {
            return (
              <div key={deal.id} className="w-1/3 sm:w-1/4 pr-1.5">
                <ButtonPanel onClick={() => onExchanging(deal)}>
                  <div className="flex justify-center items-center my-2 mb-6">
                    <img
                      src={ITEM_DETAILS[deal.name].image}
                      className="w-8 mr-2"
                    />
                    <div className="relative">
                      <img src={SUNNYSIDE.icons.heart} className="h-8" />
                      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-xs">{deal.level}</p>
                      </div>
                    </div>
                  </div>

                  {!!deal.coins && (
                    <Label
                      type="warning"
                      icon={SUNNYSIDE.ui.coinsImg}
                      className={"absolute -bottom-2 text-center p-1 "}
                      style={{
                        left: `${PIXEL_SCALE * -3}px`,
                        right: `${PIXEL_SCALE * -3}px`,
                        width: `calc(100% + ${PIXEL_SCALE * 6}px)`,
                        height: "25px",
                      }}
                    >
                      {deal.coins}
                    </Label>
                  )}

                  {getKeys(deal.items ?? {}).map((name) => {
                    return (
                      <Label
                        key={name}
                        type="warning"
                        icon={ITEM_DETAILS[name].image}
                        className={"absolute -bottom-2 text-center p-1 "}
                        style={{
                          left: `${PIXEL_SCALE * -3}px`,
                          right: `${PIXEL_SCALE * -3}px`,
                          width: `calc(100% + ${PIXEL_SCALE * 6}px)`,
                          height: "25px",
                        }}
                      >
                        {deal.items?.[name]}
                      </Label>
                    );
                  })}
                </ButtonPanel>
              </div>
            );
          })}
        </div>
      </div>
    </CloseButtonPanel>
  );
};

export const AnimalDeal: React.FC<{
  deal: ExchangeDeal;
  animal: Animal;
  onClose: () => void;
  onSold: () => void;
}> = ({ deal, animal, onClose, onSold }) => {
  const { gameService } = useContext(Context);

  const sell = () => {
    gameService.send("animal.sold", {
      offerId: deal.id,
      animalId: animal.id,
    });

    onSold();
    confetti();
  };

  if (!deal || !animal) {
    return null;
  }

  return (
    <Panel>
      <div className="p-2">
        <div className="mb-2 flex flex-wrap">
          <Label
            type="default"
            icon={ITEM_DETAILS[animal.type].image}
            className="mr-2"
          >
            {`Lvl ${getAnimalLevel({ animal })} ${animal.type}`}
          </Label>
          {!!deal.coins && (
            <Label type="warning" icon={SUNNYSIDE.ui.coinsImg}>
              {deal.coins}
            </Label>
          )}

          {getKeys(deal.items ?? {}).map((name) => {
            <Label key={name} type="warning" icon={ITEM_DETAILS[name].image}>
              {deal.items?.[name]}
            </Label>;
          })}
        </div>

        <p>Are you sure you want to sell this animal for X?</p>
      </div>
      <div className="flex">
        <Button className="mr-1" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={sell}>Confirm</Button>
      </div>
    </Panel>
  );
};

export const ExchangeHud: React.FC<{
  deal: ExchangeDeal;
  onClose: () => void;
}> = ({ deal, onClose }) => {
  return (
    <HudContainer>
      <div className="absolute items-start flex top-3 px-2 cursor-pointer z-10 w-full justify-between">
        <InnerPanel>
          <div className="flex flex-wrap">
            <Label type="default" className="mr-2">{`Lvl ${deal.level}`}</Label>

            {!!deal.coins && (
              <Label type="warning" icon={SUNNYSIDE.ui.coinsImg}>
                {deal.coins}
              </Label>
            )}

            {getKeys(deal.items ?? {}).map((name) => {
              <Label key={name} type="warning" icon={ITEM_DETAILS[name].image}>
                {deal.items?.[name]}
              </Label>;
            })}
          </div>
          <p className="text-xs">Select a {deal.name} to sell?</p>
        </InnerPanel>

        <img
          src={SUNNYSIDE.ui.disc_cancel}
          alt="Cancel"
          className="cursor-pointer z-10"
          style={{
            width: `${PIXEL_SCALE * 18}px`,
          }}
          onClick={onClose}
        />
      </div>
    </HudContainer>
  );
};
