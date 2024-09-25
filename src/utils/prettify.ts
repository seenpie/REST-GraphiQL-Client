import * as prettier from "prettier";
import prettierPluginGraphql from "prettier/plugins/graphql";

export const prettify = async (data: string) => {
  try {
    return await prettier.format(data, {
      parser: "graphql",
      plugins: [prettierPluginGraphql]
    });
  } catch (error) {
    return data;
  }
};
