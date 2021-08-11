import { createHmac } from "crypto";
import * as utf8 from "utf8";

export const generatePassword = (secretAccessKey) => {
  // const key = "TA2+lJ3C4i53unwCmGailkp5wp3xGKBuverGdG0x";
  const region = "us-east-1";

  const date = "11111111";
  const service = "ses";
  const terminal = "aws4_request";
  const message = "SendRawEmail";
  const versionInBytes = [0x04];

  function sign(key, msg) {
    return createHmac("sha256", Buffer.from(key.map((a) => a.charCodeAt(0))))
      .update(utf8.encode(msg))
      .digest("base64")
      .split("");
  }

  let signature = sign(utf8.encode("AWS4" + secretAccessKey).split(""), date);
  signature = sign(signature, region);
  signature = sign(signature, service);
  signature = sign(signature, terminal);
  signature = sign(signature, message);

  const signatureAndVersion = versionInBytes.slice(); //copy of array

  signature.forEach((a) => signatureAndVersion.push(a.charCodeAt(0)));

  const smtpPassword = Buffer.from(signatureAndVersion).toString("base64");
  console.log(smtpPassword);

  return smtpPassword;
};
