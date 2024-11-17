import React, { useContext } from "react";
import { useSelector } from "@xstate/react";
import { PortalContext } from "../../lib/PortalProvider";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { Label } from "components/ui/Label";
import { PortalMachineState } from "../../lib/christmasDeliveryMayhemMachine";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

const _gifts = (state: PortalMachineState) => state.context.gifts;

export const ChristmasDeliveryMayhemInventory: React.FC = () => {
  const { t } = useAppTranslation();

  const { portalService } = useContext(PortalContext);

  const gifts = useSelector(portalService, _gifts);

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
        {/* {gifts.map((gift: string) => (
          <>
            <Box image={ITEM_DETAILS[gift].image} />
          </>
        ))} */}
      </div>
    </div>
  );
};
