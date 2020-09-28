export default function stats() {
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
