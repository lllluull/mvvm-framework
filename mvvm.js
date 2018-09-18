class MVVM {
	constructor(options) {
		this.$el = options.el
		this.$data = options.data
		if (this.$el) {
			new Observer(this.$data)
			new Complie(this.$el, this)
		}
	}
}