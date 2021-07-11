import cron from 'node-cron';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

onmessage = e => {
  const { commands, interval, view } = e.data;

  const task = cron.schedule(interval, () => ctx.postMessage({commands, view}), {
    scheduled: true
  });

  task.start();
}

