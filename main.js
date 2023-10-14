const button = document.getElementsByClassName("add-button")[0];
const inputBarcodeData = document.getElementsByClassName("barcode-data")[0];
const inputProductName = document.getElementsByClassName("product-name")[0];

const barcodeProductName = document.getElementsByClassName("barcode-product-name")[0];
const barcodeImage = document.getElementsByClassName("barcode-image")[0];

const btnClick = () => {
    if (!inputBarcodeData.value) {
        alert('Please enter the barcode data')
    } else {
        window.print();
    }
};
const addBarcodeData = () => {
    
    if (inputBarcodeData.value) {
      barcodeImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${inputBarcodeData.value}&code=&translate-esc=true&imagetype=Svg`;
    }
}
const addProductName = () => {
    if (!inputProductName.value) {
        
    }
    barcodeProductName.innerText = inputProductName.value;
}

inputBarcodeData.addEventListener("keyup", addBarcodeData);
inputProductName.addEventListener("keyup", addProductName);
button.addEventListener("click", btnClick);