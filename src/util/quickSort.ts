export function quickSort(arr: [], pivotConclusion: Function | undefined = undefined, start: number = 0, end: number = arr.length - 1) {
  if (start < end) {
    const part = partition(arr, start, end)
    quickSort(arr,pivotConclusion, start, part - 1)
    quickSort(arr,pivotConclusion, part + 1, end)
  }

  function checkPivot(first: number, second: number) {
    return first <= second
  }

  function partition(arr: [], start: number = 0, end: number = arr.length - 1) {
    console.log(pivotConclusion)
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (!pivotConclusion && checkPivot(arr[i], pivotValue) || pivotConclusion && !!pivotConclusion(arr[i], pivotValue)) {
        swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
    swap(arr, pivotIndex, end);
    return pivotIndex;
  }

  function swap(arr: [], i: number, j: number) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr
}


