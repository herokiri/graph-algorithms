class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList.get(vertex1).push(vertex2);
        this.adjacencyList.get(vertex2).push(vertex1);
    }

    dfs(startingNode) {
        const visited = new Set();

        const dfsRecursive = (vertex) => {
            console.log(vertex);
            visited.add(vertex);

            const neighbors = this.adjacencyList.get(vertex);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfsRecursive(neighbor);
                }
            }
        };

        dfsRecursive(startingNode);
    }
}

// Пример использования:

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('D', 'E');
graph.addEdge('C', 'E');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');

console.log('DFS starting from vertex A:');
graph.dfs('A');
