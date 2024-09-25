import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectDocs, selectTab } from "@/store";

export function useResponse() {
  const tabState = useSelector(selectTab);
  const docsState = useSelector(selectDocs);
  const { isLoading, response } = tabState;
  const { data: docs, error: docsError } = docsState;
  const [isDocsVisible, setIsDocsVisible] = useState(false);

  const setDocsVisibility = useCallback(() => {
    setIsDocsVisible(true);
  }, []);
  const setResultVisibility = useCallback(() => {
    setIsDocsVisible(false);
  }, []);

  return {
    setDocsVisibility,
    setResultVisibility,
    docs,
    docsError,
    isDocsVisible,
    isLoading,
    response
  };
}
