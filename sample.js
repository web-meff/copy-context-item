let data = {
	cut: 'google.com',
	paste: '',
	url: ['*://*.google.com/*']
};

function init() {
	chrome.storage.sync.set({
		cut: data.cut,
		paste: data.paste,
		url: data.url
	}, function () {
		setUp();
		onChange();
	});
}
function setUp() {
	chrome.contextMenus.create({
		'type': 'normal',
		'id': 'customCopyItem',
		'title': 'Copy and Replace Link',
		'contexts': ["all", "page", "frame", "selection", "link", "browser_action", "page_action"],
		'documentUrlPatterns': data.url,
		'onclick': function(e) {
			let url = e.linkUrl.replace(data.cut, data.paste);
			const input = document.createElement('input');
			document.body.appendChild(input);
			input.value = url;
			input.focus();
			input.select();
			const result = document.execCommand('copy');
			if (result === 'unsuccessful') {
				console.error('Failed to copy text.');
			}
		}
	});
}
function onChange() {
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		for (var key in changes) {
			var storageChange = changes[key];
			data[key] = storageChange.newValue;
			if (key === 'url') {
				chrome.contextMenus.update('customCopyItem', {
					'documentUrlPatterns': storageChange.newValue
				});
			}
		}
	});
}


document.addEventListener('DOMContentLoaded', init());


