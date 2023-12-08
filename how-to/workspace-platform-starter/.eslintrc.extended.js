module.exports = {
	overrides: [
		{
			files: ['client/**/*.ts'],
			rules: {
				'no-restricted-syntax': [
					'error',
					{
						selector: "BinaryExpression[operator='==='][right.type='Identifier'][right.name='undefined']",
						message: 'Instead of using "=== undefined", please use the utils method isEmpty'
					},
					{
						selector: "BinaryExpression[operator='!=='][right.type='Identifier'][right.name='undefined']",
						message: 'Instead of using "!== undefined", please use the utils method !isEmpty'
					},
					{
						selector: "BinaryExpression[operator='==='][right.type='Identifier'][right.name='null']",
						message: 'Instead of using "=== null", please use the utils method isEmpty'
					},
					{
						selector: "BinaryExpression[operator='!=='][right.type='Identifier'][right.name='null']",
						message: 'Instead of using "!== null", please use the utils method !isEmpty'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='object']",
						message: 'Instead of using "=== object", please use the utils method isObject'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='object']",
						message: 'Instead of using "!== object", please use the utils method !isObject'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='string']",
						message: 'Instead of using "=== string", please use the utils method isString'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='string']",
						message: 'Instead of using "!== string", please use the utils method !isString'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='number']",
						message: 'Instead of using "=== number", please use the utils method isNumber'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='number']",
						message: 'Instead of using "!== number", please use the utils method !isNumber'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='boolean']",
						message: 'Instead of using "=== boolean", please use the utils method isBoolean'
					},
					{
						selector:
							"BinaryExpression[operator='==='][left.type='UnaryExpression'][left.operator='typeof'][right.type='Literal'][right.value='boolean']",
						message: 'Instead of using "!== boolean", please use the utils method !isBoolean'
					}
				]
			}
		},
		{
			files: ['test/**/*.ts'],
			rules: {
				'unicorn/no-useless-undefined': ['off']
			}
		}
	]
};
