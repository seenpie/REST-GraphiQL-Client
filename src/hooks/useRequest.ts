import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import {
  selectDocs,
  selectTab,
  setIsLoading,
  setQuery,
  setResponse,
  useGetResponseMutation
} from "@/store";
import { useSelector } from "react-redux";
import { HeadersItem } from "@/models/types";
import { useGraphQlRouter } from "@/hooks/useGraphQlRouter";
import { prettify } from "@/utils/prettify";

const parseHeaders = (items: HeadersItem[]) => {
  return items.reduce<Record<string, string>>((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
};

const parseVariables = (value: string) => {
  let parsedVariables: Record<string, unknown>;
  try {
    parsedVariables = JSON.parse(value);
  } catch (error) {
    parsedVariables = {};
  }

  return parsedVariables;
};

export function useRequest() {
  const tabState = useSelector(selectTab);
  const docs = useSelector(selectDocs);
  const { setParam } = useGraphQlRouter();
  const { url, query, headers, variables, isLoading: globalLoading } = tabState;
  const { data: schema } = docs;

  const dispatch = useAppDispatch();

  const [trigger, { data, error, isLoading }] = useGetResponseMutation();

  const sendRequest = useCallback(() => {
    const parsedHeaders = parseHeaders(headers);
    const parsedVariables = parseVariables(variables);

    setParam("body", query, {
      headers: Object.keys(parsedHeaders).length > 0 ? parsedHeaders : null,
      variables:
        Object.keys(parsedVariables).length > 0 ? parsedVariables : null
    });

    trigger({ url, query, headers: parsedHeaders, variables });
  }, [query, trigger, headers, variables, url, setParam]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setResponse(data));
    }

    if (error) {
      if ("status" in error) {
        const parsedData = {
          status: error.status as number,
          data: JSON.stringify(error.data, null, 2)
        };
        dispatch(setResponse(parsedData));
      }
    }
  }, [data, error, dispatch]);

  const handleChange = useCallback(
    (inputValue: string) => {
      dispatch(setQuery(inputValue));
    },
    [dispatch]
  );

  const handleBlur = useCallback(() => {
    setParam("body", query);
  }, [setParam, query]);

  const fixQuery = useCallback(async () => {
    const fixedQuery = await prettify(query);
    handleChange(fixedQuery);
  }, [query, handleChange]);

  return {
    queryValue: query,
    handleChange,
    handleBlur,
    sendRequest,
    globalLoading,
    isSchemaExists: Boolean(schema),
    fixQuery
  };
}
