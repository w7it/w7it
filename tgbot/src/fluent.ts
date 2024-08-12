import {
    FluentBundle,
    FluentResource,
    type FluentVariable,
} from "@fluent/bundle";
import { assert } from "@std/assert";

const fluent = new Map<string, FluentBundle>();

const languages = ["ru"];

for (const language of languages) {
    const source = await Deno.readTextFile(
        `${import.meta.dirname}/locales/${language}.ftl`,
    );
    const bundle = new FluentBundle(language);
    bundle.addResource(new FluentResource(source));
    fluent.set(language, bundle);
}

export function translate(
    language: string,
    path: string,
    args?: Record<string, FluentVariable>,
): string {
    const bundle = fluent.get(language) ?? fluent.get(languages[0]);
    assert(bundle);

    const message = bundle.getMessage(path);
    if (message?.value) {
        return bundle.formatPattern(message.value, args);
    }

    return path;
}
