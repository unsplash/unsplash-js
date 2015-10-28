/* @flow */

export default function stats(): Object {
  return {
    total: () => {
      const url = "/stats";

      return this.request({
        url,
        method: "GET"
      });
    }
  };
}
