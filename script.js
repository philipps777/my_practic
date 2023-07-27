const selectors = {
  startBtn: document.querySelector(".js-start"),
  container: document.querySelector(".js-container"),
};

selectors.startBtn.addEventListener("click", handlerStart);

function handlerStart() {
  const promises = [...selectors.container.children].map((_) =>
    createPromise()
  );

  Promise.allSettled(promises).then((items) => {
    console.log(items);
    items.forEach((item, i) => {
      selectors.container.children[i].textContent = "";
      setTimeout(() => {
        selectors.container.children[i].textContent = item.value || item.reason;
        if (i === items.length - 1) {
          const instance = basicLightbox.create(`
                        <h1>${isWinner ? "Winner" : "Loser"}</h1>
                    `);
          instance.show();
        }
      }, 1000 * (i + 1));
    });
    const isWinner =
      items.every((item) => item.status === "fulfilled") ||
      items.every((item) => item.status === "rejected");
  });
}

function createPromise() {
  return new Promise((res, rej) => {
    const random = Math.random();
    const emoji = "\u{1F603}";
    if (random > 0.5) {
      res(emoji);
    } else {
      rej("👿");
    }
  });
}
