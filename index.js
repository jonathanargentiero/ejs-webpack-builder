var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

function ejsBuilder(options) {
	this.options = options || {};
}

ejsBuilder.prototype.apply = function(compiler) {
	var files = this.options.files || [];
	var root = this.options.root;

	compiler.plugin('emit', function(compilation, callback) {
		if (typeof root == 'undefined') {
			root = path.join(__dirname,'../../');
		}

		files.forEach(function(file) {
			var filename = '';
			var compileOptions = {
				sourceName: '',
				sourceDir: root,
				targetName: '',
				targetDir: root,
				parameters: file.parameters || {},
				encoding: file.encoding || 'utf8',
			};

			if (typeof file == 'string') {
				compileOptions.sourceName = file;
				compileOptions.sourceDir = root;
			} else if (typeof file == 'object') {
				if (typeof file.source != 'undefined') {
					compileOptions.sourceName = file.source.name || '';
					compileOptions.sourceDir = file.source.dir || root;
				}
				if (typeof file.target != 'undefined') {
					compileOptions.targetName = file.target.name || '';
					compileOptions.targetDir = file.target.dir || '';
				}
			}

			if (compileOptions.sourceName.length > 0) {
				var sourceFile = fs.readFileSync(path.join(compileOptions.sourceDir, compileOptions.sourceName), { encoding: compileOptions.encoding });
				var targetFile = ejs.render(sourceFile, compileOptions.parameters);
				var targetFileName = (compileOptions.targetName.length > 0)
					? (compileOptions.targetDir + compileOptions.targetName)
				 	: compileOptions.sourceName.replace('.ejs','.html');
				compilation.assets[targetFileName] = {
					source: function() {
						return targetFile;
					},
					size: function () {
						return targetFile.length;
					}
				};
			}
		});

		callback();
	});
};

module.exports = ejsBuilder;

