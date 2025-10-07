/* global it, describe, after, afterEach, before, beforeEach */

const assert = require('assert');

const winston = require('winston');
winston.configure({
	transports: [],
	silent: true
});

const RedisDocumentStore = require('../lib/document_stores/redis');

describe('redis_document_store', function(){

	let stores = [];
	let redisAvailable = false;

	before(async function(){
		this.timeout(5000);

		// Test Redis availability without creating store yet
		const Redis = require('ioredis');

		/** @type {import('ioredis').Redis} */
		const testClient = new Redis({
			host: '127.0.0.1',
			port: 6379,
			lazyConnect: true,  // Don't connect immediately
			retryStrategy: () => null  // Don't retry
		});

		try {
			await testClient.connect();
			await testClient.ping();
			redisAvailable = true;
			await testClient.quit();
			console.log('✓ Redis available, running Redis tests');
		} catch(err) {
			console.log('⚠️  Redis not available, skipping Redis tests');
			console.log(`   Error: ${err.message}`);
		}
	});

	afterEach(async function(){
		for (const store of stores) {
			if (store && store.client) {
				try {
					await store.client.quit();
				} catch(e) {
					// Ignore quit errors
				}
			}
		}
		stores = [];
	});

	after(function(done){
		setTimeout(done, 100);
	});

	describe('set', function(){

		beforeEach(function(){
			if (!redisAvailable) {
				this.skip();
			}
		});

		it('should be able to set a key and have an expiration set', async function(){
			let store = new RedisDocumentStore({ expire: 10 });
			stores.push(store);

			await store.set('hello1', 'world');
			const ttl = await store.client.ttl('hello1');
			assert.ok(ttl > 1 && ttl <= 10);
		});

		it('should not set an expiration when told not to', async function(){
			let store = new RedisDocumentStore({ expire: 10 });
			stores.push(store);

			await store.set('hello2', 'world', true);
			const ttl = await store.client.ttl('hello2');
			assert.equal(-1, ttl);
		});

		it('should not set an expiration when expiration is off', async function(){
			let store = new RedisDocumentStore({ expire: false });
			stores.push(store);

			await store.set('hello3', 'world');
			const ttl = await store.client.ttl('hello3');
			assert.equal(-1, ttl);
		});

	});

});