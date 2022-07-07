/*
 * Copyright The Cisco Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { ciscoTracing } from '..';

const userOptions = {
  serviceName: 'my-http-client',
  ciscoToken: 'eps_dXHR9PlWuKtHEQe0-38YlUtjKIK3new4aEa0SShiYt8',
  payloadsEnabled: true,
  debug: true,
  maxPayloadSize: 1000
//   exporters: [
//     {
//       collectorEndpoint: 'https://opentelemetry.tc.epsagon.com/traces',
//       type: 'otlp-http',
//       customHeaders: {
//         'x-epsagon-token': '3f9032c7-18f7-4951-be8c-f1738f504afc',
//       },
//     },
//   ],
};
// ciscoTracing.init(userOptions);

import { getCiscoNodeAutoInstrumentations } from '../instrumentations';
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base';
const { SimpleSpanProcessor } = require( "@opentelemetry/sdk-trace-base");
const { registerInstrumentations } = require( '@opentelemetry/instrumentation');
const { OTLPTraceExporter } = require( '@opentelemetry/exporter-trace-otlp-http');
const api = require('@opentelemetry/api');
api.diag.setLogger(new api.DiagConsoleLogger(), api.DiagLogLevel.ALL);

const provider = new BasicTracerProvider();
const instrumentations = getCiscoNodeAutoInstrumentations({}, userOptions);
const collectorOptions = {
  url: 'https://production.cisco-udp.com/trace-collector',
  headers: {
    authorization: 'Bearer eps_dXHR9PlWuKtHEQe0-38YlUtjKIK3new4aEa0SShiYt8',
  },
};

provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter(collectorOptions)));

registerInstrumentations({
  instrumentations: instrumentations
});
provider.register();

import * as utils from '../../test/utils';

async function asyncCall() {
  // const express = require('express');
  const PORT = process.env.PORT || '8081';
  // const app = express();

  const POST_REQUEST_DATA = JSON.stringify({ test: 'request body' });

  let response = await utils.httpRequest.post(
    {
      host: 'localhost',
      port: PORT,
      path: '/test_post_end',
      headers: {'content-type': 'application/json'}
    },
    POST_REQUEST_DATA
  );
  console.log(response);
}

asyncCall();