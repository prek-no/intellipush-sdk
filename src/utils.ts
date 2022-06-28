export const serializeQuery = (params: Record<string, any>, prefix?: string): string => {
    const query: any = Object.keys(params).map((key) => {
        const value  = params[key];

        if (params.constructor === Array)
            key = `${prefix}[]`;
        else if (params.constructor === Object)
            key = (prefix ? `${prefix}[${key}]` : key);

        if (typeof value === 'object')
            return serializeQuery(value, key);
        else
            return `${key}=${encodeURIComponent(value)}`;
    });

    return [].concat.apply([], query).join('&') as string
}
