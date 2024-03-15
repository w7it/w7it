import { Fluent } from "fluent";

export const fluent = new Fluent();

await fluent.addTranslation({
  locales: "ru",
  filePath: `${import.meta.dirname}/locales/ru.ftl`,
  bundleOptions: {
    useIsolating: false,
  },
});
