//Поиск в ширину, англ. BFS, Breadth-first search) — один из простейших алгоритмов обхода графа, 
//являющийся основой для многих важных алгоритмов для работы с графами.


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

    bfs(startingNode) {
        const visited = new Set();
        const queue = [];

        visited.add(startingNode);
        queue.push(startingNode);


        while (queue.length > 0) {
            // console.log(queue);

            const currentVertex = queue.shift();
            console.log(currentVertex);

            const neighbors = this.adjacencyList.get(currentVertex);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
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

console.log('BFS starting from vertex A:');
graph.bfs('A');
