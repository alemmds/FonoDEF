let consultas = [];

// Recupera os dados do Local Storage
if (localStorage.getItem('consultas')) {
    consultas = JSON.parse(localStorage.getItem('consultas'));
    atualizarConsultas();
}

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
    localStorage.setItem('consultas', JSON.stringify(consultas)); // Salva no Local Storage
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
                    <button onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                </div>
            `;
            detalhesDiv.appendChild(consultaDiv);
        });

        consultasPorMes.appendChild(mesDiv);
        consultasPorMes.appendChild(detalhesDiv);
    }
}

function excluirConsulta(nomePaciente) {
    consultas = consultas.filter(consulta => consulta.nomePaciente !== nomePaciente);
    localStorage.setItem('consultas', JSON.stringify(consultas)); // Atualiza o Local Storage
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
    }
}

function toggleDetails(mesAno) {
    const detalhesDiv = document.getElementById(mesAno);
    if (detalhesDiv.style.display === "none" || !detalhesDiv.style.display) {
        detalhesDiv.style.display = "block"; // Exibe os detalhes
    } else {
        detalhesDiv.style.display = "none"; // Oculta os detalhes
    }
}

function filtrarConsultas() {
    const especialidade = document.getElementById("filtroEspecialidade").value.toLowerCase();
    const data = document.getElementById("filtroData").value;

    const consultasFiltradas = consultas.filter(consulta => {
        return (!especialidade || consulta.especialista.toLowerCase().includes(especialidade)) &&
               (!data || consulta.dataConsulta === data);
    });

    // Limpar e mostrar as consultas filtradas
    const consultasHoje = document.getElementById("consultasHoje");
    consultasHoje.innerHTML = ''; // Limpar consultas de hoje

    consultasFiltradas.forEach(consulta => {
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
            </div>
        `;
        consultasHoje.appendChild(consultaDiv);
    });
}
