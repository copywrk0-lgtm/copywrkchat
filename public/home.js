// Progressive enhancement for editorial entrance transitions.
if ('IntersectionObserver' in window) {
  const nodes=document.querySelectorAll('.feature,.section-intro,.anatomy-header,.bottom-cta');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if (entry.isIntersecting) { entry.target.classList.add('in-view');observer.unobserve(entry.target); }
  }),{threshold:0.12});
  nodes.forEach(node=>{node.classList.add('enter-ready');observer.observe(node)});
}
