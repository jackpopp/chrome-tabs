module.exports = {
	pluralise: function(number, text) {
		return parseInt(number) === 1 ? text : `${text}s`
	}
}