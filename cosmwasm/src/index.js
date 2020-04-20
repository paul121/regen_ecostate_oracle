import {
  pubkeyToAddress,
  Secp256k1Pen,
  SigningCosmWasmClient,
  encodeSecp256k1Pubkey
} from "@cosmwasm/sdk";

const buildFeeTable = (feeToken, gasPrice) => {
  const stdFee = (gas, denom, price) => {
    const amount = Math.floor(gas * price);
    return {
      amount: [{ amount: amount.toString(), denom: denom }],
      gas: gas.toString(),
    }
  };

  return {
    upload: stdFee(1000000, feeToken, gasPrice),
    init: stdFee(500000, feeToken, gasPrice),
    exec: stdFee(200000, feeToken, gasPrice),
    send: stdFee(80000, feeToken, gasPrice),
  }
};

async function connect(mnemonic, opts) {
  const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
  const address = pubkeyToAddress(pubkey, "xrn:");
  const signer = (signBytes) => pen.sign(signBytes);

  const feeTable = buildFeeTable('utree', opts.gasPrice);
  const client = new SigningCosmWasmClient(opts.httpUrl, address, signer, feeTable);
  return { address, client };
}

export async function getClient(opts) {
  let {address, client} = await connect(opts.mnemonic, opts);
  console.log("farmOS Oracle Public Address: " + address );
  return client;
}
