// Array para armazenar as consultas
let consultas = [];

// Função para salvar a consulta
function salvarConsulta() {
    // Obtém os valores dos campos do formulário
    const nomePaciente = document.getElementById("nomePaciente").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const consultorio = document.getElementById("consultorio").value;
    const especialidade = document.getElementById("especialidade").value;
    const dataConsulta = document.getElementById("dataConsulta").value;
    const horario = document.getElementById("horario").value;

    // Validação simples
    if (!nomePaciente || !responsavel || !dataConsulta || !horario) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Cria um objeto de consulta
    const novaConsulta = {
        nomePaciente,
        responsavel,
        idade,
        consultorio,
        especialidade,
        dataConsulta,
        horario
    };

    // Adiciona a nova consulta ao array
    consultas.push(novaConsulta);

    // Limpa os campos do formulário
    document.getElementById("formCadastro").reset();

    // Atualiza a lista de consultas exibidas
    atualizarConsultas();
}

// Função para atualizar a exibição das consultas
function atualizarConsultas() {
    const listaConsultas = document.getElementById("resultadoFiltro");
    listaConsultas.innerHTML = ""; // Limpa a lista existente

    if (consultas.length === 0) {
        listaConsultas.innerHTML = "<p>Nenhuma consulta cadastrada.</p>";
        return;
    }

    // Cria a lista de consultas
    consultas.forEach((consulta, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Paciente:</strong> ${consulta.nomePaciente}, 
            <strong>Responsável:</strong> ${consulta.responsavel}, 
            <strong>Data:</strong> ${consulta.dataConsulta}, 
            <strong>Horário:</strong> ${consulta.horario} 
            <button onclick="editarConsulta(${index})">Editar</button>
            <button onclick="excluirConsulta(${index})">Excluir</button>
        `;
        listaConsultas.appendChild(li);
    });
}

// Função para editar uma consulta
function editarConsulta(index) {
    const consulta = consultas[index];

    // Preenche os campos do formulário com os dados da consulta
    document.getElementById("nomePaciente").value = consulta.nomePaciente;
    document.getElementById("responsavel").value = consulta.responsavel;
    document.getElementById("idade").value = consulta.idade;
    document.getElementById("consultorio").value = consulta.consultorio;
    document.getElementById("especialidade").value = consulta.especialidade;
    document.getElementById("dataConsulta").value = consulta.dataConsulta;
    document.getElementById("horario").value = consulta.horario;

    // Remove a consulta do array para edição
    consultas.splice(index, 1);
    atualizarConsultas(); // Atualiza a lista
}

// Função para excluir uma consulta
function excluirConsulta(index) {
    consultas.splice(index, 1); // Remove a consulta do array
    atualizarConsultas(); // Atualiza a lista
}

// Adiciona um listener ao botão de salvar
document.getElementById("salvarConsulta").addEventListener("click", salvarConsulta);