import React, { useEffect, useState } from "react";
import { NPC_WEARABLES, acknowledgeNPC } from "lib/npcs";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import {
  getCurrentSeason,
  getSeasonalTicket,
} from "features/game/types/seasons";

interface Props {
  onClose: () => void;
}
export const Birdie: React.FC<Props> = ({ onClose }) => {
  const [showFeatherHelp, setShowFeatherHelp] = useState(false);
  const [showSeasonHelp, setShowSeasonHelp] = useState(false);

  useEffect(() => {
    acknowledgeNPC("birdie");
  }, []);

  if (showFeatherHelp) {
    return (
      <SpeakingModal
        key="feathers"
        onClose={() => {
          onClose();
        }}
        bumpkinParts={NPC_WEARABLES.birdie}
        message={[
          {
            text: `You can earn ${getSeasonalTicket()}s in a variety of ways.`,
          },
          {
            text: `The most common method to earn ${getSeasonalTicket()}s is by gathering resources and delivering them to Bumpkins in the Plaza.`,
          },
          {
            text: `You can also earn ${getSeasonalTicket()}s by completing chores for Hank & claiming daily rewards!`,
          },
          {
            text: `Gather enough ${getSeasonalTicket()}s and you will be able to craft some rare items like me.`,
          },
        ]}
      />
    );
  }

  if (showSeasonHelp) {
    return (
      <SpeakingModal
        onClose={() => {
          onClose();
        }}
        bumpkinParts={NPC_WEARABLES.birdie}
        key="season"
        message={[
          {
            text: "Every 3 months a new season is introduced at Sunflower Land.",
          },
          {
            text: "This season has exciting quests & rare collectibles you can earn.",
          },
          {
            text: `To craft these items, you must collect ${getSeasonalTicket()}s and exchange them at the shops or the Auction house.`,
            actions: [
              {
                text: `How do I earn ${getSeasonalTicket()}s?`,
                cb: () => setShowFeatherHelp(true),
              },
            ],
          },
        ]}
      />
    );
  }

  return (
    <SpeakingModal
      onClose={() => {
        onClose();
        acknowledgeNPC("pumpkin' pete");
      }}
      bumpkinParts={NPC_WEARABLES.birdie}
      message={[
        {
          text: "Hey there, I'm Birdie, the most beautiful Bumpkin around!",
        },
        {
          text: "I noticed you admiring my outfit. Isn't it fantastic?!?",
        },
        {
          text: `We are currently in ${getCurrentSeason()} Season and Bumpkins are going crazy for ${getSeasonalTicket()}s.`,
        },
        {
          text: `Collect enough ${getSeasonalTicket()}s and you can craft rare NFTs. That's how I got this rare otuput!`,
          actions: [
            {
              text: "What is a season?",
              cb: () => setShowSeasonHelp(true),
            },
            {
              text: `How do I earn ${getSeasonalTicket()}s?`,
              cb: () => setShowFeatherHelp(true),
            },
          ],
        },
      ]}
    />
  );
};
