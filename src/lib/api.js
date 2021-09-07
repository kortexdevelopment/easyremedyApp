import * as HTTP from './http';

exports.verifyLogin = async (email, pass) => {
  let endpoint = `login.php`;

  let urlParams = `?email=${email}&pass=${pass}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.logDevice = async (id) => {
  let endpoint = `loginDevice.php`;

  let urlParams = `?id=${id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.remedies = async () => {
  let endpoint = `remedies.php`;

  let urlParams = ``

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}