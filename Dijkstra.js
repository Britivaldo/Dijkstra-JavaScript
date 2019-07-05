var Aresta = function (v, p) {
    var vertice = v;
    var peso = p;
    this.printAresta = function () {
        console.log(vertice);
        console.log(peso);
    }
    this.getPeso = function () {
        return peso;
    }
    this.getVertice = function () {
        return vertice;
    }
}

var Fila = function (distancia, origem) {
    var d = distancia;
    var o = origem;

    this.printFila = function () {
        console.log("d: " + d + " v: " + o);
    }

    this.getD = function () {
        return d;
    }
    this.getO = function () {
        return o;
    }
}

var Grafo = function (v) {
    var numeroVertice = v;
    var adj = Array();
    var arrayVazio = [];

    for (var i = 0; i < numeroVertice; i++) {
        
        adj[i] = arrayVazio;
    }

    this.addAresta = function (v1, v2, p) {
        aresta = new Aresta(v2, p);
        if (adj[v1].length != 0) {
            adj[v1].push(aresta);
            
        } else {

            var vizinho = new Array();
            vizinho.push(aresta);
            adj[v1] = vizinho;
        }
    }


    this.dijkstra = function (origem, destino) {
        var distancia = new Array();
        var visitados = new Array();

        //criar fila de prioridade//
        var pq = new Array();

        for (var i = 0; i < numeroVertice; i++) {
            distancia[i] = 100000000000; 
            visitados[i] = false;
        }

        distancia[origem] = 0;

        var fila = new Fila(distancia[origem], origem);
        pq.push(fila);


        while (pq.length != 0) {

            var p = pq[pq.length - 1];
            var u = p.getO();
            pq.pop();

            if (visitados[u] == false) {

                visitados[u] = true;

                for (var j = 0; j < adj[u].length; j++) {
                    var v = adj[u][j].getVertice();

                    var custo = adj[u][j].getPeso();

                    if (distancia[v] > (distancia[u] + custo)) {
                        distancia[v] = distancia[u] + custo;
                        var novo = new Fila(distancia[v], v);
                        pq.push(novo);
                    }

                }

            }
        }
        return distancia[destino];
    }

    this.print = function (v) {
        console.log("Caminho:");
        //v é o vertice inicial
        console.log(v);
        for (var i = 0; i < adj.length; i++) {
            for (var j = 0; j < adj[i].length; j++) {
                console.log(adj[i][j].getVertice());
            }
        }

    }
}

var grafo = new Grafo(30);
//criando as arestas do grafo
grafo.addAresta(0, 1, 1);
grafo.addAresta(1, 16, 1);
grafo.addAresta(16, 15, 1);
grafo.addAresta(15, 20, 1);
grafo.addAresta(20, 21, 1);
//mostrando o caminho
grafo.print(0);

console.log("Menor Caminho: " + grafo.dijkstra(0, 21));