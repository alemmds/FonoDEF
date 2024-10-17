document.addEventListener("DOMContentLoaded", function () {
    const salvarConsultaBtn = document.getElementById("salvar-consulta-btn");
    const confirmarBtn = document.getElementById("confirmar-btn");

    let consultas = [];

    // Função para salvar consulta
    salvarConsultaBtn.addEventListener("click", function () {
        const nomePaciente = document.getElementById("nome-paciente").value;
        const responsavel = document.getElementById("responsavel").value;
        const idade = document.getElementById("idade").value;
        const telefone = document.getElementById("telefone").value;
        const especialidade = document.getElementById("especialidade-cadastro").value;
        const consultorio = document.getElementById("consultorio").value;
        const dataConsulta = document.getElementById("data-consulta").value;
        const horarioConsulta = document.getElementById("horario-consulta").value;
        const recomendacoes = document.getElementById("recomendacoes").value;

        const consulta = {
            nomePaciente,
            responsavel,
            idade,
            telefone,
            especialidade,
            consultorio,
            dataConsulta,
            horarioConsulta,
            recomendacoes,
        };

        consultas.push(consulta);
        alert("Consulta salva com sucesso!");
        exibirConsultasMensais();
    });

    // Função para exibir consultas do mês
    function exibirConsultasMensais() {
        const consultasMes = consultas.filter(consulta => consulta.dataConsulta.includes("2024-10")); // Exemplo de mês/ano fixo
        const consultasMensaisLista = document.getElementById("consultas-mensais-lista");
        consultasMensaisLista.innerHTML = '';

        consultasMes.forEach(consulta => {
            const btn = document.createElement("button");
            btn.innerText = consulta.dataConsulta.split("-")[2]; // Exibe o dia da consulta
            consultasMensaisLista.appendChild(btn);
        });
    }

    // Função de filtro de consultas
    confirmarBtn.addEventListener("click", function () {
        const especialidadeFiltro = document.getElementById("especialidade").value;
        const dataFiltro = document.getElementById("data").value;

        const consultasFiltradas = consultas.filter(consulta =>
            consulta.especialidade.includes(especialidadeFiltro) &&
            consulta.dataConsulta === dataFiltro
        );

        const consultasDiariasLista = document.getElementById("consultas-diarias-lista");
        consultasDiariasLista.innerHTML = '';

        consultasFiltradas.forEach(consulta => {
            const consultaDiv = document.createElement("div");
            consultaDiv.innerText = `Paciente: ${consulta.nomePaciente}, Hora: ${consulta.horarioConsulta}`;
            consultasDiariasLista.appendChild(consultaDiv);
        });
    });
});