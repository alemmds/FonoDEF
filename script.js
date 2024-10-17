let consultas = [];

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
        recomendacoes
    };

    consultas.push(novaConsulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
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
            consultaDiv.className = "consulta";
            consultaDiv.innerHTML = `
                <strong>${consulta.nomePaciente}</strong><br>
                Responsável: ${consulta.responsavel}<br>
                Especialista: ${consulta.especialista}<br>
                Horário: ${consulta.horarioConsulta}<br>
                <button class="alterar" onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                <button class="excluir" onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
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

    for (const [mesAno, consultasDoMes] of Object.entries(meses)) {
        const mesDiv = document.createElement("div");
        mesDiv.innerHTML = `<h3>${mesAno}</h3>`;
        consultasDoMes.forEach(consulta => {
            const consultaDiv = document.createElement("div");
            consultaDiv.className = "consulta";
            consultaDiv.innerHTML = `
                <strong>${consulta.nomePaciente}</strong><br>
                Data: ${consulta.dataConsulta}<br>
                Especialista: ${consulta.especialista}<br>
                Horário: ${consulta.horarioConsulta}<br>
                <button class="alterar" onclick="alterarConsulta('${consulta.nomePaciente}')">Alterar</button>
                <button class="excluir" onclick="excluirConsulta('${consulta.nomePaciente}')">Excluir</button>
            `;
            mesDiv.appendChild(consultaDiv);
        });
        consultasPorMes.appendChild(mesDiv);
    }
}

function excluirConsulta(nomePaciente) {
    consultas = consultas.filter(consulta => consulta.nomePaciente !== nomePaciente);
    localStorage.setItem('consultas', JSON.stringify(consultas));
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

function filtrarConsultas() {
    const especialidade = document.getElementById("filtroEspecialidade").value.toLowerCase();
    const data = document.getElementById("filtroData").value;

    const consultasFiltradas = consultas.filter(consulta => {
        return (!especialidade || consulta.especialista.toLowerCase().includes(especialidade)) &&
               (!data || consulta.dataConsulta === data);
    });

    const filtroResultados = document.getElementById("filtroResultados");
    filtroResultados.innerHTML = '';

    consultasFiltradas.forEach(consulta => {
        const consultaDiv = document.createElement("div");
        consultaDiv.className = "consulta";
        consultaDiv.innerHTML = `
            <strong>${consulta.nomePaciente}</strong><br>
            Responsável: ${consulta.responsavel}<br>
            Especialista: ${consulta.especialista}<br>
            Horário: ${consulta.horarioConsulta}<br>
        `;
        filtroResultados.appendChild(consultaDiv);
    });
}