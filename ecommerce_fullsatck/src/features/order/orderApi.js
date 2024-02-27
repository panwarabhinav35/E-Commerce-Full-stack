export function createOrder(order) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }
    //TODO : On server it will only return some info of user
  );
}
export function fetchAllOrders(pagination) {
  let queryString ='';
  for (let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/orders?"+queryString);
      const data = await response.json();
      resolve({ data });
    }
  );
}

export function updateOrder(update) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/orders/" + update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }
    //TODO : On server it will only return some info of user
  );
}