document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const responsavel = document.getElementById('responsavel').value;
    const idade = document.getElementById('idade').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;

    // Salvar consulta em localStorage ou enviar para o servidor
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const novaConsulta = { nome, responsavel, idade, telefone, especialidade, data, horario };
    consultas.push(novaConsulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    alert('Consulta salva com sucesso!');
    this.reset();
});

document.getElementById('consultasDiarias').addEventListener('click', function() {
    mostrarConsultas('diarias');
});

document.getElementById('consultasMes').addEventListener('click', function() {
    mostrarConsultas('mes');
});

function mostrarConsultas(tipo) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    let resultadoHTML = '';

    if (consultas.length === 0) {
        resultadoHTML = '<p>Nenhuma consulta encontrada.</p>';
    } else {
        consultas.forEach(consulta => {
            resultadoHTML += `
                <div class="consulta-item">
                    <p><strong>Nome:</strong> ${consulta.nome}</p>
                    <p><strong>Responsável:</strong> ${consulta.responsavel}</p>
                    <p><strong>Idade:</strong> ${consulta.idade}</p>
                    <p><strong>Telefone:</strong> ${consulta.telefone}</p>
                    <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                    <p><strong>Data:</strong> ${consulta.data}</p>
                    <p><strong>Horário:</strong> ${consulta.horario}</p>
                    <button class="excluir" onclick="excluirConsulta('${consulta.nome}')">Excluir</button>
                </div>
            `;
        });
    }

    document.getElementById('listaConsultas').innerHTML = resultadoHTML;
}

function excluirConsulta(nome) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const novasConsultas = consultas.filter(consulta => consulta.nome !== nome);
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
    alert('Consulta excluída com sucesso!');
    mostrarConsultas();
}