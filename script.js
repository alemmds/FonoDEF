document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");
    const resultadoFiltro = document.getElementById("resultadoFiltro");
    const consultasMes = document.getElementById("consultasMes");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const responsavel = document.getElementById("responsavel").value;
        const idade = document.getElementById("idade").value;
        const consultorio = document.getElementById("consultorio").value;
        const especialidade = document.getElementById("especialidadeCadastro").value;
        const dataConsulta = document.getElementById("dataConsulta").value;
        const horarioConsulta = document.getElementById("horarioConsulta").value;

        // Adiciona a consulta ao localStorage
        const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
        consultas.push({ nome, responsavel, idade, consultorio, especialidade, dataConsulta, horarioConsulta });
        localStorage.setItem("consultas", JSON.stringify(consultas));

        // Limpa o formulário
        form.reset();
        loadConsultas();
    });

    function loadConsultas() {
        consultasMes.innerHTML = '';
        const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
        
        consultas.forEach(consulta => {
            const dia = new Date(consulta.dataConsulta).getDate();
            const mes = new Date(consulta.dataConsulta).toLocaleString('default', { month: 'long' });
            const consultaDiv = document.createElement("div");
            consultaDiv.innerHTML = `<strong>${mes} ${dia}</strong> - ${consulta.nome}`;
            consultasMes.appendChild(consultaDiv);
        });
    }

    loadConsultas();
});
