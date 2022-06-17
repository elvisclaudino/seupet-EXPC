//Verifica o tamanho do arquivo solicitado
function verifyLength(variable,minOfCharacters){

    //Compara o length do arquivo com o parametro que informa o número de caracteres minimo
    if (variable.length < minOfCharacters){
        return false;
    }
    else{
        return true;
    }
}

//Confirma se o nome é valido
function validateName(userName){
    if ( verifyLength(userName,3)) {
        return true;
    }
    else{
        alert("O nome inserido não é permitido !!!");
        return false;
    }  
}

//Confirma se o cpf é valido 
function validateCpf(cpf){ 
    //Expressão para validar cpf
    var re = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
    
    //Se o tamanho nao corresponde a um valor de cpf
    if (cpf.length != 14){
        alert("Quantidade de caracteres invalida!");
        return false;
    }
    else {
        //se tiver o tamanho de um cpf testa o valor com a expressao
        if (re.test(cpf)) {
            return true;     
        }
        else{
            alert("O texto inserido não condiz com um CPF");
            return false;   
        }       
    }
}

//Confirma se o email é valido
function validateEmail(email) {
    //Expressão para validar e-mail
    var re = /\S+@\S+\.\S+/;

    //se tiver o formato de um email
    if (re.test(email)) {
        return true;     
    }
    else{
        alert("O email inserido não é valido !!! ");
        return false;   
    }  
}

//Confirma se as senhas são válidas
function validateKeys(userKey1,userKey2){
    //Verifica se ambas possuem o tamanho valido para a senha
    if (verifyLength(userKey1,8) & verifyLength(userKey2,8)){
        //Verifica se as senhas sao equivalentes
        if (userKey1 === userKey2) {
            return true;
        }else{
            alert("As senhas não são iguais");
            return false;
        }
    }
    else{
        alert("As senhas não possuem o tamanho mínimo");
        return false;
    }
}

//Função para salvar o usuário 
function saveUser(user){
    
    // //Coleta a lista de usuários presente no local storage
    var users = JSON.parse(localStorage.getItem("users"));
    
    //Se a lista de usuários for null (não existir)
    if (users == null){
        users =[user]
        console.log(users);

    //Se a lista de usuários já existir adiciona o usuário a ela
    }else{
        users.push(user)
        console.log(users);
    }
    //Salva os usuarios adicionados/criados no local storage
    localStorage.setItem('users',JSON.stringify(users));
}


//Confirma formulário de cadastro 
function confirmRegister(){
    
    //Leitura dos valores do usuário 
    userData = {
        name : document.getElementById("cadastroNome").value,
        cpf  : document.getElementById("cadastroCPF").value,
        email: document.getElementById("cadastroEmail").value,
        userKey : document.getElementById("cadastroSenha").value,
        userKey2 :  document.getElementById("cadastroConfirmarSenha").value,
    };
    
    // Determina a validacao dos dados para cada campo 
    userAnalysis ={
        "name"  : validateName(userData.name),
        "cpf"   : validateCpf(userData.cpf),
        "email" : validateEmail(userData.email),
        "keys" : validateKeys(userData.userKey,userData.userKey2)
    }

    //Remove a segunda senha após já ter usado para validação
    delete userData.userKey2;

    //Verificador de erro no preechimento do cadastro
    var registerError = false;

    //Varre o objeto vom as validações do cadastro
    Object.keys(userAnalysis).forEach((key) => {  
        // Se alguma das chaves estiver como invalido(false)      
        if (userAnalysis[key] === false) {
            registerError = true; // Registra que houve um erro de cadastro
        }
    });

    // Se não houve erro na verificação do cadastro inserido
    if (!registerError) {
        //Salva os dados do usuário no local storage
       saveUser(userData);
       document.location='./login.html';
    }    
}
