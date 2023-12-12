const printSaveButton = document.getElementsByClassName("print-save-button")[0];
const barcodes = document.getElementsByClassName("barcodes")[0];
const barcodesRepeatData = document.getElementsByClassName("barcodes-repeat")[0];
const inputNumberOfBarcodes = document.getElementsByClassName("number-of-barcodes")[0];
const inputBarcodeData = document.getElementsByClassName("barcode-data")[0];
const inputSecondBarcodeData = document.getElementsByClassName(
  "second-barcode-data"
)[0];

const sizeDefaultValue = 5;
const inputBarcodeSize = document.getElementsByClassName("slider-barcode-size")[0];
inputBarcodeSize.value = sizeDefaultValue;

const secondBarcode = document.getElementsByClassName("second-barcode")[0];
const inputProductName = document.getElementsByClassName("product-name")[0];
const sizeValue = document.getElementsByClassName("size-value")[0];
let moduleWidth = 0;

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
function getModuleWidth(barcodeLength, barcodeSize) {

  const factor = barcodeSize > 1.3 ? 0.86 : 0.98;

  if (barcodeLength === 0 || barcodeLength === 1) {
    return barcodeSize;
  }
  barcodeLength--;
  return getModuleWidth(barcodeLength, (barcodeSize * factor).toFixed(2));
}
const printSaveButtonClick = async () => {
  if (!inputBarcodeData.value) {
    alert("Please enter the barcode data");
  } else {
    window.print();
  }
};
const updateBarcodeData = () => {
  moduleWidth = getModuleWidth(
    inputBarcodeData.value.length,
    // Custom barcode size
    Number(inputBarcodeSize.value)
  );

  if (!inputProductName.value) {
    barcodeProductName.style.marginTop = 0 + "px";
  }

  if (inputBarcodeData.value) {
    const src = `https://barcode.tec-it.com/barcode.ashx?data=${inputBarcodeData.value}&translate-esc=on&unit=Mm&imagetype=Svg&moduleWidth=${moduleWidth}&font=Calibri%2C24%2Cregular`;
    barcodeImage.src = src;
  }
  updateBarcodesRepeatData();
};

const updateSecondBarcodeData = () => {
  moduleWidth = getModuleWidth(
    inputSecondBarcodeData.value.length,
    // Custom barcode size
    Number(inputBarcodeSize.value)
  );

  if (!inputSecondBarcodeData.value || inputSecondBarcodeData.value == 'IP-TMP-') {
    secondBarcode.classList.remove("border-bottom");
    secondBarcode.classList.add("d-none");
    inputNumberOfBarcodes.value = 1;
    secondBarcodeImage.src = "";
  } else {
    secondBarcode.classList.add("border-bottom");
    secondBarcode.classList.remove("d-none");
    inputNumberOfBarcodes.value = 4;
    secondBarcodeImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${inputSecondBarcodeData.value}&translate-esc=on&unit=Mm&imagetype=Svg&modulewidth=${moduleWidth}&font=Calibri%2C24%2Cregular`;
  }
  updateBarcodesRepeatData();
};

const addProductName = () => {
  barcodeProductName.innerText = inputProductName.value;
  updateBarcodesRepeatData();
};
const updateSizeValue = () => {
  if (sizeDefaultValue - Number(inputBarcodeSize.value) == 0) {
    sizeValue.innerText = 'default'
  } else {
    sizeValue.innerText = `${(sizeDefaultValue - Number(inputBarcodeSize.value)).toPrecision(2)}`
  }
};
const updateBarcodesRepeatData = ()=>{
  // Clear data
  barcodesRepeatData.innerHTML = "";
  // Update data
  for (let index = 0; index < Number(inputNumberOfBarcodes.value) - 1; index++) {
    let node = barcodes.cloneNode(true);
    barcodesRepeatData.appendChild(node);
  }

}
const barcodeSizeChange = () => {
  updateSizeValue();
  updateBarcodeData();
  updateSecondBarcodeData();
};

inputBarcodeData.addEventListener("change", updateBarcodeData);
inputSecondBarcodeData.addEventListener("change", updateSecondBarcodeData);
inputProductName.addEventListener("change", addProductName);
inputBarcodeSize.addEventListener("change", barcodeSizeChange);
inputNumberOfBarcodes.addEventListener("change", updateBarcodesRepeatData)
printSaveButton.addEventListener("click", printSaveButtonClick);

