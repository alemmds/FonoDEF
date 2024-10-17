// Array para armazenar as consultas
let consultas = [];

// Função para exibir as consultas do dia
function exibirConsultasDoDia() {
    const consultasDiariasLista = document.getElementById("consultas-diarias-lista");
    consultasDiariasLista.innerHTML = "";

    const dataAtual = new Date().toISOString().split('T')[0]; // Obtendo a data atual
    const consultasDoDia = consultas.filter(consulta => consulta.data === dataAtual);

    if (consultasDoDia.length > 0) {
        consultasDoDia.forEach((consulta) => {
            const div = document.createElement("div");
            div.textContent = `${consulta.nome} - ${consulta.horario}`;
            const editarBtn = document.createElement("button");
            editarBtn.textContent = "Editar";
            editarBtn.onclick = () => editarConsulta(consulta);
            const excluirBtn = document.createElement("button");
            excluirBtn.textContent = "Excluir";
            excluirBtn.onclick = () => excluirConsulta(consulta);

            div.appendChild(editarBtn);
            div.appendChild(excluirBtn);
            consultasDiariasLista.appendChild(div);
        });
    } else {
        consultasDiariasLista.textContent = "Nenhuma consulta para hoje.";
    }
}

// Função para exibir consultas por mês
function exibirConsultasPorMes() {
    const consultasMensaisLista = document.getElementById("consultas-mensais-lista");
    consultasMensaisLista.innerHTML = "";

    const consultasPorMes = {};

    consultas.forEach((consulta) => {
        const mesAno = consulta.data.substring(0, 7); // Formato "YYYY-MM"
        if (!consultasPorMes[mesAno]) {
            consultasPorMes[mesAno] = [];
        }
        consultasPorMes[mesAno].push(consulta);
    });

    for (const mes in consultasPorMes) {
        const div = document.createElement("div");
        div.textContent = `Mês: ${mes}`;
        consultasPorMes[mes].forEach((consulta) => {
            const btn = document.createElement("button");
            btn.textContent = `${consulta.data} - ${consulta.nome}`;
            div.appendChild(btn);
        });
        consultasMensaisLista.appendChild(div);
    }
}

// Função para salvar uma nova consulta
document.getElementById("salvar-consulta-btn").addEventListener("click", function () {
    const nomePaciente = document.getElementById("nome-paciente").value;
    const responsavel = document.getElementById("responsavel").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;
    const especialidade = document.getElementById("especialidade-cadastro").value;
    const consultorio = document.getElementById("consultorio").value;
    const dataConsulta = document.getElementById("data-consulta").value;
    const horarioConsulta = document.getElementById("horario-consulta").value;
    const recomendacoes = document.getElementById("recomendacoes").value;

    if (!nomePaciente || !responsavel || !especialidade || !dataConsulta || !horarioConsulta) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const novaConsulta = {
        nome: nomePaciente,
        responsavel: responsavel,
        idade: idade,
        telefone: telefone,
        especialidade: especialidade,
        consultorio: consultorio,
        data: dataConsulta,
        horario: horarioConsulta,
        recomendacoes: recomendacoes
    };

    consultas.push(novaConsulta);
    alert("Consulta salva com sucesso!");
    
    // Limpar os campos do formulário
    document.getElementById("cadastro-form").reset();
    
    // Atualizar exibições
    exibirConsultasDoDia();
    exibirConsultasPorMes();
});

// Função para editar consulta
function editarConsulta(consulta) {
    // Aqui você pode implementar a lógica para editar a consulta selecionada
    alert(`Editar consulta: ${consulta.nome}`);
}

// Função para excluir consulta
function excluirConsulta(consulta) {
    consultas = consultas.filter(c => c !== consulta);
    alert(`Consulta de ${consulta.nome} excluída com sucesso!`);
    
    // Atualizar exibições
    exibirConsultasDoDia();
    exibirConsultasPorMes();
}

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
    exibirConsultasDoDia();
    exibirConsultasPorMes();
});