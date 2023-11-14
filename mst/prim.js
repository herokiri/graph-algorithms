class Graph {
    constructor() {
      this.vertices = [];
      this.edges = new Map();
    }
  
    addVertex(vertex) {
      this.vertices.push(vertex);
      this.edges.set(vertex, []);
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges.get(vertex1).push({ vertex: vertex2, weight: weight });
      this.edges.get(vertex2).push({ vertex: vertex1, weight: weight });
    }
  
    primAlgorithm() {
      const visited = new Set();
      const result = [];
      const priorityQueue = new PriorityQueue();
  
      // Выбираем начальную вершину
      const startVertex = this.vertices[0];
      visited.add(startVertex);
  
      // Добавляем все ребра, инцидентные начальной вершине, в приоритетную очередь
      this.edges.get(startVertex).forEach(edge => {
        priorityQueue.enqueue({ vertex: startVertex, edge: edge });
      });
  
      // Пока есть ребра в очереди
      while (!priorityQueue.isEmpty()) {
        // Извлекаем ребро с минимальным весом
        const { vertex, edge } = priorityQueue.dequeue();
  
        if (!visited.has(edge.vertex)) {
          // Добавляем вершину в остовное дерево
          result.push({ from: vertex, to: edge.vertex, weight: edge.weight });
          visited.add(edge.vertex);
  
          // Добавляем все ребра, инцидентные новой вершине, в приоритетную очередь
          this.edges.get(edge.vertex).forEach(nextEdge => {
            priorityQueue.enqueue({ vertex: edge.vertex, edge: nextEdge });
          });
        }
      }
  
      return result;
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element) {
      this.queue.push(element);
      this.queue.sort((a, b) => a.edge.weight - b.edge.weight);
    }
  
    dequeue() {
      if (!this.isEmpty()) {
        return this.queue.shift();
      }
      return null;
    }
  
    isEmpty() {
      return this.queue.length === 0;
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
  graph.addEdge('A', 'C', 3);
  graph.addEdge('B', 'D', 5);
  graph.addEdge('C', 'D', 1);
  graph.addEdge('C', 'E', 4);
  graph.addEdge('D', 'E', 6);
  
  const minimumSpanningTree = graph.primAlgorithm();
  
  console.log('Minimum Spanning Tree:', minimumSpanningTree);
  