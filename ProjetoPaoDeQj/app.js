const request = document.querySelector('.request-box');

if (window.outerWidth < 1000) {
    request.classList.remove('mt');
}

function empty(obj) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

const btnAddProd = document.querySelector('.addprod');
const listProds = document.querySelector('.products-box ul');

let count = 0;

function addProd() {

    const codProd = document.querySelector('#codprod').value;
    const qtdProd = document.querySelector('#qtdprod').value;

    if (!codProd || !qtdProd) {
        return false;
    }

    count++;
    let li = document.createElement('li');
    let classe = 'prod' + count;
    li.classList.add(classe);
    li.innerHTML = `<span data-name='${codProd}' data-value='${qtdProd}'>Produto: ${codProd} | Qtd: ${qtdProd} </span><button class='remove'>X</button>`;
    listProds.appendChild(li);

    const remove = document.querySelectorAll('.remove');
    remove.forEach(item => {
        item.addEventListener('click', (e) => {
            e.target.parentNode.remove();
        });
    });

    document.querySelector('#codprod').value = "";
    document.querySelector('#qtdprod').value = "";

}
btnAddProd.addEventListener('click', addProd, false);

function searchFantasyName(e) {
    e.preventDefault();

    let xhttp = new XMLHttpRequest();

    let params = "search=" + document.querySelector('#fantasyName').value;

    xhttp.open('POST', './fantasyName.php');

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === 4) {

            const result = document.querySelector('.result-box');

            if (xhttp.response === "error") {
                result.innerHTML = (
                    `
                    <h3>Resultado da pesquisa:</h3>
                    <div class="result" style="min-height:0">
                    <ul>
                    <li>Não encontrado.</li>
                    </ul>
                    </div>
                    `
                );
                if (window.outerWidth > 1000) {
                    request.classList.remove('mt');
                    request.classList.add('mt2');
                }

                return false;
            }

            data = JSON.parse(xhttp.response);



            result.innerHTML = (
                `
                <h3>Resultado da pesquisa:</h3>
                <div class="result">
                    <ul>
                        <li>Nome fantasia: ${data.nomef}</li>
                        <li>Código do cliente: ${data.codpdv}</li>
                        <li>Endereço: ${data.end}</li>
                        <li>Número: ${data.num} </li>
                        <li>Bairro: ${data.bairro} </li>
                        <li>Cidade: ${data.cidade} </li>
                    </ul>
                </div>
                `
            );
            if (window.outerWidth > 1000) {
                request.classList.remove('mt');
                request.classList.remove('mt2');
            }
        }
    };
    xhttp.send(params);
}

function searchProductName(e) {
    e.preventDefault();

    let xhttp = new XMLHttpRequest();

    let params = "search=" + document.querySelector('#productName').value;

    xhttp.open('POST', './productName.php');

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
            const result = document.querySelector('.result-box');
            const request = document.querySelector('.request-box');

            if (xhttp.response === "error") {
                result.innerHTML = (
                    `
                    <h3>Resultado da pesquisa:</h3>
                    <div class="result" style="min-height:0">
                    <ul>
                        <li>Não encontrado.</li>
                    </ul>
                    </div>
                    `
                );
                if (window.outerWidth > 1000) {
                    request.classList.remove('mt');
                    request.classList.add('mt2');
                }

                return;
            }

            data = JSON.parse(xhttp.response);


            result.innerHTML = (
                `
                <h3>Resultado da pesquisa:</h3>
                <div class="result">
                <ul>
                    <li><b>Código do produto:</b> ${data.id}</li>
                    <li><b>Nome do produto:</b> ${data.nomep}</li>
                </ul>
                </div>
                `
            );
            if (window.outerWidth > 1000) {
                request.classList.remove('mt');
                request.classList.remove('mt2');
            }
        }
    };
    xhttp.send(params);
}

function sendForm(e) {

    e.preventDefault();

    let xhttp = new XMLHttpRequest();

    const products = document.querySelectorAll('.products-box ul li span');

    let prod = {};
    products.forEach(p => {
        let nameAtr = p.getAttribute('data-name');
        let valueAtr = p.getAttribute('data-value');
        prod[nameAtr] = valueAtr;
    });


    let params = {
        codcli: document.querySelector('#codcli').value,
        date: document.querySelector('#date').value,
        products: prod
    }

    if (empty(prod)) {
        alert('Você precisa adicionar produtos para fazer um pedido!');
        return;
    } else if (empty(params.codcli)) {
        alert('Você precisa preencher seu código de cliente para fazer um pedido!');
        return;
    } else if (empty(params.date)) {
        alert('Você precisa inserir uma data para fazer um pedido!');
        return;
    }

    xhttp.open('POST', './sendForm.php');

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
            if (!(xhttp.response === "success")) {
                alert('Ocorreu um erro, verifique todos os campos e tente novamente!');
                return;
            }

            document.querySelector('.products-box ul').innerHTML = "";
            document.querySelector('#codcli').value = "";
            document.querySelector('#date').value = "";
            alert('Seu pedido foi recebido com sucesso!');
        }
    };

    xhttp.send("data=" + JSON.stringify(params));
}

function dateNow() {
    const today = new Date();
    const dy = today.getDate();
    const mt = today.getMonth() + 1;
    const yr = today.getFullYear();
    document.getElementById('date').value = yr + "-" + mt + "-" + dy;
}

window.onload = dateNow;
document.querySelector('.formProductName').addEventListener('submit', searchProductName, true);
document.querySelector('.formFantasyName').addEventListener('submit', searchFantasyName, true);
document.querySelector('.your-products').addEventListener('submit', sendForm, true);