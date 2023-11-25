# Backend - Sistema RP2

Uma aplicação Web REST API construída em Django. Utliza o banco de dados **SQLite** para armazenar vértices e arestas cadastrados.
Apresenta três endpoints principais que podem ser consumidos:

* **/edges/**: recupera ou cadastra arestas
* **/vertices/**: recupera ou cadastra vértices
* **/acessible-route/?origin=x&destiny=y**: obtêm a rota mais acessível entre os vértices **x** e **y**

## Como executar
> ~$ pip install -r requirements.txt  

> ~$ python manage.py runserver
