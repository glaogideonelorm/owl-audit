import { useEffect, useState } from "react";
import { i18nService } from "../services/i18nService";

export const useTranslation = () => {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const unsubscribe = i18nService.addListener(() => {
      forceRender((prev) => prev + 1);
    });

    return unsubscribe;
  }, []);

  const t = (key: string): string => {
    return i18nService.t(key);
  };

  return { t };
};

