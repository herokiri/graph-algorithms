class Graph {
    constructor(vertices) {
      this.vertices = vertices;
      this.adjacencyMatrix = new Array(vertices).fill(null).map(() => new Array(vertices).fill(0));
    }
  
    addEdge(u, v, capacity) {
      this.adjacencyMatrix[u][v] = capacity;
    }
  
    fordFulkerson(source, sink) {
      let maxFlow = 0;
      
      while (true) {
        const path = this.dfs(source, sink);
  
        if (!path) {
          break; // Нет увеличивающегося пути
        }
  
        let minCapacity = Infinity;
  
        // Находим минимальную пропускную способность вдоль пути
        for (let v = sink; v !== source; v = path[v].parent) {
          const u = path[v].parent;
          minCapacity = Math.min(minCapacity, this.adjacencyMatrix[u][v]);
        }
  
        // Обновляем рёбра сети
        for (let v = sink; v !== source; v = path[v].parent) {
          const u = path[v].parent;
          this.adjacencyMatrix[u][v] -= minCapacity;
          this.adjacencyMatrix[v][u] += minCapacity;
        }
  
        maxFlow += minCapacity;
      }
  
      return maxFlow;
    }
  
    dfs(source, sink) {
      const visited = new Array(this.vertices).fill(false);
      const stack = [{ vertex: source, parent: null }];
  
      while (stack.length > 0) {
        const { vertex, parent } = stack.pop();
  
        if (!visited[vertex]) {
          visited[vertex] = true;
  
          if (vertex === sink) {
            // Путь найден
            const path = [];
            let current = vertex;
            while (current !== source) {
              path.push({ vertex: current, parent: parent });
              current = parent;
            }
            path.push({ vertex: source, parent: null });
            return path.reverse();
          }
  
          for (let v = 0; v < this.vertices; v++) {
            if (!visited[v] && this.adjacencyMatrix[vertex][v] > 0) {
              stack.push({ vertex: v, parent: vertex });
            }
          }
        }
      }
  
      return null; // Нет увеличивающегося пути
    }
  }
  
  // Пример использования:
  
  const graph = new Graph(6);
  
  graph.addEdge(0, 1, 16);
  graph.addEdge(0, 2, 13);
  graph.addEdge(1, 2, 10);
  graph.addEdge(2, 1, 4);
  graph.addEdge(1, 3, 12);
  graph.addEdge(3, 2, 9);
  graph.addEdge(2, 4, 14);
  graph.addEdge(4, 3, 7);
  graph.addEdge(3, 5, 20);
  graph.addEdge(4, 5, 4);
  
  const source = 0;
  const sink = 5;
  
  const maxFlow = graph.fordFulkerson(source, sink);
  
  console.log(`Максимальный поток из истока ${source} в сток ${sink}: ${maxFlow}`);
  