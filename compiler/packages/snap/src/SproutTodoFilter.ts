/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const skipFilter = new Set([
  /**
   * Observable different in logging between Forget and non-Forget
   */
  'early-return-no-declarations-reassignments-dependencies',

  /**
   * Category A:
   * Tests with 0 parameters and 0 refs to external values
   */
  // TODO: fix invalid .set call
  'assignment-variations-complex-lvalue-array',
  // TODO: uses jsx (requires React)
  'sketchy-code-rules-of-hooks',
  // TODO: fix infinite loop
  'ssa-for-trivial-update',
  // TODO: fix infinite loop
  'ssa-while-no-reassign',

  /**
   * Category B:
   * Tests with at least one param and 0 refs to external values
   */
  'bug.useMemo-deps-array-not-cleared',
  'capture_mutate-across-fns',
  'capture-indirect-mutate-alias',
  'capturing-arrow-function-1',
  'capturing-func-mutate-3',
  'capturing-func-mutate-nested',
  'capturing-func-mutate',
  'capturing-function-1',
  'capturing-function-alias-computed-load',
  'capturing-function-decl',
  'capturing-function-skip-computed-path',
  'capturing-function-within-block',
  'capturing-member-expr',
  'capturing-nested-member-call',
  'capturing-nested-member-expr-in-nested-func',
  'capturing-nested-member-expr',
  'capturing-variable-in-nested-block',
  'capturing-variable-in-nested-function',
  'complex-while',
  'component',
  'cond-deps-conditional-member-expr',
  'conditional-break-labeled',
  'propagate-scope-deps-hir-fork/conditional-break-labeled',
  'conditional-set-state-in-render',
  'constant-computed',
  'constant-propagation-phi',
  'debugger-memoized',
  'debugger',
  'declare-reassign-variable-in-closure',
  'delete-computed-property',
  'delete-property',
  'dependencies-outputs',
  'dependencies',
  'destructure-direct-reassignment',
  'destructuring-array-default',
  'destructuring-array-param-default',
  'destructuring-assignment-array-default',
  'destructuring-assignment',
  'destructuring-object-default',
  'destructuring-object-param-default',
  'destructuring',
  'disable-jsx-memoization',
  'do-while-break',
  'do-while-compound-test',
  'dominator',
  'early-return',
  'escape-analysis-destructured-rest-element',
  'escape-analysis-jsx-child',
  'escape-analysis-logical',
  'escape-analysis-non-escaping-interleaved-allocating-dependency',
  'escape-analysis-non-escaping-interleaved-allocating-nested-dependency',
  'escape-analysis-non-escaping-interleaved-primitive-dependency',
  'escape-analysis-not-conditional-test',
  'escape-analysis-not-if-test',
  'escape-analysis-not-switch-case',
  'escape-analysis-not-switch-test',
  'expression-with-assignment-dynamic',
  'extend-scopes-if',
  'fbt/fbt-params',
  'for-empty-update-with-continue',
  'for-empty-update',
  'for-logical',
  'for-return',
  'function-declaration-simple',
  'function-param-assignment-pattern',
  'globals-Boolean',
  'globals-Number',
  'globals-String',
  'holey-array-pattern-dce-2',
  'holey-array-pattern-dce',
  'holey-array',
  'independently-memoize-object-property',
  'inverted-if-else',
  'inverted-if',
  'jsx-empty-expression',
  'jsx-fragment',
  'jsx-namespaced-name',
  'lambda-mutated-non-reactive-to-reactive',
  'lambda-mutated-ref-non-reactive',
  'logical-expression-object',
  'logical-expression',
  'nested-function-shadowed-identifiers',
  'nonoptional-load-from-optional-memberexpr',
  'object-computed-access-assignment',
  'object-expression-string-literal-key',
  'object-literal-spread-element',
  'object-pattern-params',
  'optional-member-expression-chain',
  'overlapping-scopes-interleaved-by-terminal',
  'overlapping-scopes-interleaved',
  'overlapping-scopes-shadowed',
  'overlapping-scopes-shadowing-within-block',
  'overlapping-scopes-while',
  'overlapping-scopes-within-block',
  'prop-capturing-function-1',
  'reactive-scopes-if',
  'reactive-scopes',
  'reactivity-analysis-interleaved-reactivity',
  'reassign-object-in-context',
  'reassignment-separate-scopes',
  'return-conditional',
  'return-undefined',
  'reverse-postorder',
  'same-variable-as-dep-and-redeclare-maybe-frozen',
  'same-variable-as-dep-and-redeclare',
  'simple-scope',
  'ssa-arrayexpression',
  'ssa-for-of',
  'ssa-multiple-phis',
  'ssa-nested-loops-no-reassign',
  'ssa-nested-partial-phi',
  'ssa-nested-partial-reassignment',
  'ssa-non-empty-initializer',
  'ssa-objectexpression',
  'ssa-property-alias-if',
  'ssa-reassign',
  'ssa-renaming-via-destructuring',
  'ssa-renaming',
  'ssa-sibling-phis',
  'switch-with-fallthrough',
  'ternary-assignment-expression',
  'ternary-expression',
  'trivial',
  'type-args-test-binary-operator',
  'type-cast-expression.flow',
  'unary-expr',
  'unconditional-break-label',
  'unused-array-middle-element',
  'unused-array-rest-element',
  'unused-conditional',
  'unused-logical',
  'unused-object-element-with-rest',
  'unused-object-element',
  'useMemo-inlining-block-return',
  'useMemo-inverted-if',
  'useMemo-labeled-statement-unconditional-return',
  'useMemo-logical',
  'useMemo-nested-ifs',
  'useMemo-switch-no-fallthrough',
  'useMemo-switch-return',
  'while-break',
  'while-conditional-continue',
  'while-logical',
  'while-property',
  'validate-no-set-state-in-render-uncalled-function-with-mutable-range-is-valid',
  // Category B with multiple entrypoints,
  'conditional-break',

  /**
   * Category C:
   * Tests with at 0 params and at least one ref to external values
   */
  'alias-capture-in-method-receiver',
  'alias-nested-member-path-mutate',
  'concise-arrow-expr',
  'const-propagation-into-function-expression-global',
  'lambda-mutate-shadowed-object',
  'fbt/lambda-with-fbt',
  'recursive-function-expr',
  'ref-current-aliased-no-added-to-dep',
  'ref-current-field-not-added-to-dep',
  'ref-current-not-added-to-dep',
  'ref-current-optional-field-no-added-to-dep',
  'ref-current-write-not-added-to-dep',
  'rewrite-phis-in-lambda-capture-context',
  'sketchy-code-exhaustive-deps',
  'ssa-property-alias-mutate',
  'ssa-property-mutate-2',
  'ssa-property-mutate-alias',
  'ssa-property-mutate',
  'ssa-reassign-in-rval',
  'store-via-call',
  'store-via-new',
  'tagged-template-literal',
  'transitive-alias-fields',
  'type-binary-operator',
  'type-test-field-load-binary-op',
  'type-test-polymorphic',
  'type-test-return-type-inference',
  'use-callback-simple',
  // defines two functions
  'simple-alias',

  /**
   * Category D:
   * Tests with one or more params, with external references.
   */
  'alias-computed-load',
  'allocating-primitive-as-dep',
  'allow-passing-refs-as-props',
  'array-at-closure',
  'array-at-effect',
  'array-at-mutate-after-capture',
  'array-join',
  'array-push-effect',
  'arrow-function-expr-gating-test',
  'assignment-in-nested-if',
  'await-side-effecting-promise',
  'await',
  'builtin-jsx-tag-lowered-between-mutations',
  'call-args-assignment',
  'call-args-destructuring-assignment',
  'call-spread',
  'call-with-independently-memoizable-arg',
  'capture-param-mutate',
  'capturing-fun-alias-captured-mutate-2',
  'capturing-fun-alias-captured-mutate-arr-2',
  'capturing-func-alias-captured-mutate-arr',
  'capturing-func-alias-captured-mutate',
  'capturing-func-alias-computed-mutate',
  'capturing-func-alias-mutate',
  'capturing-func-alias-receiver-computed-mutate',
  'capturing-func-alias-receiver-mutate',
  'capturing-func-simple-alias',
  'capturing-function-capture-ref-before-rename',
  'capturing-function-conditional-capture-mutate',
  'capturing-function-member-expr-arguments',
  'capturing-function-member-expr-call',
  'capturing-function-renamed-ref',
  'capturing-function-runs-inference',
  'capturing-function-shadow-captured',
  'capturing-reference-changes-type',
  'codegen-emit-imports-same-source',
  'codegen-emit-make-read-only',
  'computed-call-spread',
  'computed-load-primitive-as-dependency',
  'computed-store-alias',
  'constant-propagation-into-function-expressions',
  'destructuring-mixed-scope-declarations-and-locals',
  'destructuring-property-inference',
  'do-while-conditional-break',
  'do-while-early-unconditional-break',
  'fbt/fbt-params-complex-param-value',
  'function-expression-captures-value-later-frozen-jsx',
  'function-expression-maybe-mutates-hook-return-value',
  'function-expression-with-store-to-parameter',
  'global-jsx-tag-lowered-between-mutations',
  'hook-inside-logical-expression',
  'immutable-hooks',
  'inadvertent-mutability-readonly-class',
  'inadvertent-mutability-readonly-lambda',
  'infer-computed-delete',
  'infer-property-delete',
  'inner-memo-value-not-promoted-to-outer-scope-dynamic',
  'inner-memo-value-not-promoted-to-outer-scope-static',
  'issue852',
  'jsx-member-expression-tag-grouping',
  'jsx-member-expression',
  'jsx-spread',
  'lambda-capture-returned-alias',
  'method-call-computed',
  'method-call-fn-call',
  'nested-optional-member-expr',
  'nested-scopes-hook-call',
  'new-spread',
  'obj-literal-cached-in-if-else',
  'obj-literal-mutated-after-if-else',
  'obj-mutated-after-if-else-with-alias',
  'obj-mutated-after-if-else',
  'obj-mutated-after-nested-if-else-with-alias',
  'object-properties',
  'optional-call-chained',
  'optional-call-logical',
  'optional-call-simple',
  'optional-call-with-independently-memoizable-arg',
  'optional-call-with-optional-property-load',
  'optional-call',
  'optional-computed-load-static',
  'optional-computed-member-expression',
  'optional-member-expression-call-as-property',
  'optional-member-expression-with-optional-member-expr-as-property',
  'optional-member-expression',
  'optional-method-call',
  'optional-receiver-method-call',
  'optional-receiver-optional-method',
  'primitive-alias-mutate',
  'primitive-as-dep',
  'property-assignment',
  'property-call-spread',
  'reactive-dependencies-non-optional-properties-inside-optional-chain',
  'reactivity-analysis-reactive-via-mutation-of-computed-load',
  'reactivity-analysis-reactive-via-mutation-of-property-load',
  'reassigned-phi-in-returned-function-expression',
  'reassignment-conditional',
  'reassignment',
  'ref-current-aliased-not-added-to-dep-2',
  'ref-current-not-added-to-dep-2',
  'ref-in-effect',
  'regexp-literal',
  'remove-memoization-kitchen-sink',
  'repro-reassign-to-variable-without-mutable-range',
  'repro-scope-missing-mutable-range',
  'repro',
  'simple',
  'ssa-property-alias-alias-mutate-if',
  'ssa-property-alias-mutate-if',
  'ssa-property-alias-mutate-inside-if',
  'switch-global-propertyload-case-test',
  'switch-non-final-default',
  'switch',
  'tagged-template-in-hook',
  'temporary-accessed-outside-scope',
  'temporary-at-start-of-value-block',
  'temporary-property-load-accessed-outside-scope',
  'timers',
  'todo-function-expression-captures-value-later-frozen',
  'uninitialized-declaration-in-reactive-scope',
  'unknown-hooks-do-not-assert',
  'unused-logical-assigned-to-variable',
  'unused-optional-method-assigned-to-variable',
  'unused-ternary-assigned-to-variable',
  'useEffect-arg-memoized',
  'useEffect-nested-lambdas',
  'useMemo-if-else-multiple-return',
  'useMemo-independently-memoizeable',
  'useMemo-named-function',
  'useMemo-return-empty',
  'useMemo-simple',
  'use-no-forget-module-level',
  'use-no-memo-module-level',
  // defines multiple functions
  'alias-while',
  'babel-existing-react-import',
  'babel-existing-react-kitchensink-import',
  'call',
  'codegen-instrument-forget-gating-test',
  'codegen-instrument-forget-test',
  'conditional-on-mutable',
  'constructor',
  'frozen-after-alias',
  'gating-test-export-default-function',
  'gating-test-export-function-and-default',
  'gating-test-export-function',
  'gating-test',
  'gating-with-hoisted-type-reference.flow',
  'hook-call',
  'hooks-freeze-arguments',
  'hooks-freeze-possibly-mutable-arguments',
  'independent-across-if',
  'independent',
  'interdependent-across-if',
  'interdependent',
  'multi-arrow-expr-export-gating-test',
  'multi-arrow-expr-gating-test',
  'mutable-liverange-loop',
  'sequence-expression',
  'ssa-call-jsx-2',
  'ssa-call-jsx',
  'ssa-newexpression',
  'ssa-shadowing',
  'template-literal',
  'multi-arrow-expr-export-default-gating-test',

  // works, but appears differently when printing
  // due to optional function argument
  'nested-function-with-param-as-captured-dep',
  'deeply-nested-function-expressions-with-params',

  // TODO: we should be able to support these
  'readonly-object-method-calls',
  'readonly-object-method-calls-mutable-lambda',
  'preserve-memo-validation/useMemo-with-refs.flow',

  // TODO: we probably want to always skip these
  'rules-of-hooks/rules-of-hooks-0592bd574811',
  'rules-of-hooks/rules-of-hooks-0e2214abc294',
  'rules-of-hooks/rules-of-hooks-1ff6c3fbbc94',
  'rules-of-hooks/rules-of-hooks-23dc7fffde57',
  'rules-of-hooks/rules-of-hooks-2bec02ac982b',
  'rules-of-hooks/rules-of-hooks-2e405c78cb80',
  'rules-of-hooks/rules-of-hooks-33a6e23edac1',
  'rules-of-hooks/rules-of-hooks-347b0dae66f1',
  'rules-of-hooks/rules-of-hooks-485bf041f55f',
  'rules-of-hooks/rules-of-hooks-4f6c78a14bf7',
  'rules-of-hooks/rules-of-hooks-7e52f5eec669',
  'rules-of-hooks/rules-of-hooks-844a496db20b',
  'rules-of-hooks/rules-of-hooks-8f1c2c3f71c9',
  'rules-of-hooks/rules-of-hooks-9a47e97b5d13',
  'rules-of-hooks/rules-of-hooks-9d7879272ff6',
  'rules-of-hooks/rules-of-hooks-c1e8c7f4c191',
  'rules-of-hooks/rules-of-hooks-c5d1f3143c4c',
  'rules-of-hooks/rules-of-hooks-cfdfe5572fc7',
  'rules-of-hooks/rules-of-hooks-df4d750736f3',
  'rules-of-hooks/rules-of-hooks-dfde14171fcd',
  'rules-of-hooks/rules-of-hooks-e5dd6caf4084',
  'rules-of-hooks/rules-of-hooks-e66a744cffbe',
  'rules-of-hooks/rules-of-hooks-eacfcaa6ef89',
  'rules-of-hooks/rules-of-hooks-fe6042f7628b',
  'infer-function-assignment',
  'infer-functions-component-with-jsx',
  'infer-function-forwardRef',
  'infer-function-React-memo',
  'infer-functions-component-with-hook-call',
  'infer-functions-component-with-jsx',
  'infer-functions-hook-with-hook-call',
  'infer-functions-hook-with-jsx',
  'infer-function-expression-component',
  'infer-function-expression-React-memo-gating',
  'infer-skip-components-without-hooks-or-jsx',
  'class-component-with-render-helper',
  'fbt/fbtparam-with-jsx-element-content',
  'fbt/fbtparam-text-must-use-expression-container',
  'fbt/fbtparam-with-jsx-fragment-value',
  'todo.useContext-mutate-context-in-callback',
  'loop-unused-let',
  'reanimated-no-memo-arg',

  'userspace-use-memo-cache',
  'transitive-freeze-function-expressions',

  // nothing to compile/run
  'repro-no-gating-import-without-compiled-functions',

  // TODOs
  'rules-of-hooks/todo.bail.rules-of-hooks-279ac76f53af',
  'rules-of-hooks/todo.bail.rules-of-hooks-28a78701970c',
  'rules-of-hooks/todo.bail.rules-of-hooks-3d692676194b',
  'rules-of-hooks/todo.bail.rules-of-hooks-6949b255e7eb',
  'rules-of-hooks/todo.bail.rules-of-hooks-8503ca76d6f8',
  'rules-of-hooks/todo.bail.rules-of-hooks-e0a5db3ae21e',
  'rules-of-hooks/todo.bail.rules-of-hooks-e9f9bac89f8f',
  'rules-of-hooks/todo.bail.rules-of-hooks-fadd52c1e460',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-0a1dbff27ba0',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-0de1224ce64b',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-191029ac48c8',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-206e2811c87c',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-28a7111f56a7',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-2c51251df67a',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-449a37146a83',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-5a7ac9a6e8fa',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-76a74b4666e9',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-8303403b8e4c',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-99b5c750d1d1',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-9c79feec4b9b',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-a63fd4f9dcc0',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-acb56658fe7e',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-c59788ef5676',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-d842d36db450',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-d952b82c2597',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-ddeca9708b63',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-e675f0a672d8',
  'rules-of-hooks/todo.invalid.invalid-rules-of-hooks-e69ffce323c3',
  'todo.unnecessary-lambda-memoization',
  'rules-of-hooks/rules-of-hooks-93dc5d5e538a',
  'rules-of-hooks/rules-of-hooks-69521d94fa03',

  // bugs
  'fbt/bug-fbt-plural-multiple-function-calls',
  'fbt/bug-fbt-plural-multiple-mixed-call-tag',
  'bug-invalid-hoisting-functionexpr',
  'bug-invalid-phi-as-dependency',
  'reduce-reactive-deps/bug-merge-uncond-optional-chain-and-cond',
  'original-reactive-scopes-fork/bug-nonmutating-capture-in-unsplittable-memo-block',
  'original-reactive-scopes-fork/bug-hoisted-declaration-with-scope',
  'bug-codegen-inline-iife',

  // 'react-compiler-runtime' not yet supported
  'flag-enable-emit-hook-guards',
  'fast-refresh-refresh-on-const-changes-dev',
  'useState-pruned-dependency-change-detect',
  'useState-unpruned-dependency',
  'useState-and-other-hook-unpruned-dependency',
  'change-detect-reassign',

  // Depends on external functions
  'idx-method-no-outlining-wildcard',
  'idx-method-no-outlining',

  // needs to be executed as a module
  'meta-property',

  // needs context lowering support in React
  'todo.lower-context-access-property-load',
  'todo.lower-context-access-nested-destructuring',
  'todo.lower-context-access-mixed-array-obj',
  'todo.lower-context-access-destructure-multiple',
  'todo.lower-context-access-array-destructuring',
  'lower-context-selector-simple',
  'lower-context-acess-multiple',
]);

export default skipFilter;
