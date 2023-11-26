# Backend - Sistema RP2

Uma aplicação Web REST API construída em Django. Utliza o banco de dados **SQLite** para armazenar vértices e arestas cadastrados.
Apresenta três endpoints principais que podem ser consumidos:

* **/edges/**: recupera (GET) ou cadastra (POST) arestas
* **/vertices/**: recupera (GET) ou cadastra (POST) vértices
* **/acessible-route/?origin=x&destiny=y**: obtêm (GET) a rota mais acessível entre os vértices **x** e **y**

## Como executar
> ~$ pip install -r requirements.txt  

> ~$ python manage.py runserver
