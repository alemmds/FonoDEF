let consultas = JSON.parse(localStorage.getItem("consultas")) || [];

document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomePaciente = document.getElementById("nomePaciente").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const especialista = document.getElementById("especialista").value;
    const consultorio = document.getElementById("consultorio").value;
    const dataConsulta = document.getElementById("dataConsulta").value;
    const horarioConsulta = document.getElementById("horarioConsulta").value;
    const recomendacoes = document.getElementById("recomendacoes").value;

    const novaConsulta = {
        nomePaciente,
        responsavel,
        idade,
        telefone,
        especialista,
        consultorio,
        dataConsulta,
        horarioConsulta,
        recomendacoes,
    };

    consultas.push(novaConsulta);
    localStorage.setItem("consultas", JSON.stringify(consultas));
    atualizarConsultas();
    this.reset();
});

function atualizarConsultas() {
    const consultasHoje = document.getElementById("consultasHoje");
    const consultasPorMes = document.getElementById("consultasPorMes");

    consultasHoje.innerHTML = '';
    consultasPorMes.innerHTML = '';

    const hoje = new Date().toISOString().split('T')[0];

    const meses = {};

    consultas.forEach(consulta => {
        if (consulta.dataConsulta === hoje) {
            const consultaDiv = document.createElement("div");
            consultaDiv.innerHTML = `
                <div class="consulta">
                    <strong>${consulta.nomePaciente}</strong><br>
                    Responsável: ${consulta.responsavel}<br>
                    Idade: ${consulta.idade}<br>
                    Telefone: ${consulta.telefone}<br>
                    Especialista: ${consulta.especialista}<br>
                    Consultório: ${consulta.consultorio}<br>
                    Data da Consulta: ${consulta.dataConsulta}<br>
                    Horário: ${consulta.horarioConsulta}<br>
                    Recomendações: ${consulta.recomendacoes}<br>
                    <button onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
                    <button onclick="prepararAlteracao('${consulta.nomePaciente}')">Alterar</button>
                </div>
            `;
            consultasHoje.appendChild(consultaDiv);
        }

        const data = new Date(consulta.dataConsulta);
        const mes = data.toLocaleString('pt-BR', { month: 'long' });
        const ano = data.getFullYear();
        const chave = `${mes} ${ano}`;

        if (!meses[chave]) {
            meses[chave] = [];
        }
        meses[chave].push(consulta);
    });

    for (const [mesAno, consultasMes] of Object.entries(meses)) {
        const mesDiv = document.createElement("div");
        mesDiv.classList.add("month");
        mesDiv.innerHTML = `<strong>${mesAno}</strong> <span onclick="toggleDetails('${mesAno}')">[+]</span>`;

        const detalhesDiv = document.createElement("div");
        detalhesDiv.classList.add("details");
        detalhesDiv.id = mesAno;

        consultasMes.forEach(consulta => {
            const consultaDiv = document.createElement("div");
            consultaDiv.innerHTML = `
                <div class="consulta">
                    <strong>${consulta.nomePaciente}</strong><br>
                    Responsável: ${consulta.responsavel}<br>
                    Idade: ${consulta.idade}<br>
                    Telefone: ${consulta.telefone}<br>
                    Especialista: ${consulta.especialista}<br>
                    Consultório: ${consulta.consultorio}<br>
                    Data da Consulta: ${consulta.dataConsulta}<br>
                    Horário: ${consulta.horarioConsulta}<br>
                    Recomendações: ${consulta.recomendacoes}<br>
                    <button onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
                    <button onclick="prepararAlteracao('${consulta.nomePaciente}')">Alterar</button>
                </div>
            `;
            detalhesDiv.appendChild(consultaDiv);
        });

        consultasPorMes.appendChild(mesDiv);
        consultasPorMes.appendChild(detalhesDiv);
    }
}

function toggleDetails(mesAno) {
    const detalhesDiv = document.getElementById(mesAno);
    if (detalhesDiv.style.display === "none" || !detalhesDiv.style.display) {
        detalhesDiv.style.display = "block";
        detalhesDiv.previousElementSibling.lastChild.textContent = "[-]";
    } else {
        detalhesDiv.style.display = "none";
        detalhesDiv.previousElementSibling.lastChild.textContent = "[+]";
    }
}

// Excluir consulta
function excluirConsulta(nomePaciente) {
    consultas = consultas.filter(consulta => consulta.nomePaciente !== nomePaciente);
    localStorage.setItem("consultas", JSON.stringify(consultas));
    atualizarConsultas();
}

// Preparar alteração da consulta
function prepararAlteracao(nomePaciente) {
    const consulta = consultas.find(consulta => consulta.nomePaciente === nomePaciente);
    if (consulta) {
        document.getElementById("nomePaciente").value = consulta.nomePaciente;
        document.getElementById("responsavel").value = consulta.responsavel;
        document.getElementById("idade").value = consulta.idade;
        document.getElementById("telefone").value = consulta.telefone;
        document.getElementById("especialista").value = consulta.especialista;
        document.getElementById("consultorio").value = consulta.consultorio;
        document.getElementById("dataConsulta").value = consulta.dataConsulta;
        document.getElementById("horarioConsulta").value = consulta.horarioConsulta;
        document.getElementById("recomendacoes").value = consulta.recomendacoes;

        excluirConsulta(nomePaciente); // Exclui a consulta antiga para permitir a alteração
    }
}

// Carregar consultas salvas ao iniciar a página
document.addEventListener("DOMContentLoaded", function() {
    atualizarConsultas();
});
