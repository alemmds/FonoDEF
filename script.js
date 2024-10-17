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
            const mesDiv = document.createElement("div");
            mesDiv.innerHTML = `<strong>${mes}</strong>`;
            const diaButton = document.createElement("button");
            diaButton.innerText = dia;
            diaButton.onclick = function() {
                displayConsultaInfo(consulta);
            };

            mesDiv.appendChild(diaButton);
            consultasMes.appendChild(mesDiv);
        });
    }

    function displayConsultaInfo(consulta) {
        resultadoFiltro.innerHTML = `
            <div>
                <p><strong>Nome:</strong> ${consulta.nome}</p>
                <p><strong>Responsável:</strong> ${consulta.responsavel}</p>
                <p><strong>Idade:</strong> ${consulta.idade}</p>
                <p><strong>Consultório:</strong> ${consulta.consultorio}</p>
                <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                <p><strong>Data da Consulta:</strong> ${consulta.dataConsulta}</p>
                <p><strong>Horário da Consulta:</strong> ${consulta.horarioConsulta}</p>
                <button onclick="editConsulta('${consulta.nome}')">Editar</button>
                <button onclick="deleteConsulta('${consulta.nome}')">Excluir</button>
            </div>
        `;
    }

    function editConsulta(nome) {
        // Lógica para editar consulta
    }

    function deleteConsulta(nome) {
        const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
        const updatedConsultas = consultas.filter(consulta => consulta.nome !== nome);
        localStorage.setItem("consultas", JSON.stringify(updatedConsultas));
        loadConsultas();
    }

    loadConsultas();
});