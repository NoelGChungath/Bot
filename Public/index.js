const inputTxt = document.getElementById("input");
const output = document.getElementById("outputTxt");
const outputTxt = document.getElementById("output");

async function submit() {
  console.log("fff");

  console.log(`/add/${inputTxt.value}/${outputTxt.value}`);
  const data = await fetch(`/add/${inputTxt.value}/${outputTxt.value}`);
  const json = await data.json();
  console.log(json);
  output.innerText = json.succesful;
}
