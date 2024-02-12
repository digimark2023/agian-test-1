import { FormData } from "../components/contact";

//export function sendEmail(data: FormData) {
export function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";

  //   fetch(apiEndpoint, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       alert(response.message);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response); // Log the response content
      //alert(response.message);
    })
    .catch((err) => {
      alert("Error:" + err);
    });
}
