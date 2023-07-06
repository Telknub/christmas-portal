import { CONFIG } from "lib/config";
import Web3 from "web3";
import { AbiItem, fromWei } from "web3-utils";
import MinterABI from "./abis/AccountMinter.json";
import PokoMinterABI from "./abis/PokoAccountMinter.json";
import { AccountMinter as IAccountMinter } from "./types/AccountMinter";
import { AccountMinter as IPokoAccountMinter } from "./types/PokoAccountMinter";
import { estimateGasPrice, parseMetamaskError } from "./utils";
import { analytics } from "lib/analytics";
import { PayableTransactionObject } from "./types/types";

export async function getCreatedAt(
  web3: Web3,
  account: string,
  address: string,
  attempts = 1
): Promise<number> {
  await new Promise((res) => setTimeout(res, 3000 * attempts));

  try {
    const createdAt = await (
      new web3.eth.Contract(
        MinterABI as AbiItem[],
        CONFIG.ACCOUNT_MINTER_CONTRACT as string
      ) as unknown as IAccountMinter
    ).methods
      .farmCreatedAt(address)
      .call({ from: account });

    return Number(createdAt);
  } catch (e) {
    const error = parseMetamaskError(e);
    if (attempts < 3) {
      return getCreatedAt(web3, account, address, attempts + 1);
    }

    throw error;
  }
}

export async function createNewAccount({
  web3,
  account,
  signature,
  charity,
  deadline,
  fee,
  bumpkinWearableIds,
  bumpkinTokenUri,
  referrerId,
  referrerAmount,
  type,
}: {
  web3: Web3;
  account: string;
  signature: string;
  charity: string;
  deadline: number;
  fee: string;
  bumpkinWearableIds: number[];
  bumpkinTokenUri: string;
  referrerId: number;
  referrerAmount: string;
  type?: "MATIC" | "USDC";
}): Promise<string> {
  const gasPrice = await estimateGasPrice(web3);

  let mintAccountFn: PayableTransactionObject<void>;

  if (type === "MATIC") {
    mintAccountFn = (
      new web3.eth.Contract(
        PokoMinterABI as AbiItem[],
        CONFIG.POKO_ACCOUNT_MINTER_CONTRACT as string
      ) as unknown as IPokoAccountMinter
    ).methods.mintAccount(
      signature,
      deadline,
      fee,
      bumpkinWearableIds,
      bumpkinTokenUri,
      referrerId,
      referrerAmount,
      account
    );
  }

  if (type === "USDC") {
    mintAccountFn = (
      new web3.eth.Contract(
        PokoMinterABI as AbiItem[],
        CONFIG.POKO_ACCOUNT_MINTER_CONTRACT as string
      ) as unknown as IPokoAccountMinter
    ).methods.mintAccountUSDC(
      signature,
      deadline,
      fee,
      bumpkinWearableIds,
      bumpkinTokenUri,
      referrerId,
      referrerAmount,
      account
    );
  }

  if (type === undefined) {
    mintAccountFn = (
      new web3.eth.Contract(
        MinterABI as AbiItem[],
        CONFIG.ACCOUNT_MINTER_CONTRACT as string
      ) as unknown as IAccountMinter
    ).methods.mintAccount(
      signature,
      charity,
      deadline,
      fee,
      bumpkinWearableIds,
      bumpkinTokenUri,
      referrerId
    );
  }

  return new Promise((resolve, reject) => {
    mintAccountFn
      .send({ from: account, value: fee, gasPrice })
      .on("error", function (error: any) {
        console.log({ error });
        const parsed = parseMetamaskError(error);

        reject(parsed);
      })
      .on("transactionHash", async (transactionHash: any) => {
        console.log({ transactionHash });
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=11955999175679069053-AP&client_type=gtag#purchase
        analytics.logEvent("purchase", {
          currency: "MATIC",
          // Unique ID to prevent duplicate events
          transaction_id: `create-${account}`,
          value: Number(fromWei(fee)),
          items: [
            {
              item_id: "NFT_ACCOUNT",
              item_name: "NFT Account",
            },
          ],
        });

        try {
          // Sequence wallet doesn't resolve the receipt. Therefore
          // We try to fetch it after we have a tx hash returned
          // From Sequence.
          const receipt: any = await web3.eth.getTransactionReceipt(
            transactionHash
          );

          if (receipt) resolve(receipt);
        } catch (e) {
          reject(e);
        }
      })
      .on("receipt", function (receipt: any) {
        console.log({ receipt });
        resolve(receipt);
      });
  });
}

export async function getMaxSupply(
  web3: Web3,
  account: string,
  attempts = 0
): Promise<number> {
  await new Promise((res) => setTimeout(res, 3000 * attempts));

  const maxSupply = await (
    new web3.eth.Contract(
      MinterABI as AbiItem[],
      CONFIG.ACCOUNT_MINTER_CONTRACT as string
    ) as unknown as IAccountMinter
  ).methods
    .maxSupply()
    .call({ from: account });

  return Number(maxSupply);
}
