// Array para armazenar consultas
let consultas = [];

// Função para salvar a consulta
function salvarConsulta() {
    const nomePaciente = document.getElementById('nome-paciente').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialista = document.getElementById('especialista').value;
    const consultorio = document.getElementById('consultorio').value;
    const dataConsulta = document.getElementById('data-consulta-cadastro').value;
    const horaConsulta = document.getElementById('hora-consulta').value;

    if (!nomePaciente || !dataConsulta) {
        alert('Por favor, preencha os campos obrigatórios.');
        return;
    }

    const consulta = {
        nomePaciente,
        responsavel,
        idade,
        telefone,
        especialista,
        consultorio,
        dataConsulta,
        horaConsulta
    };

    consultas.push(consulta);

    // Atualiza a exibição dos meses e dias cadastrados
    atualizarMesesEDias();

    alert('Consulta salva com sucesso!');
    limparFormulario();
}

// Função para exibir os meses e dias cadastrados
function atualizarMesesEDias() {
    const mesesDiv = document.getElementById('consultasPorMes');
    const diasDiv = document.getElementById('diasDoMes');
    mesesDiv.innerHTML = '';
    diasDiv.innerHTML = '';

    // Criando um mapa de meses com seus respectivos dias
    const mesesMap = {};

    consultas.forEach(consulta => {
        const [ano, mes, dia] = consulta.dataConsulta.split('-');
        const mesAno = `${mes}/${ano}`;

        if (!mesesMap[mesAno]) {
            mesesMap[mesAno] = [];
        }
        mesesMap[mesAno].push(dia);
    });

    // Exibindo os meses e criando botões para cada mês
    Object.keys(mesesMap).forEach(mesAno => {
        const mesBtn = document.createElement('button');
        mesBtn.classList.add('button-dia');
        mesBtn.innerText = `Mês: ${mesAno}`;
        mesBtn.onclick = () => exibirDiasDoMes(mesesMap[mesAno], mesAno);
        mesesDiv.appendChild(mesBtn);
    });
}

// Função para exibir os dias de um determinado mês
function exibirDiasDoMes(dias, mesAno) {
    const diasDiv = document.getElementById('diasDoMes');
    diasDiv.innerHTML = `<h3>Dias do Mês: ${mesAno}</h3>`;

    dias.forEach(dia => {
        const diaBtn = document.createElement('button');
        diaBtn.classList.add('button-dia');
        diaBtn.innerText = `Dia: ${dia}`;
        diaBtn.onclick = () => exibirConsultasPorDia(dia, mesAno);
        diasDiv.appendChild(diaBtn);
    });
}

// Função para exibir as consultas de um determinado dia
function exibirConsultasPorDia(dia, mesAno) {
    const resultadoDiv = document.getElementById('resultadoConsulta');
    resultadoDiv.innerHTML = `<h3>Consultas do Dia ${dia} do Mês ${mesAno}</h3>`;

    // Filtra as consultas para o dia e mês selecionados
    const consultasDoDia = consultas.filter(consulta => {
        const [ano, mes, diaConsulta] = consulta.dataConsulta.split('-');
        const mesAnoConsulta = `${mes}/${ano}`;
        return diaConsulta === dia && mesAnoConsulta === mesAno;
    });

    // Exibe as consultas
    consultasDoDia.forEach((consulta, index) => {
        const consultaDiv = document.createElement('div');
        consultaDiv.classList.add('consulta-item');
        consultaDiv.innerHTML = `
            <p><strong>Paciente:</strong> ${consulta.nomePaciente}</p>
            <p><strong>Especialista:</strong> ${consulta.especialista}</p>
            <p><strong>Consultório:</strong> ${consulta.consultorio}</p>
            <p><strong>Horário:</strong> ${consulta.horaConsulta}</p>
            <button class="btn-editar" onclick="editarConsulta(${index})">Editar</button>
            <button class="btn-excluir" onclick="excluirConsulta(${index})">Excluir</button>
        `;
        resultadoDiv.appendChild(consultaDiv);
    });
}

// Função para editar uma consulta
function editarConsulta(index) {
    const consulta = consultas[index];

    // Preenche o formulário com os dados da consulta a ser editada
    document.getElementById('nome-paciente').value = consulta.nomePaciente;
    document.getElementById('responsavel').value = consulta.responsavel;
    document.getElementById('idade').value = consulta.idade;
    document.getElementById('telefone').value = consulta.telefone;
    document.getElementById('especialista').value = consulta.especialista;
    document.getElementById('consultorio').value = consulta.consultorio;
    document.getElementById('data-consulta-cadastro').value = consulta.dataConsulta;
    document.getElementById('hora-consulta').value = consulta.horaConsulta;

    // Remove a consulta antiga da lista e atualiza
    excluirConsulta(index);
}

// Função para excluir uma consulta
function excluirConsulta(index) {
    consultas.splice(index, 1);
    atualizarMesesEDias();
    document.getElementById('resultadoConsulta').innerHTML = '';
    alert('Consulta excluída com sucesso!');
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('nome-paciente').value = '';
    document.getElementById('responsavel').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('especialista').value = '';
    document.getElementById('consultorio').value = '';
    document.getElementById('data-consulta-cadastro').value = '';
    document.getElementById('hora-consulta').value = '';
}

// Função para filtrar consultas (opcional)
function filtrarConsultas() {
    const especialidade = document.getElementById('especialidade').value;
    const dataConsulta = document.getElementById('data-consulta').value;

    // Filtra as consultas de acordo com a especialidade e data
    const consultasFiltradas = consultas.filter(consulta => {
        return (especialidade === '' || consulta.especialista.includes(especialidade)) &&
               (dataConsulta === '' || consulta.dataConsulta === dataConsulta);
    });

    const resultadoDiv = document.getElementById('resultadoConsulta');
    resultadoDiv.innerHTML = '<h3>Resultado do Filtro:</h3>';

    consultasFiltradas.forEach((consulta, index) => {
        const consultaDiv = document.createElement('div');
        consultaDiv.classList.add('consulta-item');
        consultaDiv.innerHTML = `
            <p><strong>Paciente:</strong> ${consulta.nomePaciente}</p>
            <p><strong>Especialista:</strong> ${consulta.especialista}</p>
            <p><strong>Consultório:</strong> ${consulta.consultorio}</p>
            <p><strong>Horário:</strong> ${consulta.horaConsulta}</p>
            <button class="btn-editar" onclick="editarConsulta(${index})">Editar</button>
            <button class="btn-excluir" onclick="excluirConsulta(${index})">Excluir</button>
        `;
        resultadoDiv.appendChild(consultaDiv);
    });
}