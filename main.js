const title = document.getElementsByClassName("title")[0];
const spiner = document.getElementsByClassName("spiner")[0];
const barcode = document.getElementsByClassName("barcode")[0];
const barcodes = document.getElementsByClassName("barcodes")[0];
const printSaveButton = document.getElementsByClassName("print-save-button")[0];
const barcodesRepeatData =
  document.getElementsByClassName("barcodes-repeat")[0];
const inputNumberOfBarcodes =
  document.getElementsByClassName("number-of-barcodes")[0];
const inputBarcodeData = document.getElementsByClassName("barcode-data")[0];
const inputSecondBarcodeData = document.getElementsByClassName(
  "second-barcode-data"
)[0];
const inputBarcodeSize = document.getElementsByClassName(
  "slider-barcode-size"
)[0];
const inputProductName = document.getElementsByClassName("product-name")[0];

const sizeDefaultValue = 5;
inputBarcodeSize.value = sizeDefaultValue;

const secondBarcode = document.getElementsByClassName("second-barcode")[0];
const sizeValue = document.getElementsByClassName("size-value")[0];
let moduleWidth = 0;

const barcodeProductName = document.getElementsByClassName(
  "barcode-product-name"
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
    spiner.classList.add("d-block");
    await updateTitle();
    await updateBarcodeData();
    await updateSecondBarcodeData();
    await updateBarcodesRepeatData();
    setTimeout(() => {
      spiner.classList.remove("d-block");
      window.print();
      // Clear data
      barcode.innerText = "";
      secondBarcode.innerHTML = "";
      barcodesRepeatData.innerHTML = "";

      updateTitle("Barcode Generator");

    }, 2000);
  }
};
const updateTitle = async (value) => {
  title.innerText = value
    ? value
    : new Date()
        .toISOString()
        .split(".")[0]
        .replace("T", "_v")
        .replaceAll(":", "");
};
const updateBarcodeData = async () => {
  if (!inputProductName.value) {
    barcodeProductName.style.marginTop = 0 + "px";
  }

  if (inputBarcodeData.value) {
    const barcodes = inputBarcodeData.value.split("\n");

    for (const barcodeData of barcodes) {
      if (!barcodeData) continue;
      moduleWidth = getModuleWidth(
        barcodeData.length,
        // Custom barcode size
        Number(inputBarcodeSize.value)
      );

      const image = document.createElement("img");
      image.src = `https://barcode.tec-it.com/barcode.ashx?data=${barcodeData}&translate-esc=on&unit=Mm&imagetype=Svg&moduleWidth=${moduleWidth}&font=Calibri%2C26%2Cbold`;
      image.alt = `Barcode ${barcodeData}`;
      image.style.paddingBlock = "8px";
      if (barcodeData.includes("IP-TMP-", 0)) {
        image.classList.add("border-bottom");
      }
      barcode.appendChild(image);
    }
  }
};

const updateSecondBarcodeData = async () => {
  moduleWidth = getModuleWidth(
    inputSecondBarcodeData.value.length,
    // Custom barcode size
    Number(inputBarcodeSize.value)
  );

  if (
    inputSecondBarcodeData.value &&
    inputSecondBarcodeData.value.includes("IP-TMP-") &&
    inputSecondBarcodeData.value.length > ("IP-TMP-").length
  ) {
    // Valid barcode data
    const image = document.createElement("img");
    image.src = `https://barcode.tec-it.com/barcode.ashx?data=${inputSecondBarcodeData.value}&translate-esc=on&unit=Mm&imagetype=Svg&moduleWidth=${moduleWidth}&font=Calibri%2C26%2Cbold`;
    image.alt = `Barcode ${inputSecondBarcodeData.value}`;
    image.style.paddingBlock = "8px";
    image.classList.add("border-bottom");
    secondBarcode.appendChild(image);
  }
};

const addProductName = () => {
  barcodeProductName.innerText = inputProductName.value;
  updateBarcodesRepeatData();
};
const updateSizeValue = () => {
  if (sizeDefaultValue - Number(inputBarcodeSize.value) == 0) {
    sizeValue.innerText = "default";
  } else {
    sizeValue.innerText = `${(
      sizeDefaultValue - Number(inputBarcodeSize.value)
    ).toPrecision(2)}`;
  }
};
const updateBarcodesRepeatData = async () => {
  // Update data
  for (
    let index = 0;
    index < Number(inputNumberOfBarcodes.value) - 1;
    index++
  ) {
    let node = barcodes.cloneNode(true);
    barcodesRepeatData.appendChild(node);
  }
};
const barcodeSizeChange = () => {
  updateSizeValue();
};

inputProductName.addEventListener("change", addProductName);
inputBarcodeSize.addEventListener("change", barcodeSizeChange);
inputNumberOfBarcodes.addEventListener("change", updateBarcodesRepeatData);
printSaveButton.addEventListener("click", printSaveButtonClick);
