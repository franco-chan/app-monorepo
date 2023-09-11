import { isString } from 'lodash';

import { ensureSerializable } from '@onekeyhq/shared/src/utils/assertUtils';
import { isPromiseObject } from '@onekeyhq/shared/src/utils/promiseUtils';

import type { CoreChainApiBase } from './CoreChainApiBase';

export abstract class CoreChainScopeBase {
  abstract hd: CoreChainApiBase;

  protected abstract _hd: () => Promise<typeof CoreChainApiBase>;

  abstract imported: CoreChainApiBase;

  protected abstract _imported: () => Promise<typeof CoreChainApiBase>;

  abstract hardware: CoreChainApiBase;

  protected abstract _hardware: () => Promise<typeof CoreChainApiBase>;

  private apiProxyCache: {
    [apiName: string]: any;
  } = {};

  protected _createApiProxy(apiName: string) {
    if (this.apiProxyCache[apiName] !== undefined) {
      throw new Error(
        `CoreChainScopeBase _createapiProxy ERROR, apiName already defined: ${apiName}`,
      );
    }
    this.apiProxyCache[apiName] = null;
    const NOOP = new Proxy(
      {},
      {
        get:
          (target, prop) =>
          async (...args: any[]) => {
            // console.log(target, prop, args, others, this.scopeName, name);
            const method = prop;
            if (!isString(method)) {
              throw new Error('FlowLogger api method must be string');
            }
            let apiInstance = this.apiProxyCache[apiName];
            if (!apiInstance) {
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              const apiClass = await this[`_${apiName}`]();
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, new-cap
              apiInstance = new apiClass();
            }
            this.apiProxyCache[apiName] = apiInstance;
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            let result = apiInstance[method](...args);
            if (isPromiseObject(result)) {
              result = await result;
            }
            if (process.env.NODE_ENV !== 'production') {
              // TODO ensureSerializable
              // ensureSerializable(result);
            }
            return result as unknown;
          },
      },
    );
    return NOOP;
  }
}
