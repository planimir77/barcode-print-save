const button = document.getElementsByClassName("add-button")[0];
const barcodes = document.getElementsByClassName("barcodes")[0];
const barcodeData = document.getElementsByClassName("barcodes-data")[0];
const numberOfBarcode = document.getElementsByClassName("number-of-barcode")[0];
const inputBarcodeData = document.getElementsByClassName("barcode-data")[0];
const inputSecondBarcodeData = document.getElementsByClassName(
  "second-barcode-data"
)[0];
const secondBarcode = document.getElementsByClassName("second-barcode")[0];
const inputProductName = document.getElementsByClassName("product-name")[0];
let factor = 0.86;
let moduleWidth = 0;
const barcodeModulewidth = 4.9;

const barcodeProductName = document.getElementsByClassName(
  "barcode-product-name"
)[0];
const barcodeImage = document.getElementsByClassName("barcode-image")[0];
const secondBarcodeImage = document.getElementsByClassName(
  "second-barcode-image"
)[0];
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function getModuleWidth(index, value) {
    factor = value > 1.3 ? 0.85 : 0.98;

  if (index === 0 || index === 1) {
    return value;
  }
  index--;
  return getModuleWidth(index, (value * factor).toFixed(2));
}
const btnClick = async () => {
  if (!inputBarcodeData.value) {
    alert("Please enter the barcode data");
  } else {
    
    for (let index = 0; index < Number(numberOfBarcode.value) - 1; index++) {
      let node = barcodes.cloneNode(true);
      barcodeData.appendChild(node);
    }
    await delay(600);

    window.print();
    barcodeData.innerHTML = "";
  }
};
const addBarcodeData = () => {

  moduleWidth = getModuleWidth(
    inputBarcodeData.value.length,
    barcodeModulewidth
  );

  if (!inputProductName.value) {
    barcodeProductName.style.marginTop = 0 + "px";
  }

  if (inputBarcodeData.value) {
    const src = `https://barcode.tec-it.com/barcode.ashx?data=${inputBarcodeData.value}&translate-esc=on&unit=Mm&imagetype=Svg&moduleWidth=${moduleWidth}&font=Calibri%2C24%2Cregular`;
    barcodeImage.src = src;
  }
};

const addSecondBarcodeData = () => {
    
  moduleWidth = getModuleWidth(
    inputSecondBarcodeData.value.length,
    barcodeModulewidth
  );

  if (!inputSecondBarcodeData.value) {
    secondBarcode.classList.remove('border-bottom')
    secondBarcode.classList.add('d-none')
    numberOfBarcode.value = 1;
    secondBarcodeImage.src = "";
  } else {
    secondBarcode.classList.add('border-bottom')
    secondBarcode.classList.remove('d-none')
    numberOfBarcode.value = 4;
    secondBarcodeImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${inputSecondBarcodeData.value}&translate-esc=on&unit=Mm&imagetype=Svg&modulewidth=${moduleWidth}&font=Calibri%2C24%2Cregular`;
  }
};

const addProductName = () => {
  barcodeProductName.innerText = inputProductName.value;
};

inputBarcodeData.addEventListener("keyup", addBarcodeData);
inputSecondBarcodeData.addEventListener("keyup", addSecondBarcodeData);
inputProductName.addEventListener("keyup", addProductName);
button.addEventListener("click", btnClick);
