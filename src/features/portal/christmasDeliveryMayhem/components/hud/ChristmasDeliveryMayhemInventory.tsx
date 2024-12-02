import React, { useContext } from "react";
import { useSelector } from "@xstate/react";
import { PortalContext } from "../../lib/PortalProvider";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Label } from "components/ui/Label";
import { PortalMachineState } from "../../lib/christmasDeliveryMayhemMachine";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

import page from "public/world/page.png";
import cameBone from "public/world/camel_bone.webp";
import candyIcon from "public/world/candy_icon.png";
import exchangeDisc from "public/world/exchange_disc.png";
import hieroglyph from "public/world/hieroglyph.webp";
import rabbit3 from "public/world/rabbit_3.png";

import { Gifts } from "../../ChristmasDeliveryMayhemConstants";
import { Box } from "components/ui/Box";

const _gifts = (state: PortalMachineState) => state.context.gifts as Gifts[];

export const ChristmasDeliveryMayhemInventory: React.FC = () => {
  const { t } = useAppTranslation();

  const { portalService } = useContext(PortalContext);

  const gifts = useSelector(portalService, _gifts);
  const imageGifts: Record<string, string> = {
    gift_1: page,
    gift_2: cameBone,
    gift_3: candyIcon,
    gift_4: exchangeDisc,
    gift_5: hieroglyph,
    gift_6: rabbit3,
  };

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        top: `${PIXEL_SCALE * 3}px`,
        right: `${PIXEL_SCALE * 3}px`,
      }}
    >
      <Label type={"default"}>{t("christmas-delivery-mayhem.inventory")}</Label>

      <div className="relative flex flex-col items-center">
        {gifts.map((gift: Gifts) => (
          <>
            <Box image={imageGifts[gift]} />
          </>
        ))}
      </div>
    </div>
  );
};
