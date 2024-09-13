import { useEffect, useRef, useState } from "react";
import classes from "./HeadersInput.module.scss";

type HeadersInputProps = {
  removeTab: () => void;
  updateTab: (key: string, value: string) => void;
};

export function HeadersInput({ removeTab, updateTab }: HeadersInputProps) {
  const [headerKey, setHeaderKey] = useState<string>("");
  const [headerValue, setHeaderValue] = useState<string>("");

  const prevHeaderKey = useRef(headerKey);
  const prevHeaderValue = useRef(headerValue);

  useEffect(() => {
    if (
      prevHeaderKey.current !== headerKey ||
      prevHeaderValue.current !== headerValue
    ) {
      updateTab(headerKey, headerValue);

      prevHeaderKey.current = headerKey;
      prevHeaderValue.current = headerValue;
    }
  }, [headerKey, headerValue, updateTab]);

  return (
    <div className={classes.item}>
      <div>
        <input
          placeholder="header key"
          value={headerKey}
          onChange={(e) => setHeaderKey(e.target.value)}
        />
        <input
          placeholder="header value"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
        />
      </div>
      <button type="button" onClick={removeTab}>
        del
      </button>
    </div>
  );
}
