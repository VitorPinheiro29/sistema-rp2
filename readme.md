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

## Métricas para o processamento do caminho mais acessível

Para o processamento do caminho mais acessível é utilizado o algoritmo de Dijkstra. O algoritmo monta uma árvore de menores caminhos a partir de um vértice fonte escolhido. Após isso, a partir do vértice destino, o caminho desejado é extraído de forma descendente da árvore gerada. Desse modo, é possível extrair o caminho mais acessível entre os vértices origem e destino. O peso das arestas é calculado utilizando as características/propriedades listadas abaixo.

* **Length (L)**: indica o comprimento do caminho. O comprimento é uma característica negativa para a acessibilidade, visto que quanto maior a distância a ser percorrida maior é o esforço empregado na locomoção. Essa característica contribui L ao peso da aresta.
  * Intervalo de valores: (0, +infinito]
* **Width (W)**: largura do caminho. A largura do caminho é o espaço destinado exclusivamente a livre circulação de pedestres. É uma característica positiva para a acessibilidade, visto que quanto mais largo a calçada mais facilidade para se deslocar ou se movimentar em direções diferentes. Essa característica contribui (1.2/W)*length ao peso da aresta, onde 1.2m é a largura mínima da faixa livre da calçada, considerando a Lei nº 15.442/2012 que estabelece um novo padrão de fiscalização para as calçadas da cidade de São Paulo e da norma NBR-9050.
* **Height (H)**: altura de um piso em relação aos outros pisos ao seu redor. É uma característica negativa para a acessibilidade, pois aumenta o esforço de locomoção para cadeirantes ou pessoas com mobilidade reduzida. Essa característica contribui H*length ao peso da aresta.
* **Slope (S)**: indica a inclinação de um piso. Essa característica é negativa para a acessibilidade, pois quanto mais inclinado maior é o esforço na locomoção. Essa característica contribui S*length ao peso da aresta.
  * Intervalo de valores: [0, 0.45]
  * De acordo com a NBR-9050, a inclinação/declive deve ser constante e não superior a 8,33%
* **Surface type (ST)**: indica o tipo de superfície. Contribui ST*length ao peso da aresta.
  * Intervalo de valores:
    * 1: superfície ideal para locomoção de cadeirante ou pessoas com mobilidade reduzida
    * 2: superfície moderada para locomoção //
    * 3: superfície ruim para locomoção //
* **Surface quality (SQ)**: indica a qualidade da superfície. Contribui SQ*length ao peso da aresta.
  * Intervalo de valores:
    * 1: qualidade ideal para locomoção de cadeirante ou pessoas com mobilidade reduzida
    * 2: qualidade moderada para locomoção //
    * 3: qualidade ruim para locomoção
* **Segment type (ST)**: indica o tipo de segmento da superfície. Contribui ST*length ao peso da aresta.
  * Intervalo de valores:
    * 1: tipo de segmento ideal para locomoção de cadeirantes ou pessoas com mobilidade reduzida
    * 2: tipo de segmento moderado para locomoção //
    * 3: tipo de segmento ruim para locomoção //
* **IsCovered**: indica se o caminho é coberto ou não, isto é, um caminho protegido de chuva/sol. Contribui 10*length ao peso da aresta. O fator de 10 é aplicado somente se o parâmetro raining=True é passado na requisição. Se raining=False, então o fator aplicado é de 0.
* **IsCrowded**: indica se o caminho está muito lotado ou movimentado por pessoas. Contribui 10*lenth ao peso da aresta. O fator de 10 é aplicado somente se o parâmetro raining=True é passado na requisição. Se raining=False, então o fator aplicado é de 0.





