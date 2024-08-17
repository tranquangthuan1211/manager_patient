// mergeDataWorkerWrapper.ts
export default class MergeDataWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL("./merge-data.ts", import.meta.url), {
      type: "module",
    });
  }

  async mergeData<T>(
    data: T,
    updateData: T,
    options?: { pks?: (keyof T)[]; sortCompareKey?: keyof T }
  ): Promise<T> {
    const result = await new Promise<T>((resolve, reject) => {
      this.worker.onmessage = (event) => {
        resolve(event.data);
      };

      this.worker.onerror = (error) => {
        reject(error);
      };

      this.worker.postMessage({ data, updateData, options });
    });
    this.terminate();
    return result;
  }

  terminate() {
    this.worker.terminate();
  }
}
