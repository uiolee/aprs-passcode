<script lang="ts">
  const { href, integrity } = $props();
</script>

<link
  as="style"
  crossorigin="anonymous"
  {href}
  {integrity}
  onload={(ev) => {
    ev.target.rel = 'stylesheet';
  }}
  referrerpolicy="no-referrer"
  rel="preload"
/>
<noscript>
  <link crossorigin="anonymous" {href} {integrity} referrerpolicy="no-referrer" rel="stylesheet" />
</noscript>
