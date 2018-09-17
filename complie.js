class Complie{
	constructor(el, vm) {
		this.el = this.isElementNode(el) ? el: document.querySelector(el)
		this.vm = vm
		if (this.el) {
			let fragment = this.node2Fragment(this.el)
			this.complie(fragment)
			this.el.appendChild(fragment)
		}
	}
	// 辅助的方法
	isElementNode(node) {
		return node.nodeType === 1
	}






	// 核心方法
	node2Fragment(el) {
		let fragment = document.createDocumentFragment()
		let firstChild = null
		while (firstChild = el.firstChild) {
			fragment.appendChild(firstChild)
		}
		return fragment
	}
	complieElement(node) {
		Array.from(node.attributes).forEach(attr => {
			if(attr.name.includes( 'v-' )) {
				let expr = attr.value
				let [,type] = attr.name.split('-')
				CompileUtil[type](node, this.vm, expr)
			}
		})
	}
	complieText(node) {
		let expr = node.textContent
		let reg = /\{\{([^{]+)\}\}/g
		if (reg.test(expr)) {
			CompileUtil['text'](node, this.vm, expr)
		}

	}
	complie(fragment) {
		let childNodes = fragment.childNodes
		Array.from(childNodes).forEach((node) => {
			if(this.isElementNode(node)){
				this.complieElement(node)
				this.complie(node)
			} else {
				this.complieText(node)
			}
		})
	}
}

CompileUtil = {
	getVal(vm, expr) {
		expr = expr.split('.')
		return expr.reduce((prev, next) => {
			return prev[next]
		}, vm.$data)
	},
	text(node, vm, expr) {
		let updaterFn = this.updater['textUpdater']
		console.log(expr)
		let value = expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
			return this.getVal(vm, arguments[1])
		})
		console.log(value)
		updaterFn && updaterFn(node, value)
	},
	model(node, vm, expr) {
		let updaterFn = this.updater['modelUpdater']
		updaterFn && updaterFn(node, this.getVal(vm, expr))
	},
	updater: {
		textUpdater(node, value) {
			node.textContent = value

		},
		modelUpdater(node, value) {
			node.value = value
		}
	}
}