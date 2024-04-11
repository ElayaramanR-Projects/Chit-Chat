module.exports = {
	devServer: {
		port: 7803, // Change this to your desired port number
	},
	webpack: {
		configure: {
			entry: './src/index.tsx',
		},
	},
};
