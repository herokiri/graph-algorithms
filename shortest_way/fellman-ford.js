class Graph {
    constructor() {
      this.vertices = new Set();
      this.edges = [];
    }
  
    addVertex(vertex) {
      this.vertices.add(vertex);
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges.push({ vertex1, vertex2, weight });
    }
  
    bellmanFordAlgorithm(startingNode) {
      const distances = {};
      const predecessor = {};
      
      // Инициализация расстояний. Начальная вершина имеет расстояние 0, остальные - Infinity.
      for (const vertex of this.vertices) {
        distances[vertex] = vertex === startingNode ? 0 : Infinity;
        predecessor[vertex] = null;
      }
  
      // Релаксация рёбер
      for (let i = 1; i < this.vertices.size; i++) {
        for (const edge of this.edges) {
          const { vertex1, vertex2, weight } = edge;
  
          if (distances[vertex1] + weight < distances[vertex2]) {
            distances[vertex2] = distances[vertex1] + weight;
            predecessor[vertex2] = vertex1;
          }
        }
      }
  
      // Проверка наличия отрицательных циклов
      for (const edge of this.edges) {
        const { vertex1, vertex2, weight } = edge;
  
        if (distances[vertex1] + weight < distances[vertex2]) {
          // Граф содержит отрицательный цикл
          return { hasNegativeCycle: true, negativeCycle: this.extractNegativeCycle(vertex1, predecessor) };
        }
      }
  
      return { distances, predecessor, hasNegativeCycle: false };
    }
  
    extractNegativeCycle(startVertex, predecessor) {
      const cycle = [startVertex];
      let currentVertex = startVertex;
  
      for (let i = 0; i < this.vertices.size; i++) {
        currentVertex = predecessor[currentVertex];
        cycle.push(currentVertex);
  
        if (currentVertex === startVertex) {
          return cycle.reverse();
        }
      }
  
      return null;
    }
  }
  
  // Пример использования:
  
  const graph = new Graph();
  
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  
  graph.addEdge('A', 'B', 2);
  graph.addEdge('A', 'C', 4);
  graph.addEdge('B', 'C', 1);
  graph.addEdge('B', 'D', 7);
  graph.addEdge('C', 'E', 3);
  graph.addEdge('D', 'E', 1);
  
  const startingNode = 'A';
  const result = graph.bellmanFordAlgorithm(startingNode);
  
  if (result.hasNegativeCycle) {
    console.log('Graph contains a negative cycle:', result.negativeCycle);
  } else {
    console.log(`Shortest distances from node ${startingNode}:`, result.distances);
  }
  