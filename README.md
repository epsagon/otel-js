# otel-js
[![NPM Published Version][npm-img]][npm-url]
[![Apache License][license-image]][license-image]

An Aplha version

This package provides a Cisco Launcher for OpenTelemetry Node.js

## Installation

To install Cisco launcher for OpenTelemtry simply run:

```sh
npm install cisco-opentelemetry-node
```

## Usage

### javascript

```javascript
const { fso } = require('cisco-opentelemetry-node');

const userOptions = {
  FSOEndpoint: 'http://localhost:4317',
  serviceName: 'my-app-name',
  FSOToken: 'fso-token',
}

fso.init(userOptions);
```

### typescript

```javascript
import { fso, Options } from 'cisco-opentelemetry-node';

const userOptions: Options = {
  FSOEndpoint: 'http://localhost:4317',
  serviceName: 'my-app-name',
  FSOToken: 'sometoken',
};
fso.init(userOptions);
```

## Configuration

Advanced options can be configured as a parameter to the init() method:

|Parameter          |Env          |Type   |Default                  |Description          |
|-------------------|-------------|-------|-------------------------|---------------------|
|FSOToken           |FSO_TOKEN    |string | -                       | Cisco account token                                |
|FSOEndpoint        |FSO_ENDPOINT |string | `http://localhost:4713` | The address of the trace collector to send traces to |
|serviceName        |SERVICE_NAME |string | `application`           | Application name that will be set for traces         |
|debug              |FSO_DEBUG    |string | `false`                 | Debug logs                                |

To test the launcher:

1. verify you have docker installed and use the config.yaml in this repository to run the collector:
      Note: you should supply full path in -v argument:

      ```javascript
      docker run --rm -p 13133:13133 -p 14250:14250 -p 14268:14268 \
            -p 55678-55679:55678-55679 -p 4317:4317 -p 8888:8888 -p 9411:9411 \
                  -v "${HOME}/YOUR_PATH/otel-js/test/config.yaml":/otel-local-config.yaml \
            --name otelcol otel/opentelemetry-collector \
            --config otel-local-config.yaml;
      ```

2. Build from the root:

      ```sh
      npm run build
      ```

3. Run from the root:

      ```sh
      node lib/test/app.js
      ```

4. Go to <http://localhost:8081/> and verify you see "Hello World"
5. Check the collector, you should see a trace there.

[npm-url]: https://www.npmjs.com/package/cisco-opentelemetry-node
[npm-img]: https://badge.fury.io/js/cisco-opentelemetry-node.svg
[license-url]: https://github.com/https://github.com/epsagon/otel-js/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat