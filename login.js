function verifyRegister(){

    var userCPF = document.getElementById('CPF').value;
    var userKey = document.getElementById('Senha').value;

    var users = JSON.parse(localStorage.getItem('users'));

    //Laço para varredura da lista de usuários cadastrados
    for (let key = 0; key < users.length; key++) {
        //Se há uma igualdade do cpf presente na lista com o cpf informado
        if (users[key].cpf == userCPF){
            //Verifica se a senha também é igual
            if (users[key].userKey == userKey){ 
                //Se ambos forem iguais, retorna a função, redirecionando para home
                var userLogged = users[key].name; 
                localStorage.setItem('userLogged',userLogged);
                document.location='./index.html';
                return
            }
            //Se a senha não coincidiu com o usuário, logo a senha digitada está errada
            else{
                //Recarrega a pagina de login
                document.location='./login.html';
                alert('Dados de login invalidos');
                return
            }
        }
    }
    //Se passou pelo laço de busca e não houve uma combincação de senha e usuário
    alert('Dados de login invalidos');
}