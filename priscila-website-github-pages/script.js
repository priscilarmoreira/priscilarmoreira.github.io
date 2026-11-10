(() => {
 const filters = document.querySelectorAll('[data-filter]');
 const search = document.getElementById('publication-search');
 const articles = [...document.querySelectorAll('.publication')];
 let selected = 'all';
 const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
 function update() {
  const query = normalize(search.value.trim());
  let count = 0;
  articles.forEach(article => {
   const show = (selected === 'all' || article.dataset.topic === selected) && normalize(article.textContent).includes(query);
   article.hidden = !show;
   if(show) count++;
  });
  document.getElementById('no-results').hidden = count > 0;
 }
 filters.forEach(button => button.addEventListener('click', () => {
  selected = button.dataset.filter;
  filters.forEach(item => {item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button));});
  update();
 }));
 search.addEventListener('input', update);
})();
