function getStorage() {	
	return $.totalStorage;
}

function storageLoad(key, def) {
	var storage = getStorage();
	
	if (storage == null)
		return def;
		
	var value = storage(key);

	if (value != undefined)
		return value;
	
	return def;
}

function storageSave(key, value) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	storage(key, value);
}

function loadInput(input) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	var value = storage(input.attr('id'));

	if (value != undefined)
		input.val(value)
}

function saveInput(input) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	var value = input.val();
	storage(input.attr('id'), value);
}

function loadRadio(radio) {
	var storage = getStorage();

	if (storage == null)
		return;
		
	var checked = storage(radio.attr('id'));
	
	if (checked) {
		radio.prop('checked', true)
	}
}

function saveRadio(radio) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	var checked = radio.is(':checked');
	storage(radio.attr('id'), checked);
}

function loadSelect(select) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	var selected = storage(select.attr('id'));
	
	if (selected != undefined)
		select.val(selected);
}

function saveSelect(select) {
	var storage = getStorage();
	
	if (storage == null)
		return;
		
	var selected = select.val();
	storage(select.attr('id'), selected);
}