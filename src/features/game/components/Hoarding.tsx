import React, { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import close from "assets/icons/close.png";
import token from "assets/icons/token.gif";

import { Context } from "../GameProvider";
import { useActor } from "@xstate/react";
import { Button } from "components/ui/Button";
import { CONFIG } from "lib/config";
import { ITEM_DETAILS } from "../types/images";
import { InventoryItemName } from "../types/game";

export const Hoarding: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const maxedItem = gameState.context.maxedItem as InventoryItemName | "SFL";

  const onCaptchaSolved = async (captcha: string | null) => {
    await new Promise((res) => setTimeout(res, 1000));

    gameService.send("SYNC", { captcha });
  };

  const makeTitle = () => {
    const regex = new RegExp(/^[aeiou]/gi);
    const startsWithVowel = regex.test(maxedItem);
    const indefiniteArticle = startsWithVowel ? "an" : "a";
    const item = maxedItem === "SFL" ? maxedItem : maxedItem.toLowerCase();

    return `Are you ${indefiniteArticle} ${item} hoarder?!`;
  };

  const maxedItemImage =
    maxedItem === "SFL" ? token : ITEM_DETAILS[maxedItem].image;

  return (
    <>
      {!showCaptcha ? (
        <div>
          <div className="flex flex-col items-center p-1">
            <span className="text-center text-sm sm:text-base">
              {makeTitle()}
            </span>
            <img src={maxedItemImage} className="h-12 mt-2 mb-3" />
            <p className="text-xs sm:text-sm mb-3">
              {`Word is that Goblins are known to raid farms that have an abundance of resources.`}
            </p>
            <p className="text-xs sm:text-sm mb-1">
              {`To protect yourself and keep those precious resources safe, please sync them on chain before continuing.`}
            </p>
            <div className="text-xs underline my-2 w-full">
              <a
                href="https://docs.sunflower-land.com/fundamentals/syncing-on-chain"
                target="_blank"
                rel="noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
          <Button onClick={() => setShowCaptcha(true)}>Sync</Button>
        </div>
      ) : (
        <div>
          <img
            src={close}
            className="h-6 top-3 right-4 absolute cursor-pointer"
            alt="Close Captcha Modal"
            onClick={() => setShowCaptcha(false)}
          />
          <ReCAPTCHA
            sitekey={CONFIG.RECAPTCHA_SITEKEY}
            onChange={onCaptchaSolved}
            onExpired={() => setShowCaptcha(false)}
            className="w-full m-4 flex items-center justify-center"
          />
        </div>
      )}
    </>
  );
};
