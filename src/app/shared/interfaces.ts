export interface RatesResponse {
	base: string,
	rates: {
		UAH: number
	}
}

export interface ConvertResponse {
	result: number
}