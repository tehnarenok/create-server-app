const scripts = 
	`"start:nodemon": "node ./node_modules/nodemon/bin/nodemon.js --legacy-watch",
	"start:dev": "ts-node ./src/index.ts",
	"start": "node ./dist/src/index.js",
	"build": "npx tsc"`

export default scripts