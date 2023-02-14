
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export interface PrismaPromise<A> extends Promise<A> {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Leaderboard
 * 
 */
export type Leaderboard = {
  id: string
  multiple_scores: boolean
}

/**
 * Model Score
 * 
 */
export type Score = {
  id: string
  leaderboardId: string
  value: number
  date: Date
  playerId: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Leaderboards
 * const leaderboards = await prisma.leaderboard.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Leaderboards
   * const leaderboards = await prisma.leaderboard.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): PrismaPromise<Prisma.JsonObject>

      /**
   * `prisma.leaderboard`: Exposes CRUD operations for the **Leaderboard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leaderboards
    * const leaderboards = await prisma.leaderboard.findMany()
    * ```
    */
  get leaderboard(): Prisma.LeaderboardDelegate<GlobalReject>;

  /**
   * `prisma.score`: Exposes CRUD operations for the **Score** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scores
    * const scores = await prisma.score.findMany()
    * ```
    */
  get score(): Prisma.ScoreDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.9.0
   * Query Engine version: ceb5c99003b99c9ee2c1d2e618e359c14aef2ea5
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Leaderboard: 'Leaderboard',
    Score: 'Score'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LeaderboardCountOutputType
   */


  export type LeaderboardCountOutputType = {
    scores: number
  }

  export type LeaderboardCountOutputTypeSelect = {
    scores?: boolean
  }

  export type LeaderboardCountOutputTypeGetPayload<S extends boolean | null | undefined | LeaderboardCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LeaderboardCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (LeaderboardCountOutputTypeArgs)
    ? LeaderboardCountOutputType 
    : S extends { select: any } & (LeaderboardCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof LeaderboardCountOutputType ? LeaderboardCountOutputType[P] : never
  } 
      : LeaderboardCountOutputType




  // Custom InputTypes

  /**
   * LeaderboardCountOutputType without action
   */
  export type LeaderboardCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LeaderboardCountOutputType
     */
    select?: LeaderboardCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Leaderboard
   */


  export type AggregateLeaderboard = {
    _count: LeaderboardCountAggregateOutputType | null
    _min: LeaderboardMinAggregateOutputType | null
    _max: LeaderboardMaxAggregateOutputType | null
  }

  export type LeaderboardMinAggregateOutputType = {
    id: string | null
    multiple_scores: boolean | null
  }

  export type LeaderboardMaxAggregateOutputType = {
    id: string | null
    multiple_scores: boolean | null
  }

  export type LeaderboardCountAggregateOutputType = {
    id: number
    multiple_scores: number
    _all: number
  }


  export type LeaderboardMinAggregateInputType = {
    id?: true
    multiple_scores?: true
  }

  export type LeaderboardMaxAggregateInputType = {
    id?: true
    multiple_scores?: true
  }

  export type LeaderboardCountAggregateInputType = {
    id?: true
    multiple_scores?: true
    _all?: true
  }

  export type LeaderboardAggregateArgs = {
    /**
     * Filter which Leaderboard to aggregate.
     */
    where?: LeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaderboards to fetch.
     */
    orderBy?: Enumerable<LeaderboardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leaderboards
    **/
    _count?: true | LeaderboardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaderboardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaderboardMaxAggregateInputType
  }

  export type GetLeaderboardAggregateType<T extends LeaderboardAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaderboard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaderboard[P]>
      : GetScalarType<T[P], AggregateLeaderboard[P]>
  }




  export type LeaderboardGroupByArgs = {
    where?: LeaderboardWhereInput
    orderBy?: Enumerable<LeaderboardOrderByWithAggregationInput>
    by: LeaderboardScalarFieldEnum[]
    having?: LeaderboardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaderboardCountAggregateInputType | true
    _min?: LeaderboardMinAggregateInputType
    _max?: LeaderboardMaxAggregateInputType
  }


  export type LeaderboardGroupByOutputType = {
    id: string
    multiple_scores: boolean
    _count: LeaderboardCountAggregateOutputType | null
    _min: LeaderboardMinAggregateOutputType | null
    _max: LeaderboardMaxAggregateOutputType | null
  }

  type GetLeaderboardGroupByPayload<T extends LeaderboardGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LeaderboardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaderboardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaderboardGroupByOutputType[P]>
            : GetScalarType<T[P], LeaderboardGroupByOutputType[P]>
        }
      >
    >


  export type LeaderboardSelect = {
    id?: boolean
    scores?: boolean | Leaderboard$scoresArgs
    multiple_scores?: boolean
    _count?: boolean | LeaderboardCountOutputTypeArgs
  }


  export type LeaderboardInclude = {
    scores?: boolean | Leaderboard$scoresArgs
    _count?: boolean | LeaderboardCountOutputTypeArgs
  }

  export type LeaderboardGetPayload<S extends boolean | null | undefined | LeaderboardArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Leaderboard :
    S extends undefined ? never :
    S extends { include: any } & (LeaderboardArgs | LeaderboardFindManyArgs)
    ? Leaderboard  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'scores' ? Array < ScoreGetPayload<S['include'][P]>>  :
        P extends '_count' ? LeaderboardCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (LeaderboardArgs | LeaderboardFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'scores' ? Array < ScoreGetPayload<S['select'][P]>>  :
        P extends '_count' ? LeaderboardCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Leaderboard ? Leaderboard[P] : never
  } 
      : Leaderboard


  type LeaderboardCountArgs = 
    Omit<LeaderboardFindManyArgs, 'select' | 'include'> & {
      select?: LeaderboardCountAggregateInputType | true
    }

  export interface LeaderboardDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Leaderboard that matches the filter.
     * @param {LeaderboardFindUniqueArgs} args - Arguments to find a Leaderboard
     * @example
     * // Get one Leaderboard
     * const leaderboard = await prisma.leaderboard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LeaderboardFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LeaderboardFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Leaderboard'> extends True ? Prisma__LeaderboardClient<LeaderboardGetPayload<T>> : Prisma__LeaderboardClient<LeaderboardGetPayload<T> | null, null>

    /**
     * Find one Leaderboard that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LeaderboardFindUniqueOrThrowArgs} args - Arguments to find a Leaderboard
     * @example
     * // Get one Leaderboard
     * const leaderboard = await prisma.leaderboard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LeaderboardFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LeaderboardFindUniqueOrThrowArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Find the first Leaderboard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardFindFirstArgs} args - Arguments to find a Leaderboard
     * @example
     * // Get one Leaderboard
     * const leaderboard = await prisma.leaderboard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LeaderboardFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LeaderboardFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Leaderboard'> extends True ? Prisma__LeaderboardClient<LeaderboardGetPayload<T>> : Prisma__LeaderboardClient<LeaderboardGetPayload<T> | null, null>

    /**
     * Find the first Leaderboard that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardFindFirstOrThrowArgs} args - Arguments to find a Leaderboard
     * @example
     * // Get one Leaderboard
     * const leaderboard = await prisma.leaderboard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LeaderboardFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LeaderboardFindFirstOrThrowArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Find zero or more Leaderboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leaderboards
     * const leaderboards = await prisma.leaderboard.findMany()
     * 
     * // Get first 10 Leaderboards
     * const leaderboards = await prisma.leaderboard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaderboardWithIdOnly = await prisma.leaderboard.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LeaderboardFindManyArgs>(
      args?: SelectSubset<T, LeaderboardFindManyArgs>
    ): PrismaPromise<Array<LeaderboardGetPayload<T>>>

    /**
     * Create a Leaderboard.
     * @param {LeaderboardCreateArgs} args - Arguments to create a Leaderboard.
     * @example
     * // Create one Leaderboard
     * const Leaderboard = await prisma.leaderboard.create({
     *   data: {
     *     // ... data to create a Leaderboard
     *   }
     * })
     * 
    **/
    create<T extends LeaderboardCreateArgs>(
      args: SelectSubset<T, LeaderboardCreateArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Create many Leaderboards.
     *     @param {LeaderboardCreateManyArgs} args - Arguments to create many Leaderboards.
     *     @example
     *     // Create many Leaderboards
     *     const leaderboard = await prisma.leaderboard.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LeaderboardCreateManyArgs>(
      args?: SelectSubset<T, LeaderboardCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Leaderboard.
     * @param {LeaderboardDeleteArgs} args - Arguments to delete one Leaderboard.
     * @example
     * // Delete one Leaderboard
     * const Leaderboard = await prisma.leaderboard.delete({
     *   where: {
     *     // ... filter to delete one Leaderboard
     *   }
     * })
     * 
    **/
    delete<T extends LeaderboardDeleteArgs>(
      args: SelectSubset<T, LeaderboardDeleteArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Update one Leaderboard.
     * @param {LeaderboardUpdateArgs} args - Arguments to update one Leaderboard.
     * @example
     * // Update one Leaderboard
     * const leaderboard = await prisma.leaderboard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LeaderboardUpdateArgs>(
      args: SelectSubset<T, LeaderboardUpdateArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Delete zero or more Leaderboards.
     * @param {LeaderboardDeleteManyArgs} args - Arguments to filter Leaderboards to delete.
     * @example
     * // Delete a few Leaderboards
     * const { count } = await prisma.leaderboard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LeaderboardDeleteManyArgs>(
      args?: SelectSubset<T, LeaderboardDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leaderboards
     * const leaderboard = await prisma.leaderboard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LeaderboardUpdateManyArgs>(
      args: SelectSubset<T, LeaderboardUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Leaderboard.
     * @param {LeaderboardUpsertArgs} args - Arguments to update or create a Leaderboard.
     * @example
     * // Update or create a Leaderboard
     * const leaderboard = await prisma.leaderboard.upsert({
     *   create: {
     *     // ... data to create a Leaderboard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leaderboard we want to update
     *   }
     * })
    **/
    upsert<T extends LeaderboardUpsertArgs>(
      args: SelectSubset<T, LeaderboardUpsertArgs>
    ): Prisma__LeaderboardClient<LeaderboardGetPayload<T>>

    /**
     * Find zero or more Leaderboards that matches the filter.
     * @param {LeaderboardFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const leaderboard = await prisma.leaderboard.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: LeaderboardFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Leaderboard.
     * @param {LeaderboardAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const leaderboard = await prisma.leaderboard.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: LeaderboardAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of Leaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardCountArgs} args - Arguments to filter Leaderboards to count.
     * @example
     * // Count the number of Leaderboards
     * const count = await prisma.leaderboard.count({
     *   where: {
     *     // ... the filter for the Leaderboards we want to count
     *   }
     * })
    **/
    count<T extends LeaderboardCountArgs>(
      args?: Subset<T, LeaderboardCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaderboardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaderboardAggregateArgs>(args: Subset<T, LeaderboardAggregateArgs>): PrismaPromise<GetLeaderboardAggregateType<T>>

    /**
     * Group by Leaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaderboardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaderboardGroupByArgs['orderBy'] }
        : { orderBy?: LeaderboardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaderboardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaderboardGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Leaderboard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LeaderboardClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    scores<T extends Leaderboard$scoresArgs= {}>(args?: Subset<T, Leaderboard$scoresArgs>): PrismaPromise<Array<ScoreGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Leaderboard base type for findUnique actions
   */
  export type LeaderboardFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter, which Leaderboard to fetch.
     */
    where: LeaderboardWhereUniqueInput
  }

  /**
   * Leaderboard findUnique
   */
  export interface LeaderboardFindUniqueArgs extends LeaderboardFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Leaderboard findUniqueOrThrow
   */
  export type LeaderboardFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter, which Leaderboard to fetch.
     */
    where: LeaderboardWhereUniqueInput
  }


  /**
   * Leaderboard base type for findFirst actions
   */
  export type LeaderboardFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter, which Leaderboard to fetch.
     */
    where?: LeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaderboards to fetch.
     */
    orderBy?: Enumerable<LeaderboardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leaderboards.
     */
    cursor?: LeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leaderboards.
     */
    distinct?: Enumerable<LeaderboardScalarFieldEnum>
  }

  /**
   * Leaderboard findFirst
   */
  export interface LeaderboardFindFirstArgs extends LeaderboardFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Leaderboard findFirstOrThrow
   */
  export type LeaderboardFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter, which Leaderboard to fetch.
     */
    where?: LeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaderboards to fetch.
     */
    orderBy?: Enumerable<LeaderboardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leaderboards.
     */
    cursor?: LeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leaderboards.
     */
    distinct?: Enumerable<LeaderboardScalarFieldEnum>
  }


  /**
   * Leaderboard findMany
   */
  export type LeaderboardFindManyArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter, which Leaderboards to fetch.
     */
    where?: LeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaderboards to fetch.
     */
    orderBy?: Enumerable<LeaderboardOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leaderboards.
     */
    cursor?: LeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaderboards.
     */
    skip?: number
    distinct?: Enumerable<LeaderboardScalarFieldEnum>
  }


  /**
   * Leaderboard create
   */
  export type LeaderboardCreateArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * The data needed to create a Leaderboard.
     */
    data: XOR<LeaderboardCreateInput, LeaderboardUncheckedCreateInput>
  }


  /**
   * Leaderboard createMany
   */
  export type LeaderboardCreateManyArgs = {
    /**
     * The data used to create many Leaderboards.
     */
    data: Enumerable<LeaderboardCreateManyInput>
  }


  /**
   * Leaderboard update
   */
  export type LeaderboardUpdateArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * The data needed to update a Leaderboard.
     */
    data: XOR<LeaderboardUpdateInput, LeaderboardUncheckedUpdateInput>
    /**
     * Choose, which Leaderboard to update.
     */
    where: LeaderboardWhereUniqueInput
  }


  /**
   * Leaderboard updateMany
   */
  export type LeaderboardUpdateManyArgs = {
    /**
     * The data used to update Leaderboards.
     */
    data: XOR<LeaderboardUpdateManyMutationInput, LeaderboardUncheckedUpdateManyInput>
    /**
     * Filter which Leaderboards to update
     */
    where?: LeaderboardWhereInput
  }


  /**
   * Leaderboard upsert
   */
  export type LeaderboardUpsertArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * The filter to search for the Leaderboard to update in case it exists.
     */
    where: LeaderboardWhereUniqueInput
    /**
     * In case the Leaderboard found by the `where` argument doesn't exist, create a new Leaderboard with this data.
     */
    create: XOR<LeaderboardCreateInput, LeaderboardUncheckedCreateInput>
    /**
     * In case the Leaderboard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaderboardUpdateInput, LeaderboardUncheckedUpdateInput>
  }


  /**
   * Leaderboard delete
   */
  export type LeaderboardDeleteArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
    /**
     * Filter which Leaderboard to delete.
     */
    where: LeaderboardWhereUniqueInput
  }


  /**
   * Leaderboard deleteMany
   */
  export type LeaderboardDeleteManyArgs = {
    /**
     * Filter which Leaderboards to delete
     */
    where?: LeaderboardWhereInput
  }


  /**
   * Leaderboard findRaw
   */
  export type LeaderboardFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Leaderboard aggregateRaw
   */
  export type LeaderboardAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Leaderboard.scores
   */
  export type Leaderboard$scoresArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    where?: ScoreWhereInput
    orderBy?: Enumerable<ScoreOrderByWithRelationInput>
    cursor?: ScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ScoreScalarFieldEnum>
  }


  /**
   * Leaderboard without action
   */
  export type LeaderboardArgs = {
    /**
     * Select specific fields to fetch from the Leaderboard
     */
    select?: LeaderboardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: LeaderboardInclude | null
  }



  /**
   * Model Score
   */


  export type AggregateScore = {
    _count: ScoreCountAggregateOutputType | null
    _avg: ScoreAvgAggregateOutputType | null
    _sum: ScoreSumAggregateOutputType | null
    _min: ScoreMinAggregateOutputType | null
    _max: ScoreMaxAggregateOutputType | null
  }

  export type ScoreAvgAggregateOutputType = {
    value: number | null
  }

  export type ScoreSumAggregateOutputType = {
    value: number | null
  }

  export type ScoreMinAggregateOutputType = {
    id: string | null
    leaderboardId: string | null
    value: number | null
    date: Date | null
    playerId: string | null
  }

  export type ScoreMaxAggregateOutputType = {
    id: string | null
    leaderboardId: string | null
    value: number | null
    date: Date | null
    playerId: string | null
  }

  export type ScoreCountAggregateOutputType = {
    id: number
    leaderboardId: number
    value: number
    date: number
    playerId: number
    _all: number
  }


  export type ScoreAvgAggregateInputType = {
    value?: true
  }

  export type ScoreSumAggregateInputType = {
    value?: true
  }

  export type ScoreMinAggregateInputType = {
    id?: true
    leaderboardId?: true
    value?: true
    date?: true
    playerId?: true
  }

  export type ScoreMaxAggregateInputType = {
    id?: true
    leaderboardId?: true
    value?: true
    date?: true
    playerId?: true
  }

  export type ScoreCountAggregateInputType = {
    id?: true
    leaderboardId?: true
    value?: true
    date?: true
    playerId?: true
    _all?: true
  }

  export type ScoreAggregateArgs = {
    /**
     * Filter which Score to aggregate.
     */
    where?: ScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scores to fetch.
     */
    orderBy?: Enumerable<ScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scores
    **/
    _count?: true | ScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScoreMaxAggregateInputType
  }

  export type GetScoreAggregateType<T extends ScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScore[P]>
      : GetScalarType<T[P], AggregateScore[P]>
  }




  export type ScoreGroupByArgs = {
    where?: ScoreWhereInput
    orderBy?: Enumerable<ScoreOrderByWithAggregationInput>
    by: ScoreScalarFieldEnum[]
    having?: ScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScoreCountAggregateInputType | true
    _avg?: ScoreAvgAggregateInputType
    _sum?: ScoreSumAggregateInputType
    _min?: ScoreMinAggregateInputType
    _max?: ScoreMaxAggregateInputType
  }


  export type ScoreGroupByOutputType = {
    id: string
    leaderboardId: string
    value: number
    date: Date
    playerId: string
    _count: ScoreCountAggregateOutputType | null
    _avg: ScoreAvgAggregateOutputType | null
    _sum: ScoreSumAggregateOutputType | null
    _min: ScoreMinAggregateOutputType | null
    _max: ScoreMaxAggregateOutputType | null
  }

  type GetScoreGroupByPayload<T extends ScoreGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoreGroupByOutputType[P]>
            : GetScalarType<T[P], ScoreGroupByOutputType[P]>
        }
      >
    >


  export type ScoreSelect = {
    id?: boolean
    leaderboardId?: boolean
    leaderboard?: boolean | LeaderboardArgs
    value?: boolean
    date?: boolean
    playerId?: boolean
  }


  export type ScoreInclude = {
    leaderboard?: boolean | LeaderboardArgs
  }

  export type ScoreGetPayload<S extends boolean | null | undefined | ScoreArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Score :
    S extends undefined ? never :
    S extends { include: any } & (ScoreArgs | ScoreFindManyArgs)
    ? Score  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'leaderboard' ? LeaderboardGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ScoreArgs | ScoreFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'leaderboard' ? LeaderboardGetPayload<S['select'][P]> :  P extends keyof Score ? Score[P] : never
  } 
      : Score


  type ScoreCountArgs = 
    Omit<ScoreFindManyArgs, 'select' | 'include'> & {
      select?: ScoreCountAggregateInputType | true
    }

  export interface ScoreDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Score that matches the filter.
     * @param {ScoreFindUniqueArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ScoreFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ScoreFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Score'> extends True ? Prisma__ScoreClient<ScoreGetPayload<T>> : Prisma__ScoreClient<ScoreGetPayload<T> | null, null>

    /**
     * Find one Score that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ScoreFindUniqueOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ScoreFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ScoreFindUniqueOrThrowArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Find the first Score that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindFirstArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ScoreFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ScoreFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Score'> extends True ? Prisma__ScoreClient<ScoreGetPayload<T>> : Prisma__ScoreClient<ScoreGetPayload<T> | null, null>

    /**
     * Find the first Score that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindFirstOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ScoreFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ScoreFindFirstOrThrowArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Find zero or more Scores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scores
     * const scores = await prisma.score.findMany()
     * 
     * // Get first 10 Scores
     * const scores = await prisma.score.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scoreWithIdOnly = await prisma.score.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ScoreFindManyArgs>(
      args?: SelectSubset<T, ScoreFindManyArgs>
    ): PrismaPromise<Array<ScoreGetPayload<T>>>

    /**
     * Create a Score.
     * @param {ScoreCreateArgs} args - Arguments to create a Score.
     * @example
     * // Create one Score
     * const Score = await prisma.score.create({
     *   data: {
     *     // ... data to create a Score
     *   }
     * })
     * 
    **/
    create<T extends ScoreCreateArgs>(
      args: SelectSubset<T, ScoreCreateArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Create many Scores.
     *     @param {ScoreCreateManyArgs} args - Arguments to create many Scores.
     *     @example
     *     // Create many Scores
     *     const score = await prisma.score.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ScoreCreateManyArgs>(
      args?: SelectSubset<T, ScoreCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Score.
     * @param {ScoreDeleteArgs} args - Arguments to delete one Score.
     * @example
     * // Delete one Score
     * const Score = await prisma.score.delete({
     *   where: {
     *     // ... filter to delete one Score
     *   }
     * })
     * 
    **/
    delete<T extends ScoreDeleteArgs>(
      args: SelectSubset<T, ScoreDeleteArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Update one Score.
     * @param {ScoreUpdateArgs} args - Arguments to update one Score.
     * @example
     * // Update one Score
     * const score = await prisma.score.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ScoreUpdateArgs>(
      args: SelectSubset<T, ScoreUpdateArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Delete zero or more Scores.
     * @param {ScoreDeleteManyArgs} args - Arguments to filter Scores to delete.
     * @example
     * // Delete a few Scores
     * const { count } = await prisma.score.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ScoreDeleteManyArgs>(
      args?: SelectSubset<T, ScoreDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scores
     * const score = await prisma.score.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ScoreUpdateManyArgs>(
      args: SelectSubset<T, ScoreUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Score.
     * @param {ScoreUpsertArgs} args - Arguments to update or create a Score.
     * @example
     * // Update or create a Score
     * const score = await prisma.score.upsert({
     *   create: {
     *     // ... data to create a Score
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Score we want to update
     *   }
     * })
    **/
    upsert<T extends ScoreUpsertArgs>(
      args: SelectSubset<T, ScoreUpsertArgs>
    ): Prisma__ScoreClient<ScoreGetPayload<T>>

    /**
     * Find zero or more Scores that matches the filter.
     * @param {ScoreFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const score = await prisma.score.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ScoreFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Score.
     * @param {ScoreAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const score = await prisma.score.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ScoreAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreCountArgs} args - Arguments to filter Scores to count.
     * @example
     * // Count the number of Scores
     * const count = await prisma.score.count({
     *   where: {
     *     // ... the filter for the Scores we want to count
     *   }
     * })
    **/
    count<T extends ScoreCountArgs>(
      args?: Subset<T, ScoreCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScoreAggregateArgs>(args: Subset<T, ScoreAggregateArgs>): PrismaPromise<GetScoreAggregateType<T>>

    /**
     * Group by Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScoreGroupByArgs['orderBy'] }
        : { orderBy?: ScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScoreGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Score.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ScoreClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    leaderboard<T extends LeaderboardArgs= {}>(args?: Subset<T, LeaderboardArgs>): Prisma__LeaderboardClient<LeaderboardGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Score base type for findUnique actions
   */
  export type ScoreFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter, which Score to fetch.
     */
    where: ScoreWhereUniqueInput
  }

  /**
   * Score findUnique
   */
  export interface ScoreFindUniqueArgs extends ScoreFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Score findUniqueOrThrow
   */
  export type ScoreFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter, which Score to fetch.
     */
    where: ScoreWhereUniqueInput
  }


  /**
   * Score base type for findFirst actions
   */
  export type ScoreFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter, which Score to fetch.
     */
    where?: ScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scores to fetch.
     */
    orderBy?: Enumerable<ScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scores.
     */
    cursor?: ScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scores.
     */
    distinct?: Enumerable<ScoreScalarFieldEnum>
  }

  /**
   * Score findFirst
   */
  export interface ScoreFindFirstArgs extends ScoreFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Score findFirstOrThrow
   */
  export type ScoreFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter, which Score to fetch.
     */
    where?: ScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scores to fetch.
     */
    orderBy?: Enumerable<ScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scores.
     */
    cursor?: ScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scores.
     */
    distinct?: Enumerable<ScoreScalarFieldEnum>
  }


  /**
   * Score findMany
   */
  export type ScoreFindManyArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter, which Scores to fetch.
     */
    where?: ScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scores to fetch.
     */
    orderBy?: Enumerable<ScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scores.
     */
    cursor?: ScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scores.
     */
    skip?: number
    distinct?: Enumerable<ScoreScalarFieldEnum>
  }


  /**
   * Score create
   */
  export type ScoreCreateArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * The data needed to create a Score.
     */
    data: XOR<ScoreCreateInput, ScoreUncheckedCreateInput>
  }


  /**
   * Score createMany
   */
  export type ScoreCreateManyArgs = {
    /**
     * The data used to create many Scores.
     */
    data: Enumerable<ScoreCreateManyInput>
  }


  /**
   * Score update
   */
  export type ScoreUpdateArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * The data needed to update a Score.
     */
    data: XOR<ScoreUpdateInput, ScoreUncheckedUpdateInput>
    /**
     * Choose, which Score to update.
     */
    where: ScoreWhereUniqueInput
  }


  /**
   * Score updateMany
   */
  export type ScoreUpdateManyArgs = {
    /**
     * The data used to update Scores.
     */
    data: XOR<ScoreUpdateManyMutationInput, ScoreUncheckedUpdateManyInput>
    /**
     * Filter which Scores to update
     */
    where?: ScoreWhereInput
  }


  /**
   * Score upsert
   */
  export type ScoreUpsertArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * The filter to search for the Score to update in case it exists.
     */
    where: ScoreWhereUniqueInput
    /**
     * In case the Score found by the `where` argument doesn't exist, create a new Score with this data.
     */
    create: XOR<ScoreCreateInput, ScoreUncheckedCreateInput>
    /**
     * In case the Score was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScoreUpdateInput, ScoreUncheckedUpdateInput>
  }


  /**
   * Score delete
   */
  export type ScoreDeleteArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
    /**
     * Filter which Score to delete.
     */
    where: ScoreWhereUniqueInput
  }


  /**
   * Score deleteMany
   */
  export type ScoreDeleteManyArgs = {
    /**
     * Filter which Scores to delete
     */
    where?: ScoreWhereInput
  }


  /**
   * Score findRaw
   */
  export type ScoreFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Score aggregateRaw
   */
  export type ScoreAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Score without action
   */
  export type ScoreArgs = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ScoreInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const LeaderboardScalarFieldEnum: {
    id: 'id',
    multiple_scores: 'multiple_scores'
  };

  export type LeaderboardScalarFieldEnum = (typeof LeaderboardScalarFieldEnum)[keyof typeof LeaderboardScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const ScoreScalarFieldEnum: {
    id: 'id',
    leaderboardId: 'leaderboardId',
    value: 'value',
    date: 'date',
    playerId: 'playerId'
  };

  export type ScoreScalarFieldEnum = (typeof ScoreScalarFieldEnum)[keyof typeof ScoreScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type LeaderboardWhereInput = {
    AND?: Enumerable<LeaderboardWhereInput>
    OR?: Enumerable<LeaderboardWhereInput>
    NOT?: Enumerable<LeaderboardWhereInput>
    id?: StringFilter | string
    scores?: ScoreListRelationFilter
    multiple_scores?: BoolFilter | boolean
  }

  export type LeaderboardOrderByWithRelationInput = {
    id?: SortOrder
    scores?: ScoreOrderByRelationAggregateInput
    multiple_scores?: SortOrder
  }

  export type LeaderboardWhereUniqueInput = {
    id?: string
  }

  export type LeaderboardOrderByWithAggregationInput = {
    id?: SortOrder
    multiple_scores?: SortOrder
    _count?: LeaderboardCountOrderByAggregateInput
    _max?: LeaderboardMaxOrderByAggregateInput
    _min?: LeaderboardMinOrderByAggregateInput
  }

  export type LeaderboardScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LeaderboardScalarWhereWithAggregatesInput>
    OR?: Enumerable<LeaderboardScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LeaderboardScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    multiple_scores?: BoolWithAggregatesFilter | boolean
  }

  export type ScoreWhereInput = {
    AND?: Enumerable<ScoreWhereInput>
    OR?: Enumerable<ScoreWhereInput>
    NOT?: Enumerable<ScoreWhereInput>
    id?: StringFilter | string
    leaderboardId?: StringFilter | string
    leaderboard?: XOR<LeaderboardRelationFilter, LeaderboardWhereInput>
    value?: IntFilter | number
    date?: DateTimeFilter | Date | string
    playerId?: StringFilter | string
  }

  export type ScoreOrderByWithRelationInput = {
    id?: SortOrder
    leaderboardId?: SortOrder
    leaderboard?: LeaderboardOrderByWithRelationInput
    value?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type ScoreWhereUniqueInput = {
    id?: string
  }

  export type ScoreOrderByWithAggregationInput = {
    id?: SortOrder
    leaderboardId?: SortOrder
    value?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
    _count?: ScoreCountOrderByAggregateInput
    _avg?: ScoreAvgOrderByAggregateInput
    _max?: ScoreMaxOrderByAggregateInput
    _min?: ScoreMinOrderByAggregateInput
    _sum?: ScoreSumOrderByAggregateInput
  }

  export type ScoreScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ScoreScalarWhereWithAggregatesInput>
    OR?: Enumerable<ScoreScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ScoreScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    leaderboardId?: StringWithAggregatesFilter | string
    value?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    playerId?: StringWithAggregatesFilter | string
  }

  export type LeaderboardCreateInput = {
    id?: string
    scores?: ScoreCreateNestedManyWithoutLeaderboardInput
    multiple_scores: boolean
  }

  export type LeaderboardUncheckedCreateInput = {
    id?: string
    scores?: ScoreUncheckedCreateNestedManyWithoutLeaderboardInput
    multiple_scores: boolean
  }

  export type LeaderboardUpdateInput = {
    scores?: ScoreUpdateManyWithoutLeaderboardNestedInput
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaderboardUncheckedUpdateInput = {
    scores?: ScoreUncheckedUpdateManyWithoutLeaderboardNestedInput
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaderboardCreateManyInput = {
    id?: string
    multiple_scores: boolean
  }

  export type LeaderboardUpdateManyMutationInput = {
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaderboardUncheckedUpdateManyInput = {
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScoreCreateInput = {
    id?: string
    leaderboard: LeaderboardCreateNestedOneWithoutScoresInput
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreUncheckedCreateInput = {
    id?: string
    leaderboardId: string
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreUpdateInput = {
    leaderboard?: LeaderboardUpdateOneRequiredWithoutScoresNestedInput
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreUncheckedUpdateInput = {
    leaderboardId?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreCreateManyInput = {
    id?: string
    leaderboardId: string
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreUpdateManyMutationInput = {
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreUncheckedUpdateManyInput = {
    leaderboardId?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type ScoreListRelationFilter = {
    every?: ScoreWhereInput
    some?: ScoreWhereInput
    none?: ScoreWhereInput
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type ScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaderboardCountOrderByAggregateInput = {
    id?: SortOrder
    multiple_scores?: SortOrder
  }

  export type LeaderboardMaxOrderByAggregateInput = {
    id?: SortOrder
    multiple_scores?: SortOrder
  }

  export type LeaderboardMinOrderByAggregateInput = {
    id?: SortOrder
    multiple_scores?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type LeaderboardRelationFilter = {
    is?: LeaderboardWhereInput
    isNot?: LeaderboardWhereInput
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ScoreCountOrderByAggregateInput = {
    id?: SortOrder
    leaderboardId?: SortOrder
    value?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type ScoreAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type ScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    leaderboardId?: SortOrder
    value?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type ScoreMinOrderByAggregateInput = {
    id?: SortOrder
    leaderboardId?: SortOrder
    value?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type ScoreSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ScoreCreateNestedManyWithoutLeaderboardInput = {
    create?: XOR<Enumerable<ScoreCreateWithoutLeaderboardInput>, Enumerable<ScoreUncheckedCreateWithoutLeaderboardInput>>
    connectOrCreate?: Enumerable<ScoreCreateOrConnectWithoutLeaderboardInput>
    createMany?: ScoreCreateManyLeaderboardInputEnvelope
    connect?: Enumerable<ScoreWhereUniqueInput>
  }

  export type ScoreUncheckedCreateNestedManyWithoutLeaderboardInput = {
    create?: XOR<Enumerable<ScoreCreateWithoutLeaderboardInput>, Enumerable<ScoreUncheckedCreateWithoutLeaderboardInput>>
    connectOrCreate?: Enumerable<ScoreCreateOrConnectWithoutLeaderboardInput>
    createMany?: ScoreCreateManyLeaderboardInputEnvelope
    connect?: Enumerable<ScoreWhereUniqueInput>
  }

  export type ScoreUpdateManyWithoutLeaderboardNestedInput = {
    create?: XOR<Enumerable<ScoreCreateWithoutLeaderboardInput>, Enumerable<ScoreUncheckedCreateWithoutLeaderboardInput>>
    connectOrCreate?: Enumerable<ScoreCreateOrConnectWithoutLeaderboardInput>
    upsert?: Enumerable<ScoreUpsertWithWhereUniqueWithoutLeaderboardInput>
    createMany?: ScoreCreateManyLeaderboardInputEnvelope
    set?: Enumerable<ScoreWhereUniqueInput>
    disconnect?: Enumerable<ScoreWhereUniqueInput>
    delete?: Enumerable<ScoreWhereUniqueInput>
    connect?: Enumerable<ScoreWhereUniqueInput>
    update?: Enumerable<ScoreUpdateWithWhereUniqueWithoutLeaderboardInput>
    updateMany?: Enumerable<ScoreUpdateManyWithWhereWithoutLeaderboardInput>
    deleteMany?: Enumerable<ScoreScalarWhereInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ScoreUncheckedUpdateManyWithoutLeaderboardNestedInput = {
    create?: XOR<Enumerable<ScoreCreateWithoutLeaderboardInput>, Enumerable<ScoreUncheckedCreateWithoutLeaderboardInput>>
    connectOrCreate?: Enumerable<ScoreCreateOrConnectWithoutLeaderboardInput>
    upsert?: Enumerable<ScoreUpsertWithWhereUniqueWithoutLeaderboardInput>
    createMany?: ScoreCreateManyLeaderboardInputEnvelope
    set?: Enumerable<ScoreWhereUniqueInput>
    disconnect?: Enumerable<ScoreWhereUniqueInput>
    delete?: Enumerable<ScoreWhereUniqueInput>
    connect?: Enumerable<ScoreWhereUniqueInput>
    update?: Enumerable<ScoreUpdateWithWhereUniqueWithoutLeaderboardInput>
    updateMany?: Enumerable<ScoreUpdateManyWithWhereWithoutLeaderboardInput>
    deleteMany?: Enumerable<ScoreScalarWhereInput>
  }

  export type LeaderboardCreateNestedOneWithoutScoresInput = {
    create?: XOR<LeaderboardCreateWithoutScoresInput, LeaderboardUncheckedCreateWithoutScoresInput>
    connectOrCreate?: LeaderboardCreateOrConnectWithoutScoresInput
    connect?: LeaderboardWhereUniqueInput
  }

  export type LeaderboardUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<LeaderboardCreateWithoutScoresInput, LeaderboardUncheckedCreateWithoutScoresInput>
    connectOrCreate?: LeaderboardCreateOrConnectWithoutScoresInput
    upsert?: LeaderboardUpsertWithoutScoresInput
    connect?: LeaderboardWhereUniqueInput
    update?: XOR<LeaderboardUpdateWithoutScoresInput, LeaderboardUncheckedUpdateWithoutScoresInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ScoreCreateWithoutLeaderboardInput = {
    id?: string
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreUncheckedCreateWithoutLeaderboardInput = {
    id?: string
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreCreateOrConnectWithoutLeaderboardInput = {
    where: ScoreWhereUniqueInput
    create: XOR<ScoreCreateWithoutLeaderboardInput, ScoreUncheckedCreateWithoutLeaderboardInput>
  }

  export type ScoreCreateManyLeaderboardInputEnvelope = {
    data: Enumerable<ScoreCreateManyLeaderboardInput>
  }

  export type ScoreUpsertWithWhereUniqueWithoutLeaderboardInput = {
    where: ScoreWhereUniqueInput
    update: XOR<ScoreUpdateWithoutLeaderboardInput, ScoreUncheckedUpdateWithoutLeaderboardInput>
    create: XOR<ScoreCreateWithoutLeaderboardInput, ScoreUncheckedCreateWithoutLeaderboardInput>
  }

  export type ScoreUpdateWithWhereUniqueWithoutLeaderboardInput = {
    where: ScoreWhereUniqueInput
    data: XOR<ScoreUpdateWithoutLeaderboardInput, ScoreUncheckedUpdateWithoutLeaderboardInput>
  }

  export type ScoreUpdateManyWithWhereWithoutLeaderboardInput = {
    where: ScoreScalarWhereInput
    data: XOR<ScoreUpdateManyMutationInput, ScoreUncheckedUpdateManyWithoutScoresInput>
  }

  export type ScoreScalarWhereInput = {
    AND?: Enumerable<ScoreScalarWhereInput>
    OR?: Enumerable<ScoreScalarWhereInput>
    NOT?: Enumerable<ScoreScalarWhereInput>
    id?: StringFilter | string
    leaderboardId?: StringFilter | string
    value?: IntFilter | number
    date?: DateTimeFilter | Date | string
    playerId?: StringFilter | string
  }

  export type LeaderboardCreateWithoutScoresInput = {
    id?: string
    multiple_scores: boolean
  }

  export type LeaderboardUncheckedCreateWithoutScoresInput = {
    id?: string
    multiple_scores: boolean
  }

  export type LeaderboardCreateOrConnectWithoutScoresInput = {
    where: LeaderboardWhereUniqueInput
    create: XOR<LeaderboardCreateWithoutScoresInput, LeaderboardUncheckedCreateWithoutScoresInput>
  }

  export type LeaderboardUpsertWithoutScoresInput = {
    update: XOR<LeaderboardUpdateWithoutScoresInput, LeaderboardUncheckedUpdateWithoutScoresInput>
    create: XOR<LeaderboardCreateWithoutScoresInput, LeaderboardUncheckedCreateWithoutScoresInput>
  }

  export type LeaderboardUpdateWithoutScoresInput = {
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaderboardUncheckedUpdateWithoutScoresInput = {
    multiple_scores?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ScoreCreateManyLeaderboardInput = {
    id?: string
    value: number
    date: Date | string
    playerId: string
  }

  export type ScoreUpdateWithoutLeaderboardInput = {
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreUncheckedUpdateWithoutLeaderboardInput = {
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreUncheckedUpdateManyWithoutScoresInput = {
    value?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}