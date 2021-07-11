# service-cron

> Provides cronjob-inspired interface through a web worker

[![apm](https://flat.badgen.net/apm/license/service-cron)](https://atom.io/packages/service-cron)
[![apm](https://flat.badgen.net/apm/v/service-cron)](https://atom.io/packages/service-cron)
[![apm](https://flat.badgen.net/apm/dl/service-cron)](https://atom.io/packages/service-cron)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-service-cron)](https://circleci.com/gh/idleberg/atom-service-cron)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-service-cron)](https://david-dm.org/idleberg/atom-service-cron)

This package provides a service that let's you schedule Atom commands using a [cron][Cron]-inspired interface. It utilizes a [Web Worker][Web Workers] to keep your main-thread as free as possible.

## Installation

### apm

Install `service-cron` from Atom [install view](atom://settings-view/show-package?package=service-cron) or use the command-line equivalent:

`$ apm install service-cron`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `service-cron`:

```bash
$ git clone https://github.com/idleberg/atom-service-cron service-cron
```

Install dependencies:

```bash
$ cd service-cron && npm install
```

Build source:

```bash
$ npm run build
```

## Usage

To consume the service in your package, add the following to your `package.json`:

```json
"consumedServices": {
  "service-cron": {
    "versions": {
      "0.1.0": "consumeCron"
    }
  },
  "package-deps": [
    {
      "name": "service-cron"
    }
  ]
}
```

Install `atom-package-deps` to handle the package dependency:

`npm install atom-package-deps`

Next up, let's create a package:

```js
import { CompositeDisposable, Disposable } from 'atom';

export default {
  // Consume the service
  consumeCron(cronService) {
    this.cron = cronService;

    return new Disposable(() => {
      this.cron = null;
    });
  },

  // Optional: Add a demo command
  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        "my-package:demo-command": async () =>
          await this.demoCommand(),
      })
    );
  },

  async demoCommand() {
    // Displays the about dialog at noon
    await this.cron('0 12 * * *', {
      commands: ['application:about']
    });
  }
};
```

Again, this is an experiment. I'm not sure where this is going, but I'm looking forward to your [feedback][Discussions]!

## License

This work is licensed under the [MIT License](LICENSE)

[Cron]: https://www.wikiwand.com/en/Cron
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Discussions]: https://github.com/idleberg/atom-service-cron/discussions
