const button = document.getElementsByClassName("add-button")[0];
const inputData = document.getElementsByClassName("input-data")[0];

const barcodeImage = document.getElementsByClassName("barcode-image")[0];
const btnClick = () => {
    if (!inputData.value) {
        alert('Please enter the barcode dat')
    } else {
        
        window.print();
    }
};
const addBarcodeData = () => {
    // console.log(inputData.value);
    if (inputData.value) {
      barcodeImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${inputData.value}&code=&translate-esc=true&imagetype=Svg`;
    }
    console.log(inputData.value)
}
inputData.addEventListener("keyup", addBarcodeData)
button.addEventListener("click", btnClick);
