# Conteudo principal da API da Bussolar

## Pre-requisitos

Necessário possuir o Python 3.5 ou superior instalado. Além disso é requerido o gerenciador de pacotes PIP. E ainda o Postgresql é indicado. Outro gerenciador de banco de dados pode ser utilizado, mas não foi testado.

## Scripts

Nesse projeto é necessário executar o script abaixo antes de qualquer ação. Esse comando faz a instalação das dependências do projeto:

### `pip install -r requirements.txt`

Depois, execute o comando para criar as tabelas na base de dados. O arquivo api/settings.py precisa ser ajustado para as configurações locais do PostgresSql.

### `python manage.py migrate`

Feito isso a aplicação pode ser executada com:

### `python manage.py runserver`

A aplicação irá rodar em ambiente de desenvolvimento na url Open [http://localhost:8000](http://localhost:8000)