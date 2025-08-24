<script lang="ts">
  const { href, integrity } = $props();
</script>

<link
  as="style"
  crossorigin="anonymous"
  {href}
  {integrity}
  onload={function (ev) {
    try {
      this.rel = 'stylesheet';
    } catch (e) {
      console.debug(e);
    }
    try {
      ev.target.rel = 'stylesheet';
    } catch (e) {
      console.debug(e);
    }
  }}
  referrerpolicy="no-referrer"
  rel="preload"
/>
<noscript>
  <link crossorigin="anonymous" {href} {integrity} referrerpolicy="no-referrer" rel="stylesheet" />
</noscript>
