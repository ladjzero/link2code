exports.main = function(options) {
	var cm = require('sdk/context-menu');
	var data = require("sdk/self").data;
	var panel = require('sdk/panel').Panel({
		width: 300,
		height: 340,
		contentURL: data.url('panel.html'),
		contentScriptFile: [data.url('qrcode.js'), data.url('panel.js')] 
	});
	var selection = require('sdk/selection');
	var _ = require('sdk/l10n').get;
	
	var menuItemOption = {
		label: _('QRCode'),
		image: data.url('icon.png'),
		contentScriptFile: data.url('context_menu.js'),
		onMessage: function(node, data){
			var title, qrcode;

			if (selection.text) {
				title = _('Text');
				qrcode = selection.text || '';
			} else {
				if (node.nodeName.toLowerCase() == 'img') {
					title = _('Image');
					qrcode = node.src || '';
				} else if (node.nodeName.toLowerCase() == 'a') {
					title = _('Link');
					qrcode = node.href || '';
				} else {
					title = _('Page');
					qrcode = node.baseURI;
				}
			}

			panel.port.emit('data', {
				title: title,
				string: qrcode
			});

			panel.show();
		}
	};

	var selectorMenuItem = cm.Item(menuItemOption);
	selectorMenuItem.context.add([
		cm.SelectorContext('a, img'),
		cm.PredicateContext(function (context) {return !context.selectionText;})
	]);

	var selectionMenuItem = cm.Item(menuItemOption);
	selectionMenuItem.context.add(cm.PredicateContext(function (context) {
		return !!context.selectionText;
	}));

	var pageMenuItem = cm.Item(menuItemOption);
	pageMenuItem.context.add(cm.PageContext());
};