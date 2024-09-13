import { GraphQLField, GraphQLType } from "graphql/type";

export type HistoryStateDataType = GraphQLType | GraphQLField<unknown, unknown>;

export type HistoryState = {
  name: string;
  data: HistoryStateDataType;
};

export type HeadersItem = {
  id: string;
  key: string;
  value: string;
};
