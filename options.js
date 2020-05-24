// Saves options to chrome.storage
function saveOptions() {
    let cut = document.getElementById('cut').value,
        paste = document.getElementById('paste').value,
        url = document.getElementById('url').value.split('\n');
    chrome.storage.sync.set({
        cut: cut,
        paste: paste,
        url: url
    }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Get options from chrome.storage in first load
function getOptions() {
    chrome.storage.sync.get(['cut', 'pate', 'url'], function(items) {
        document.getElementById('cut').value = items.cut;
        document.getElementById('paste').value = items.paste ? items.paste : '';
        document.getElementById('url').value = items.url.join("\n");
    });
}

document.addEventListener('DOMContentLoaded', getOptions);
document.getElementById('save').addEventListener('click', saveOptions);
