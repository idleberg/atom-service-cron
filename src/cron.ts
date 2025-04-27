import { resolve as pathResolve } from 'path';
import { v4 as UUIDv4 } from 'uuid';
import Logger from "./log";

const worker = new Worker(pathResolve(__dirname, 'cron.worker.js'));

/**
 *
 * @param responseType
 * @param {Object} options
 * @returns {*}
 */
function cron(userOptions: CronOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const senderID = UUIDv4();
    const options: CronOptions = {
      view: 'atom-workspace',
      ...userOptions
    };

    Logger.log('Registering cronjob', options);
    worker.postMessage({...options, senderID});

    worker.onmessage = async (e: MessageEvent) => {
      if (senderID !== e.data.recipientID) return;

      const { commands, view } = e.data;
      let target;

      switch (view) {
        case 'atom-workspace':
          target = atom.views.getView(atom.workspace);
          break;

        case 'atom-text-editor':
          target = atom.views.getView(atom.workspace.getActiveTextEditor());
          break;

        default:
          throw Error(`Cannot dispatch commands to unsupported view ${view}`);
      }

      const dispatchCommands = Array.isArray(commands) ? commands : [commands];

      try {
        dispatchCommands.map(command => {
          Logger.log(`Dispatching command`, { command, view });
          atom.commands.dispatch(target, command);
        });
      } catch (error) {
        reject(error);
      }

      resolve(true);
    };
  });
}

export default cron;
