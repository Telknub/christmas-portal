import { syncProgress } from "lib/blockchain/Sessions";
import { wallet } from "lib/blockchain/wallet";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";

const API_URL = CONFIG.API_URL;

type Options = {
  farmId: number;
  sessionId: string;
  token: string;
  captcha?: string;
  transactionId: string;
};

export async function sync({
  farmId,
  sessionId,
  token,
  captcha,
  transactionId,
}: Options) {
  const response = await window.fetch(`${API_URL}/sync-progress/${farmId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
      "X-Transaction-ID": transactionId,
    },
    body: JSON.stringify({
      sessionId: sessionId,
      captcha,
    }),
  });

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.SYNC_SERVER_ERROR);
  }

  const transaction = await response.json();

  // TODO
  const newSessionId = await syncProgress({
    ...transaction,
    web3: wallet.web3Provider,
    account: wallet.myAccount,
  });

  return { verified: true, sessionId: newSessionId };
}
