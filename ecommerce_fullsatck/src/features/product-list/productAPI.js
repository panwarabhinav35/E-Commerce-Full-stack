// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilter(filter, sort,pagination) {
  let queryString = "";
  for (let key in filter) {
    const catValue = filter[key];
    if (catValue.length > 0) {
      const lastCatValue = catValue[catValue.length - 1];
      queryString += `${key}=${lastCatValue}&`;
    }
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    if (key == "order") {
      continue;
    }
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(queryString)
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    
    resolve( {data});
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}