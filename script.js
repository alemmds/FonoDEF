document.getElementById("salvar-consulta").addEventListener("click", salvarConsulta);

function salvarConsulta() {
    const nomePaciente = document.getElementById("nome-paciente").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const especialidade = document.getElementById("especialidade-cadastro").value;
    const consultorio = document.getElementById("consultorio").value;
    const dataConsulta = document.getElementById("data-consulta-cadastro").value;
    const horaConsulta = document.getElementById("hora-consulta").value;
    const recomendacoes = document.getElementById("recomendacoes").value;

    if (!nomePaciente || !dataConsulta || !horaConsulta || !especialidade) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const consulta = {
        nomePaciente,
        responsavel,
        idade,
        telefone,
        especialidade,
        consultorio,
        dataConsulta,
        horaConsulta,
        recomendacoes,
    };

    // Armazenamento da consulta
    const consultasDoMes = JSON.parse(localStorage.getItem("consultasDoMes")) || {};
    const mes = dataConsulta.split("-")[1] + "/" + dataConsulta.split("-")[0]; // ex: 10/2024

    if (!consultasDoMes[mes]) {
        consultasDoMes[mes] = [];
    }

    consultasDoMes[mes].push(consulta);
    localStorage.setItem("consultasDoMes", JSON.stringify(consultasDoMes));

    exibirConsultasMes();
    alert("Consulta salva com sucesso!");
}

function exibirConsultasMes() {
    const consultasDoMes = JSON.parse(localStorage.getItem("consultasDoMes")) || {};
    const consultasMesContent = document.getElementById("consultas-mes-content");
    consultasMesContent.innerHTML = "";

    for (const mes in consultasDoMes) {
        const buttonMes = document.createElement("button");
        buttonMes.innerText = mes;
        buttonMes.addEventListener("click", function() {
            exibirConsultasDia(consultasDoMes[mes], mes);
        });
        consultasMesContent.appendChild(buttonMes);
    }
}

function exibirConsultasDia(consultas, mes) {
    const consultasDiaContent = document.getElementById("consultas-dia-content");
    consultasDiaContent.innerHTML = `<h2>Dias do Mês: ${mes}</h2>`;

    consultas.forEach((consulta, index) => {
        const consultaDiv = document.createElement("div");
        consultaDiv.innerHTML = `
            <p><strong>Nome:</strong> ${consulta.nomePaciente}</p>
            <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
            <p><strong>Consultório:</strong> ${consulta.consultorio}</p>
            <button onclick="editarConsulta(${index}, '${mes}')">Editar</button>
            <button onclick="excluirConsulta(${index}, '${mes}')">Excluir</button>
        `;
        consultasDiaContent.appendChild(consultaDiv);
    });
}

function editarConsulta(index, mes) {
    // Função de edição
}

function excluirConsulta(index, mes) {
    const consultasDoMes = JSON.parse(localStorage.getItem("consultasDoMes")) || {};
    consultasDoMes[mes].splice(index, 1);
    localStorage.setItem("consultasDoMes", JSON.stringify(consultasDoMes));
    exibirConsultasMes();
    alert("Consulta excluída com sucesso!");
}

// Chamar essa função ao carregar a página
exibirConsultasMes();