function topKFrequent(nums: number[], k: number) {
  const counter: any = {};
  for (const num of nums) {
    const prevNum = counter[num];
    if (prevNum) {
      counter[num] = prevNum + 1;
    } else {
      counter[num] = 1;
    }
  }

  console.log("counter ", counter);

  const keys: any = {};
  for (const n in counter) {
    const freq = counter[n];
    if (keys[freq]) {
      keys[freq].push(Number(n));
    } else {
      keys[freq] = [Number(n)];
    }
  }
  console.log("keys ", keys);

  const rank: any = [];
  for (const n in keys) {
    rank.push(Number(n));
  }
  rank.sort((a, b) => b - a);
  console.log("rank ", rank);

  const result = []
  for (const freq of rank) {
    for (const num of keys[freq]) {
      result.push(num)
      if (result.length === k) {
        return result
      }
    }
  }
  return result
}

console.log("reslt ", topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2));
