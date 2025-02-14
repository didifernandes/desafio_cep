function consultarCep() {
    const cep = document.getElementById('cep').value;

    if (!cep) {
        alert('Por favor, digite um CEP');
        return;
    }

    fetch(`http://localhost:8080/api/consultar-cep/${cep}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cep) {
                document.getElementById('resultado').innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Rua:</strong> ${data.logradouro || 'Não informado'}</p>
                    <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>
                    <p><strong>Cidade:</strong> ${data.localidade || 'Não informado'}</p>
                    <p><strong>Estado:</strong> ${data.estado || 'Não informado'}</p>
                `;
            } else {
                document.getElementById('resultado').innerHTML = `<p>CEP não encontrado.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            document.getElementById('resultado').innerHTML = `<p>Erro ao buscar CEP.</p>`;
        });
}

function listarEnderecos() {
    const campo = document.getElementById('campoOrdenacao').value;
    const crescente = document.getElementById('ordemCrescente').checked;

    fetch(`http://localhost:8080/api/enderecos?campo=${campo}&crescente=${crescente}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = '<h3>Endereços Cadastrados:</h3>';
            if (data.length === 0) {
                html += '<p>Nenhum endereço cadastrado.</p>';
            } else {
                html += '<ul>';
                data.forEach(endereco => {
                    html += `
                    <li>
                        <strong>CEP:</strong> ${endereco.cep} <br>
                        <strong>Rua:</strong> ${endereco.logradouro || 'Não informado'} <br>
                        <strong>Bairro:</strong> ${endereco.bairro || 'Não informado'} <br>
                        <strong>Cidade:</strong> ${endereco.localidade || 'Não informado'} <br>
                        <strong>Estado:</strong> ${endereco.estado || 'Não informado'}
                    </li>
                    <hr>
                    `;
                });
                html += '</ul>';
            }
            document.getElementById('listaEnderecos').innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao listar endereços:', error);
            document.getElementById('listaEnderecos').innerHTML = `<p>Erro ao buscar endereços.</p>`;
        });
}
