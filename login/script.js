function redirect() {
  let emailInput = document.getElementById("email")
  let senhaInput = document.getElementById("senha")
  let mensagemErro = document.getElementById("mensagem-erro")

  let email = emailInput.value.trim()
  let senha = senhaInput.value.trim()

  if (email.length === 0 || senha.length === 0) {
    mensagemErro.textContent = "Preencha os campos corretamente. Campos vazios!"
  } else {
    localStorage.setItem("email", email)
    localStorage.setItem("senha", senha)
    //
    window.location.href = "../crud-user/index.html"
  }
}
