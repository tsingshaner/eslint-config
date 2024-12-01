export type IncludePrefix<T, Prefix extends string> = T extends `${Prefix}${infer _}` ? T : never
export type MaybePromise<T> = Promise<T> | T
export type OmitItem<T, K> = T extends K ? never : T
