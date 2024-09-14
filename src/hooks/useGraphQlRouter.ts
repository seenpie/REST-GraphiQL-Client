import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { encodeToBase64 } from "@/utils/encodeToBase64";

export function useGraphQlRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const setParam = useCallback(
    (
      key: string,
      value: string,
      options?: {
        headers?: Record<string, unknown> | null;
        variables?: Record<string, unknown> | null;
      }
    ) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, encodeToBase64(value));

      if (options) {
        if (options.headers) {
          newSearchParams.set("headers", JSON.stringify(options.headers));
        } else {
          newSearchParams.delete("headers");
        }
        if (options.variables) {
          newSearchParams.set("variables", JSON.stringify(options.variables));
        } else {
          newSearchParams.delete("variables");
        }
      }

      router.push(`${pathName}?${newSearchParams.toString()}`);
    },
    [router, searchParams, pathName]
  );

  return { setParam };
}
