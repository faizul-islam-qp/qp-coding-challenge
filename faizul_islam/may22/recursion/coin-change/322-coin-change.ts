// recursion with no memoization

function coinChange(coins: number[], amount: number): number {
  if (amount === 0) {
    return 0;
  }
  if (amount < 0) {
    return -1;
  }

  let minCoins = Infinity;
  for (const coin of coins) {
    const requiredCoins = coinChange(coins, amount - coin);
    if (requiredCoins >= 0 && requiredCoins < minCoins) {
      minCoins = 1 + requiredCoins;
    }
  }
  return minCoins === Infinity ? -1 : minCoins;
}

// recursion with memoization top down approach
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

// bottom up approach

function coinChange(coins: number[], totalAmount: number): number {
  // bottom up approach
  const dp: number[] = new Array(totalAmount + 1).fill(Infinity);
  dp[0] = 0; // Base case: 0 coins needed to make amount 0

  for (let amount = 1; amount <= totalAmount; amount++) {
    for (const coin of coins) {
      if (amount - coin >= 0) {
        dp[amount] = Math.min(dp[amount], dp[amount - coin] + 1);
      }
    }
  }

  return dp[totalAmount] === Infinity ? -1 : dp[totalAmount];
}
