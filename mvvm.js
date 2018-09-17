class MVVM {
	constructor(options) {
		this.$el = options.el
		this.$data = options.data
		if (this.$el) {
			new Complie(this.$el, this)
		}
	}
}