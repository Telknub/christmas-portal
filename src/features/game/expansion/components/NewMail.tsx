import React, { useContext } from "react";
import { useActor } from "@xstate/react";
import { Modal } from "react-bootstrap";
import { Panel } from "components/ui/Panel";
import { Context } from "features/game/GameProvider";

import { NPC_WEARABLES } from "lib/npcs";
import { getKeys } from "features/game/types/craftables";
import { SUNNYSIDE } from "assets/sunnyside";
import { Conversation } from "features/farming/mail/components/Conversation";
import { ConversationName } from "features/game/types/conversations";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";

export const NewMail: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState, send] = useActor(gameService);

  const mailbox = gameState.context.state.mailbox;
  const announcements = gameState.context.announcements;

  const newestMailId = getKeys(announcements ?? {})
    // Ensure they haven't read it already
    .sort(
      (a, b) =>
        (announcements[b].announceAt ?? 0) - (announcements[a].announceAt ?? 0)
    )
    .find((id) => {
      return !mailbox.read.find((message) => message.id === id);
    });

  const details = newestMailId ? announcements[newestMailId] : undefined;

  return (
    <Modal
      centered
      show={gameState.matches("mailbox")}
      onHide={() => send("ACKNOWLEDGE")}
    >
      {details ? (
        <Panel bumpkinParts={NPC_WEARABLES[details.from]}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm capitalize ml-1 underline">{details.from}</p>
            <img
              src={SUNNYSIDE.icons.close}
              className="h-6 mr-2 cursor-pointer"
              onClick={() => send("ACKNOWLEDGE")}
            />
          </div>

          <Conversation
            conversationId={newestMailId as ConversationName}
            read={!!mailbox.read.find((item) => item.id === newestMailId)}
            onAcknowledge={() => send("ACKNOWLEDGE")}
          />
        </Panel>
      ) : (
        <CloseButtonPanel onClose={() => send("ACKNOWLEDGE")}>
          <div>No Mail</div>
        </CloseButtonPanel>
      )}
    </Modal>
  );
};
