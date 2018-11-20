import {
	isLocalhost
} from '../utils';

export const getProductSimiliarById = (productId) => {

	getProductSimiliarById.cache = getProductSimiliarById.cache || {}
	const endpoint = `/api/catalog_system/pub/products/crossselling/similars/${productId}`;

	if (isLocalhost) getProductSimiliarById.cache[productId] = window.product;

	return new Promise((resolve, reject) => {
		let res = getProductSimiliarById.cache[productId]
		if (res) return resolve(res)
		else {
			return fetch(endpoint)
				.then(data => {
					getProductSimiliarById.cache[productId] = data.json()
					return resolve(getProductSimiliarById.cache[productId])
				})
				.catch(err => reject(err))
		}
		return reject("Couldn't get product.")
	})


}

export const getProductWithVariations = (productId) => {

	getProductWithVariations.cache = getProductWithVariations.cache || {}
	const endpoint = `/api/catalog_system/pub/products/variations/${productId}`;


	return new Promise((resolve, reject) => {
		let res = getProductWithVariations.cache[productId]
		if (isLocalhost) return resolve(window.product)
		if (res) return resolve(res)
		else {
			return fetch(endpoint)
				.then(data => {
					getProductWithVariations.cache[productId] = data.json()
					return resolve(getProductWithVariations.cache[productId])
				})
				.catch(err => reject(err))
		}
		return reject("Couldn't get product.")
	})


}
