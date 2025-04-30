# service-cron

> Provides cronjob-inspired interface through a web worker

[![License](https://img.shields.io/github/license/idleberg/atom-service-cron?color=blue&style=for-the-badge)](https://github.com/idleberg/atom-service-cron/blob/master/LICENSE)
[![Release](https://img.shields.io/github/v/release/idleberg/atom-service-cron?style=for-the-badge)](https://github.com/idleberg/atom-service-cron/releases)
[![Downloads](https://img.shields.io/pulsar/dt/service-cron?style=for-the-badge&color=slateblue)](https://web.pulsar-edit.dev/packages/service-cron)
[![CI](https://img.shields.io/github/actions/workflow/status/idleberg/atom-service-cron/default.yml?style=for-the-badge)](https://github.com/idleberg/atom-service-cron/actions)

This package provides a service that let's you schedule Atom commands using a [cron][Cron]-inspired interface. It utilizes a [Web Worker][Web Workers] to keep your main-thread as free as possible.

## Installation

### Package Manager

Install `service-hash` from the editor's [Package Manager](http://flight-manual.atom-editor.cc/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ ppm install service-cron`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.pulsar\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.pulsar\packages
```

**Linux & macOS**

```bash
$ cd ~/.pulsar/packages/
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

Let me know if you have any [feedback][Discussions]!

## License

This work is licensed under the [MIT License](LICENSE)

[Cron]: https://www.wikiwand.com/en/Cron
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Discussions]: https://github.com/idleberg/atom-service-cron/discussions
