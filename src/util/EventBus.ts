import { TCallBack } from 'Config/types';

type TSubscriptions = Record<string, TCallBack[]>;

const BUS_EMIT_LOG = true;

/**
 * Event bus implementation
 */
export class EventBus {
  private static instance: EventBus;

  private subscriptions: TSubscriptions = {};

  /**
   * @param {boolean} singletone
   * @return {EventBus}
   */
  constructor(singletone = false) {
    if (singletone && EventBus.instance) {
      return EventBus.instance;
    }

    if (singletone) {
      EventBus.instance = this;
    }
  }

  /**
   * event subscription
   * @param {string} event
   * @param {TCallBack} callback
   */
  on(event: string, callback: TCallBack): void {
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = [];
    }
    this.subscriptions[event].push(callback);
  }

  /**
   * event emmiting
   * @param {string} event
   * @param {any[]} args
   */
  emit(event: string, ...args: unknown[]): void {
    if (BUS_EMIT_LOG) {
      // eslint-disable-next-line no-console
      console.log(`Emit event ${event}`, { ...args });
    }
    if (!this.subscriptions[event]) {
      return;
    }

    this.subscriptions[event].forEach((fn: TCallBack) => fn(...args, event));
  }

  /**
   * remove Event subscribe
   * @param {string} event
   * @param {TCallBack} callback
   * @return {boolean}
   */
  off(event: string, callback: TCallBack): boolean {
    if (!this.subscriptions[event]) {
      return false;
    }
    const { length } = this.subscriptions[event];
    this.subscriptions[event] = this.subscriptions[event].filter((c: TCallBack) => c !== callback);
    return length !== this.subscriptions[event].length;
  }
}

export const globalBus = new EventBus(true);
