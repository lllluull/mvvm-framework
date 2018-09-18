class Observer {
	constructor(data) {
		this.observer(data)
	}
	observer(data) {
		if (!data || typeof data !== 'object') {
			return
		}
		Object.keys(data).forEach(key => {
				this.defineReactive(data, key, data[key])
				this.observer(data[key])
			})
	}
	defineReactive(obj,key, value) {
		let that = this
		Object.defineProperty(obj,key, {
			enumerable: true,
			configurable: true,
			get() {
				return value
			},
			set(newValue) {
				if(value !=newValue) {
					that.observer(newValue)
					value = newValue
				}
			}
		})
	}
}