let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    
    elements.forEach(el => {
        if (lang === 'ar') {
            el.innerText = el.getAttribute('data-ar');
            document.body.classList.add('rtl');
        } else {
            el.innerText = el.getAttribute('data-en');
            document.body.classList.remove('rtl');
        }
    });
}

function calculateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value) || 0;
    const totalPrice = quantity * pricePerUnit;

    document.getElementById('totalPrice').value = totalPrice.toFixed(2);
}

function calculateCBM() {
    const height = parseFloat(document.getElementById('height').value) || 0;
    const breadth = parseFloat(document.getElementById('breadth').value) || 0;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const boxesQuantity = parseInt(document.getElementById('boxesQuantity').value) || 0;
    const dimensionUnit = document.getElementById('dimensionUnit').value;

    let cbm = 0;
    
    if (dimensionUnit === 'cm') {
        cbm = (height * breadth * length * boxesQuantity) / 1000000;
    } else if (dimensionUnit === 'mm') {
        cbm = (height * breadth * length * boxesQuantity) / 1000000000;
    }

    document.getElementById('totalCBM').value = cbm.toFixed(4);
    calculateShippingPrice();  // Recalculate shipping price whenever CBM changes
}

function calculateShippingPrice() {
    const totalCBM = parseFloat(document.getElementById('totalCBM').value) || 0;
    const costPerCBM = parseFloat(document.getElementById('costPerCBM').value) || 0;

    const shippingPrice = totalCBM * costPerCBM;

    document.getElementById('shippingPrice').value = shippingPrice.toFixed(2);
}

function generateText() {
    const productName = document.getElementById('productName').value;
    const model = document.getElementById('model').value;
    const quantity = document.getElementById('quantity').value;
    const pricePerUnit = document.getElementById('pricePerUnit').value;
    const description = document.getElementById('description').value;
    const height = document.getElementById('height').value;
    const breadth = document.getElementById('breadth').value;
    const length = document.getElementById('length').value;
    const dimensionUnit = document.getElementById('dimensionUnit').value;
    const weight = document.getElementById('weight').value;
    const boxesQuantity = document.getElementById('boxesQuantity').value;
    const totalCBM = document.getElementById('totalCBM').value;
    const totalPrice = document.getElementById('totalPrice').value;
    const shippingCity = document.getElementById('shippingCity').value;
    const shippingPrice = document.getElementById('shippingPrice').value;

    let formattedText = '';

    if (currentLanguage === 'ar') {
        formattedText = `*معلومات المنتج*\n\n`;
        if (productName) formattedText += `اسم المنتج: ${productName}\n`;
        if (model) formattedText += `نموذج: ${model}\n`;
        if (quantity) formattedText += `الكمية: ${quantity}\n`;
        if (pricePerUnit) formattedText += `السعر لكل وحدة: $${pricePerUnit}\n`;
        if (description) formattedText += `\n*وصف*:\n${description}\n`;
        if (height && breadth && length) formattedText += `\n*حجم الصندوق*: ${height} x ${breadth} x ${length} ${dimensionUnit}\n`;
        if (weight) formattedText += `الوزن: ${weight} كجم\n`;
        if (boxesQuantity) formattedText += `عدد الصناديق: ${boxesQuantity}\n`;
        if (totalCBM) formattedText += `إجمالي CBM: ${totalCBM}m³\n`;
        if (totalPrice) formattedText += `\n*السعر الكلي*: $${totalPrice}\n`;
        if (shippingCity) formattedText += `\n*مدينة الشحن*: ${shippingCity}\n`;
        if (shippingPrice) formattedText += `سعر الشحن: $${shippingPrice}`;
    } else {
        formattedText = `*Product Information*\n\n`;
        if (productName) formattedText += `Product Name: ${productName}\n`;
        if (model) formattedText += `Model: ${model}\n`;
        if (quantity) formattedText += `Quantity: ${quantity}\n`;
        if (pricePerUnit) formattedText += `Price per Unit: $${pricePerUnit}\n`;
        if (description) formattedText += `\n*Description*:\n${description}\n`;
        if (height && breadth && length) formattedText += `\n*Box Size*: ${height} x ${breadth} x ${length} ${dimensionUnit}\n`;
        if (weight) formattedText += `Weight: ${weight} kg\n`;
        if (boxesQuantity) formattedText += `Boxes Quantity: ${boxesQuantity}\n`;
        if (totalCBM) formattedText += `Total CBM: ${totalCBM} m³\n`;
        if (totalPrice) formattedText += `\n*Total Price*: $${totalPrice}\n`;
        if (shippingCity) formattedText += `\n*Shipping City*: ${shippingCity}\n`;
        if (shippingPrice) formattedText += `Shipping Price: $${shippingPrice}`;
    }
    
    document.getElementById('output').innerText = formattedText.trim();  // Remove any trailing newlines
    document.getElementById('copyButton').style.display = 'block';
}

function copyText() {
    const textToCopy = document.getElementById('output').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied to clipboard');
    });
}

// Set default language to English
setLanguage('en');
