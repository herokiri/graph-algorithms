class Graph {
    constructor() {
      this.vertices = [];
      this.edges = [];
    }
  
    addVertex(vertex) {
      this.vertices.push(vertex);
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.edges.push({ vertex1, vertex2, weight });
    }
  
    kruskalAlgorithm() {
      // Функция для нахождения корня дерева
      const find = (parent, i) => {
        if (parent[i] === i) {
          return i;
        }
        return find(parent, parent[i]);
      };
  
      // Функция для объединения двух поддеревьев
      const union = (parent, rank, x, y) => {
        const rootX = find(parent, x);
        const rootY = find(parent, y);
  
        if (rank[rootX] < rank[rootY]) {
          parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
          parent[rootY] = rootX;
        } else {
          parent[rootY] = rootX;
          rank[rootX]++;
        }
      };
  
      // Сортируем ребра по весу
      this.edges.sort((a, b) => a.weight - b.weight);
  
      const result = [];
      const parent = [];
      const rank = [];
  
      // Инициализация каждой вершины как отдельного поддерева
      for (const vertex of this.vertices) {
        parent[vertex] = vertex;
        rank[vertex] = 0;
      }
  
      // Обработка каждого ребра по возрастанию веса
      for (const edge of this.edges) {
        const root1 = find(parent, edge.vertex1);
        const root2 = find(parent, edge.vertex2);
  
        // Если ребро не создает цикл, добавляем его в остовное дерево
        if (root1 !== root2) {
          result.push(edge);
          union(parent, rank, root1, root2);
        }
      }
  
      return result;
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
  
  const minimumSpanningTree = graph.kruskalAlgorithm();
  
  console.log('Minimum Spanning Tree:', minimumSpanningTree);
  