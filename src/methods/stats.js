/* @flow */

export default function stats(): Object {
  return {
    total: () => {
      const url = "/stats/total";

      return this.request({
        url,
        method: "GET"
      });
    }
  };
}
