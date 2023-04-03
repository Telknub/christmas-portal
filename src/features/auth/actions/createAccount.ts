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
  } = await response.json();

  return {
    signature,
    charity,
    deadline,
    fee,
    bumpkinWearableIds,
    bumpkinTokenUri,
    referrerId,
  };
}

type CreateFarmOptions = {
  charity: CharityAddress;
  token: string;
  captcha: string;
  transactionId: string;
};

export async function createAccount({
  charity,
  token,
  captcha,
  transactionId,
}: CreateFarmOptions) {
  const referrerId = getReferrerId();

  const transaction = await signTransaction({
    charity,
    token,
    captcha,
    transactionId,
    referrerId,
  });

  await createNewAccount({
    ...transaction,
    web3: wallet.web3Provider,
    account: wallet.myAccount,
  });

  const farm = await getNewFarm(wallet.web3Provider, wallet.myAccount);

  return farm;
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
