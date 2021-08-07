// to check null or undefined
export function checkNullOrUndefined(val: null | undefined) {
    if (val === null || val === undefined) {
      return true;
    } else {
      return false;
    }
  }