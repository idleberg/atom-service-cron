import { resolve as pathResolve } from 'path';
import Logger from "./log";

const worker = new Worker(pathResolve(__dirname, 'cron.worker.js'));

/**
 *
 * @param responseType
 * @param {Object} options
 * @returns {*}
 */
function cron(userOptions: cronOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const options: cronOptions = {
      view: 'atom-workspace',
      ...userOptions
    };

    Logger.log('Registering cronjob', options);
    worker.postMessage(options);

    worker.onmessage = async (e: MessageEvent) => {
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
