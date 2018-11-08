/**
 * This file has been extracted from the Discord.js source code and modified for various formatting and parameter
 * naming changes. Additionally, this module has been 'ported' to typescript.
 *
 * Original URL: https://github.com/hydrabolt/discord.js/blob/master/src/util/Collection.js
 * Credits to Amish Shah (hydrabolt) and other Discord.js contributors
*/
/**
* A Map with additional utility methods.
* @extends {Map}
*/
export default class Collection<TKey = any, TValue = any> extends Map<TKey, TValue> {
    private _array;
    private _keyArray;
    constructor(iterable?: Iterable<[TKey, TValue]>);
    readonly iter: () => IterableIterator<[TKey, TValue]>;
    set(key: TKey, val: TValue): this;
    delete(key: TKey): boolean;
    /**
     * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behaviour, use `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    array(): TValue[];
    /**
     * Identical to array()
     * @alias {@link Collection#array()}
     * @returns {Array}
     */
    valueArray(): TValue[];
    /**
     * Creates an ordered array of the keys of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behaviour, use `Array.from(collection.keys())` instead.
     * @returns {Array}
     */
    keyArray(): TKey[];
    /**
     * Obtains the first value(s) in this collection.
     * @param {number} [count] Number of values to obtain from the beginning
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    first(): TValue;
    first(count: number): TValue[];
    /**
     * Obtains the first key(s) in this collection.
     * @param {number} [count] Number of keys to obtain from the beginning
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    firstKey(): TKey;
    firstKey(count: number): TKey[];
    /**
     * Obtains the last value(s) in this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of values to obtain from the end
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    last(): TValue;
    last(count: number): TValue[];
    /**
     * Obtains the last key(s) in this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of keys to obtain from the end
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    lastKey(): TKey;
    lastKey(count: number): TKey[];
    /**
     * Obtains random value(s) from this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of values to obtain randomly
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    random(): TValue;
    random(count: number): TValue[];
    /**
     * Obtains random key(s) from this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of keys to obtain randomly
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    randomKey(): TKey;
    randomKey(count: number): TKey[];
    /**
     * Searches for all items where their specified property's value is identical to the given value
     * (`item[prop] === value`).
     * @param {string} prop The property to test against
     * @param {*} value The expected value
     * @returns {Array}
     * @example
     * collection.findAll('username', 'Bob');
     */
    findAll(prop: keyof TValue, value: any): TValue[];
    /**
     * Searches for a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {string|Function} search The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.find('username', 'Bob');
     * @example
     * collection.find(val => val.username === 'Bob');
     */
    find(search: ((val: TValue, key: TKey, collection: this) => boolean) | (keyof TValue), value?: any): TValue;
    /**
     * Searches for the key of a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).
     * @param {string|Function} propOrFn The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.findKey('username', 'Bob');
     * @example
     * collection.findKey(val => val.username === 'Bob');
     */
    findKey(search: ((val: TValue, key: TKey, collection: this) => boolean) | (keyof TValue), value?: any): TKey;
    /**
     * Searches for the existence of a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`).
     * <warn>Do not use this to check for an item by its ID. Instead, use `collection.has(id)`. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) for details.</warn>
     * @param {string} prop The property to test against
     * @param {*} value The expected value
     * @returns {boolean}
     * @example
     * if (collection.exists('username', 'Bob')) {
     *  console.log('user here!');
     * }
     */
    exists(prop: keyof TValue, value: any): boolean;
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a Collection instead of an Array.
     * @param {Function} predicate Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {Collection}
     */
    filter(predicate: (val: TValue, key: TKey, collection: this) => boolean, thisArg?: any): Collection;
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
     * @param {Function} predicate Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     */
    filterArray(predicate: (val: TValue, key: TKey, collection: this) => boolean, thisArg?: any): TValue[];
    /**
     * Identical to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} mapper Function that produces an element of the new array, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     */
    map<T>(mapper: (val: TValue, key: TKey, collection: this) => T, thisArg?: any): T[];
    /**
     * Identical to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} predicate Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     */
    some(predicate: (val: TValue, key: TKey, collection: this) => boolean, thisArg?: any): boolean;
    /**
     * Identical to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     * @param {Function} predicate Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     */
    every(predicate: (value: TValue, key: TKey, collection: this) => boolean, thisArg?: any): boolean;
    /**
     * Identical to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param {Function} reducer Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
     * and `collection`
     * @param {*} [initialValue] Starting value for the accumulator
     * @returns {*}
     */
    reduce(reducer: (accumulator: TValue, currentValue: TValue, currentKey: TKey, collection: this) => TValue, initialValue?: TValue): TValue;
    /**
     * Creates an identical shallow copy of this collection.
     * @returns {Collection}
     * @example const newColl = someColl.clone();
     */
    clone(): Collection;
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     * @param {...Collection} collections Collections to merge
     * @returns {Collection}
     * @example const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     */
    concat(...collections: Collection[]): Collection;
    private static isDeletable;
    /**
     * Calls the `delete()` method on all items that have it.
     * @returns {Promise[]}
     */
    deleteAll(): TValue[];
    /**
     * Checks if this collection shares identical key-value pairings with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {Collection} collection Collection to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    equals(collection?: Collection): boolean;
    /**
     * The sort() method sorts the elements of a collection in place and returns the collection.
     * The sort is not necessarily stable. The default sort order is according to string Unicode code points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * if omitted, the collection is sorted according to each character's Unicode code point value,
     * according to the string conversion of each element.
     * @returns {Collection}
     */
    sort(compareFunction?: ((valA: TValue, valB: TValue, keyA: TKey, keyB: TKey) => number)): Collection;
}
