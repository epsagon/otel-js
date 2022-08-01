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

import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { configureGrpahQLnstrumentation } from '../../src/instrumentations/extentions/graphql';
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';

const instrumentation = new GraphQLInstrumentation();
instrumentation.enable();
import * as utils from '../utils';
import * as assert from 'assert';
import { assertExpectedObj, testOptions } from '../utils';
import { SemanticAttributes } from 'cisco-opentelemetry-specifications';
import { setInnerOptions } from '../../src/inner-options';
const memoryExporter = new InMemorySpanExporter();
const provider = new BasicTracerProvider();
instrumentation.setTracerProvider(provider);
const tracer = provider.getTracer('test-https');
provider.addSpanProcessor(new SimpleSpanProcessor(memoryExporter));

describe('Capturing HTTP Headers/Bodies', () => {
});
