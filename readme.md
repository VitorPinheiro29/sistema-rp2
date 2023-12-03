# Backend - Sistema RP2

Uma aplicação Web REST API construída em Django. Utiliza o banco de dados **SQLite** para armazenar vértices e arestas cadastrados.

## Como executar
> ~$ pip install -r requirements.txt  

> ~$ python manage.py runserver

## Como usar

Apresenta três endpoints principais que podem ser consumidos:

* **http://127.0.0.1:8000/edges/**: recupera (GET) ou cadastra (POST) arestas
* **http://127.0.0.1:8000/vertices/**: recupera (GET) ou cadastra (POST) vértices
* **http://127.0.0.1:8000/acessible-route/**: obtêm (GET) a rota mais acessível entre os vértices **x** e **y**, considerando o estado atual também do ambiente (chovendo ou lotado/movimentado)
  * Query Params:
    * origin=x: ponto de origem da rota
    * destiny=y: ponto de destino da rota
    * raining=true/false: indica se está chovendo e se deve ser considerada (true) ou não (false) rotas cobertas
    * crowded=true/false: indica que as rotas devem (false) ou não (true) estarem lotadas/movimentadas por pessoas

## Modelagem do banco de dados

O banco de dados contém uma tabela de vértices (**myapp_vertex**) e arestas (**myapp_edge**).

### myapp_vertex

**Na aplicação podem existir três tipos de vértices:**
* Vértice de estrutura: representa estruturas construídas como prédios, salas ou áreas cobertas. Para as estruturas, os vértices representam somente passagens de entrada ou saída, como portas.

* Vértice de caminho: representa pontos de orientação de rota (waypoints). Identificam pontos de entrada ou saída de ruas, calçadas e de faixa de pedestres.

* Vértice de obstáculo ou barreira: representa características físicas de um ponto de um caminho ou rota que possam impactar a acessibilidade como buracos, poças d'água

Os vértices são diferenciados pela flag **VertexType**, podendo ser:
* STRUCTURE: vértice de estrutura
* WAYPOINT: vértice de caminho
* OBSTACLE: vértice de obstáculo ou barreira

**Colunas**:
* Name (str): nome representativo do vértice
* Id (str): identificador único de um vértice 
* Latitude (decimal): coordenada geográfica
* Longitude (decimal): coordenada geográfica
* VertexType (str): indica o tipo de vértice (structure, waypoint ou obstacle)
* IsAcessible (boolean): Se True, representa uma característica de acessibilidade. Se False, é inacessível por algum motivo
* Observation (str): breve descrição sobre o vértice

### myapp_edge

**Na podem aplicação existir dois tipos de arestas:**
* Aresta coberta: representa rotas ou caminhos que estão cobertos por alguma estrutura. São rotas, portanto, protegidas de chuva.
* Aresta descoberta: representa rotas ou caminhos que não estão cobertos por alguma estrutura. São rotas, portanto, desprotegidas de chuva. 

A diferenciação entre as arestas é realizada através da flag **IsCovered**.

**Colunas**
* Id: identificador único da aresta
* Name: nome representativo da aresta
* origin = vértice de origem da aresta
* destiny = vértice de destino da aresta
* length = comprimento em metros da aresta
* width = largura em metros da aresta
* slope = inclinação da aresta (%)
* surface_type = tipo de superfície da aresta
* surface_quality = qualidade da superfície
* segment_type = tipo de segmento
* IsCovered (boolean): se True a aresta é coberta. Se False, a aresta não é coberta
* IsCrowded: se True a rota que a aresta representa está muito obstruída ou movimenta por pessoas. Caso ao contrário, está vazia ou sem impecílhos para movimentação