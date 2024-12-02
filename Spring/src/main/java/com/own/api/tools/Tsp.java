package com.own.api.tools;

import java.util.Arrays;

public class Tsp {
    // Função recursiva para calcular o custo mínimo
    static double totalCost(int mask, int pos, int n, double[][] cost, double[][] dp, int[][] path) {
        // Caso base: se todas as cidades foram visitadas, retorna o custo para voltar à cidade inicial
        if (mask == (1 << n) - 1) {
            return cost[pos][0];
        }

        // Verificar se já foi calculado antes
        if (dp[mask][pos] != -1) {
            return dp[mask][pos];
        }

        double ans = Double.MAX_VALUE;

        // Tentar visitar todas as cidades não visitadas
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) == 0) {
                // Se a cidade i não foi visitada, visite-a e atualize o mask
                double newCost = cost[pos][i] + totalCost(mask | (1 << i), i, n, cost, dp, path);

                // Atualiza o menor custo e armazena o caminho
                if (newCost < ans) {
                    ans = newCost;
                    path[mask][pos] = i;  // Armazena o próximo passo no caminho
                }
            }
        }

        // Armazenar o resultado para evitar recalcular
        dp[mask][pos] = ans;

        return ans;
    }

    // Função que inicia a recursão e retorna a melhor rota
    public static int[] tsp(double[][] cost) {
        int n = cost.length;

        // Inicializando o DP com -1, indicando que os subproblemas não foram resolvidos
        double[][] dp = new double[1 << n][n];
        int[][] path = new int[1 << n][n];  // Para armazenar o caminho

        // Inicializa o dp com -1
        for (double[] row : dp) {
            Arrays.fill(row, -1);
        }

        // Começar a partir da cidade 0 com o mask representando apenas a cidade 0 visitada
        totalCost(1, 0, n, cost, dp, path);

        // Agora reconstruímos a rota a partir do caminho armazenado
        int[] bestRoute = new int[n + 1];
        int mask = 1;
        int pos = 0;
        for (int i = 0; i < n; i++) {
            bestRoute[i] = pos;
            pos = path[mask][pos];  // Passa para a próxima cidade
            mask |= (1 << pos);  // Marca a cidade como visitada
        }
        bestRoute[n] = 0;  // Volta para a cidade inicial

        return bestRoute;
    }

    // Função para calcular o custo total de uma rota
    public static double calculateTotalDistance(int[] route, double[][] cost) {
        double totalDistance = 0;
        for (int i = 0; i < route.length - 1; i++) {
            totalDistance += cost[route[i]][route[i + 1]];
        }
        return totalDistance;
    }

    
}
