module.exports = {
	//address and port to which server will bind, host can also be a hostname
	"host": "127.0.0.1",
	"port": 7777,

    // Trust private IP ranges (internal load balancers, etc.)
    // See https://expressjs.com/en/4x/api.html#trust.proxy.options.table
    "trustProxy": false,

    // Which header to use to extract real client IP.
    // Uncomment if `trustProxy` is NOT set `false`
    // "cf-connecting-ip" for Cloudflare
    // "x-real-ip" for nginx
    // "x-forwarded-for" for most other proxies
    // "proxyHeader": "cf-connecting-ip",

	//length of random characters in link that's generated on document save
	"keyLength": 10,
	//max allowed paste length - 0 for unlimited
	"maxLength": 400000,

	//algorithm used to generate random characters
	//see docs/generators.md for more information
	"keyGenerator": {
		"type": "phonetic"
	},

	//max age for static website assets
	"staticMaxAge": 60 * 60 * 24,

	//TODO: re-add more options to logging
	//logging preferences
	"logging": {
		//can be one of: error, warn, info, http, verbose, debug, silly
		"level": "info"
	},

	//rate limits for requests, can be omitted
	//handled by express-rate-limit, options can be found here: https://github.com/express-rate-limit/express-rate-limit/blob/66ab47f5fc3f7a1f3f70c080cc57a71a8abe1189/source/types.ts#L231
	"rateLimits": {
		"windowMs": 30 * 60 * 1000,
		"limit": 250
	},

	//storage system used for storing saved haste documents
	//see docs/storage.md for more information
	"storage": {
		"type": "file",
		"path": "./data"
	},

	//static documents that will never expire ("name": "path")
	"documents": {
		"about": "./about.md"
	}
};