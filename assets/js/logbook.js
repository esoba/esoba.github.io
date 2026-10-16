document.querySelectorAll("[data-search-list]").forEach((list) => {
  const input = list.querySelector("[data-search-input]");
  const entries = [...list.querySelectorAll("[data-search-item]")];
  const filters = [...list.querySelectorAll("[data-topic]")];
  let topic = "";
  list.querySelectorAll("[data-search-controls]").forEach((control) => {
    control.hidden = false;
  });
  list.querySelectorAll("[data-no-js]").forEach((label) => {
    label.hidden = true;
  });
  function update() {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    entries.forEach((entry) => {
      const tags = JSON.parse(entry.dataset.tags || "[]");
      const matchesTopic = !topic || tags.some((tag) => tag === topic || tag.startsWith(`${topic}/`));
      const matchesQuery = `${entry.dataset.search} ${tags.join(" ")}`.toLowerCase().includes(query);
      entry.hidden = !(matchesTopic && matchesQuery);
      if (!entry.hidden) visible += 1;
    });
    list.querySelector("[data-search-empty]").hidden = visible > 0;
    const counts = list.querySelectorAll("[data-search-count]");
    if (counts.length) {
      counts[0].textContent = `/ ${visible}`;
      counts[1].textContent = `${visible} of ${entries.length} resources${topic ? ` · ${topic.replaceAll("/", " / ")}` : ""}`;
    }
  }
  input.addEventListener("input", update);
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      topic = filter.dataset.topic;
      filters.forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filter));
      });
      update();
    });
  });
  update();
});
