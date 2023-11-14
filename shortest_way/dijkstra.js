class Graph {
    constructor() {
      this.vertices = new Set();
      this.edges = new Map();
    }
  
    addVertex(vertex) {
      this.vertices.add(vertex);
      this.edges.set(vertex, []);
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges.get(vertex1).push({ vertex: vertex2, weight: weight });
      this.edges.get(vertex2).push({ vertex: vertex1, weight: weight });
    }
  
    dijkstraAlgorithm(startingNode) {
      const distances = {};
      const visited = new Set();
      const priorityQueue = new PriorityQueue();
  
      // Инициализация расстояний. Начальная вершина имеет расстояние 0, остальные - Infinity.
      for (const vertex of this.vertices) {
        distances[vertex] = vertex === startingNode ? 0 : Infinity;
      }
  
      priorityQueue.enqueue({ vertex: startingNode, distance: 0 });
  
      while (!priorityQueue.isEmpty()) {
        const { vertex, distance } = priorityQueue.dequeue();
  
        if (!visited.has(vertex)) {
          visited.add(vertex);
  
          for (const neighbor of this.edges.get(vertex)) {
            const totalDistance = distance + neighbor.weight;
  
            if (totalDistance < distances[neighbor.vertex]) {
              distances[neighbor.vertex] = totalDistance;
              priorityQueue.enqueue({ vertex: neighbor.vertex, distance: totalDistance });
            }
          }
        }
      }
  
      return distances;
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element) {
      this.queue.push(element);
      this.queue.sort((a, b) => a.distance - b.distance);
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
  graph.addEdge('A', 'C', 4);
  graph.addEdge('B', 'C', 1);
  graph.addEdge('B', 'D', 7);
  graph.addEdge('C', 'E', 3);
  graph.addEdge('D', 'E', 1);
  
  const startingNode = 'A';
  const shortestDistances = graph.dijkstraAlgorithm(startingNode);
  
  console.log(`Shortest distances from node ${startingNode}:`, shortestDistances);
  