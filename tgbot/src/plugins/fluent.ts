import type { Context, Middleware, NextFunction } from "grammy";
import type { FluentVariable } from "@fluent/bundle";

export type LocaleId = string;

export type LocaleNegotiator<ContextType extends Context = Context> = (
    context: ContextType,
) => LocaleId | undefined | PromiseLike<LocaleId | undefined>;

/**
 * Default implementation of locale negotiator
 * that returns locale specified in users Telegram settings.
 */
export const defaultLocaleNegotiator: LocaleNegotiator = (context) =>
    context.from?.language_code;

export interface GrammyFluentOptions<ContextType extends Context = Context> {
    translate: (
        locale: LocaleId,
        path: string,
        args?: Record<string, FluentVariable>,
    ) => string;
    defaultLocale?: string;
    localeNegotiator?: LocaleNegotiator<ContextType>;
}

export type TranslateFunction = (
    path: string,
    args?: Record<string, FluentVariable>,
) => string;

export interface FluentContextFlavor {
    t: TranslateFunction;
}

const fallbackLocale = "en";

export function useFluent<ContextType extends Context = Context>(
    options: GrammyFluentOptions<ContextType>,
): Middleware<ContextType> {
    const {
        translate: fluent,
        defaultLocale = fallbackLocale,
        localeNegotiator = defaultLocaleNegotiator,
    } = options;

    /**
     * Middleware function that adds fluent functionality
     * to the context object.
     */
    return async function fluentMiddleware(
        context: ContextType,
        next: NextFunction,
    ): Promise<void> {
        // A reference to the current translation function,
        // which could be changed dynamically
        let translate: TranslateFunction;

        // Translate wrapping function that delegates
        // all the calls to the current `translate`,
        // using this wrapper function in the context
        // allows us to update context only once and
        // have more dynamic translate function
        const translateWrapper: TranslateFunction = (messageId, context) =>
            translate(messageId, context);

        // Adding custom properties to the context
        Object.assign(context, {
            t: translateWrapper,
        } satisfies FluentContextFlavor);

        // This will negotiate locale initially and set
        // the translate function reference
        await negotiateLocale();

        await next();

        /**
         * Calls locale negotiator to determine the locale
         * and updates the translate function reference to
         * use the determined locale.
         */
        async function negotiateLocale() {
            // Determining the locale to use for translations
            const locale: string =
                (await localeNegotiator?.(context)) || defaultLocale;

            useLocale(locale);
        }

        /**
         * Updated the translate function reference to use
         * the specified locale.
         */
        function useLocale(locale: string) {
            translate = fluent.bind(null, locale);
        }
    };
}
