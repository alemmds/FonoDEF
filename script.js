// Salvar consulta no sistema
document.getElementById("salvar-consulta").addEventListener("click", function() {
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let idade = document.getElementById("idade").value;
    let consultorio = document.getElementById("consultorio").value;
    let especialidade = document.getElementById("especialidade").value;
    let dataConsulta = document.getElementById("data-consulta").value;
    let horaConsulta = document.getElementById("hora-consulta").value;

    if (nome && telefone && idade && consultorio && especialidade && dataConsulta && horaConsulta) {
        // Cria objeto de consulta
        const consulta = {
            nome: nome,
            telefone: telefone,
            idade: idade,
            consultorio: consultorio,
            especialidade: especialidade,
            data: dataConsulta,
            hora: horaConsulta
        };

        // Armazena consulta no LocalStorage
        let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
        consultas.push(consulta);
        localStorage.setItem("consultas", JSON.stringify(consultas));

        // Exibe mensagem de sucesso e limpa os campos
        alert("Consulta salva com sucesso!");
        document.getElementById("cadastro-form").reset();

        // Atualiza a lista de consultas
        carregarConsultasPorMes();
    } else {
        alert("Preencha todos os campos!");
    }
});

// Carrega os meses com consultas
function carregarConsultasPorMes() {
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    const mesesConsultas = document.getElementById("meses-consultas");
    mesesConsultas.innerHTML = ""; // Limpa o conteúdo anterior

    // Agrupar consultas por mês
    const consultasPorMes = consultas.reduce((acc, consulta) => {
        const mes = consulta.data.slice(0, 7); // Formato YYYY-MM
        if (!acc[mes]) {
            acc[mes] = [];
        }
        acc[mes].push(consulta);
        return acc;
    }, {});

    // Criar botões para os meses
    Object.keys(consultasPorMes).forEach(mes => {
        const botaoMes = document.createElement("button");
        botaoMes.textContent = mes;
        botaoMes.addEventListener("click", function() {
            carregarDiasDoMes(mes, consultasPorMes[mes]);
        });
        mesesConsultas.appendChild(botaoMes);
    });
}

// Carrega os dias com consultas de um mês específico
function carregarDiasDoMes(mes, consultasDoMes) {
    const diasConsultas = document.getElementById("dias-consultas");
    diasConsultas.innerHTML = ""; // Limpa o conteúdo anterior

    // Agrupar consultas por dia
    const consultasPorDia = consultasDoMes.reduce((acc, consulta) => {
        const dia = consulta.data.split("-")[2]; // Obter o dia (DD)
        if (!acc[dia]) {
            acc[dia] = [];
        }
        acc[dia].push(consulta);
        return acc;
    }, {});

    // Criar botões para os dias e exibir as consultas
    Object.keys(consultasPorDia).forEach(dia => {
        const botaoDia = document.createElement("button");
        botaoDia.textContent = dia;
        botaoDia.addEventListener("click", function() {
            exibirConsultasDoDia(dia, consultasPorDia[dia]);
        });
        diasConsultas.appendChild(botaoDia);
    });
}

// Exibe as consultas de um dia específico
function exibirConsultasDoDia(dia, consultasDoDia) {
    const detalhesConsulta = document.getElementById("resultado-filtro-detalhes");
    detalhesConsulta.innerHTML = ""; // Limpa o conteúdo anterior

    consultasDoDia.forEach((consulta, index) => {
        const consultaDiv = document.createElement("div");
        consultaDiv.classList.add("consulta-detalhe");
        consultaDiv.innerHTML = `
            <p>Paciente: ${consulta.nome}</p>
            <p>Consultório: ${consulta.consultorio}</p>
            <p>Especialidade: ${consulta.especialidade}</p>
            <p>Data: ${consulta.data}</p>
            <p>Hora: ${consulta.hora}</p>
            <p>Idade: ${consulta.idade}</p>
            <button class="editar-btn" data-index="${index}" data-dia="${dia}">Editar</button>
            <button class="excluir-btn" data-index="${index}" data-dia="${dia}">Excluir</button>
        `;
        detalhesConsulta.appendChild(consultaDiv);

        // Função para editar consulta
        consultaDiv.querySelector(".editar-btn").addEventListener("click", function() {
            editarConsulta(index, consulta);
        });

        // Função para excluir consulta
        consultaDiv.querySelector(".excluir-btn").addEventListener("click", function() {
            excluirConsulta(index);
        });
    });
}

// Função para editar uma consulta
function editarConsulta(index, consulta) {
    // Preenche os campos do formulário com os dados da consulta a ser editada
    document.getElementById("nome").value = consulta.nome;
    document.getElementById("telefone").value = consulta.telefone;
    document.getElementById("idade").value = consulta.idade;
    document.getElementById("consultorio").value = consulta.consultorio;
    document.getElementById("especialidade").value = consulta.especialidade;
    document.getElementById("data-consulta").value = consulta.data;
    document.getElementById("hora-consulta").value = consulta.hora;

    // Exclui a consulta original para ser substituída ao salvar
    excluirConsulta(index);
}

// Função para excluir uma consulta
function excluirConsulta(index) {
    let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    consultas.splice(index, 1); // Remove a consulta da lista
    localStorage.setItem("consultas", JSON.stringify(consultas));
    alert("Consulta excluída com sucesso!");

    // Atualiza a lista de consultas
    carregarConsultasPorMes();
}

// Função de filtro de consultas
document.getElementById("filtro-confirmar").addEventListener("click", function() {
    let especialidadeFiltro = document.getElementById("filtro-especialidade").value;
    let dataFiltro = document.getElementById("filtro-data").value;
    let horarioFiltro = document.getElementById("filtro-horario").value;

    // Recupera as consultas armazenadas
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    const resultadoFiltro = document.getElementById("resultado-filtro-detalhes");
    resultadoFiltro.innerHTML = ""; // Limpa o conteúdo anterior

    // Filtra as consultas com base nos parâmetros fornecidos
    const consultasFiltradas = consultas.filter(consulta => {
        return (!especialidadeFiltro || consulta.especialidade === especialidadeFiltro) &&
               (!dataFiltro || consulta.data === dataFiltro) &&
               (!horarioFiltro || consulta.hora === horarioFiltro);
    });

    if (consultasFiltradas.length > 0) {
        consultasFiltradas.forEach((consulta, index) => {
            const consultaDiv = document.createElement("div");
            consultaDiv.classList.add("consulta-detalhe");
            consultaDiv.innerHTML = `
                <p>Paciente: ${consulta.nome}</p>
                <p>Consultório: ${consulta.consultorio}</p>
                <p>Especialidade: ${consulta.especialidade}</p>
                <p>Data: ${consulta.data}</p>
                <p>Hora: ${consulta.hora}</p>
                <p>Idade: ${consulta.idade}</p>
                <button class="editar-btn" data-index="${index}">Editar</button>
                <button class="excluir-btn" data-index="${index}">Excluir</button>
            `;
            resultadoFiltro.appendChild(consultaDiv);

            // Função para editar consulta dentro do filtro
            consultaDiv.querySelector(".editar-btn").addEventListener("click", function() {
                editarConsulta(index, consulta);
            });

            // Função para excluir consulta dentro do filtro
            consultaDiv.querySelector(".excluir-btn").addEventListener("click", function() {
                excluirConsulta(index);
            });
        });
    } else {
        resultadoFiltro.innerHTML = "<p>Nenhuma consulta encontrada para os critérios selecionados.</p>";
    }
});

// Carrega as consultas do mês ao iniciar
document.addEventListener("DOMContentLoaded", carregarConsultasPorMes);