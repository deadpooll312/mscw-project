// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin

module.exports = {
	parser: '@typescript-eslint/parser',
	root: true,
	plugins: [
		'eslint-plugin',
    '@typescript-eslint',
    'import',
		'eslint-comments',
		'react',
	],
	parserOptions: {
		'ecmaVersion': 6,
		'sourceType': 'module',
		'ecmaFeatures': {
			'tsx': true
		},
		'project': './tsconfig.json',
	},
	"settings": {
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
	env: {
		'browser': true,
		'node': true
	},
	rules: {
    "semi": "off",
    "@typescript-eslint/semi": ["error", 'always'],
    "@typescript-eslint/await-thenable": ['error'],
    "@typescript-eslint/member-delimiter-style": ['error'],

    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
  }],

    'no-extra-semi': 'error',																							// только одна точка с запятой
		'curly': 'error',																											// всегда оборачиваем в фигурные скобки
		'eqeqeq': 'warn',																											// только строгое сравнение | @todo - error
    'indent': ['error', 2, { 'SwitchCase': 1 }],													// таб - 2 пробела, в switch case отделяется 1 табом (2 пробела)

    '@typescript-eslint/no-dynamic-delete': ['error'],
    '@typescript-eslint/no-for-in-array': ['error'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': "error",
    '@typescript-eslint/no-non-null-assertion': "error",
    '@typescript-eslint/prefer-optional-chain': "error",

    '@typescript-eslint/no-this-alias': "error",
    '@typescript-eslint/no-throw-literal': "error",
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': "error",
    '@typescript-eslint/prefer-as-const': "error",
    '@typescript-eslint/prefer-includes': "error",

		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],	// предпочитаемый формат описание definitions - type
    '@typescript-eslint/explicit-function-return-type': 'off',						// обязательное указание возвращаемого типа
    '@typescript-eslint/no-explicit-any': 'off',													// запрещает использовать any
    '@typescript-eslint/no-non-null-assertion': 'error',									// запрещает обращаться к свойству, если укзаано, что оно null, через !.
    '@typescript-eslint/no-use-before-define': 'off',											// сначала функция должна быть опеределена, потом вызвана
    '@typescript-eslint/no-var-requires': 'off',													// не использовать requires для импорта

    '@typescript-eslint/require-array-sort-compare': ['error'],

		'@typescript-eslint/array-type': ['error', { default: 'array' }],	  	// Использовать obj[] вместо Array<obj>
		'@typescript-eslint/camelcase': [																			// camelCase warn
			'error',
			{ 'properties': 'never', 'ignoreDestructuring': true },
		],
		'@typescript-eslint/func-call-spacing': ['error'],										// запрещает пробел между именем функции и вызовом
		'@generic-type-naming/generic-type-naming': ['off'],									// T перед именем дженерика
		'@generic-type-naming/interface-name-prefix': ['off'],							  // I перед именем интерфейса
		'@typescript-eslint/no-empty-function': ['error'],										// нет пустым функциям
		'@typescript-eslint/no-extra-parens': ['off'],												// можно оборачивать в ()

		/* запрещает оставлять неиспользуемые переменные */
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				'vars': 'all',
				'args': 'none',
				'ignoreRestSiblings': true,
			},
    ],

    "quotes": "off",
    "@typescript-eslint/quotes": ['error', 'single', { 'allowTemplateLiterals': true } ],

    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/return-await": "error",

		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error' ,
		/* end */

		'@typescript-eslint/type-annotation-spacing': ['error'],								// пробелы в нужных местах (определение функции, типа и всего такого)

		'@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],

		"comma-spacing": "off",
		"@typescript-eslint/comma-spacing": ["error"],

		"brace-style": "off",
		"@typescript-eslint/brace-style": ["error"],

		"func-call-spacing": "off",
		"@typescript-eslint/func-call-spacing": ["error"],

		"no-extra-semi": "off",
		"@typescript-eslint/no-extra-semi": ["error"],

		"no-unused-expressions": "off",
		"@typescript-eslint/no-unused-expressions": ["error"],

		"no-magic-numbers": "off",
		"@typescript-eslint/no-magic-numbers": ["warn", { "ignoreNumericLiteralTypes": true }],

		'no-multiple-empty-lines': [																						// количество пустых строк (только 1 и 1 в конце файла)
      'error',
      { 'max': 1, 'maxEOF': 1 }
		],
		'linebreak-style': 0,
		'object-property-newline': [																						// деструктуризация в строки
      1,
      { 'allowAllPropertiesOnSameLine': true }
		],
		'operator-linebreak': ['error', 'before'],															// правильный перенос строк в операции
		'arrow-parens': [ 																											// аргументы анонимной всегда в скобки
			'off',
		],
    'no-console': [                                                         // не забываем удалять лишние логи
      'error',
      { allow: ['warn', 'info', 'error'] },
    ],

		'no-tabs': 'off',
    'no-continue': 'error',
		'no-mixed-spaces-and-tabs': 'error',

		'quote-props': [ 																												// одинаковый формат имён у свойств объекта
      'error',
      'consistent-as-needed',
		],
		'max-len': [																														// @todo максимальная длина строки - 80 символов
			'warn',
			{
				"code": 190,
				"ignoreComments": true,
				"ignoreUrls": true,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true,

			}
		],
		'no-param-reassign': [ 																									// скажем нет мутации
      'error',
      { 'props': false },
		],
		'no-plusplus': [ 																												// против a++, за a += 1
      'error',
      { 'allowForLoopAfterthoughts': true },
		],
		"react/jsx-no-bind": ['warn'],																					// @todo
		'no-debugger': 'error',																									// нет дебаггерам

		'no-import-assign': 'error',
	},
	"overrides": [
		{
			"files": ["static/*"], // Or *.test.js
			"rules": {
				"require-jsdoc": "off"
			}
		}
	],
};
