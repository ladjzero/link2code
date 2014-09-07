var titleNode = document.getElementsByTagName('h2')[0];
var imgNode = document.getElementsByTagName('img')[0];

var qrcode = new QRCode(imgNode, {
	text: 'test',
    width: 280,
    height: 280,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

self.port.on('data', function (data) {
	titleNode.innerHTML = data.title;
	qrcode.makeCode(data.string);
});