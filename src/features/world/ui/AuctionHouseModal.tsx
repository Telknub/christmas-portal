import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { Transaction } from "features/island/hud/Transaction";
import { AuctioneerModal } from "features/retreat/components/auctioneer/AuctioneerModal";
import React, { useContext } from "react";

interface Props {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
}
export const AuctionHouseModal: React.FC<Props> = ({
  id,
  isOpen,
  closeModal,
}) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const {
    context: { state, linkedWallet },
  } = gameState;

  const transaction = state.transaction;
  if (transaction) {
    return <Transaction onClose={closeModal} />;
  }

  return (
    <AuctioneerModal
      farmId={id}
      isOpen={isOpen}
      onClose={closeModal}
      gameState={state}
      onUpdate={(state) => {
        gameService.send("UPDATE", { state });
      }}
      onMint={(id) => {
        closeModal();
        gameService.send("TRANSACT", {
          transaction: "transaction.wearablesWithdrawn",
          request: {
            auctionId: id,
          },
        });
      }}
      deviceTrackerId={gameState.context.deviceTrackerId as string}
      linkedAddress={linkedWallet}
    />
  );
};
