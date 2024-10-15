let consultas = [];

// Adicionar consulta ao ser submetido o formulário
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
            consultaDiv.classList.add("consulta");
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
                </div>
                <div>
                    <button onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
                    <button class="alterar" onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                </div>
            `;
            consultasHoje.appendChild(consultaDiv);
        }

        // Agrupando consultas por mês
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

        // Botões de dias
        consultasMes.forEach(consulta => {
            const data = new Date(consulta.dataConsulta);
            const dia = data.getDate();

            const diaButton = document.createElement("button");
            diaButton.classList.add("button-dia");
            diaButton.innerText = dia;
            diaButton.addEventListener('click', function() {
                const consultaDiv = document.createElement("div");
                consultaDiv.classList.add("consulta");
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
                    </div>
                    <div>
                        <button onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
                        <button class="alterar" onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                    </div>
                `;
                detalhesDiv.appendChild(consultaDiv);
            });

            detalhesDiv.appendChild(diaButton);
        });

        consultasPorMes.appendChild(mesDiv);
        consultasPorMes.appendChild(detalhesDiv);
    }
}

// Alternar a exibição dos detalhes de cada mês
function toggleDetails(mesAno) {
    const detalhesDiv = document.getElementById(mesAno);
    if (detalhesDiv.classList.contains("show")) {
        detalhesDiv.classList.remove("show");
    } else {
        detalhesDiv.classList.add("show");
    }
}

function excluirConsulta(nomePaciente) {
    consultas = consultas.filter(consulta => consulta.nomePaciente !== nomePaciente);
    atualizarConsultas();
}

function alterarConsulta(nomePaciente) {
    const consulta = consultas.find(consulta => consulta.nomePaciente === nomePaciente);
    document.getElementById("nomePaciente").value = consulta.nomePaciente;
    document.getElementById("responsavel").value = consulta.responsavel;
    document.getElementById("idade").value = consulta.idade;
    document.getElementById("telefone").value = consulta.telefone;
    document.getElementById("especialista").value = consulta.especialista;
    document.getElementById("consultorio").value = consulta.consultorio;
    document.getElementById("dataConsulta").value = consulta.dataConsulta;
    document.getElementById("horarioConsulta").value = consulta.horarioConsulta;
    document.getElementById("recomendacoes").value = consulta.recomendacoes;

    excluirConsulta(nomePaciente);
}
