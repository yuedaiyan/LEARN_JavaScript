// import { calculateDeliveryDate } from "./deliveryOptions";

const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
    console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/documentation");
// xhr.open("GET", "https://supersimplebackend.dev/images/apple.jpg");

xhr.send();
