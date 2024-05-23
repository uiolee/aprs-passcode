const calcPass = (call) => {
  // const call = callsign.split("-")[0].toUpperCase();
  //   const call = callsign
  //     .substring(0, callsign.indexOf("-") || undefined)
  //     .toUpperCase();

  let code;
  let i = 0;
  while (i < call.length) {
    code ^= (call.charCodeAt(i) << 8) ^ call.charCodeAt(i + 1);
    i += 2;
  }
  return (0x73e2 & 0x7fff) ^ code;
};

const cleanse = (inputValue) => {
  const idx = inputValue.indexOf("-");
  return inputValue.substring(0, idx > 0 ? idx : undefined).toUpperCase();
};

const getSearchParams = (key) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};

const nav_title = document.querySelector("nav ul li strong");
const log = document.querySelector("#log");
let copy;
try {
  const callsign = document.querySelector("#show-callsign");
  const input = document.querySelector("#callsign");
  const submit = document.querySelector("#submit");
  const passcode = document.querySelector("#passcode");
  document.querySelectorAll(".copy").forEach((elem) => {
    if (navigator.clipboard) {
      copy = true;
      elem.addEventListener("click", (ev) => {
        const copyValue = ev.target.previousElementSibling.value;
        navigator.clipboard.writeText(copyValue).then(
          (res) => {
            console.debug("copy", copyValue, res);
          },
          (err) => {
            console.error("copy fail", err);
          }
        );
      });
    } else {
      copy = false;
      elem.setAttribute("disabled", true);
      //   elem.hidden = true;
      log.textContent += "您的浏览器可能不支持复制\n";
    }
  });

  const change = (ev) => {
    ev.target.nextElementSibling.setAttribute("aria-busy", true);
    const inputValue = ev.target.value.replace(/[\s]+/g, "");
    console.debug(inputValue);

    const call = cleanse(inputValue);
    callsign.value = call ? call : "";
    passcode.value = call ? calcPass(call) : "";

    [callsign, passcode, ev.target].forEach((elem) => {
      if (call) {
        elem.nextElementSibling.removeAttribute("disabled");
      } else {
        elem.nextElementSibling.setAttribute("disabled", true);
      }
    });
    ev.target.nextElementSibling.removeAttribute("aria-busy");
  };

  input.addEventListener("change", change);
  input.addEventListener("input", change);

  nav_title.setAttribute("aria-busy", false);
  nav_title.removeAttribute("aria-busy");

  let call = getSearchParams("callsign");
  if (call) {
    input.value = call;
    change({
      target: { value: call, nextElementSibling: input.nextElementSibling },
    });
  }
} catch (err) {
  nav_title.textContent = "ERROR!";
  log.textContent = err;
  throw err;
} finally {
  nav_title.addEventListener("click", () => {
    location.replace("/");
  });
}
