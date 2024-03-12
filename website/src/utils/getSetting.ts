import type { PageContext } from 'vike/types';
import { assert } from '~/utils/assert.js';
import { isCallable } from '~/utils/isCallable.js';

export function getSetting<T extends keyof PageContext['configEntries']>(
    pageContext: PageContext,
    key: T,
): string | null | undefined {
    const config = pageContext.configEntries[key]?.[0];
    if (!config) return undefined;

    const val = config.configValue;
    if (typeof val === 'string') return val;
    if (!val) return null;

    assert(
        isCallable(val),
        `${config.configDefinedAt} should be a string or a function returning a string`,
    );

    const valStr = val(pageContext);
    assert(typeof valStr! === 'string', `${config.configDefinedAt} should return a string`);

    return valStr;
}
