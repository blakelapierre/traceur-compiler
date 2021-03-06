// Copyright 2015 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* @fileoverview Configure mocha and run the test list */

import {testRunner} from './testRunner.js';
var glob = require('glob');

var patterns = [
    'test/unit/util/*.js',
    'test/unit/system/*.js',
    'test/unit/node/*.js',
    'test/unit/syntax/*.js',
    'test/unit/codegeneration/*.js',
    'test/unit/tools/*.js',
    'test/unit/semantics/*.js',
    'test/unit/runtime/*.js',
    'test/unit/*.js'
  ];

patterns.forEach((pattern) => {
  var files = glob.sync(pattern, {});
  files.forEach((file) => testRunner.addFile(file));
});

testRunner.run().then((runner) => {
  var failed = 0; 
  runner.on('fail', (err) => {
    failed++;
  });
  runner.on('end', () => {
    process.exit(failed);
  });
});
