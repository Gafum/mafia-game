<script>
   export let data;
   import { fade } from 'svelte/transition';
   import { beforeNavigate, afterNavigate, disableScrollHandling } from '$app/navigation';
   import { page } from '$app/stores';

   beforeNavigate(() => {
      if (typeof document !== 'undefined') {
         document.body.style.overflow = 'hidden';
      }
   });

   afterNavigate(() => {
      disableScrollHandling();
      setTimeout(() => {
         window.scrollTo(0, 0);
         if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
         }
      }, 200);
   });

   let pageTitle = 'Mafia';

   $: {
      const pathSegments = $page.url.pathname.split('/').filter(Boolean);
      const currentSegment = pathSegments[pathSegments.length - 1];

      if (currentSegment) {
         const formattedSegment = currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);
         pageTitle = `Mafia - ${formattedSegment}`;
      } else {
         pageTitle = 'Mafia';
      }
   }
</script>

<svelte:head>
   <title>{pageTitle}</title>
</svelte:head>

{#key data.pathname}
   <div class="page-transition" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
      <slot />
   </div>
{/key}

<style>
   .page-transition {
      width: 100%;
      height: 100%;
   }
</style>