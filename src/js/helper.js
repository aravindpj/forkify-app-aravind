import { TIME_OUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX=async function(url,uploadData=undefined){
  try {
    const fetchPro=uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }) : fetch(url)

    const response = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data;

  } catch (error) {
    throw error;
  }

}

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIME_OUT)]);
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, updateData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updateData),
//     });
//     const response = await Promise.race([fetchPro, timeout(TIME_OUT)]);
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (error) {

//   }
// };
