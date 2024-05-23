import { Transformer } from "@parcel/plugin";
import { readFile } from "node:fs/promises";

export default new Transformer({
  async transform({ asset }) {
    return Promise.all([
      asset.getCode(),
      readFile(".githash", { encoding: "utf-8" }),
    ]).then(([res, gitHash]) => {
      let info = process.env.CI ? "version: " : "develop: ";
      info += gitHash.slice(0, 7);
      info += " (";
      info += new Date().toISOString().replace(/(?=T).+?(?=Z)/, "");
      info += ") ";
      console.info(info);

      asset.setCode(res.replace(/VERSION/g, info));
      return [asset];
    });
  },
});
