const textToPrint = document.getElementsByClassName("text-to-print")[0];
const printTextButton = document.getElementsByClassName("print-text-button")[0];
const boldNormalButton =
  document.getElementsByClassName("bold-normal-button")[0];
const alignButton = document.getElementsByClassName("align-button")[0];
let centerButtonState = true;
const centerButton = document.getElementsByClassName("center-button")[0];

const inputTextData = document.getElementsByClassName("text-data")[0];
const inputTextSize = document.getElementsByClassName("text-size")[0];


const bold = "bold";
const normal = "normal";
boldNormalButton.textContent = bold;
boldNormalButton.style.fontWeight = bold;

const textAlign = ["left", "center", "right"];
alignButton.textContent = textAlign[1];

const updateTextToPrint = async () => {
  textToPrint.innerHTML = "";
  if (inputTextData.value) {
    const data = inputTextData.value.split("\n");
    textToPrint.style.fontSize = `${inputTextSize.value}px`;
    textToPrint.style.fontWeight = boldNormalButton.textContent;

    for (const row of data) {
      const div = document.createElement("div");
      div.style.textAlign = alignButton.textContent;
      div.innerHTML = row.replaceAll(' ', '&nbsp;&nbsp;');
      textToPrint.appendChild(div);
    }
  }
};
const printTextButtonOnClick = async () => {
  await updateTextToPrint();
  window.print();
};
const boldNormalButtonOnClick = () => {
  if (boldNormalButton.textContent === bold) {
    boldNormalButton.textContent = normal;
    boldNormalButton.style.fontWeight = normal;
  } else {
    boldNormalButton.textContent = bold;
    boldNormalButton.style.fontWeight = bold;
  }
};
const alignButtonOnClick = () => {
    const index = textAlign.indexOf(textAlign.find(x=>x==alignButton.textContent));
    alignButton.textContent =  textAlign[(index + 1)% textAlign.length];
}
const centerButtonOnClick = ()=>{
  if (centerButtonState) {
    centerButton.style.background = 'white';
    textToPrint.style.justifyContent = 'start';
  } else {
    centerButton.style.background = 'darkcyan';
    textToPrint.style.justifyContent = 'center';
  }
  centerButtonState = !centerButtonState;
}

printTextButton.addEventListener("click", printTextButtonOnClick);
boldNormalButton.addEventListener("click", boldNormalButtonOnClick);

alignButton.addEventListener("click", alignButtonOnClick);
centerButton.addEventListener("click", centerButtonOnClick);
