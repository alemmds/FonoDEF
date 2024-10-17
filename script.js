document.addEventListener('DOMContentLoaded', function () {
    let consultas = [];
    const salvarConsultaBtn = document.getElementById('salvarConsulta');
    const consultasHojeDiv = document.getElementById('consultasHoje');
    const consultasPorMesDiv = document.getElementById('consultasPorMes');

    // Função para salvar a consulta
    salvarConsultaBtn.addEventListener('click', function () {
        const consulta = {
            nome: document.getElementById('nome').value,
            responsavel: document.getElementById('responsavel').value,
            idade: document.getElementById('idade').value,
            telefone: document.getElementById('telefone').value,
            especialidade: document.getElementById('especialidade').value,
            consultorio: document.getElementById('consultorio').value,
            dataConsulta: document.getElementById('dataConsulta').value,
            horarioConsulta: document.getElementById('horarioConsulta').value,
            recomendacoes: document.getElementById('recomendacoes').value
        };

        consultas.push(consulta);
        exibirConsultasHoje();
        exibirConsultasPorMes();
    });

    // Função para exibir as consultas de hoje
    function exibirConsultasHoje() {
        consultasHojeDiv.innerHTML = '';
        consultas.forEach((consulta, index) => {
            const consultaDiv = document.createElement('div');
            consultaDiv.classList.add('consulta');
            consultaDiv.innerHTML = `
                <p>Nome: ${consulta.nome}</p>
                <p>Responsável: ${consulta.responsavel}</p>
                <p>Idade: ${consulta.idade}</p>
                <p>Telefone: ${consulta.telefone}</p>
                <p>Especialidade: ${consulta.especialidade}</p>
                <p>Consultório: ${consulta.consultorio}</p>
                <p>Data da Consulta: ${consulta.dataConsulta}</p>
                <p>Horário: ${consulta.horarioConsulta}</p>
                <p>Recomendações: ${consulta.recomendacoes}</p>
                <button class="alterar" onclick="alterarConsulta(${index})">Alterar</button>
                <button class="excluir" onclick="excluirConsulta(${index})">Excluir</button>
            `;
            consultasHojeDiv.appendChild(consultaDiv);
        });
    }

    // Função para exibir consultas por mês
    function exibirConsultasPorMes() {
        consultasPorMesDiv.innerHTML = '';
        consultas.forEach(consulta => {
            const consultaMesDiv = document.createElement('div');
            consultaMesDiv.classList.add('consulta-mes');
            consultaMesDiv.innerHTML = `
                <p>Nome: ${consulta.nome}</p>
                <p>Data: ${consulta.dataConsulta}</p>
            `;
            consultasPorMesDiv.appendChild(consultaMesDiv);
        });
    }

    // Função para excluir consulta
    window.excluirConsulta = function (index) {
        consultas.splice(index, 1);
        exibirConsultasHoje();
        exibirConsultasPorMes();
    };

    // Função para alterar consulta
    window.alterarConsulta = function (index) {
        const consulta = consultas[index];
        document.getElementById('nome').value = consulta.nome;
        document.getElementById('responsavel').value = consulta.responsavel;
        document.getElementById('idade').value = consulta.idade;
        document.getElementById('telefone').value = consulta.telefone;
        document.getElementById('especialidade').value = consulta.especialidade;
        document.getElementById('consultorio').value = consulta.consultorio;
        document.getElementById('dataConsulta').value = consulta.dataConsulta;
        document.getElementById('horarioConsulta').value = consulta.horarioConsulta;
        document.getElementById('recomendacoes').value = consulta.recomendacoes;

        // Remove a consulta antiga para poder salvar a nova alteração
        consultas.splice(index, 1);
    };
});
