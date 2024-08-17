type WithId<T> = T & { id: number | string };
function getPk<T>(data: WithId<T>, keys: (keyof WithId<T>)[]) {
  return keys.map((key) => data[key]).join("~");
}

// mergeDataWorker.ts
export function mergeData<T>(
  data: T | T[],
  updateData: T | T[],
  options?: { pks?: (keyof T)[]; sortCompareKey?: keyof T }
): T {
  if (!Array.isArray(data)) {
    return { ...data, ...updateData };
  }
  if (!Array.isArray(updateData)) {
    throw new Error("Merge data failed: `updateData` is not an array");
  }
  const indexes: { [name: number | string]: number } = {};
  const pk = options?.pks || ["id"];
  (data as WithId<T>[]).forEach((d, index) => {
    indexes[getPk(d, pk)] = index;
  });
  const result = [...(data as any[])];
  (updateData as any[]).forEach((d) => {
    if (indexes[getPk(d, pk)] != undefined) {
      result[indexes[getPk(d, pk)]] = d;
    } else {
      result.push(d);
    }
  });
  return (
    options?.sortCompareKey
      ? result.sort(
          (a, b) => b[options.sortCompareKey] - a[options.sortCompareKey]
        )
      : result
  ) as T;
}

addEventListener("message", (event) => {
  const { data, updateData, options } = event.data;
  const result = mergeData(data, updateData, options);
  postMessage(result);
});
