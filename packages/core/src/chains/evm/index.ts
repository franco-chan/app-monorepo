import { CoreChainScopeBase } from '../_base/CoreChainScopeBase';

import type CoreChainEvmHardware from './CoreChainEvmHardware';
import type CoreChainEvmHd from './CoreChainEvmHd';
import type CoreChainEvmImported from './CoreChainEvmImported';

export default class extends CoreChainScopeBase {
  override hd: CoreChainEvmHd = this._createApiProxy('hd') as CoreChainEvmHd;

  protected override _hd = async () =>
    (await import('./CoreChainEvmHd')).default;

  override imported: CoreChainEvmImported = this._createApiProxy(
    'imported',
  ) as CoreChainEvmImported;

  protected override _imported = async () =>
    (await import('./CoreChainEvmImported')).default;

  override hardware: CoreChainEvmHardware = this._createApiProxy(
    'hardware',
  ) as CoreChainEvmHardware;

  protected override _hardware = async () =>
    (await import('./CoreChainEvmHardware')).default;
}
