module.exports = [
	{
		text: 'Guide',
		link: '/guide/',
	},
	{
		text: 'Tools and libraries',
		ariaLabel: 'Tools',
		items: [
			{
				text: 'SDK',
				items: [
					{
						text: 'PHP',
						link: '/guide/tools-and-libraries/sdk-php.html'
					},
					{
						text: '.NET',
						link: '/guide/tools-and-libraries/sdk-dotnet.html'
					}
				]
			},
			{
				text: 'Postman',
				items: [
					{
						text: 'Postman Collection',
						link: '/guide/tools-and-libraries/postman-collection.html'
					},
				]
			},
			{
				text: 'Resources',
				items: [
					{
						text: 'Changelog',
						link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
					}
				]
			}
		]
	},
	{
		text: 'Api Docs',
		link: 'http://docplanner.github.io/integrations-api-docs/openapi/'
	},
]
