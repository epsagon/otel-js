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
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import {
  BatchSpanProcessor,
  SpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import grpc = require('@grpc/grpc-js');
import { _configDefaultOptions, Options } from './options';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { getInstrumentations } from './instrumentations';

export function init(userOptions: Options) {
  const options = _configDefaultOptions(userOptions);

  if (!options) {
    diag.error('FSO default options are not properly configured.');
    return;
  }

  if (options.debug) {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  }

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: options.serviceName,
  });

  const provider = new NodeTracerProvider({ resource });
  provider.addSpanProcessor(
    new BatchSpanProcessor(createDefaultExporter(options))
  );

  provider.register();

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: getInstrumentations(options),
  });
}

function createDefaultExporter(options: Options): SpanExporter {
  const metadata = new grpc.Metadata();
  metadata.set('X-FSO-Token', options.FSOToken);

  const collectorOptions = {
    url: options.FSOEndpoint,
    metadata,
  };

  return new OTLPTraceExporter(collectorOptions);
}