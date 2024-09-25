import { useAppSelector } from "@/hooks/storeHooks";
import { selectDocs } from "@/store";
import { useCallback, useMemo, useState } from "react";
import { GraphQLField, GraphQLType } from "graphql/type";
import { HistoryState } from "@/models/types";

export function useDocsSchema() {
  const docs = useAppSelector(selectDocs);
  const { data: schema } = docs;
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [title, setTitle] = useState("root");

  const push = useCallback(
    (data: GraphQLType | GraphQLField<unknown, unknown>) => {
      let name: string;

      if ("name" in data) {
        name = data.name;
      } else {
        name = data.toString();
      }

      setHistory((prevState) => [...prevState, { name, data }]);
    },
    []
  );

  const pop = useCallback(() => {
    setHistory((prevState) => {
      const newState =
        prevState.length > 0 ? prevState.slice(0, -1) : prevState;
      const newTitle =
        newState.length > 0 ? newState[newState.length - 1].name : "root";
      setTitle(newTitle);
      return newState;
    });
  }, []);

  const query = useMemo(() => {
    if (!schema) return null;
    return schema.getQueryType();
  }, [schema]);

  const mutation = useMemo(() => {
    if (!schema) return null;
    return schema.getMutationType();
  }, [schema]);

  const subscription = useMemo(() => {
    if (!schema) return null;
    return schema.getSubscriptionType();
  }, [schema]);

  const contentForRender = history[history.length - 1];

  return {
    query,
    mutation,
    subscription,
    push,
    pop,
    title,
    data: contentForRender,
    history,
    error: docs.error
  };
}
