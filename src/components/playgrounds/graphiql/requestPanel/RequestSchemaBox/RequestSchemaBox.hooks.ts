import {
  selectTab,
  setDocs,
  setDocsError,
  setIsLoading,
  useGetSchemaMutation
} from "@/store";
import { useCallback, useEffect } from "react";
import { buildClientSchema } from "graphql";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useGraphQlRouter } from "@/hooks/useGraphQlRouter";

export function useRequestSchema() {
  const tabState = useAppSelector(selectTab);
  const dispatch = useAppDispatch();
  const [trigger, { data, error, isLoading }] = useGetSchemaMutation();
  const { setParam } = useGraphQlRouter();
  const { url } = tabState;

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (data) {
      try {
        const parsedSchema = buildClientSchema(data.data);

        dispatch(setDocs(parsedSchema));
        dispatch(setDocsError(null));
      } catch (e) {
        const err = Error("unknown error");
        dispatch(setDocs(null));
        dispatch(setDocsError(err));
      }
    }

    if (error) {
      let err: Error;

      if ("error" in error) {
        err = Error(error.error);
      } else {
        err = Error("unknown error");
      }

      dispatch(setDocs(null));
      dispatch(setDocsError(err));
    }
  }, [data, dispatch, error]);

  const getSchema = useCallback(
    (schemaUrl: string) => {
      trigger(schemaUrl);
      setParam("endpoint", schemaUrl);
    },
    [trigger, setParam]
  );

  return {
    getSchema: () => getSchema(url),
    error,
    isSchemaLoading: isLoading,
    url
  };
}
