import React, { useContext } from "react";
import { useSelector } from "@xstate/react";
import { PortalContext } from "../../lib/PortalProvider";
import { PortalMachineState } from "../../lib/christmasDeliveryMayhemMachine";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

const _score = (state: PortalMachineState) => state.context.score;

export const ChristmasDeliveryMayhemScore: React.FC = () => {
  const { t } = useAppTranslation();

  const { portalService } = useContext(PortalContext);

  const score = useSelector(portalService, _score);

  return (
    <div className="bg-blue-800 bg-opacity-80 text-white flex flex-col text-shadow border-t-4 rounded-md w-[90px] p-2">
      <span className="text-xs">{t("christmas-delivery-mayhem.score")}</span>
      <span className="text-lg">{Math.round(score)}</span>
    </div>
  );
};
