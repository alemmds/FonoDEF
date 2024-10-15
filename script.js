let consultas = [];

// Adiciona o listener ao formulário
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
    atualizarConsultas();
    this.reset();
});

function atualizarConsultas() {
    const consultasHoje = document.getElementById("consultasHoje");
    const consultasPorMes = document.getElementById("consultasPorMes");
    
    consultasHoje.innerHTML = ''; // Limpar consultas de hoje
    consultasPorMes.innerHTML = ''; // Limpar consultas por mês

    const hoje = new Date().toISOString().split('T')[0]; // Data de hoje no formato YYYY-MM-DD

    const meses = {};

    consultas.forEach(consulta => {
        // Consultas de hoje
        if (consulta.dataConsulta === hoje) {
            const consultaDiv = document.createElement("div");
            consultaDiv.classList.add("consulta"); // Adiciona a classe para consultas
            consultaDiv.innerHTML = `
                <div class="info-paciente">
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
                    <button onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                </div>
            `;
            consultasHoje.appendChild(consultaDiv);
        }

        // Agrupando por mês
        const data = new Date(consulta.dataConsulta);
        const mes = data.toLocaleString('pt-BR', { month: 'long' }); // Nome do mês em português
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
            consultaDiv.classList.add("consulta"); // Adiciona a classe para consultas
            consultaDiv.innerHTML = `
                <div class="info-paciente">
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
                    <button onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
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
        detalhesDiv.previousElementSibling.lastChild.textContent = "[-]"; // Muda o texto para [-]
    } else {
        detalhesDiv.style.display = "none";
        detalhesDiv.previousElementSibling.lastChild.textContent = "[+]"; // Muda o texto para [+]
    }
}

function excluirConsulta(nomePaciente) {
    consultas = consultas.filter(consulta => consulta.nomePaciente !== nomePaciente);
    atualizarConsultas();
}

function alterarConsulta(nomePaciente) {
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

        // Remove a consulta original para permitir atualização
        consultas = consultas.filter(c => c.nomePaciente !== nomePaciente);
        atualizarConsultas();
    }
}