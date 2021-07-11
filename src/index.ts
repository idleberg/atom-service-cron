import { CompositeDisposable } from 'atom';
import Cron from './cron';
import Logger from "./log";

export default {
  subscriptions: new CompositeDisposable(),

  activate(): void {
    Logger.log('Activating package');
  },

  deactivate(): void {
    Logger.log('Deactivating package');
    this.subscriptions?.dispose();
  },

  provideCron(): unknown {
    Logger.log('Providing service');

    return Cron;
  }
};
