// A mock function to mimic making an async request for data
export function fetchLoggedinUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response=  await fetch('http://localhost:8080/orders/?user.id='+userId)
    const data = await response.json()
    resolve({data})}
  );
} 
export function fetchLoggedinUser(userId) {
  return new Promise(async (resolve) =>{
    const response=  await fetch('http://localhost:8080/users/'+userId)
    const data = await response.json()
    resolve({data})}
  );
} 

export function updateUser(update) {
  return new Promise(
    async (resolve) => {
      const response = await fetch("http://localhost:8080/users/"+update.id, {
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