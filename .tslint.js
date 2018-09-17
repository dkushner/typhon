module.exports = {
  defaultSeverity: 'error',
  extends: ['tslint:latest', 'tslint-react', 'tslint-config-prettier', 'typestrict'],
  linterOptions: {
    include: [
      './src/**/*.ts'
    ],
    exclude: [
      '**/*.spec.js',
      './node_modules/**/*'
    ]
  },
  jsRules: {
    'no-empty': true
  },
  rules: {
    'no-unused-expression': [true, 'allow-fast-null-checks'],
    'no-shadowed-variable': [true, { temporalDeadZone: false }],
    'member-access': [true, 'no-public'],
    'interface-name': [true, 'never-prefix'],
    'no-implicit-dependencies': [true, 'dev'],
    'array-type': [true, 'array'],
    'no-console': false,
    'use-type-alias': true,
    'no-inferrable-types': true,
    'unified-signatures': true,
    'use-default-type-parameter': true,
    'no-undefined-argument': true,

    /* typestrict overrides */

    // Handled by tsc
    'no-unused-variable': false,

    // Useless with vue
    'no-invalid-this': false,

    'restrict-plus-operands': false,

    // Fails with no-unused-variable for some reason
    'no-useless-cast': false
  },
  rulesDirectory: []
}
