// Selecionando os elementos
const btn = document.querySelector(".btn");
const zipInput = document.querySelector("#inputZip");
const inputAddress = document.querySelector("#inputAddress");
const inputAddress2 = document.querySelector("#inputAddress2");
const inputneighborhood = document.querySelector("#inputneighborhood");
const inputState = document.querySelector("#inputState");
const inputCities = document.querySelector("#inputCities");

const getAddressFromCep = async (cep) => {
  try {
    const cepAddress = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const address = await cepAddress.json();
    fillInputsAddress(address);
    fillCitiesFromCep(address)
    document.getElementById(`${address.uf}`).setAttribute('selected', 'seleted')
  } catch (error) {
    console.log(error);
  }
};

const getCepFromInput = () => {
  getAddressFromCep(zipInput.value);
};

// Função para preencher os campos de endereço
const fillInputsAddress = (adressObj) => {
  inputAddress.value = adressObj.logradouro;
  inputneighborhood.value = adressObj.bairro;
};

// Função fetch para preencher os estados nos inputs selection
const getAllStates = async () => {
  const states = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
  );
  const allStates = await states.json();
  allStates.sort((a, b) => {
    let fa = a.nome.toLowerCase(),
      fb = b.nome.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  let statesOptions = "";
  allStates.forEach((element) => {
    statesOptions += `<option id="${element.sigla}">${element.nome}</option>\n`;
  });
  inputState.insertAdjacentHTML("beforeend", statesOptions);
};
getAllStates();
// Função para preencher as cidades baseado no cep
const fillCitiesFromCep = async(address)=>{
  const citiesApi = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${address.uf}/municipios`);
  const cities = await citiesApi.json();
  let citiesOpt = '';
  cities.forEach((cities)=>{
    citiesOpt += `<option id="${cities.id}">${cities.nome}</option>\n`
  })
  inputCities.insertAdjacentHTML('beforeend', citiesOpt);
  document.getElementById(`${address.ibge}`).setAttribute('selected', 'seleted')
}
