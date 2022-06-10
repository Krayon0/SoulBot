const categories = require('../config.json').Categories;
const axios = require('axios');
const knex = require('knex')(require('../knexfile').production);

function sleep(ms) {
	return new Promise((resolve) => {setTimeout(resolve, ms);});
}

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		while(true) {
			for (const category of categories) {
				let result = await axios({
					url: 'https://www.lostarkmarket.online/api/export-market-live/Europe West?category=' + category,
					method: 'get',
					timeout: 5000,
					headers: {'Content-Type': 'application/json'}
				})
				let data = result.data;
				for (const item of data) {
					let id = item.id;
					let name = item.name.toLowerCase();
					let image = item.image;
					let avgPrice = item['avgPrice'];
					let lowPrice = item['lowPrice'];
					let cheapestRemaining = item['cheapestRemaining'];
					let bulkAmount = item['amount'];
					let rarity = item['rarity'];
					let updatedAt = item['updatedAt'];
					await knex('items').insert({
						item_id: id,
						name: name,
						image: image,
						lowestPrice: lowPrice,
						averagePrice: avgPrice,
						cheapestRemaining: cheapestRemaining,
						bulkAmount: bulkAmount,
						rarity: rarity,
						updatedAt: updatedAt
					}).onConflict('item_id').merge()
				}
			}
			await sleep(60000);
		}
	}
}