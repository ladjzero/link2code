self.on('click', function(node, data) {
	self.postMessage({
		baseURI: node.baseURI,
		nodeName: node.nodeName,
		src: node.src,
		href: node.href,
	});
});