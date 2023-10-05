const modal = document.querySelector(".modal-container")
const tbody = document.querySelector("tbody")
const sNome = document.querySelector("#m-nome")
const sEmail = document.querySelector("#m-email")
const sTelefone = document.querySelector("#m-telefone")
const sEndereco = document.querySelector("#m-endereco")
const sPet = document.querySelector("#m-nomePet")
const btnSalvar = document.querySelector("#btnSalvar")

let itens
let id

//Formatando telefone usuário

sTelefone.addEventListener("input", formatarTelefone)
sNome.addEventListener("input", validarNome)

function formatarTelefone() {
  let valor = sTelefone.value.replace(/\D/g, "") // Remove caracteres não numéricos
  if (valor.length > 0) {
    valor = "(" + valor

    if (valor.length > 3) {
      valor = valor.substring(0, 3) + ") " + valor.substring(3)

      if (valor.length > 10) {
        valor = valor.substring(0, 10) + "-" + valor.substring(10)

        if (valor.length > 15) {
          valor = valor.substring(0, 15)
        }
      }
    }
  }
  sTelefone.value = valor
}

function validarNome() {
  const valor = sNome.value
  const regex = /[0-9]/g // Expressão regular para encontrar números

  if (regex.test(valor)) {
    sNome.value = valor.replace(regex, "") // Remove números
  }
}

function openModal(edit = false, index = 0) {
  modal.classList.add("active")

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active")
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sEmail.value = itens[index].email
    sTelefone.value = itens[index].telefone
    sEndereco.value = itens[index].endereco
    sPet.value = itens[index].pet
    id = index
  } else {
    sNome.value = ""
    sEmail.value = ""
    sTelefone.value = ""
    sEndereco.value = ""
    sPet.value = ""
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  const confirmDelete = window.confirm(
    "Tem certeza de que deseja excluir este item?"
  )

  if (confirmDelete) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }
}

function insertItem(item, index) {
  let tr = document.createElement("tr")

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td> ${item.telefone}</td>
    <td> ${item.endereco}</td>
    <td> ${item.pet}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = (e) => {
  if (
    sNome.value == "" ||
    sEmail.value == "" ||
    sTelefone.value == "" ||
    sEndereco == "" ||
    sPet == ""
  ) {
    return
  }

  e.preventDefault()

  const newItem = {
    nome: sNome.value,
    email: sEmail.value,
    telefone: sTelefone.value,
    endereco: sEndereco.value,
    pet: sPet.value,
  }

  if (id !== undefined) {
    itens[id] = newItem
  } else {
    // Verificar se o email já existe nos itens existentes
    if (itens.some((item) => item.email === newItem.email)) {
      document.getElementById("mensagem-erro").textContent =
        "Esse email já está em uso. Por favor, verifique seus dados!"
      return
    }

    // Adicionar um novo item à lista
    itens.push(newItem)
  }

  setItensBD()

  modal.classList.remove("active")
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ""
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? []
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens))

loadItens()
