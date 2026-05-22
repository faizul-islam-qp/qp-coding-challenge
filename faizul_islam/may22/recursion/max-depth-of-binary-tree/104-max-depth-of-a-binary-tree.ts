function coinChange(coins: number[], amount: number): number {
  const memo: Map<number, number> = new Map();

  function topDown(remaining: number): number {
    if (remaining < 0) {
      return -1; // No solution
    }
    if (remaining === 0) {
      return 0; // Base case: no coins needed
    }
    if (memo.has(remaining)) {
      return memo.get(remaining)!; // Return cached result
    }

    let minCoins = Infinity;
    for (const coin of coins) {
      const requiredCoins = topDown(remaining - coin);
      if (requiredCoins >= 0 && requiredCoins < minCoins) {
        minCoins = 1 + requiredCoins; // Include the current coin
      }
    }

    memo.set(remaining, minCoins === Infinity ? -1 : minCoins); // Cache the result
    return memo.get(remaining)!;
  }

  return topDown(amount);
}
