import { createNewAccount } from "lib/blockchain/AccountMinter";
import { getNewFarm } from "lib/blockchain/Farm";
import { wallet } from "lib/blockchain/wallet";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { CharityAddress } from "../components/CreateFarm";

type Request = {
  charity: string;
  token: string;
  captcha: string;
  transactionId: string;
  referrerId?: number;
  guestKey?: string;
  type?: "MATIC" | "USDC";
};

const API_URL = CONFIG.API_URL;

export async function signTransaction(request: Request) {
  const response = await window.fetch(`${API_URL}/account`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${request.token}`,
      "X-Transaction-ID": request.transactionId,
    },
    body: JSON.stringify({
      charity: request.charity,
      captcha: request.captcha,
      referrerId: request.referrerId,
      guestKey: request.guestKey,
      type: request.type,
    }),
  });

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status >= 400) {
    throw new Error(ERRORS.CREATE_ACCOUNT_SERVER_ERROR);
  }

  const {
    signature,
    charity,
    deadline,
    fee,
    bumpkinWearableIds,
    bumpkinTokenUri,
    referrerId,
    referrerAmount,
  } = await response.json();

  return {
    signature,
    charity,
    deadline,
    fee,
    bumpkinWearableIds,
    bumpkinTokenUri,
    referrerId,
    referrerAmount,
  };
}

type CreateFarmOptions = {
  charity: CharityAddress;
  token: string;
  captcha: string;
  transactionId: string;
  account: string;
  guestKey?: string;
};

export async function createAccount({
  charity,
  token,
  captcha,
  transactionId,
  account,
  guestKey,
}: CreateFarmOptions) {
  const referrerId = getReferrerId();

  const transaction = await signTransaction({
    charity,
    token,
    captcha,
    transactionId,
    referrerId,
    guestKey,
    type: "MATIC",
  });

  await createNewAccount({
    ...transaction,
    web3: wallet.web3Provider,
    account,
    type: "MATIC",
  });

  await getNewFarm(wallet.web3Provider, account);
}

const host = window.location.host.replace(/^www\./, "");
const REFERRER_LS_KEY = `sb_wiz.ref-key.v.${host}-${window.location.pathname}`;

export function saveReferrerId(id: string) {
  localStorage.setItem(REFERRER_LS_KEY, id);
}

function getReferrerId() {
  const item = localStorage.getItem(REFERRER_LS_KEY);

  if (!item) {
    return undefined;
  }

  return Number(item);
}
