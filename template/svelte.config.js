import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  onwarn:(waring, handler)=>{
    if(waring.code.startsWith('a11y-')){
      return
    }
    handler(waring)
  }
}
