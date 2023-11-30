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
